import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PassportHeader } from '@/components/passport/passport-header'
import { PassportProducts } from '@/components/passport/passport-products'
import { PassportWarranty } from '@/components/passport/passport-warranty'
import { PassportMaintenance } from '@/components/passport/passport-maintenance'
import { PassportPhotos } from '@/components/passport/passport-photos'
import { PassportContact } from '@/components/passport/passport-contact'
import { PassportFooter } from '@/components/passport/passport-footer'
import { PassportOverview } from '@/components/passport/passport-overview'
import { getRequestOrigin } from '@/lib/utils/request-url'
import { PassportQR } from '@/components/passport/passport-qr'

async function getPassportData(token: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('get_public_passport', { p_token: token })
  if (error || !data) return null
  return data as { project: any; areas: any[]; photos: any[] }
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
  const passportUrl = `${await getRequestOrigin()}/p/${token}`

  // Calculate warranty summary
  const allItems = areas.flatMap((area: any) => area.items)
  const itemsWithWarranty = allItems.filter((item: any) => item.warranty?.is_enabled)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PassportHeader project={project} />

      {/* Main Content */}
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <PassportOverview project={project} areas={areas} photoCount={photos.length} />
        <PassportPhotos photos={photos} />

        {/* Products by Area */}
        <PassportProducts areas={areas} />

        {/* Warranty Overview */}
        {itemsWithWarranty.length > 0 && (
          <PassportWarranty items={itemsWithWarranty} />
        )}

        <PassportQR projectId={project.project_id} passportUrl={passportUrl} />

        {/* Maintenance Instructions */}
        <PassportMaintenance items={allItems} />

        {/* Contact Section */}
        <PassportContact
          projectId={project.project_id}
          customerName={project.customer.name}
        />
      </div>

      {/* Footer */}
      <PassportFooter projectId={project.project_id} publishedAt={project.published_at} />
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const data = await getPassportData(token)

  if (!data) {
    return {
      title: 'Halla+ Digital Passport',
    }
  }

  return {
    title: `${data.project.name} - Halla+ Digital Passport`,
    description: `Halla+ Digital Passport for ${data.project.customer.name} - ${data.project.name}`,
  }
}
