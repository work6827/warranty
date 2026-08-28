'use client'

import { Settings } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useLocale } from '@/lib/i18n/locale-context'
import type { ColorTheme } from '@/lib/i18n/dictionary'
import { cn } from '@/lib/utils'

/**
 * Small settings affordance for customer-facing pages: colour theme,
 * language, and text size. Preferences persist in localStorage.
 */
export function SettingsMenu({ className }: { className?: string }) {
  const { locale, setLocale, fontSize, setFontSize, colorTheme, setColorTheme, t } = useLocale()

  const themes: Array<{ id: ColorTheme; swatch: string }> = [
    { id: 'signature', swatch: '#075c32' },
    { id: 'forest', swatch: '#476655' },
    { id: 'oxblood', swatch: '#7b3f43' },
    { id: 'slate', swatch: '#536675' },
  ]

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
              {t('settings.theme')}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {themes.map(({ id, swatch }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setColorTheme(id)}
                  aria-pressed={colorTheme === id}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs font-medium transition-colors',
                    colorTheme === id
                      ? 'border-brand bg-brand-soft text-foreground'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="size-3.5 rounded-full ring-1 ring-black/10" style={{ backgroundColor: swatch }} />
                  {t(`settings.theme.${id}` as const)}
                </button>
              ))}
            </div>
          </div>

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
