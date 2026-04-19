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

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (!pathname.startsWith('/shop')) {
    return NextResponse.next()
  }

  const password = await getShopPassword()
  const provided = req.cookies.get(SHOP_COOKIE)?.value

  if (password && provided) {
    const expected = await hashShopToken(password)
    if (timingSafeEqual(provided, expected)) {
      return NextResponse.next()
    }
  }

  const url = req.nextUrl.clone()
  url.pathname = '/shop-access'
  url.search = `?redirect=${encodeURIComponent(pathname + search)}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/shop', '/shop/:path*'],
}
