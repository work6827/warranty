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

  return (
    <SupabaseBrowserProvider url={supabaseUrl} anonKey={supabaseAnonKey}>
      <div className="min-h-screen bg-background">
        <AdminNav userEmail={user.email} />
        <main>{children}</main>
      </div>
    </SupabaseBrowserProvider>
  )
}
