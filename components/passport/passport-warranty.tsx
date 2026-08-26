import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate, getDaysRemaining } from '@/lib/utils/date'

export function PassportWarranty({ items }: { items: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Your Halla Protection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item: any) => {
          const warranty = item.warranty
          if (!warranty?.is_enabled) return null

          const daysLeft = getDaysRemaining(warranty.expiration_date)
          const isExpiringSoon = warranty.status === 'expiring_soon'
          const isExpired = warranty.status === 'expired'

          return (
            <div key={item.id} className="rounded-xl border border-border p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.product.category.name}</p>
                </div>
                <Badge variant={isExpired ? 'secondary' : isExpiringSoon ? 'destructive' : 'default'}>
                  {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring soon' : 'Active'}
                </Badge>
              </div>

              <div className="space-y-1 border-t border-border pt-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Valid until</span>
                  <span className="font-medium text-foreground">
                    {formatDate(warranty.expiration_date)}
                  </span>
                </div>
                {!isExpired && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Remaining</span>
                    <span className="font-medium text-foreground">{daysLeft} days</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Coverage</span>
                  <span className="font-medium text-foreground">{warranty.duration_months} months</span>
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
