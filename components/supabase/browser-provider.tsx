'use client'

import { configureBrowserClient } from '@/lib/supabase/client'

export function SupabaseBrowserProvider({
  url,
  anonKey,
  children,
}: {
  url: string
  anonKey: string
  children: React.ReactNode
}) {
  configureBrowserClient(url, anonKey)
  return children
}
