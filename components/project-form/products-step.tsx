'use client'

import { useState, useEffect } from 'react'
import { useProjectFormStore, ProjectFormItem } from '@/lib/store/project-form-store'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AddProductDialog } from '@/components/product-form/add-product-dialog'

export function ProductsStep() {
  const supabase = createClient()
  const { areas, removeItem, setStep } = useProjectFormStore()
  const [selectedArea, setSelectedArea] = useState<string>(areas[0]?.id || '')
  const [showAddDialog, setShowAddDialog] = useState(false)

  useEffect(() => {
    if (areas.length > 0 && !selectedArea) {
      setSelectedArea(areas[0].id)
    }
  }, [areas])

  const handleContinue = () => {
    const totalItems = areas.reduce((sum, area) => sum + area.items.length, 0)
    if (totalItems === 0) {
      alert('Please add at least one product')
      return
    }
    setStep('installation')
  }

  const handleBack = () => {
    setStep('areas')
  }

  const currentArea = areas.find((a) => a.id === selectedArea)
  const totalItems = areas.reduce((sum, area) => sum + area.items.length, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Step 4: Add Products</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add installed products to each area ({totalItems} total)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {areas.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No areas available. Please go back and add areas first.
          </div>
        ) : (
          <Tabs value={selectedArea} onValueChange={setSelectedArea}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {areas.map((area) => (
                <TabsTrigger key={area.id} value={area.id} className="relative">
                  {area.name}
                  {area.items.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {area.items.length}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {areas.map((area) => (
              <TabsContent key={area.id} value={area.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">Products in {area.name}</h3>
                  <Button onClick={() => setShowAddDialog(true)} className="h-9 gap-1">
                    + Add Product
                  </Button>
                </div>

                {area.items.length === 0 ? (
                  <div className="rounded-lg border-2 border-dashed border-border py-12 text-center">
                    <p className="mb-4 text-muted-foreground">No products added to this area yet</p>
                    <Button onClick={() => setShowAddDialog(true)}>Add First Product</Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {area.items.map((item) => (
                      <div key={item.id} className="rounded-lg border border-border bg-card p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">
                              {item.product?.name || 'Product'}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.product?.brand} {item.product?.series && `• ${item.product.series}`}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.quantity} {item.unit}
                            </p>
                            {item.product?.category && (
                              <Badge variant="outline" className="mt-2">
                                {item.product.category.name}
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={handleBack} className="h-10">
            Back
          </Button>
          <Button onClick={handleContinue} size="lg" disabled={totalItems === 0} className="h-10">
            Continue to Installation
          </Button>
        </div>

        {showAddDialog && currentArea && (
          <AddProductDialog
            areaId={currentArea.id}
            areaName={currentArea.name}
            onClose={() => setShowAddDialog(false)}
          />
        )}
      </CardContent>
    </Card>
  )
}
