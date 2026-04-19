import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SHOP_COOKIE, getShopPassword, hashShopToken } from './lib/shop-gate'

// Edge runtime lacks crypto.timingSafeEqual — manual constant-time compare.
// Both values are SHA-256 hex digests so they're always the same length in
// the happy path; the length check still runs before the loop to avoid a
// length-revealing early return once inside it.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

// Module-scope cache for the hashed expected token. In-memory per worker —
// Vercel keeps workers warm for minutes, so this turns most /shop/:slug
// navigations after auth into a ~0ms cookie compare instead of a Sanity
// round-trip every request. TTL matches the Sanity fetch revalidate (30s)
// so password rotations in Sanity still kick clients out within ~30s.
let cachedHash: { hash: string; expires: number } | null = null
const HASH_TTL_MS = 30_000

async function getExpectedHash(): Promise<string | null> {
  if (cachedHash && cachedHash.expires > Date.now()) return cachedHash.hash
  const password = await getShopPassword()
  if (!password) return null
  const hash = await hashShopToken(password)
  cachedHash = { hash, expires: Date.now() + HASH_TTL_MS }
  return hash
}

function redirectToGate(req: NextRequest, pathname: string, search: string) {
  const url = req.nextUrl.clone()
  url.pathname = '/shop-access'
  url.search = `?redirect=${encodeURIComponent(pathname + search)}`
  return NextResponse.redirect(url)
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (!pathname.startsWith('/shop')) {
    return NextResponse.next()
  }

  const provided = req.cookies.get(SHOP_COOKIE)?.value

  // Fast path: no cookie means we're definitely redirecting. Skip the Sanity
  // fetch entirely — saves ~300-800ms for every unauthenticated visitor.
  if (!provided) {
    return redirectToGate(req, pathname, search)
  }

  const expected = await getExpectedHash()
  if (expected && timingSafeEqual(provided, expected)) {
    return NextResponse.next()
  }

  return redirectToGate(req, pathname, search)
}

export const config = {
  matcher: ['/shop', '/shop/:path*'],
}
