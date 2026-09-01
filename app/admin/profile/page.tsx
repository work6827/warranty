import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProfileSettingsForm } from '@/components/admin/profile-settings-form'
import { getServerLocale } from '@/lib/i18n/server'

export default async function AdminProfilePage() {
  const supabase = await createClient()
  const [{ data: { user } }, locale] = await Promise.all([supabase.auth.getUser(), getServerLocale()])
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('admin_users')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/admin')
  const c = (en: string, id: string) => locale === 'id' ? id : en

  return (
    <div className="mx-auto max-w-5xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="mb-7">
        <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-signal uppercase">{c('Account', 'Akun')}</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{c('Profile settings', 'Pengaturan profil')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{c('Manage your admin identity and account password.', 'Kelola identitas admin dan password akun Anda.')}</p>
      </div>
      <ProfileSettingsForm userId={user.id} email={user.email || ''} initialName={profile.full_name} role={profile.role} />
    </div>
  )
}
