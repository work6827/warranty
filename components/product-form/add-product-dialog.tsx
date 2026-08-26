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

  // Load categories
  useEffect(() => {
    loadCategories()
  }, [])

  // Load products when category changes
  useEffect(() => {
    if (selectedCategory) {
      loadProducts(selectedCategory)
    }
  }, [selectedCategory, searchQuery])

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    setCategories(data || [])
  }

  const loadProducts = async (categoryId: string) => {
    let query = supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('brand')

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%`)
    }

    const { data } = await query
    setProducts(data || [])
  }

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleAddProduct = async () => {
    if (!selectedProduct) {
      alert('Please select a product')
      return
    }

    if (!quantity || parseFloat(quantity) <= 0) {
      alert('Please enter a valid quantity')
      return
    }

    const finalUnit = unit === 'custom' ? customUnit : unit

    if (!finalUnit) {
      alert('Please select or enter a unit')
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
          <DialogTitle>Add Product to {areaName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Product Category</Label>
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
                <Label>Search Products</Label>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by brand or product name..."
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label>Select Product</Label>
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {products.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      No products found. Create products first in the Products page.
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
                    Quantity <span className="text-destructive">*</span>
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
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="unit">
                    Unit <span className="text-destructive">*</span>
                  </Label>
                  <Select value={unit} onValueChange={(value) => setUnit(value ?? '')}>
                    <SelectTrigger id="unit" className="h-10 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Custom...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {unit === 'custom' && (
                <div className="space-y-1.5">
                  <Label htmlFor="custom-unit">Custom Unit</Label>
                  <Input
                    id="custom-unit"
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    placeholder="Enter custom unit"
                    className="h-10"
                  />
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="h-10">
              Cancel
            </Button>
            <Button onClick={handleAddProduct} disabled={!selectedProduct} className="h-10">
              Add Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
