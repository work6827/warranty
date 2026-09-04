'use client'

import Link from 'next/link'
import { FileText, LockKeyhole, MessagesSquare, QrCode, ShieldCheck, Wrench } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { PassportLookupForm } from '@/components/home/passport-lookup-form'
import { SettingsMenu } from '@/components/settings/settings-menu'
import { useLocale } from '@/lib/i18n/locale-context'
import { HeroCarousel } from '@/components/home/hero-carousel'

const FEATURES = [
  { icon: FileText, titleKey: 'home.features.records.title', bodyKey: 'home.features.records.body' },
  { icon: ShieldCheck, titleKey: 'home.features.warranty.title', bodyKey: 'home.features.warranty.body' },
  { icon: Wrench, titleKey: 'home.features.maintenance.title', bodyKey: 'home.features.maintenance.body' },
  { icon: MessagesSquare, titleKey: 'home.features.contact.title', bodyKey: 'home.features.contact.body' },
] as const

const STEPS = [
  { n: '01', titleKey: 'home.steps.1.title', bodyKey: 'home.steps.1.body' },
  { n: '02', titleKey: 'home.steps.2.title', bodyKey: 'home.steps.2.body' },
  { n: '03', titleKey: 'home.steps.3.title', bodyKey: 'home.steps.3.body' },
] as const

export function HomePageContent() {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          <Logo className="brightness-0 invert" />
          <div className="rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur-md">
            <SettingsMenu />
          </div>
        </div>
      </header>

      {/* Hero */}
      <HeroCarousel />

      <section className="relative border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">✓ {t('home.badge')}</span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t('home.hero.title')}</h2>
            <div className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <QrCode className="mt-0.5 size-5 shrink-0 text-brand" />
              <p>{t('home.hero.scanHint')}. {t('home.hero.orLookup')}.</p>
            </div>
          </div>
          <div
            id="lookup"
            className="scroll-mt-6 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8"
          >
            <h2 className="text-lg font-semibold text-foreground">{t('home.lookup.title')}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t('home.lookup.subtitle')}</p>
            <div className="mt-6">
              <PassportLookupForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-xl">
          <h2 className="text-sm font-semibold tracking-wide text-brand uppercase">
            {t('home.features.eyebrow')}
          </h2>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t('home.features.title')}
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.titleKey} className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="size-5 text-brand" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{t(feature.titleKey)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(feature.bodyKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t('home.steps.title')}
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n}>
                <span className="font-serif text-3xl text-brand/60">{step.n}</span>
                <h3 className="mt-3 font-medium text-foreground">{t(step.titleKey)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(step.bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <Logo tagline={false} size="sm" />
          <div className="flex flex-col items-center gap-3 sm:items-end">
            <p>{t('home.footer.tagline')}</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/65 transition-colors hover:text-foreground"
            >
              <LockKeyhole className="size-3" />
              {t('nav.staffAccess')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
