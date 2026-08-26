'use client'

import { ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate, getDaysRemaining } from '@/lib/utils/date'
import { useLocale } from '@/lib/i18n/locale-context'

export function PassportWarranty({ items }: { items: any[] }) {
  const { t } = useLocale()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('passport.warranty.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item: any) => {
          const warranty = item.warranty
          if (!warranty?.is_enabled) return null

          const daysLeft = getDaysRemaining(warranty.expiration_date)
          const isExpiringSoon = warranty.status === 'expiring_soon'
          const isExpired = warranty.status === 'expired'

          return (
            <div key={item.id} className="relative overflow-hidden rounded-2xl border border-border p-4">
              <div className={`absolute inset-y-0 left-0 w-1 ${isExpired ? 'bg-muted-foreground' : isExpiringSoon ? 'bg-destructive' : 'bg-brand'}`} />
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="flex items-center gap-2 font-medium text-foreground"><ShieldCheck className="size-4 text-brand" />{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.product.category.name}</p>
                </div>
                <Badge variant={isExpired ? 'secondary' : isExpiringSoon ? 'destructive' : 'default'}>
                  {isExpired
                    ? t('passport.warranty.expired')
                    : isExpiringSoon
                      ? t('passport.warranty.expiringSoon')
                      : t('passport.warranty.active')}
                </Badge>
              </div>

              <div className="space-y-1 border-t border-border pt-3 text-sm">
                {!isExpired && <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-brand" style={{ width: `${Math.max(6, Math.min(100, (daysLeft / Math.max(1, warranty.duration_months * 30)) * 100))}%` }} /></div>}
                <div className="flex justify-between text-muted-foreground">
                  <span>{t('passport.warranty.validUntil')}</span>
                  <span className="font-medium text-foreground">
                    {formatDate(warranty.expiration_date)}
                  </span>
                </div>
                {!isExpired && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('passport.warranty.remaining')}</span>
                    <span className="font-medium text-foreground">
                      {daysLeft} {t('passport.warranty.days')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>{t('passport.warranty.coverage')}</span>
                  <span className="font-medium text-foreground">
                    {warranty.duration_months} {t('passport.warranty.months')}
                  </span>
                </div>
              </div>

              {warranty.terms && (
                <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
                  {warranty.terms}
                </p>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
