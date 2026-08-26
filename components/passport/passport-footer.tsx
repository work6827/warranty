'use client'

import { useLocale } from '@/lib/i18n/locale-context'

export function PassportFooter({ projectId, publishedAt }: { projectId: string; publishedAt: string }) {
  const { t } = useLocale()

  return (
    <div className="mt-8 border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
        <p className="font-medium text-foreground">{t('passport.footer.by')}</p>
        <p className="mt-1">
          {projectId} • {t('passport.footer.published')} {new Date(publishedAt).toLocaleDateString('id-ID')}
        </p>
      </div>
    </div>
  )
}
