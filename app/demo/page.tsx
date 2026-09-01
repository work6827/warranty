import type { Metadata } from 'next'
import { PassportContact } from '@/components/passport/passport-contact'
import { PassportFooter } from '@/components/passport/passport-footer'
import { PassportHeader } from '@/components/passport/passport-header'
import { PassportMaintenance } from '@/components/passport/passport-maintenance'
import { PassportOverview } from '@/components/passport/passport-overview'
import { PassportPhotos } from '@/components/passport/passport-photos'
import { PassportProducts } from '@/components/passport/passport-products'
import { PassportQR } from '@/components/passport/passport-qr'
import { PassportWarranty } from '@/components/passport/passport-warranty'
import { getRequestOrigin } from '@/lib/utils/request-url'

export const metadata: Metadata = {
  title: 'PIK Residence — Demo Passport',
  description: 'Preview the current Halla+ Digital Passport experience.',
}

const project = {
  name: 'PIK Residence',
  project_id: 'H-260824-001',
  project_type: 'residential',
  address: 'Pantai Indah Kapuk, North Jakarta',
  installation_date: '2026-08-24',
  published_at: '2026-08-24T09:00:00+07:00',
  customer: { name: 'Budi Santoso', phone: '628123456789' },
}

const windowFilm = {
  id: 'demo-window-film', quantity: 18, unit: 'm²', installation_date: '2026-08-24',
  installer: { name: 'Andi Pratama' },
  product: {
    name: 'Crystalline 70', brand: '3M', series: 'Crystalline', category: { name: 'Window Film' },
    specifications: { film_type: 'Nano multilayer', vlt: '69%', uv_rejection: '99.9%', tser: '50%' },
    maintenance_instructions: 'Wait 30 days before cleaning the film.\nUse a soft microfiber cloth with mild soapy water.\nAvoid abrasive cleaners, blades, and ammonia-based products.',
  },
  warranty: {
    is_enabled: true, status: 'active', start_date: '2026-08-24', duration_months: 60,
    expiration_date: '2031-08-24',
    terms: 'Covers bubbling, peeling, cracking, and adhesive failure under normal residential use.',
  },
}

const flooring = {
  id: 'demo-flooring', quantity: 42, unit: 'm²', installation_date: '2026-08-25',
  installer: { name: 'Rizky Maulana' },
  product: {
    name: 'Oak Natural SPC', brand: 'Halla+', series: 'Signature Floors', category: { name: 'Flooring' },
    specifications: {
      material: 'Stone plastic composite', thickness: '5 mm', wear_layer: '0.5 mm',
      plank_length: '1220 mm', plank_width: '180 mm',
    },
    maintenance_instructions: 'Vacuum or sweep regularly using a soft attachment.\nClean spills promptly with a damp cloth.\nUse felt pads below furniture and avoid dragging heavy objects.',
  },
  warranty: {
    is_enabled: true, status: 'active', start_date: '2026-08-25', duration_months: 120,
    expiration_date: '2036-08-25',
    terms: 'Residential structural and surface warranty subject to the Halla+ care guidelines.',
  },
}

const areas = [
  { id: 'demo-living-room', name: 'Living Room', items: [windowFilm, flooring] },
  { id: 'demo-master-bedroom', name: 'Master Bedroom', items: [{ ...flooring, id: 'demo-bedroom-flooring', quantity: 24 }] },
]

const photos = [
  { id: 'demo-photo-after', file_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85', photo_type: 'after' as const, caption: 'Completed living room installation' },
  { id: 'demo-photo-during', file_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=85', photo_type: 'during' as const, caption: 'Final cleaning and inspection' },
  { id: 'demo-photo-bedroom', file_url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=85', photo_type: 'after' as const, caption: 'Master bedroom flooring' },
  { id: 'demo-photo-before', file_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=85', photo_type: 'before' as const, caption: 'Room condition before installation' },
]

export default async function DemoPassportPage() {
  const allItems = areas.flatMap((area) => area.items)
  const itemsWithWarranty = allItems.filter((item) => item.warranty.is_enabled)
  const passportUrl = `${await getRequestOrigin()}/demo`

  return (
    <div className="passport-fast min-h-screen bg-background">
      <PassportHeader project={project} />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <PassportOverview project={project} areas={areas} photoCount={photos.length} />
        <PassportPhotos photos={photos} />
        <PassportProducts areas={areas} />
        <PassportWarranty items={itemsWithWarranty} />
        <PassportQR projectId={project.project_id} passportUrl={passportUrl} />
        <PassportMaintenance items={allItems} />
        <PassportContact projectId={project.project_id} customerName={project.customer.name} />
      </main>
      <PassportFooter projectId={project.project_id} publishedAt={project.published_at} />
    </div>
  )
}
