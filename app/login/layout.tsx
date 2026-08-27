import { connection } from 'next/server'
import { SupabaseBrowserProvider } from '@/components/supabase/browser-provider'
import { supabaseAnonKey, supabaseUrl } from '@/lib/supabase/config'

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  await connection()

  return (
    <SupabaseBrowserProvider url={supabaseUrl} anonKey={supabaseAnonKey}>
      {children}
    </SupabaseBrowserProvider>
  )
}
