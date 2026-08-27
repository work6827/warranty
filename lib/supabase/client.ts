import { createBrowserClient } from '@supabase/ssr'

let runtimeUrl: string | undefined
let runtimeAnonKey: string | undefined

export function configureBrowserClient(url: string, anonKey: string) {
  runtimeUrl = url
  runtimeAnonKey = anonKey
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || runtimeUrl!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || runtimeAnonKey!
  )
}
