'use client'

import { Check, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n/locale-context'

export function PassportMaintenance({ items }: { items: any[] }) {
  const { t } = useLocale()

  // Filter items that have maintenance instructions
  const itemsWithMaintenance = items.filter(
    (item: any) => item.custom_maintenance || item.product.maintenance_instructions
  )

  if (itemsWithMaintenance.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('passport.maintenance.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {itemsWithMaintenance.map((item: any) => {
          const maintenance = item.custom_maintenance || item.product.maintenance_instructions

          return (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground">{item.product.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {item.product.category.name}
                </Badge>
              </div>
              <div className="rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
                {String(maintenance).split(/\n+/).filter(Boolean).map((line) => <p key={line} className="flex gap-2 py-1"><Check className="mt-0.5 size-3.5 shrink-0 text-brand" /><span>{line.replace(/^[-•]\s*/, '')}</span></p>)}
              </div>
            </div>
          )
        })}

        <div className="flex items-start gap-2.5 rounded-lg bg-brand-soft p-3 text-sm text-brand">
          <Lightbulb className="mt-0.5 size-4 shrink-0" />
          <p>
            <span className="font-medium">{t('passport.maintenance.tip')}</span>{' '}
            {t('passport.maintenance.tipBody')}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
