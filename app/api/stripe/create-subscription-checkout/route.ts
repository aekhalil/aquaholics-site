import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe } from '@/lib/stripe'

const ALLOWED_TIER_NAMES = ['Essential', 'Professional', 'Premier'] as const

const schema = z.object({
  priceId: z.string().min(1, 'Price ID required'),
  tierName: z.enum(ALLOWED_TIER_NAMES).optional(),
})

// Only accept price IDs we ourselves configured via env. Without this, an
// attacker could POST any arbitrary Stripe price ID (from another merchant's
// public product, a zero-amount test price, etc.) and get a valid Checkout
// URL hosted under our Stripe account — useful for scams that redirect
// victims through our domain.
function getAllowedPriceIds(): Set<string> {
  return new Set(
    [
      process.env.STRIPE_PRICE_ESSENTIAL,
      process.env.STRIPE_PRICE_PROFESSIONAL,
      process.env.STRIPE_PRICE_PREMIER,
    ].filter((v): v is string => typeof v === 'string' && v.length > 0)
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceId, tierName } = schema.parse(body)

    const allowed = getAllowedPriceIds()
    if (allowed.size === 0) {
      console.error('Stripe checkout: no STRIPE_PRICE_* env vars configured')
      return NextResponse.json(
        { error: 'Checkout is not configured. Please contact us.' },
        { status: 503 }
      )
    }
    if (!allowed.has(priceId)) {
      return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 })
    }

    // Use NEXT_PUBLIC_SITE_URL when configured. In dev we fall back to the
    // request's own origin so Stripe redirects come back to whichever port
    // Next is actually running on. Prod must have NEXT_PUBLIC_SITE_URL set —
    // a localhost redirect after a real payment would be a disaster.
    const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (!envSiteUrl && process.env.NODE_ENV === 'production') {
      console.error('Stripe checkout: NEXT_PUBLIC_SITE_URL missing in production')
      return NextResponse.json(
        { error: 'Checkout is not configured. Please contact us.' },
        { status: 500 }
      )
    }
    const siteUrl = envSiteUrl ?? req.nextUrl.origin

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/services/maintenance/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/services/maintenance`,
      metadata: {
        tierName: tierName ?? '',
        source: 'maintenance_pricing_page',
      },
      // Collect billing address for tax purposes
      billing_address_collection: 'required',
      // Allow promo codes
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { tierName: tierName ?? '' },
        // 7-day trial for all new subscribers
        trial_period_days: 7,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
