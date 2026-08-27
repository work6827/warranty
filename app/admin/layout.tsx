import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/admin-nav'
import { SupabaseBrowserProvider } from '@/components/supabase/browser-provider'

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

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured for this deployment.')
  }

  return (
    <SupabaseBrowserProvider url={url} anonKey={anonKey}>
      <div className="min-h-screen bg-background">
        <AdminNav userEmail={user.email} />
        <main>{children}</main>
      </div>
    </SupabaseBrowserProvider>
  )
}
