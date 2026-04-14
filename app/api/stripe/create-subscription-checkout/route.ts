import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe } from '@/lib/stripe'

const schema = z.object({
  priceId: z.string().min(1, 'Price ID required'),
  tierName: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceId, tierName } = schema.parse(body)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

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
