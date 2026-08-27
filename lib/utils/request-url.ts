import { headers } from 'next/headers'

export async function getRequestOrigin() {
  const requestHeaders = await headers()
  const host = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host')

  if (!host) {
    throw new Error('Unable to determine the current site URL.')
  }

  const protocol = requestHeaders.get('x-forwarded-proto') || 'https'
  return `${protocol}://${host}`
}
