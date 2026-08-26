import { type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

export function proxy(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  // Session refresh and authorization are only required for the admin area.
  // Keeping public routes out of Proxy also prevents a Supabase configuration
  // issue from taking down the customer-facing homepage.
  matcher: ['/admin/:path*'],
}
