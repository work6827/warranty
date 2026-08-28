'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, PackagePlus, Ruler, ShieldCheck, Tag } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert } from '@/components/ui/alert'

interface Category {
  id: string
  name: string
  slug: string
}

interface CategorySpec {
  id: string
  name: string
  slug: string
  data_type: string
  unit: string | null
  is_required: boolean
}

function normalizeSpecsForForm(specs: CategorySpec[], categorySlug?: string): CategorySpec[] {
  if (categorySlug !== 'flooring') return specs

  const retained = specs.filter((spec) => !['dimensions', 'surface_finish', 'collection'].includes(spec.slug))
  const flooringFields: CategorySpec[] = [
    { id: 'flooring-plank-length', name: 'Plank Length', slug: 'plank_length', data_type: 'number', unit: 'mm', is_required: false },
    { id: 'flooring-plank-width', name: 'Plank Width', slug: 'plank_width', data_type: 'number', unit: 'mm', is_required: false },
  ]

  return [
    ...retained.filter((spec) => !['plank_length', 'plank_width', 'pattern'].includes(spec.slug)),
    ...flooringFields.map((field) => retained.find((spec) => spec.slug === field.slug) || field),
    ...retained.filter((spec) => spec.slug === 'pattern'),
  ]
}

function SectionHeader({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string
  icon: typeof Tag
  title: string
  description: string
}) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand-soft">
        <Icon className="size-4 text-brand" />
        <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-foreground text-[9px] font-semibold text-background">{number}</span>
      </div>
      <div>
        <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export default function NewProductPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [categories, setCategories] = useState<Category[]>([])
  const [specs, setSpecs] = useState<CategorySpec[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [categoryId, setCategoryId] = useState('')
  const [brand, setBrand] = useState('')
  const [name, setName] = useState('')
  const [series, setSeries] = useState('')
  const [sku, setSku] = useState('')
  const [specifications, setSpecifications] = useState<Record<string, any>>({})
  const [warrantyMonths, setWarrantyMonths] = useState('12')
  const [maintenance, setMaintenance] = useState('')

  useEffect(() => {
    let active = true
    void supabase.from('categories').select('*').eq('is_active', true).order('sort_order')
      .then(({ data }) => { if (active) setCategories(data || []) })
    return () => { active = false }
  }, [supabase])

  useEffect(() => {
    if (!categoryId) return
    let active = true
    void supabase.from('category_specifications').select('*').eq('category_id', categoryId)
      .order('sort_order').then(({ data }) => {
        if (!active) return
        const categorySlug = categories.find((category) => category.id === categoryId)?.slug
        const normalizedSpecs = normalizeSpecsForForm(data || [], categorySlug)
        setSpecs(normalizedSpecs)
        setSpecifications(Object.fromEntries(normalizedSpecs.map((spec) => [spec.slug, ''])))
      })
    return () => { active = false }
  }, [categories, categoryId, supabase])

  const handleSpecChange = (slug: string, value: any) => {
    setSpecifications((prev) => ({
      ...prev,
      [slug]: value,
    }))
  }

  const selectedCategory = categories.find((c) => c.id === categoryId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate required fields
      if (!categoryId || !brand || !name) {
        throw new Error('Please fill in all required fields')
      }

      // Check required specifications
      for (const spec of specs) {
        if (spec.is_required && !specifications[spec.slug]) {
          throw new Error(`${spec.name} is required`)
        }
      }

      const { error: insertError } = await supabase
        .from('products')
        .insert({
          category_id: categoryId,
          brand,
          name,
          series: series || null,
          sku: sku || null,
          specifications,
          default_warranty_months: parseInt(warrantyMonths) || 0,
          maintenance_instructions: maintenance || null,
        })
        .select()
        .single()

      if (insertError) throw insertError

      router.push('/admin/products')
    } catch (err: any) {
      setError(err.message || 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary/25">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link href="/admin/products" className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Product catalog
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
              <PackagePlus className="size-3.5" /> Catalog editor
            </div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-foreground">Create a product</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Build one clean catalog record. Installation quantities and room details are added later inside each project.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" onClick={() => router.back()} disabled={loading}>Cancel</Button>
            <Button type="submit" form="product-form" size="lg" disabled={loading} className="min-w-32">
              {loading ? 'Creating…' : 'Create product'}
            </Button>
          </div>
        </div>

        <form id="product-form" onSubmit={handleSubmit} className="grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <p className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Product record</p>
            <div className="space-y-1">
              {[
                ['01', 'Identity', Boolean(categoryId && brand && name)],
                ['02', 'Specifications', Boolean(categoryId)],
                ['03', 'Aftercare', Boolean(warrantyMonths || maintenance)],
              ].map(([number, label, complete]) => (
                <div key={String(number)} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm">
                  <span className={`flex size-6 items-center justify-center rounded-full text-[10px] font-semibold ${complete ? 'bg-brand text-brand-foreground' : 'border border-border text-muted-foreground'}`}>
                    {complete ? <Check className="size-3" /> : number}
                  </span>
                  <span className={complete ? 'font-medium text-foreground' : 'text-muted-foreground'}>{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-border bg-background/70 p-4">
              <p className="text-xs font-medium text-foreground">Catalog preview</p>
              <p className="mt-2 truncate text-sm font-semibold text-foreground">{name || 'Untitled product'}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {[brand, series].filter(Boolean).join(' · ') || 'Brand · Collection'}
              </p>
              {selectedCategory && <span className="mt-3 inline-flex rounded-full bg-brand-soft px-2 py-1 text-[10px] font-medium text-brand">{selectedCategory.name}</span>}
            </div>
          </aside>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <section className="p-5 sm:p-7">
              <SectionHeader number="1" icon={Tag} title="Product identity" description="The essential information your team uses to find this product." />
              <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                  <Select value={categoryId} onValueChange={(value) => setCategoryId(value ?? '')}>
                    <SelectTrigger id="category" className="h-11 w-full bg-background"><SelectValue placeholder="Choose a product category">{(value: string) => categories.find((c) => c.id === value)?.name}</SelectValue></SelectTrigger>
                    <SelectContent>{categories.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="brand">Brand <span className="text-destructive">*</span></Label>
                  <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. TOKA" required className="h-11 bg-background" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="series">Series / Collection</Label>
                  <Input id="series" value={series} onChange={(e) => setSeries(e.target.value)} placeholder="e.g. Stone Series" className="h-11 bg-background" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="name">Product name <span className="text-destructive">*</span></Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Toka Stone" required className="h-11 bg-background" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sku">SKU / Product code</Label>
                  <Input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g. TOKA-901" className="h-11 bg-background font-mono" />
                </div>
              </div>
            </section>

            <section className="border-t border-border p-5 sm:p-7">
              <SectionHeader number="2" icon={Ruler} title="Technical specifications" description={categoryId ? `Details specific to ${selectedCategory?.name ?? 'this category'}.` : 'Choose a category first and the relevant fields will appear here.'} />
              {!categoryId ? (
                <div className="rounded-xl border border-dashed border-border bg-secondary/35 px-5 py-10 text-center text-sm text-muted-foreground">Select a category above to continue.</div>
              ) : specs.length === 0 ? (
                <div className="rounded-xl bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">This category has no additional specifications.</div>
              ) : (
                <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <div key={spec.id} className="space-y-1.5">
                      <Label htmlFor={spec.slug}>{spec.name}{spec.is_required && <span className="text-destructive"> *</span>}</Label>
                      <div className="relative">
                        <Input id={spec.slug} type={spec.data_type === 'number' || spec.data_type === 'percentage' ? 'number' : 'text'} step="0.01" value={specifications[spec.slug] || ''} onChange={(e) => handleSpecChange(spec.slug, e.target.value)} required={spec.is_required} className={`h-11 bg-background ${spec.unit ? 'pr-14' : ''}`} />
                        {spec.unit && <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center border-l border-border pl-3 text-xs font-medium text-muted-foreground">{spec.unit}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="border-t border-border p-5 sm:p-7">
              <SectionHeader number="3" icon={ShieldCheck} title="Warranty & aftercare" description="Set reusable defaults. Your team can still override them for a specific installation." />
              <div className="grid gap-5 sm:grid-cols-[180px_minmax(0,1fr)]">
                <div className="space-y-1.5">
                  <Label htmlFor="warranty">Warranty period</Label>
                  <div className="relative"><Input id="warranty" type="number" min="0" value={warrantyMonths} onChange={(e) => setWarrantyMonths(e.target.value)} className="h-11 bg-background pr-16" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">months</span></div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="maintenance">Customer care instructions</Label>
                  <Textarea id="maintenance" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} placeholder="Cleaning method, products to avoid, and routine care…" rows={4} className="min-h-28 resize-y bg-background" />
                  <p className="text-xs text-muted-foreground">Shown on the customer’s digital passport.</p>
                </div>
              </div>
            </section>

            {error && <div className="border-t border-border p-5 sm:px-7"><Alert variant="destructive">{error}</Alert></div>}

            <div className="flex items-center justify-between border-t border-border bg-secondary/35 px-5 py-4 sm:px-7">
              <p className="hidden text-xs text-muted-foreground sm:block"><span className="text-destructive">*</span> Required fields</p>
              <div className="ml-auto flex gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>Cancel</Button>
                <Button type="submit" size="lg" disabled={loading} className="min-w-32">{loading ? 'Creating…' : 'Create product'}</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
