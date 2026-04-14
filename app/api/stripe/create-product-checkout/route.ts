import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe } from '@/lib/stripe'

const lineItemSchema = z.object({
  name: z.string(),
  price: z.number().positive(), // cents
  quantity: z.number().int().positive(),
  image: z.string().optional(),
  stripePriceId: z.string().optional(),
})

const schema = z.object({
  items: z.array(lineItemSchema).min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items } = schema.parse(body)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

    // Build Stripe line items — prefer Stripe Price IDs for items that have them
    const lineItems = items.map((item) => {
      if (item.stripePriceId) {
        return { price: item.stripePriceId, quantity: item.quantity }
      }
      // Otherwise use ad-hoc price_data
      return {
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: item.price,
          product_data: {
            name: item.name,
            ...(item.image ? { images: [item.image] } : {}),
          },
        },
      }
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${siteUrl}/shop/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop/cart`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Local pickup / included',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 3 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 2499, currency: 'usd' },
            display_name: 'Overnight Express Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 1 },
            },
          },
        },
      ],
      allow_promotion_codes: true,
      metadata: { source: 'shop_checkout' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid cart data' }, { status: 400 })
    }
    console.error('Product checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
