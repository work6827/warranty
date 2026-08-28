import { createClient } from '@/lib/supabase/server'
import { TechnicianManager } from '@/components/admin/technician-manager'

export default async function InstallersPage() {
  const supabase = await createClient()
  const { data: technicians, error } = await supabase
    .from('installers')
    .select('id, name, phone, role, is_active, created_at')
    .order('is_active', { ascending: false })
    .order('name')

  return (
    <TechnicianManager
      initialTechnicians={technicians || []}
      loadError={error ? 'Unable to load technicians. Please refresh and try again.' : undefined}
    />
  )
}
