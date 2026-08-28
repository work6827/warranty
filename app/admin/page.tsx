import Link from 'next/link'
import { ArrowUpRight, Plus, FolderKanban, FileEdit, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils/date'

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

const STAT_CARDS = [
  { key: 'totalProjects', label: 'Total Projects', icon: FolderKanban },
  { key: 'draftProjects', label: 'Drafts', icon: FileEdit },
  { key: 'publishedProjects', label: 'Published', icon: CheckCircle2 },
] as const

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-brand uppercase">Halla+ workspace</p>
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">A clear view of your digital passport portfolio.</p>
        </div>
        <Link href="/admin/projects/new" className={buttonVariants({ size: 'lg' })}>
          <Plus className="size-4" />
          New Project
        </Link>
      </div>

      <div className="mb-8 grid overflow-hidden rounded-2xl bg-card shadow-[0_1px_2px_rgba(17,17,15,0.03),0_16px_40px_-28px_rgba(17,17,15,0.3)] ring-1 ring-black/4 md:grid-cols-3">
        {STAT_CARDS.map(({ key, label, icon: Icon }) => (
          <div key={key} className="relative flex items-center justify-between border-b border-border/70 px-6 py-6 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0">
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
        <div className="flex items-center justify-between border-b border-border/70 px-6 py-5">
          <div>
            <h2 className="font-semibold tracking-tight text-foreground">Recent projects</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Latest activity across your portfolio</p>
          </div>
          <Link href="/admin/projects" className="text-xs font-medium text-brand transition-opacity hover:opacity-70">View all</Link>
        </div>
        <CardContent className="px-0">
          {stats.recentProjects.length === 0 ? (
            <div className="py-16 text-center">
              <p className="mb-4 text-muted-foreground">No projects yet</p>
              <Link href="/admin/projects/new" className={buttonVariants()}>
                Create Your First Project
              </Link>
            </div>
          ) : (
            <div>
              {stats.recentProjects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="group flex items-center justify-between border-b border-border/60 px-6 py-5 transition-colors last:border-b-0 hover:bg-secondary/35"
                >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center gap-2.5">
                        <h3 className="truncate font-medium text-foreground">{project.name}</h3>
                        <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {project.customer?.name} <span className="mx-1.5 text-border">/</span> {project.project_id} <span className="mx-1.5 text-border">/</span> {formatDate(project.installation_date || project.created_at)}
                      </p>
                    </div>
                    <ArrowUpRight className="ml-4 size-4 text-muted-foreground/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
