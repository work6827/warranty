import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils/date'
import { getServerLocale } from '@/lib/i18n/server'

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const locale = await getServerLocale()
  const c = (en: string, idText: string) => locale === 'id' ? idText : en
  const supabase = await createClient()
  const { data: project, error } = await supabase.from('projects').select(`
    *, customer:customers(name, phone, email),
    areas:project_areas(id, name, items:project_items(id, quantity, unit, product:products(brand, name)))
  `).eq('id', id).single()

  if (error || !project) notFound()
  if (project.status === 'published') redirect(`/admin/projects/${id}/published`)

  const areas = project.areas as Array<{ items?: unknown[] }> | null
  const itemCount = areas?.reduce((total: number, area) => total + (area.items?.length || 0), 0) || 0

  return <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
    <Link href="/admin/projects" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft className="size-3.5" /> {c('Projects', 'Proyek')}
    </Link>
    <div className="mb-8 flex items-start justify-between gap-4">
      <div><h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1><p className="mt-1 text-sm text-muted-foreground">{project.project_id}</p></div>
      <Badge variant="secondary">{project.status}</Badge>
    </div>
    <Card>
      <CardHeader><CardTitle className="text-base">{c('Project summary', 'Ringkasan proyek')}</CardTitle></CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div><p className="text-xs text-muted-foreground">{c('Customer', 'Pelanggan')}</p><p className="font-medium">{project.customer?.name}</p></div>
        <div><p className="text-xs text-muted-foreground">{c('Phone', 'Telepon')}</p><p className="font-medium">{project.customer?.phone}</p></div>
        <div><p className="text-xs text-muted-foreground">{c('Installation', 'Pemasangan')}</p><p className="font-medium">{formatDate(project.installation_date, undefined, locale)}</p></div>
        <div><p className="text-xs text-muted-foreground">{c('Products', 'Produk')}</p><p className="font-medium">{itemCount}</p></div>
      </CardContent>
    </Card>
    <p className="mt-6 text-sm text-muted-foreground">{c('Draft editing is not available yet. Published passports open automatically from this page.', 'Pengeditan draf belum tersedia. Paspor yang telah diterbitkan akan terbuka otomatis dari halaman ini.')}</p>
    <Link href="/admin/projects" className={buttonVariants({ variant: 'outline', className: 'mt-4' })}>{c('Back to projects', 'Kembali ke proyek')}</Link>
  </div>
}
