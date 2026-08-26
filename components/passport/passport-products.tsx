import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils/date'

export function PassportProducts({ areas }: { areas: any[] }) {
  if (areas.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Your Halla Project</CardTitle>
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
                  <div key={item.id} className="rounded-xl border border-border p-4">
                    <div className="flex items-start justify-between gap-2">
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

                    {/* Specifications */}
                    {item.product.specifications &&
                      Object.keys(item.product.specifications).length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-border pt-3 text-xs">
                          {Object.entries(item.product.specifications).map(([key, value]: [string, any]) => {
                            if (!value) return null
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
                      {item.installation_date && <span>Installed {formatDate(item.installation_date)}</span>}
                      {item.installer && <span>By {item.installer.name}</span>}
                    </div>

                    {/* Warranty Badge */}
                    {item.warranty?.is_enabled && (
                      <div className="mt-3">
                        <Badge
                          variant={item.warranty.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {item.warranty.status === 'active' && '✓ '}
                          Warranty until {formatDate(item.warranty.expiration_date)}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
