'use client'

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { generateQRCode } from '@/lib/utils/qr'

export function QRCodeDisplay({ url }: { url: string }) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateQRCode(url)
      .then(setQrDataUrl)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [url])

  if (loading) {
    return <div className="mx-auto size-64 animate-pulse rounded-xl bg-secondary" />
  }

  return (
    <div className="space-y-3">
      {qrDataUrl && (
        <>
          <img
            src={qrDataUrl}
            alt="QR Code"
            className="mx-auto size-64 rounded-xl border border-border p-3"
          />
          <a
            href={qrDataUrl}
            download="project-h-passport-qr.png"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Download className="size-3.5" />
            Download QR Code
          </a>
        </>
      )}
    </div>
  )
}
