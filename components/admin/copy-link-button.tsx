'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n/locale-context'

export function CopyLinkButton({ url }: { url: string }) {
  const { locale } = useLocale()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Button variant="outline" type="button" onClick={handleCopy} className="h-10 gap-1.5">
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? (locale === 'id' ? 'Tersalin' : 'Copied') : (locale === 'id' ? 'Salin Tautan' : 'Copy Link')}
    </Button>
  )
}
