import Link from 'next/link'
import { Plus, PackageSearch } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

async function getProducts(categorySlug?: string, search?: string) {
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(name, slug)
    `)
    .order('brand')

  if (categorySlug && categorySlug !== 'all') {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()

    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,brand.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

async function getCategories() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  return data || []
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const params = await searchParams
  const categories = await getCategories()
  const products = await getProducts(params.category, params.search)
  const activeCategory = params.category || 'all'

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Product Catalog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage Halla Home products across all categories
          </p>
        </div>
        <Link href="/admin/products/new" className={buttonVariants({ size: 'lg', className: 'h-10 gap-1.5' })}>
          <Plus className="size-4" />
          Add Product
        </Link>
      </div>

      <div className="mb-6">
        <form action="/admin/products" method="get">
          <Input
            name="search"
            placeholder="Search products by name or brand…"
            defaultValue={params.search}
            className="h-10 max-w-md"
          />
          <input type="hidden" name="category" value={activeCategory} />
        </form>
      </div>

      <div className="space-y-6">
        <div className="inline-flex flex-wrap gap-1 rounded-lg bg-secondary p-1">
          <Link
            href="/admin/products?category=all"
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              activeCategory === 'all'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            All Products
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/admin/products?category=${category.slug}`}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                activeCategory === category.slug
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <PackageSearch className="size-8 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                {params.search ? 'No products found' : 'No products yet'}
              </p>
              <Link href="/admin/products/new" className={buttonVariants()}>
                Add Your First Product
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => (
              <Card key={product.id}>
                <CardContent className="space-y-3">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {product.category?.name}
                    </Badge>
                    <h3 className="font-medium text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.brand}
                      {product.series && ` • ${product.series}`}
                    </p>
                  </div>
                  {product.sku && (
                    <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                  )}
                  {product.default_warranty_months > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Default warranty: {product.default_warranty_months} months
                    </p>
                  )}
                  <div>
                    <Badge variant={product.is_active ? 'default' : 'secondary'}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
