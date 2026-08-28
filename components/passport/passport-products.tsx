'use client'

import { ChevronDown, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils/date'
import { useLocale } from '@/lib/i18n/locale-context'

export function PassportProducts({ areas }: { areas: any[] }) {
  const { locale, t } = useLocale()

  if (areas.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('passport.products.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-7">
        {areas.map((area, areaIndex) => (
          <div key={area.id}>
            {areaIndex > 0 && <Separator className="mb-7" />}

            <div className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                {area.name}
              </h3>

              <div className="space-y-3">
                {area.items.map((item: any) => (
                  <details key={item.id} className="group rounded-2xl border border-border bg-card p-4 transition-all open:shadow-sm" open={areaIndex === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 [&::-webkit-details-marker]:hidden">
                      <div className="flex min-w-0 gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft"><Package className="size-4.5 text-brand" /></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.product.brand}
                          {item.product.series && ` • ${item.product.series}`}
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {item.product.category.name}
                      </Badge>
                      </div>
                      <ChevronDown className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="pl-0 sm:pl-13">

                    {/* Specifications */}
                    {item.product.specifications &&
                      Object.keys(item.product.specifications).length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-border pt-3 text-xs">
                          {Object.entries(item.product.specifications).map(([key, value]: [string, any]) => {
                            if (!value) return null
                            if (
                              item.product.category?.name === 'Flooring' &&
                              ['dimensions', 'surface_finish', 'collection'].includes(key)
                            ) return null
                            return (
                              <div key={key} className="flex justify-between gap-2">
                                <span className="text-muted-foreground capitalize">
                                  {key.replace(/_/g, ' ')}
                                </span>
                                <span className="font-medium text-foreground">{value}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}

                    {/* Installation Details */}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                      <span>
                        <span className="font-medium text-foreground">{item.quantity}</span> {item.unit}
                      </span>
                      {item.installation_date && (
                        <span>
                          {t('passport.products.quantity')} {formatDate(item.installation_date, 'dd MMMM yyyy', locale)}
                        </span>
                      )}
                      {item.installer && (
                        <span>
                          {t('passport.products.by')} {item.installer.name}
                        </span>
                      )}
                    </div>

                    {/* Warranty Badge */}
                    {item.warranty?.is_enabled && (
                      <div className="mt-3">
                        <Badge
                          variant={item.warranty.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {item.warranty.status === 'active' && '✓ '}
                          {t('passport.products.warrantyUntil')} {formatDate(item.warranty.expiration_date, 'dd MMMM yyyy', locale)}
                        </Badge>
                      </div>
                    )}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
