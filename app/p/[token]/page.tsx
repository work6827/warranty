import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PassportHeader } from '@/components/passport/passport-header'
import { PassportProducts } from '@/components/passport/passport-products'
import { PassportWarranty } from '@/components/passport/passport-warranty'
import { PassportMaintenance } from '@/components/passport/passport-maintenance'
import { PassportPhotos } from '@/components/passport/passport-photos'
import { PassportContact } from '@/components/passport/passport-contact'

async function getPassportData(token: string) {
  const supabase = await createClient()

  // Get project by public token
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select(`
      *,
      customer:customers(name, phone)
    `)
    .eq('public_token', token)
    .eq('status', 'published')
    .single()

  if (projectError || !project) {
    return null
  }

  // Get areas with items
  const { data: areas } = await supabase
    .from('project_areas')
    .select(`
      *,
      items:project_items(
        *,
        product:products(
          *,
          category:categories(name)
        ),
        warranty:warranties(*),
        installer:installers(name)
      )
    `)
    .eq('project_id', project.id)
    .order('sort_order')

  // Get customer-visible photos
  const { data: photos } = await supabase
    .from('project_photos')
    .select('*')
    .eq('project_id', project.id)
    .eq('is_customer_visible', true)
    .order('created_at')

  return {
    project,
    areas: areas || [],
    photos: photos || [],
  }
}

export default async function PassportPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const data = await getPassportData(token)

  if (!data) {
    notFound()
  }

  const { project, areas, photos } = data

  // Calculate warranty summary
  const allItems = areas.flatMap((area: any) => area.items)
  const itemsWithWarranty = allItems.filter((item: any) => item.warranty?.is_enabled)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PassportHeader project={project} />

      {/* Main Content */}
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        {/* Products by Area */}
        <PassportProducts areas={areas} />

        {/* Warranty Overview */}
        {itemsWithWarranty.length > 0 && (
          <PassportWarranty items={itemsWithWarranty} />
        )}

        {/* Maintenance Instructions */}
        <PassportMaintenance items={allItems} />

        {/* Installation Photos */}
        {photos.length > 0 && <PassportPhotos photos={photos} />}

        {/* Contact Section */}
        <PassportContact
          projectId={project.project_id}
          customerName={project.customer.name}
        />
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p className="font-medium text-foreground">Project H Passport by Halla Home</p>
          <p className="mt-1">
            {project.project_id} • Published{' '}
            {new Date(project.published_at).toLocaleDateString('id-ID')}
          </p>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const data = await getPassportData(token)

  if (!data) {
    return {
      title: 'Project H Passport',
    }
  }

  return {
    title: `${data.project.name} - Project H Passport`,
    description: `Project H Passport for ${data.project.customer.name} - ${data.project.name}`,
  }
}
