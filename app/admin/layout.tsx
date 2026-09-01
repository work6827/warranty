import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/admin-nav'
import { SupabaseBrowserProvider } from '@/components/supabase/browser-provider'
import { supabaseAnonKey, supabaseUrl } from '@/lib/supabase/config'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: isAdmin, error: adminCheckError } = await supabase.rpc('is_admin_user')

  if (adminCheckError || !isAdmin) {
    await supabase.auth.signOut()
    redirect('/login?error=unauthorized')
  }

  return (
    <SupabaseBrowserProvider url={supabaseUrl} anonKey={supabaseAnonKey}>
      <div className="admin-shell min-h-screen bg-background pb-16 sm:pb-0">
        <AdminNav userEmail={user.email} />
        <main>{children}</main>
      </div>
    </SupabaseBrowserProvider>
  )
}
