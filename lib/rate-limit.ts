import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import type { NextRequest } from 'next/server'

// Rate limiting is a two-state feature: if UPSTASH_REDIS_REST_URL and
// UPSTASH_REDIS_REST_TOKEN are set in env, we enforce the window against a
// shared Redis store (which actually survives across the serverless lambdas
// Vercel spins up). If not set, we no-op — the code is wired in but quiet
// until ops adds the env vars. That way shipping this doesn't require the
// Upstash account to exist first.
type LimitResult = { success: boolean; remaining?: number; reset?: number }
type Limiter = { limit: (id: string) => Promise<LimitResult> }

let cachedRedis: Redis | null = null

function getRedis(): Redis | null {
  if (cachedRedis) return cachedRedis
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  cachedRedis = new Redis({ url, token })
  return cachedRedis
}

function makeLimiter(
  tokens: number,
  window: Parameters<typeof Ratelimit.slidingWindow>[1],
  prefix: string
): Limiter {
  const redis = getRedis()
  if (!redis) {
    return { limit: async () => ({ success: true }) }
  }
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(tokens, window),
    prefix,
    analytics: false,
  })
  return {
    limit: async (id) => {
      const res = await rl.limit(id)
      return { success: res.success, remaining: res.remaining, reset: res.reset }
    },
  }
}

// Limits are tuned for a low-volume small business site. Generous enough not
// to block real users on flaky networks, tight enough that a scripted
// attacker gives up faster than they can cause cost.
export const leadLimiter = makeLimiter(5, '10 m', 'rl:lead')
export const newsletterLimiter = makeLimiter(3, '10 m', 'rl:newsletter')
export const unsubscribeLimiter = makeLimiter(10, '10 m', 'rl:unsub')
export const shopAccessLimiter = makeLimiter(10, '5 m', 'rl:shop')
export const reserveLimiter = makeLimiter(5, '10 m', 'rl:reserve')
export const stripeCheckoutLimiter = makeLimiter(10, '10 m', 'rl:stripe')

export function getClientIp(req: NextRequest): string {
  // Vercel always sets x-forwarded-for; we take the first hop (the real
  // client). Fallback to x-real-ip for non-Vercel local dev proxies.
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export function rateLimitResponse() {
  return Response.json(
    { error: 'Too many requests. Please wait a moment and try again.' },
    { status: 429 }
  )
}
