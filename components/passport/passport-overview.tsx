'use client'

import { CalendarDays, Grid2X2, PackageCheck, ShieldCheck } from 'lucide-react'
import { formatDate } from '@/lib/utils/date'
import { useLocale } from '@/lib/i18n/locale-context'

export function PassportOverview({ project, areas, photoCount }: { project: any; areas: any[]; photoCount: number }) {
  const { locale } = useLocale()
  const items = areas.flatMap((area) => area.items || [])
  const warranties = items.filter((item) => item.warranty?.is_enabled)
  const stats = [
    { icon: Grid2X2, value: areas.length, label: locale === 'id' ? 'Area dikerjakan' : 'Areas completed' },
    { icon: PackageCheck, value: items.length, label: locale === 'id' ? 'Produk terpasang' : 'Products installed' },
    { icon: ShieldCheck, value: warranties.length, label: locale === 'id' ? 'Garansi aktif' : 'Covered items' },
    { icon: CalendarDays, value: project.installation_date ? formatDate(project.installation_date, 'dd MMM yyyy', locale) : '—', label: locale === 'id' ? 'Tanggal pemasangan' : 'Installation date' },
  ]

  return <section id="overview" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
    {stats.map(({ icon: Icon, value, label }) => <div key={label} className="group rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <Icon className="mb-4 size-5 text-brand transition-transform group-hover:scale-110" />
      <p className="text-xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-xs leading-snug text-muted-foreground">{label}</p>
    </div>)}
    <span className="sr-only">{photoCount} installation photos</span>
  </section>
}
