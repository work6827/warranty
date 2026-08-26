import { ShieldCheck } from 'lucide-react'
import { formatDate } from '@/lib/utils/date'
import { Monogram } from '@/components/brand/logo'

export function PassportHeader({ project }: { project: any }) {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Monogram size={44} />

          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand">
              <ShieldCheck className="size-3.5" />
              Verified Halla Installation
            </span>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {project.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Project H Passport</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-x-4 gap-y-1.5 pt-2 text-sm text-muted-foreground sm:flex-row">
            <span>
              <span className="font-medium text-foreground">{project.project_id}</span>
            </span>
            {project.installation_date && (
              <>
                <span className="hidden text-border sm:inline">•</span>
                <span>Installed {formatDate(project.installation_date)}</span>
              </>
            )}
            <span className="hidden text-border sm:inline">•</span>
            <span className="capitalize">{project.project_type}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
