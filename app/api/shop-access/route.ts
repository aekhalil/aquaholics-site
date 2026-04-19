import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  SHOP_COOKIE,
  SHOP_COOKIE_MAX_AGE,
  getShopPassword,
  hashShopToken,
} from '@/lib/shop-gate'
import { shopAccessLimiter, getClientIp, rateLimitResponse } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const schema = z.object({
  password: z.string().min(1).max(200),
})

export async function POST(req: NextRequest) {
  try {
    const { success } = await shopAccessLimiter.limit(getClientIp(req))
    if (!success) return rateLimitResponse()

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Enter the password.' }, { status: 400 })
    }

    const expected = await getShopPassword()
    if (!expected) {
      return NextResponse.json(
        { error: 'Livestock access is not configured yet. Text (561) 388-7262.' },
        { status: 503 }
      )
    }

    if (parsed.data.password.trim() !== expected.trim()) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
    }

    const token = await hashShopToken(expected)
    const res = NextResponse.json({ success: true })
    res.cookies.set(SHOP_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SHOP_COOKIE_MAX_AGE,
    })
    return res
  } catch (err) {
    console.error('shop-access error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
