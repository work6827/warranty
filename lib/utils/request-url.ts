import { headers } from 'next/headers'

const PRODUCTION_ORIGIN = 'https://warranty-black.vercel.app'

export async function getRequestOrigin() {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL

  if (configuredOrigin) {
    const normalizedOrigin = configuredOrigin.startsWith('http')
      ? configuredOrigin
      : `https://${configuredOrigin}`
    return normalizedOrigin.replace(/\/$/, '')
  }

  const requestHeaders = await headers()
  const host = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host')

  if (!host) {
    return PRODUCTION_ORIGIN
  }

  // A QR scanned by a phone cannot resolve the development machine's localhost.
  // Projects created through the local admin still belong to the live Supabase
  // project, so their customer-facing link must use the public deployment.
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host)) {
    return PRODUCTION_ORIGIN
  }

  const protocol = requestHeaders.get('x-forwarded-proto') || 'https'
  return `${protocol}://${host}`
}
