'use client'

import { useMemo, useState } from 'react'
import { Camera, Expand, Images } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useLocale } from '@/lib/i18n/locale-context'

type Photo = { id: string; file_url: string; photo_type?: 'before' | 'during' | 'after' | null; caption?: string | null }
type Filter = 'all' | 'before' | 'during' | 'after'

export function PassportPhotos({ photos }: { photos: Photo[] }) {
  const { locale } = useLocale()
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Photo | null>(null)
  const filtered = useMemo(() => filter === 'all' ? photos : photos.filter((photo) => photo.photo_type === filter), [filter, photos])
  const filters: Array<{ value: Filter; label: string }> = [
    { value: 'all', label: locale === 'id' ? 'Semua' : 'All' },
    { value: 'before', label: locale === 'id' ? 'Sebelum' : 'Before' },
    { value: 'during', label: locale === 'id' ? 'Proses' : 'During' },
    { value: 'after', label: locale === 'id' ? 'Hasil akhir' : 'After' },
  ]

  return <section id="installation-results" className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
    <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-brand uppercase"><Camera className="size-4" />{locale === 'id' ? 'Dokumentasi proyek' : 'Project documentation'}</div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{locale === 'id' ? 'Hasil Pemasangan' : 'Installation Results'}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{photos.length} {locale === 'id' ? 'foto terverifikasi dari tim instalasi' : 'verified photos from the installation team'}</p>
      </div>
      {photos.length > 0 && <div className="flex flex-wrap gap-1 rounded-xl bg-secondary p-1">{filters.map((item) => {
        const count = item.value === 'all' ? photos.length : photos.filter((photo) => photo.photo_type === item.value).length
        if (item.value !== 'all' && count === 0) return null
        return <button key={item.value} onClick={() => setFilter(item.value)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${filter === item.value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{item.label} <span className="opacity-60">{count}</span></button>
      })}</div>}
    </div>

    {photos.length === 0 ? <div className="flex min-h-64 flex-col items-center justify-center bg-secondary/30 p-8 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-card shadow-sm"><Images className="size-6 text-muted-foreground" /></div>
      <p className="font-medium text-foreground">{locale === 'id' ? 'Dokumentasi belum tersedia' : 'Installation photos are not available yet'}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{locale === 'id' ? 'Hubungi Halla+ jika Anda membutuhkan dokumentasi hasil pemasangan.' : 'Contact Halla+ if you need installation documentation added to this passport.'}</p>
    </div> : <div className="grid auto-rows-[150px] grid-cols-2 gap-2 p-2 sm:auto-rows-[190px] sm:grid-cols-3">
      {filtered.map((photo, index) => <button key={photo.id} onClick={() => setSelected(photo)} className={`group relative overflow-hidden rounded-2xl bg-secondary ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
        <img src={photo.file_url} alt={photo.caption || 'Installation result'} className="size-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-left text-white">
          <div><p className="text-[10px] font-semibold tracking-widest uppercase opacity-75">{photo.photo_type || (locale === 'id' ? 'Dokumentasi' : 'Detail')}</p>{photo.caption && <p className="mt-0.5 text-sm font-medium line-clamp-2">{photo.caption}</p>}</div>
          <Expand className="size-4 shrink-0 opacity-0 transition group-hover:opacity-100" />
        </div>
      </button>)}
    </div>}

    <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
      <DialogContent className="max-w-5xl overflow-hidden p-0">
        {selected && <div className="bg-black"><img src={selected.file_url} alt={selected.caption || 'Installation result'} className="max-h-[82vh] w-full object-contain" />{selected.caption && <p className="p-4 text-sm text-white">{selected.caption}</p>}</div>}
      </DialogContent>
    </Dialog>
  </section>
}
