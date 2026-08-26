'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Tag, Ruler, ShieldCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Tag
  title: string
  description: string
}) {
  return (
    <CardHeader className="flex-row items-start gap-3 space-y-0">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
        <Icon className="size-4.5 text-brand" />
      </div>
      <div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="mt-0.5">{description}</CardDescription>
      </div>
    </CardHeader>
  )
}

export default function NewProductPage() {
  const router = useRouter()
  const supabase = createClient()

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
        setSpecs(data || [])
        setSpecifications(Object.fromEntries((data || []).map((spec) => [spec.slug, ''])))
      })
    return () => { active = false }
  }, [categoryId, supabase])

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
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Products
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Add New Product</h1>
        <p className="mt-1 text-sm text-muted-foreground">Add a product to the Halla Home catalog</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="shadow-soft">
          <SectionHeader
            icon={Tag}
            title="Basic Information"
            description="What this product is and how it's identified in the catalog."
          />
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select value={categoryId} onValueChange={(value) => setCategoryId(value ?? '')}>
                <SelectTrigger id="category" className="h-10 w-full">
                  <SelectValue placeholder="Select category">
                    {(value: string) => categories.find((c) => c.id === value)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="brand">
                  Brand <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g., 3M, LG, etc."
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="series">Series / Collection</Label>
                <Input
                  id="series"
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  placeholder="e.g., Crystalline, Prestige"
                  className="h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="name">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Crystalline 70"
                required
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sku">SKU / Product Code</Label>
              <Input
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g., CR70"
                className="h-10"
              />
            </div>
          </CardContent>
        </Card>

        {categoryId && specs.length > 0 && (
          <Card className="shadow-soft">
            <SectionHeader
              icon={Ruler}
              title="Product Specifications"
              description={`Fields specific to ${selectedCategory?.name ?? 'this category'}.`}
            />
            <CardContent className="space-y-4">
              {specs.map((spec) => (
                <div key={spec.id} className="space-y-1.5">
                  <Label htmlFor={spec.slug}>
                    {spec.name}
                    {spec.is_required && <span className="text-destructive"> *</span>}
                    {spec.unit && (
                      <span className="ml-1 text-xs text-muted-foreground">({spec.unit})</span>
                    )}
                  </Label>
                  {spec.data_type === 'number' || spec.data_type === 'percentage' ? (
                    <Input
                      id={spec.slug}
                      type="number"
                      step="0.01"
                      value={specifications[spec.slug] || ''}
                      onChange={(e) => handleSpecChange(spec.slug, e.target.value)}
                      required={spec.is_required}
                      className="h-10"
                    />
                  ) : (
                    <Input
                      id={spec.slug}
                      value={specifications[spec.slug] || ''}
                      onChange={(e) => handleSpecChange(spec.slug, e.target.value)}
                      required={spec.is_required}
                      className="h-10"
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card className="shadow-soft">
          <SectionHeader
            icon={ShieldCheck}
            title="Warranty & Maintenance"
            description="Defaults applied when this product is added to a project — both can be overridden per install."
          />
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="warranty">Default Warranty Duration (months)</Label>
              <Input
                id="warranty"
                type="number"
                min="0"
                value={warrantyMonths}
                onChange={(e) => setWarrantyMonths(e.target.value)}
                className="h-10 max-w-32"
              />
              <p className="text-xs text-muted-foreground">Can be adjusted per project</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="maintenance">Maintenance Instructions</Label>
              <Textarea
                id="maintenance"
                value={maintenance}
                onChange={(e) => setMaintenance(e.target.value)}
                placeholder="How to care for and maintain this product..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">Will be shown to customers on their passport</p>
            </div>
          </CardContent>
        </Card>

        {error && <Alert variant="destructive">{error}</Alert>}

        <div className="flex items-center justify-between border-t border-border pt-6">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading} className="h-10">
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={loading} className="h-10">
            {loading ? 'Creating…' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  )
}
