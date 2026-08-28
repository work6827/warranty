'use client'

import { useState, useEffect } from 'react'
import { useProjectFormStore } from '@/lib/store/project-form-store'
import { createClient } from '@/lib/supabase/client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n/locale-context'

interface Category {
  id: string
  name: string
  slug: string
}

interface Product {
  id: string
  name: string
  brand: string
  series: string | null
  category_id: string
  specifications: Record<string, any>
  maintenance_instructions: string | null
}

const units = ['m²', 'pcs', 'box', 'roll', 'meter', 'panel', 'sheet']

export function AddProductDialog({
  areaId,
  areaName,
  onClose,
}: {
  areaId: string
  areaName: string
  onClose: () => void
}) {
  const { locale } = useLocale()
  const c = (en: string, id: string) => locale === 'id' ? id : en
  const supabase = createClient()
  const { addItem } = useProjectFormStore()

  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Form state
  const [quantity, setQuantity] = useState<string>('1')
  const [unit, setUnit] = useState<string>('m²')
  const [customUnit, setCustomUnit] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    let active = true
    void supabase.from('categories').select('*').eq('is_active', true).order('sort_order')
      .then(({ data }) => { if (active) setCategories(data || []) })
    return () => { active = false }
  }, [supabase])

  useEffect(() => {
    if (!selectedCategory) return
    let active = true
    let query = supabase.from('products').select('*').eq('category_id', selectedCategory)
      .eq('is_active', true).order('brand')
    if (searchQuery) query = query.or(`name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%`)
    void query.then(({ data }) => { if (active) setProducts(data || []) })
    return () => { active = false }
  }, [selectedCategory, searchQuery, supabase])

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    const category = categories.find((item) => item.id === product.category_id)
    if (category?.slug === 'flooring') {
      setUnit('m²')
    }
  }

  const handleAddProduct = async () => {
    if (!selectedProduct) {
      alert(c('Please select a product', 'Pilih produk terlebih dahulu'))
      return
    }

    if (!quantity || parseFloat(quantity) <= 0) {
      alert(c('Please enter a valid quantity', 'Masukkan jumlah yang valid'))
      return
    }

    const finalUnit = unit === 'custom' ? customUnit : unit

    if (!finalUnit) {
      alert(c('Please select or enter a unit', 'Pilih atau masukkan satuan'))
      return
    }

    // Get full category info
    const category = categories.find((c) => c.id === selectedProduct.category_id)

    addItem(areaId, {
      area_id: areaId,
      product_id: selectedProduct.id,
      product: {
        ...selectedProduct,
        category,
      },
      quantity: parseFloat(quantity),
      unit: finalUnit,
    })

    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{c('Add Product to', 'Tambah Produk ke')} {areaName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label>{c('Product Category', 'Kategori Produk')}</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'rounded-lg border p-3 text-sm transition-colors',
                    selectedCategory === category.id
                      ? 'border-primary bg-secondary'
                      : 'border-border hover:border-foreground/20'
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Selection */}
          {selectedCategory && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>{c('Search Products', 'Cari Produk')}</Label>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={c('Search by brand or product name...', 'Cari berdasarkan merek atau nama produk...')}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label>{c('Select Product', 'Pilih Produk')}</Label>
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {products.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      {c('No products found. Create products first on the Products page.', 'Produk tidak ditemukan. Buat produk terlebih dahulu di halaman Produk.')}
                    </div>
                  ) : (
                    products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className={cn(
                          'w-full rounded-lg border p-3 text-left transition-colors',
                          selectedProduct?.id === product.id
                            ? 'border-primary bg-secondary'
                            : 'border-border hover:border-foreground/20'
                        )}
                      >
                        <div className="font-medium text-foreground">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.brand}
                          {product.series && ` • ${product.series}`}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quantity and Unit */}
          {selectedProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="quantity">
                    {categories.find((category) => category.id === selectedProduct.category_id)?.slug === 'flooring'
                      ? c('Total Installation Area', 'Total Luas Pemasangan')
                      : c('Quantity', 'Jumlah')}{' '}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.01"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="h-10"
                  />
                  {categories.find((category) => category.id === selectedProduct.category_id)?.slug === 'flooring' && (
                    <p className="text-xs text-muted-foreground">{c('Total flooring area installed in this room.', 'Total luas lantai yang dipasang di ruangan ini.')}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="unit">
                    {c('Unit', 'Satuan')} <span className="text-destructive">*</span>
                  </Label>
                  <Select value={unit} onValueChange={(value) => setUnit(value ?? '')}>
                    <SelectTrigger id="unit" className="h-10 w-full">
                      <SelectValue>{(value: string) => (value === 'custom' ? c('Custom...', 'Lainnya...') : value)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">{c('Custom...', 'Lainnya...')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {unit === 'custom' && (
                <div className="space-y-1.5">
                  <Label htmlFor="custom-unit">{c('Custom Unit', 'Satuan Lainnya')}</Label>
                  <Input
                    id="custom-unit"
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    placeholder={c('Enter custom unit', 'Masukkan satuan')}
                    className="h-10"
                  />
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="h-10">
              {c('Cancel', 'Batal')}
            </Button>
            <Button onClick={handleAddProduct} disabled={!selectedProduct} className="h-10">
              {c('Add Product', 'Tambah Produk')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
