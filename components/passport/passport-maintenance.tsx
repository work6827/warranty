import { Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function PassportMaintenance({ items }: { items: any[] }) {
  // Filter items that have maintenance instructions
  const itemsWithMaintenance = items.filter(
    (item: any) => item.custom_maintenance || item.product.maintenance_instructions
  )

  if (itemsWithMaintenance.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Take Care of Your Halla Products</CardTitle>
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
              <div className="rounded-lg bg-secondary p-3 text-sm whitespace-pre-line text-muted-foreground">
                {maintenance}
              </div>
            </div>
          )
        })}

        <div className="flex items-start gap-2.5 rounded-lg bg-brand-soft p-3 text-sm text-brand">
          <Lightbulb className="mt-0.5 size-4 shrink-0" />
          <p>
            <span className="font-medium">Regular maintenance matters.</span> It extends the life
            of your products and keeps your warranty valid.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
