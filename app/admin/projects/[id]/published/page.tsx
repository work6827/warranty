import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { QRCodeDisplay } from '@/components/admin/qr-code-display'
import { CopyLinkButton } from '@/components/admin/copy-link-button'
import { getRequestOrigin } from '@/lib/utils/request-url'

async function getProject(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      customer:customers(name, phone)
    `)
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function PublishedPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    redirect('/admin/projects')
  }

  const passportUrl = `${await getRequestOrigin()}/p/${project.public_token}`

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-brand-soft">
          <CheckCircle2 className="size-7 text-brand" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Halla+ Digital Passport Ready
        </h1>
        <p className="mt-1 text-muted-foreground">
          {project.project_id} has been successfully published
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-2">
          <div className="mb-4 text-center">
            <QRCodeDisplay url={passportUrl} />
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between border-b border-border py-2.5">
              <span className="text-muted-foreground">Customer</span>
              <span className="font-medium text-foreground">{project.customer?.name}</span>
            </div>
            <div className="flex justify-between border-b border-border py-2.5">
              <span className="text-muted-foreground">Project</span>
              <span className="font-medium text-foreground">{project.name}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-muted-foreground">Project ID</span>
              <span className="font-medium text-foreground">{project.project_id}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <a
          href={`https://wa.me/${project.customer?.phone}?text=${encodeURIComponent(
            `Halo ${project.customer?.name}, ini adalah Halla+ Digital Passport untuk ${project.name}: ${passportUrl}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: 'lg', className: 'h-11 w-full' })}
        >
          Share with Customer via WhatsApp
        </a>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={passportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline', className: 'h-10' })}
          >
            Open Passport
          </a>
          <CopyLinkButton url={passportUrl} />
        </div>

        <Link href="/admin/projects" className={buttonVariants({ variant: 'outline', className: 'h-10 w-full' })}>
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
