'use client'

import { Settings } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useLocale } from '@/lib/i18n/locale-context'
import { cn } from '@/lib/utils'

/**
 * Small settings affordance for the customer-facing pages: language
 * (English / Bahasa Indonesia) and text size. Both persist to
 * localStorage via LocaleProvider so the choice sticks across visits.
 */
export function SettingsMenu({ className }: { className?: string }) {
  const { locale, setLocale, fontSize, setFontSize, t } = useLocale()

  return (
    <Popover>
      <PopoverTrigger
        aria-label={t('settings.label')}
        className={cn(
          'flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
          className
        )}
      >
        <Settings className="size-4.5" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {t('settings.language')}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                  locale === 'en'
                    ? 'border-transparent bg-brand text-brand-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground'
                )}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLocale('id')}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                  locale === 'id'
                    ? 'border-transparent bg-brand text-brand-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground'
                )}
              >
                Bahasa
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {t('settings.fontSize')}
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setFontSize(size)}
                  className={cn(
                    'rounded-lg border px-2 py-1.5 text-sm font-medium transition-colors',
                    fontSize === size
                      ? 'border-transparent bg-brand text-brand-foreground'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className={size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}>
                    {t(`settings.fontSize.${size}` as const)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
