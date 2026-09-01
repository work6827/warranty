import Link from 'next/link'
import { ArrowUpRight, Plus, FolderKanban, FileEdit, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils/date'
import { getServerLocale, translate } from '@/lib/i18n/server'

function getAdminGreeting(locale: 'en' | 'id') {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta',
    }).format(new Date())
  )

  if (locale === 'id') {
    if (hour < 11) return 'Selamat pagi, Admin'
    if (hour < 15) return 'Selamat siang, Admin'
    if (hour < 18) return 'Selamat sore, Admin'
    return 'Selamat malam, Admin'
  }

  if (hour < 12) return 'Good morning, Admin'
  if (hour < 18) return 'Good afternoon, Admin'
  return 'Good evening, Admin'
}

async function getDashboardStats() {
  const supabase = await createClient()

  const [
    { count: totalProjects },
    { count: draftProjects },
    { count: publishedProjects },
    { data: recentProjects },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft'),
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published'),
    supabase
      .from('projects')
      .select(`
        *,
        customer:customers(name),
        items:project_items(count)
      `)
      .order('created_at', { ascending: false })
      .limit(10),
  ])

  return {
    totalProjects: totalProjects || 0,
    draftProjects: draftProjects || 0,
    publishedProjects: publishedProjects || 0,
    recentProjects: recentProjects || [],
  }
}

export default async function AdminDashboard() {
  const [stats, locale] = await Promise.all([getDashboardStats(), getServerLocale()])
  const t = (key: Parameters<typeof translate>[1]) => translate(locale, key)
  const greeting = getAdminGreeting(locale)
  const statCards = [
    { key: 'totalProjects', label: t('admin.dashboard.totalProjects'), icon: FolderKanban },
    { key: 'draftProjects', label: t('admin.dashboard.drafts'), icon: FileEdit },
    { key: 'publishedProjects', label: t('admin.dashboard.published'), icon: CheckCircle2 },
  ] as const

  return (
    <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="mb-8 flex flex-col items-start gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-signal uppercase">{t('admin.dashboard.title')}</p>
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">{greeting}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t('admin.dashboard.subtitle')}</p>
        </div>
        <Link href="/admin/projects/new" className={buttonVariants({ size: 'lg', className: 'w-full sm:w-auto' })}>
          <Plus className="size-4" />
          {t('admin.dashboard.newProject')}
        </Link>
      </div>

      <div className="mb-8 grid overflow-hidden rounded-2xl bg-card shadow-[0_1px_2px_rgba(17,17,15,0.03),0_16px_40px_-28px_rgba(17,17,15,0.3)] ring-1 ring-black/4 md:grid-cols-3">
        {statCards.map(({ key, label, icon: Icon }) => (
          <div key={key} className="relative flex items-center justify-between border-b border-border/70 px-4 py-5 last:border-b-0 sm:px-6 sm:py-6 md:border-r md:border-b-0 md:last:border-r-0">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
                <p className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-foreground">
                  {stats[key]}
                </p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-full bg-brand-soft/75">
                <Icon className="size-[18px] text-brand" strokeWidth={1.7} />
              </div>
          </div>
        ))}
      </div>

      <Card className="gap-0 py-0">
        <div className="flex items-center justify-between gap-4 border-b border-border/70 px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <h2 className="font-semibold tracking-tight text-foreground">{t('admin.dashboard.recent')}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{t('admin.dashboard.recentSubtitle')}</p>
          </div>
          <Link href="/admin/projects" className="text-xs font-medium text-brand transition-opacity hover:opacity-70">{t('admin.dashboard.viewAll')}</Link>
        </div>
        <CardContent className="px-0">
          {stats.recentProjects.length === 0 ? (
            <div className="py-16 text-center">
              <p className="mb-4 text-muted-foreground">{t('admin.dashboard.empty')}</p>
              <Link href="/admin/projects/new" className={buttonVariants()}>
                {t('admin.dashboard.createFirst')}
              </Link>
            </div>
          ) : (
            <div>
              {stats.recentProjects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="group flex items-center justify-between border-b border-border/60 px-4 py-4 transition-colors last:border-b-0 hover:bg-secondary/35 sm:px-6 sm:py-5"
                >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center gap-2.5">
                        <h3 className="truncate font-medium text-foreground">{project.name}</h3>
                        <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {project.customer?.name} <span className="mx-1.5 text-border">/</span> {project.project_id} <span className="mx-1.5 text-border">/</span> {formatDate(project.installation_date || project.created_at, 'dd MMMM yyyy', locale)}
                      </p>
                    </div>
                    <ArrowUpRight className="ml-4 size-4 text-muted-foreground/50 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
