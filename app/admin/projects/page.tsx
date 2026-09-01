import Link from 'next/link'
import { Plus, FolderSearch } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/lib/utils/date'
import { getServerLocale, translate } from '@/lib/i18n/server'

async function getProjects(search?: string) {
  const supabase = await createClient()

  let query = supabase
    .from('projects')
    .select(`
      *,
      customer:customers(name, phone)
    `)
    .order('created_at', { ascending: false })

  if (search) {
    query = query.or(`project_id.ilike.%${search}%,name.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data || []
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const params = await searchParams
  const [projects, locale] = await Promise.all([getProjects(params.search), getServerLocale()])
  const t = (key: Parameters<typeof translate>[1]) => translate(locale, key)

  return (
    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t('admin.projects.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('admin.projects.subtitle')}</p>
        </div>
        <Link href="/admin/projects/new" className={buttonVariants({ size: 'lg', className: 'h-10 w-full gap-1.5 sm:w-auto' })}>
          <Plus className="size-4" />
          {t('admin.dashboard.newProject')}
        </Link>
      </div>

      <div className="mb-6">
        <form action="/admin/projects" method="get">
          <Input
            name="search"
            placeholder={t('admin.projects.search')}
            defaultValue={params.search}
            className="h-10 max-w-md"
          />
        </form>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <FolderSearch className="size-8 text-muted-foreground/50" />
            <p className="text-muted-foreground">
              {params.search ? t('admin.projects.notFound') : t('admin.projects.empty')}
            </p>
            <Link href="/admin/projects/new" className={buttonVariants()}>
              {t('admin.dashboard.createFirst')}
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}`}
              className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-secondary/50"
            >
              <div className="flex min-w-0 items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2 sm:gap-3">
                    <h3 className="min-w-0 break-words font-medium text-foreground">{project.name}</h3>
                    <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.customer?.name} • {project.project_id}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.project_type.charAt(0).toUpperCase() + project.project_type.slice(1)} •{' '}
                    {formatDate(project.installation_date || project.created_at, 'dd MMMM yyyy', locale)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
