import Link from 'next/link'
import { Plus, FolderKanban, FileEdit, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome to the Halla+ Admin Portal</p>
        </div>
        <Link href="/admin/projects/new" className={buttonVariants({ size: 'lg', className: 'h-10 gap-1.5' })}>
          <Plus className="size-4" />
          New Project
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {STAT_CARDS.map(({ key, label, icon: Icon }) => (
          <Card key={key}>
            <CardContent className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                  {stats[key]}
                </p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                <Icon className="size-5 text-brand" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentProjects.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-4 text-muted-foreground">No projects yet</p>
              <Link href="/admin/projects/new" className={buttonVariants()}>
                Create Your First Project
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentProjects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="block rounded-xl border border-border p-4 transition-colors hover:border-foreground/20 hover:bg-secondary/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-3">
                        <h3 className="font-medium text-foreground">{project.name}</h3>
                        <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.customer?.name} • {project.project_id}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(project.installation_date || project.created_at)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
