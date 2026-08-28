'use client'

import { useState } from 'react'
import { useProjectFormStore } from '@/lib/store/project-form-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AddProductDialog } from '@/components/product-form/add-product-dialog'
import { useLocale } from '@/lib/i18n/locale-context'

export function ProductsStep() {
  const { locale } = useLocale()
  const c = (en: string, id: string) => locale === 'id' ? id : en
  const { areas, removeItem, setStep } = useProjectFormStore()
  const [selectedAreaId, setSelectedAreaId] = useState<string>(areas[0]?.id || '')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const selectedArea = areas.some((area) => area.id === selectedAreaId)
    ? selectedAreaId
    : areas[0]?.id || ''

  const handleContinue = () => {
    const totalItems = areas.reduce((sum, area) => sum + area.items.length, 0)
    if (totalItems === 0) {
      alert(c('Please add at least one product', 'Tambahkan setidaknya satu produk'))
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
        <CardTitle className="text-base">{c('Step 4: Add Products', 'Langkah 4: Tambah Produk')}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {c('Add installed products to each area', 'Tambahkan produk terpasang ke setiap area')} ({totalItems} {c('total', 'total')})
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {areas.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            {c('No areas available. Please go back and add areas first.', 'Belum ada area. Kembali dan tambahkan area terlebih dahulu.')}
          </div>
        ) : (
          <Tabs value={selectedArea} onValueChange={setSelectedAreaId}>
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
                  <h3 className="font-medium text-foreground">{c('Products in', 'Produk di')} {area.name}</h3>
                  <Button onClick={() => setShowAddDialog(true)} className="h-9 gap-1">
                    + {c('Add Product', 'Tambah Produk')}
                  </Button>
                </div>

                {area.items.length === 0 ? (
                  <div className="rounded-lg border-2 border-dashed border-border py-12 text-center">
                    <p className="mb-4 text-muted-foreground">{c('No products added to this area yet', 'Belum ada produk di area ini')}</p>
                    <Button onClick={() => setShowAddDialog(true)}>{c('Add First Product', 'Tambah Produk Pertama')}</Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {area.items.map((item) => (
                      <div key={item.id} className="rounded-lg border border-border bg-card p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">
                              {item.product?.name || c('Product', 'Produk')}
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
                            {c('Remove', 'Hapus')}
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
            {c('Back', 'Kembali')}
          </Button>
          <Button onClick={handleContinue} size="lg" disabled={totalItems === 0} className="h-10">
            {c('Continue to Installation', 'Lanjut ke Pemasangan')}
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
