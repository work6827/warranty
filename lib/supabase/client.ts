import { createBrowserClient } from '@supabase/ssr'
import { supabaseAnonKey, supabaseUrl } from './config'

let runtimeUrl: string | undefined
let runtimeAnonKey: string | undefined

export function configureBrowserClient(url: string, anonKey: string) {
  runtimeUrl = url
  runtimeAnonKey = anonKey
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || runtimeUrl || supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || runtimeAnonKey || supabaseAnonKey
  )
}
