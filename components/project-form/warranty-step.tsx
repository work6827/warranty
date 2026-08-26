'use client'

import { useProjectFormStore } from '@/lib/store/project-form-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert } from '@/components/ui/alert'
import { calculateExpirationDate } from '@/lib/utils/date'

export function WarrantyStep() {
  const { areas, updateItem, setStep } = useProjectFormStore()

  const handleToggleWarranty = (itemId: string, currentWarranty: any) => {
    if (!currentWarranty || !currentWarranty.is_enabled) {
      // Enable warranty with defaults
      const startDate = new Date().toISOString().split('T')[0]
      const durationMonths = 12
      const expirationDate = calculateExpirationDate(startDate, durationMonths)

      updateItem(itemId, {
        warranty: {
          is_enabled: true,
          start_date: startDate,
          duration_months: durationMonths,
          expiration_date: expirationDate.toISOString().split('T')[0],
        },
      })
    } else {
      // Disable warranty
      updateItem(itemId, {
        warranty: {
          ...currentWarranty,
          is_enabled: false,
        },
      })
    }
  }

  const handleUpdateWarranty = (itemId: string, currentWarranty: any, field: string, value: any) => {
    const updated = { ...currentWarranty, [field]: value }

    // Recalculate expiration if start date or duration changes
    if (field === 'start_date' || field === 'duration_months') {
      const startDate = field === 'start_date' ? value : updated.start_date
      const duration = field === 'duration_months' ? parseInt(value) : updated.duration_months

      if (startDate && duration > 0) {
        const expirationDate = calculateExpirationDate(startDate, duration)
        updated.expiration_date = expirationDate.toISOString().split('T')[0]
      }
    }

    updateItem(itemId, { warranty: updated })
  }

  const handleContinue = () => {
    setStep('review')
  }

  const handleBack = () => {
    setStep('installation')
  }

  const allItems = areas.flatMap((area) => area.items.map((item) => ({ ...item, area_name: area.name })))

  const itemsWithWarranty = allItems.filter((item) => item.warranty?.is_enabled)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Step 6: Warranty Configuration</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure warranty for each product ({itemsWithWarranty.length} of {allItems.length} covered)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {allItems.length === 0 ? (
          <Alert>No products added yet. Please add products first.</Alert>
        ) : (
          <div className="space-y-4">
            {allItems.map((item) => {
              const warranty = item.warranty
              const isEnabled = warranty?.is_enabled || false

              return (
                <div key={item.id} className="space-y-4 rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{item.product?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.area_name} • {item.quantity} {item.unit}
                      </p>
                      {item.product?.default_warranty_months > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Default: {item.product.default_warranty_months} months warranty
                        </p>
                      )}
                    </div>
                    <Button
                      variant={isEnabled ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleToggleWarranty(item.id, warranty)}
                    >
                      {isEnabled ? 'Warranty Enabled' : 'Enable Warranty'}
                    </Button>
                  </div>

                  {isEnabled && warranty && (
                    <div className="space-y-3 border-t border-border pt-3">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <div className="space-y-1.5">
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            value={warranty.start_date || ''}
                            onChange={(e) =>
                              handleUpdateWarranty(item.id, warranty, 'start_date', e.target.value)
                            }
                            className="h-10"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label>Duration (months)</Label>
                          <Input
                            type="number"
                            min="1"
                            value={warranty.duration_months || ''}
                            onChange={(e) =>
                              handleUpdateWarranty(item.id, warranty, 'duration_months', e.target.value)
                            }
                            className="h-10"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label>Expires On</Label>
                          <Input
                            type="date"
                            value={warranty.expiration_date || ''}
                            onChange={(e) =>
                              handleUpdateWarranty(item.id, warranty, 'expiration_date', e.target.value)
                            }
                            className="h-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label>Warranty Terms (Optional)</Label>
                        <Textarea
                          value={warranty.terms || ''}
                          onChange={(e) => handleUpdateWarranty(item.id, warranty, 'terms', e.target.value)}
                          placeholder="Specific warranty terms or conditions..."
                          rows={2}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="rounded-lg bg-secondary p-4">
          <h4 className="mb-2 font-medium text-foreground">Warranty Summary</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              Products with warranty: <strong className="text-foreground">{itemsWithWarranty.length}</strong> of{' '}
              {allItems.length}
            </p>
            <p>
              Products without warranty:{' '}
              <strong className="text-foreground">{allItems.length - itemsWithWarranty.length}</strong>
            </p>
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={handleBack} className="h-10">
            Back
          </Button>
          <Button onClick={handleContinue} size="lg" className="h-10">
            Continue to Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
