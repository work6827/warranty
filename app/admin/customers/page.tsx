import Link from 'next/link'
import { Building2, FolderKanban, Mail, MapPin, Phone, Search, UserRound } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getServerLocale } from '@/lib/i18n/server'
import { formatDate } from '@/lib/utils/date'

type CustomerProject = {
  id: string
  project_id: string
  name: string
  status: 'draft' | 'published' | 'archived'
  created_at: string
}

type CustomerWithProjects = {
  id: string
  name: string
  phone: string
  email: string | null
  address: string | null
  created_at: string
  projects: CustomerProject[] | null
}

async function getCustomers(search?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('customers')
    .select(`
      id,
      name,
      phone,
      email,
      address,
      created_at,
      projects(id, project_id, name, status, created_at)
    `)
    .order('created_at', { ascending: false })

  const cleanSearch = search?.trim()
  if (cleanSearch) {
    const safeSearch = cleanSearch.replace(/[,%()]/g, ' ')
    query = query.or(`name.ilike.%${safeSearch}%,phone.ilike.%${safeSearch}%,email.ilike.%${safeSearch}%`)
  }

  const { data, error } = await query
  return { customers: (data || []) as CustomerWithProjects[], error }
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const params = await searchParams
  const [{ customers, error }, locale] = await Promise.all([getCustomers(params.search), getServerLocale()])
  const c = (en: string, id: string) => locale === 'id' ? id : en

  return (
    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{c('Customers', 'Pelanggan')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{c('View customer records and their Halla+ projects.', 'Lihat data pelanggan dan proyek Halla+ mereka.')}</p>
      </div>

      <form action="/admin/customers" method="get" className="relative mb-6 max-w-lg">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input name="search" defaultValue={params.search} placeholder={c('Search name, phone, or email', 'Cari nama, telepon, atau email')} className="h-11 pl-9" />
      </form>

      {error && <Alert variant="destructive" className="mb-5">{c('Customer data could not be loaded. Please try again.', 'Data pelanggan tidak dapat dimuat. Silakan coba lagi.')}</Alert>}

      {!error && customers.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <UserRound className="size-9 text-muted-foreground/45" />
          <div>
            <p className="font-medium text-foreground">{params.search ? c('No matching customers', 'Pelanggan tidak ditemukan') : c('No customers yet', 'Belum ada pelanggan')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{params.search ? c('Try another name, phone number, or email.', 'Coba nama, nomor telepon, atau email lain.') : c('Customers appear here after they are added to a project.', 'Pelanggan akan tampil setelah ditambahkan ke proyek.')}</p>
          </div>
        </CardContent></Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {customers.map((customer) => {
            const projects = [...(customer.projects || [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            return (
              <Card key={customer.id} className="gap-0 py-0">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft"><UserRound className="size-5 text-brand" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="min-w-0 break-words font-semibold text-foreground">{customer.name}</h2>
                        <Badge variant="secondary" className="shrink-0"><FolderKanban className="size-3" />{projects.length} {c(projects.length === 1 ? 'project' : 'projects', 'proyek')}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{c('Customer since', 'Pelanggan sejak')} {formatDate(customer.created_at, 'dd MMMM yyyy', locale)}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    <a href={`tel:${customer.phone}`} className="flex min-w-0 items-center gap-2 rounded-xl bg-secondary/45 px-3 py-2.5 hover:text-foreground"><Phone className="size-3.5 shrink-0 text-brand" /><span className="truncate">{customer.phone}</span></a>
                    {customer.email ? (
                      <a href={`mailto:${customer.email}`} className="flex min-w-0 items-center gap-2 rounded-xl bg-secondary/45 px-3 py-2.5 hover:text-foreground"><Mail className="size-3.5 shrink-0 text-brand" /><span className="truncate">{customer.email}</span></a>
                    ) : (
                      <div className="flex items-center gap-2 rounded-xl bg-secondary/45 px-3 py-2.5 text-muted-foreground/65"><Mail className="size-3.5 shrink-0" />{c('No email', 'Tidak ada email')}</div>
                    )}
                    {customer.address && <div className="flex items-start gap-2 rounded-xl bg-secondary/45 px-3 py-2.5 sm:col-span-2"><MapPin className="mt-0.5 size-3.5 shrink-0 text-brand" /><span className="line-clamp-2">{customer.address}</span></div>}
                  </div>

                  <div className="mt-5 border-t border-border pt-4">
                    <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{c('Projects', 'Proyek')}</p>
                    {projects.length === 0 ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Building2 className="size-4" />{c('No projects linked yet.', 'Belum ada proyek yang terhubung.')}</div>
                    ) : (
                      <div className="space-y-1.5">
                        {projects.map((project) => (
                          <Link key={project.id} href={`/admin/projects/${project.id}`} className="flex min-w-0 items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary">
                            <div className="min-w-0"><p className="truncate text-sm font-medium text-foreground">{project.name}</p><p className="text-xs text-muted-foreground">{project.project_id}</p></div>
                            <Badge variant={project.status === 'published' ? 'default' : 'secondary'} className="shrink-0 capitalize">{project.status}</Badge>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
