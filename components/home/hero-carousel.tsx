'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n/locale-context'
import { cn } from '@/lib/utils'

const SLIDES = [
  {
    image: '/images/landing/cozy-home.png',
    alt: 'A warm contemporary home with expansive filmed windows facing a tropical garden',
    eyebrow: { en: 'Residential comfort', id: 'Kenyamanan hunian' },
    title: { en: 'Beautiful light.\nLess of the heat.', id: 'Cahaya yang indah.\nTanpa panas berlebih.' },
    body: {
      en: 'Architectural window solutions that make every room calmer, cooler, and more comfortable.',
      id: 'Solusi kaca arsitektural yang membuat setiap ruang lebih teduh, sejuk, dan nyaman.',
    },
  },
  {
    image: '/images/landing/glass-tower.png',
    alt: 'A modern glass office tower with a high-performance reflective facade',
    eyebrow: { en: 'Commercial performance', id: 'Performa komersial' },
    title: { en: 'Performance at\nevery scale.', id: 'Performa di\nsetiap skala.' },
    body: {
      en: 'Smarter glazing for ambitious buildings—designed for efficiency, clarity, and lasting impact.',
      id: 'Kaca pintar untuk bangunan ambisius—dirancang demi efisiensi, kejernihan, dan dampak jangka panjang.',
    },
  },
  {
    image: '/images/landing/window-film-installation.png',
    alt: 'A craftsperson precisely applying solar-control film to a large window',
    eyebrow: { en: 'Installed with intent', id: 'Dipasang dengan presisi' },
    title: { en: 'The difference is\nin the detail.', id: 'Perbedaannya ada\npada detail.' },
    body: {
      en: 'Expert specification, meticulous installation, and a digital record that stays with your project.',
      id: 'Spesifikasi ahli, instalasi teliti, dan catatan digital yang selalu menyertai proyek Anda.',
    },
  },
] as const

export function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const { locale, t } = useLocale()

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % SLIDES.length), 6500)
    return () => window.clearInterval(timer)
  }, [paused])

  const go = (index: number) => setActive((index + SLIDES.length) % SLIDES.length)

  return (
    <section
      className="relative min-h-[680px] overflow-hidden bg-[#111713] text-white sm:min-h-[760px]"
      aria-roledescription="carousel"
      aria-label="Halla+ solutions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SLIDES.map((slide, index) => (
        <div
          key={slide.image}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-out',
            index === active ? 'z-0 opacity-100' : 'pointer-events-none opacity-0'
          )}
          aria-hidden={index !== active}
        >
          <Image src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" className="object-cover" />
        </div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,14,10,.88)_0%,rgba(8,14,10,.64)_38%,rgba(8,14,10,.13)_73%,rgba(8,14,10,.24)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,10,7,.64)_0%,transparent_45%,rgba(5,10,7,.15)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-end px-4 pb-28 pt-32 sm:min-h-[760px] sm:px-6 sm:pb-36 lg:px-8">
        <div className="max-w-2xl">
          <div key={`copy-${active}`} className="animate-[hero-reveal_.8s_ease-out_both]">
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[.22em] text-white/75 uppercase">
              <span className="h-px w-10 bg-white/50" />
              {SLIDES[active].eyebrow[locale]}
            </p>
            <h1 className="mt-6 whitespace-pre-line text-5xl leading-[.98] font-semibold tracking-[-.045em] text-balance sm:text-7xl lg:text-[5.5rem]">
              {SLIDES[active].title[locale]}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/78 sm:text-lg">
              {SLIDES[active].body[locale]}
            </p>
            <a
              href="#lookup"
              className={cn(buttonVariants({ size: 'lg' }), 'mt-8 h-12 rounded-full bg-white px-6 text-[#101512] hover:bg-white/90')}
            >
              {t('home.lookup.title')}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute right-4 bottom-7 left-4 z-20 mx-auto flex max-w-7xl items-center justify-between sm:right-6 sm:bottom-10 sm:left-6 lg:right-8 lg:left-8">
        <div className="flex gap-2" role="tablist" aria-label="Choose a slide">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => go(index)}
              className={cn('h-1 rounded-full transition-all duration-500', index === active ? 'w-12 bg-white' : 'w-6 bg-white/35 hover:bg-white/60')}
              aria-label={`Show slide ${index + 1}`}
              aria-selected={index === active}
              role="tab"
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(active - 1)} aria-label="Previous slide" className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/10 backdrop-blur-md transition hover:bg-white hover:text-[#101512]">
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={() => go(active + 1)} aria-label="Next slide" className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/10 backdrop-blur-md transition hover:bg-white hover:text-[#101512]">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
