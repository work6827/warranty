// These are Supabase publishable credentials and are intentionally safe to
// expose in a browser bundle. Deployment environment variables take priority.
export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://okxjhpadnymnghkqmnlq.supabase.co'

export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_IP_26FxD5v7rlRGb7xSoVA_sEeYqhHX'
