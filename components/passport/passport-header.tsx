'use client'

import Link from 'next/link'
import { ArrowLeft, Home, MapPin, ShieldCheck } from 'lucide-react'
import { formatDate } from '@/lib/utils/date'
import { Monogram } from '@/components/brand/logo'
import { SettingsMenu } from '@/components/settings/settings-menu'
import { useLocale } from '@/lib/i18n/locale-context'

export function PassportHeader({ project }: { project: any }) {
  const { t } = useLocale()

  return (
    <div className="relative overflow-hidden border-b border-border bg-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-brand-soft),transparent_52%)] opacity-80" />
      <div className="relative mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-background/80 px-3 text-sm font-medium text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background hover:shadow-md">
            <ArrowLeft className="size-3.5 sm:hidden" />
            <Home className="hidden size-3.5 sm:block" />
            <span>{t('passport.home')}</span>
          </Link>
          <SettingsMenu />
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <Monogram size={44} />

          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand">
              <ShieldCheck className="size-3.5" />
              {t('passport.badge')}
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{t('passport.title')}</p>
          </div>
          {project.address && <div className="flex max-w-lg items-start gap-1.5 text-sm text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0" /><span>{project.address}</span></div>}

          <div className="flex flex-col items-center justify-center gap-x-4 gap-y-1.5 pt-2 text-sm text-muted-foreground sm:flex-row">
            <span>
              <span className="font-medium text-foreground">{project.project_id}</span>
            </span>
            {project.installation_date && (
              <>
                <span className="hidden text-border sm:inline">•</span>
                <span>
                  {t('passport.installed')} {formatDate(project.installation_date)}
                </span>
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
