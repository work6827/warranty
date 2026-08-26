import Link from 'next/link'
import type { Metadata } from 'next'
import { FileText, MessagesSquare, QrCode, ShieldCheck, Wrench } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { PassportLookupForm } from '@/components/home/passport-lookup-form'

export const metadata: Metadata = {
  title: 'Halla Home — Project H Passport',
  description:
    'Every Halla Home installation comes with a digital Project H Passport: product records, warranty status, maintenance guides, and support, all in one place.',
}

const FEATURES = [
  {
    icon: FileText,
    title: 'Complete product records',
    description:
      'Brand, series, specifications, and quantities for every product installed in your home — organized by room.',
  },
  {
    icon: ShieldCheck,
    title: 'Warranty, tracked automatically',
    description:
      'Coverage dates and terms per product, with a clear active / expiring / expired status you never have to chase down.',
  },
  {
    icon: Wrench,
    title: 'Maintenance, made simple',
    description:
      'Care instructions specific to what was actually installed, so your products last as long as they should.',
  },
  {
    icon: MessagesSquare,
    title: 'Direct line to Halla',
    description:
      'Warranty claims and service requests, one tap away on WhatsApp — no call center, no ticket number.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Halla completes your installation',
    description: 'Every product, photo, and warranty term is recorded against your project.',
  },
  {
    n: '02',
    title: 'You get a passport',
    description: 'A QR code on your documentation, and a code + phone lookup if you ever misplace it.',
  },
  {
    n: '03',
    title: 'It stays with your home',
    description: 'Come back any time — from any device — to check warranty status or request service.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Logo />
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Admin login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
              ✓ Verified Halla Home installation
            </span>
            <h1 className="mt-5 text-4xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl">
              The digital record for everything Halla installed in your home.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Every Project H Passport holds your product specifications, warranty status, and
              maintenance guidance — accessible by QR code, no app or account required.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <QrCode className="size-4 text-brand" />
                Scan the code on your warranty card
              </span>
              <span className="hidden text-border sm:inline">•</span>
              <span>Or look it up below</span>
            </div>
          </div>

          <div
            id="lookup"
            className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            <h2 className="text-lg font-semibold text-foreground">Find your passport</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the passport code and phone number from your installation documentation.
            </p>
            <div className="mt-6">
              <PassportLookupForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-xl">
          <h2 className="text-sm font-semibold tracking-wide text-brand uppercase">
            What's in your passport
          </h2>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            One page, everything about your installation.
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="size-5 text-brand" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            How it works
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n}>
                <span className="font-serif text-3xl text-brand/50">{step.n}</span>
                <h3 className="mt-3 font-medium text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <Logo tagline={false} size="sm" />
          <p>Professional interior finishing & building materials, Halla Home.</p>
        </div>
      </footer>
    </div>
  )
}
