import Link from 'next/link'
import { Plus, FolderSearch } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/lib/utils/date'

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
  const projects = await getProjects(params.search)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage all Halla Home projects</p>
        </div>
        <Link href="/admin/projects/new" className={buttonVariants({ size: 'lg', className: 'h-10 gap-1.5' })}>
          <Plus className="size-4" />
          New Project
        </Link>
      </div>

      <div className="mb-6">
        <form action="/admin/projects" method="get">
          <Input
            name="search"
            placeholder="Search by project ID or name…"
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
              {params.search ? 'No projects found' : 'No projects yet'}
            </p>
            <Link href="/admin/projects/new" className={buttonVariants()}>
              Create Your First Project
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
                    {project.project_type.charAt(0).toUpperCase() + project.project_type.slice(1)} •{' '}
                    {formatDate(project.installation_date || project.created_at)}
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
