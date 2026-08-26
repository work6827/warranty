'use client'

import { useEffect, useState } from 'react'
import { Download, QrCode, ShieldCheck } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { generateQRCode } from '@/lib/utils/qr'
import { useLocale } from '@/lib/i18n/locale-context'

export function PassportQR({ projectId, passportUrl }: { projectId: string; passportUrl: string }) {
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    void generateQRCode(passportUrl).then(setQrDataUrl).catch(() => setError(true))
  }, [passportUrl])

  return <section className="relative overflow-hidden rounded-3xl border border-brand/20 bg-brand-soft p-5 sm:p-7">
    <div className="absolute -top-14 -right-14 size-40 rounded-full border-[28px] border-brand/5" />
    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-sm"><QrCode className="size-5" /></div>
        <div>
          <h2 className="font-semibold text-foreground">{locale === 'id' ? 'QR Paspor Saya' : 'My Passport QR'}</h2>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">{locale === 'id' ? 'Simpan QR pribadi ini untuk membuka garansi dan detail pemasangan Anda kapan saja.' : 'Save this personal QR to reopen your warranty and installation details anytime.'}</p>
        </div>
      </div>
      <Button size="lg" onClick={() => setOpen(true)} disabled={!qrDataUrl || error} className="h-11 shrink-0 px-5"><QrCode className="size-4" />{locale === 'id' ? 'Tampilkan QR Saya' : 'Show My QR'}</Button>
    </div>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="pr-8 text-center">
          <DialogTitle className="text-xl">{locale === 'id' ? 'QR Project H Anda' : 'Your Project H QR'}</DialogTitle>
          <DialogDescription>{locale === 'id' ? 'QR ini khusus untuk paspor proyek Anda.' : 'This QR is unique to your project passport.'}</DialogDescription>
        </DialogHeader>
        <div className="mx-auto rounded-3xl border border-border bg-white p-4 shadow-sm">
          {qrDataUrl && <img src={qrDataUrl} alt={`QR code for passport ${projectId}`} className="size-64" />}
        </div>
        <div className="text-center">
          <p className="font-mono text-sm font-semibold tracking-wide text-foreground">{projectId}</p>
          <p className="mt-1 break-all text-xs text-muted-foreground">{passportUrl}</p>
        </div>
        <a href={qrDataUrl} download={`project-h-${projectId}-qr.png`} className={buttonVariants({ size: 'lg', className: 'h-11 w-full' })}><Download className="size-4" />{locale === 'id' ? 'Unduh QR' : 'Download QR'}</a>
        <div className="flex items-start gap-2 rounded-xl bg-secondary p-3 text-xs text-muted-foreground"><ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-brand" /><span>{locale === 'id' ? 'QR hanya menyimpan tautan aman paspor Anda—tidak menyimpan nomor telepon atau data pribadi.' : 'The QR contains only your secure passport link—never your phone number or personal details.'}</span></div>
      </DialogContent>
    </Dialog>
  </section>
}
