/**
 * Best-effort in-memory rate limiter for a single serverless instance.
 *
 * This does not coordinate across regions or cold starts — for a public,
 * unauthenticated endpoint like the passport lookup it's meant as a cheap
 * first line of defense against casual brute-forcing, not a hard guarantee.
 * If abuse becomes a real concern, move this to a shared store (Upstash
 * Redis, Supabase table with a timestamp column, etc).
 */
const attempts = new Map<string, number[]>()

export function checkRateLimit(key: string, limit = 8, windowMs = 5 * 60_000): boolean {
  const now = Date.now()
  const recent = (attempts.get(key) || []).filter((t) => now - t < windowMs)

  if (recent.length >= limit) {
    attempts.set(key, recent)
    return false
  }

  recent.push(now)
  attempts.set(key, recent)

  // Opportunistically keep the map from growing forever.
  if (attempts.size > 5000) {
    for (const [k, timestamps] of attempts) {
      if (timestamps.every((t) => now - t > windowMs)) attempts.delete(k)
    }
  }

  return true
}
