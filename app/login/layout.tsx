import { connection } from 'next/server'
import { SupabaseBrowserProvider } from '@/components/supabase/browser-provider'

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  await connection()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured for this deployment.')
  }

  return (
    <SupabaseBrowserProvider url={url} anonKey={anonKey}>
      {children}
    </SupabaseBrowserProvider>
  )
}
