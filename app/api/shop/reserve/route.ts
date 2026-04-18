import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, FROM_EMAIL, BUSINESS_EMAIL } from '@/lib/resend'
import { client } from '@/lib/sanity/client'
import { formatPrice } from '@/lib/utils'
import {
  SHOP_COOKIE,
  getShopPassword,
  hashShopToken,
} from '@/lib/shop-gate'

export const runtime = 'nodejs'

const schema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(50),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().optional(),
  message: z.string().max(1000).optional(),
})

async function isGated(req: NextRequest): Promise<boolean> {
  const provided = req.cookies.get(SHOP_COOKIE)?.value
  if (!provided) return false
  const password = await getShopPassword()
  if (!password) return false
  const expected = await hashShopToken(password)
  return provided === expected
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isGated(req))) {
      return NextResponse.json({ error: 'Access password required.' }, { status: 401 })
    }

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please include your name and phone.' },
        { status: 400 }
      )
    }
    const { productId, quantity, name, phone, email, message } = parsed.data

    const product = await client
      .fetch<{ name: string; price: number; category: string } | null>(
        `*[_type == "product" && _id == $id][0]{ name, price, category }`,
        { id: productId }
      )
      .catch(() => null)

    if (!product) {
      return NextResponse.json({ error: 'That item is no longer available.' }, { status: 404 })
    }

    const subject = `🦐 Livestock hold — ${product.name} × ${quantity} (${name})`
    const escape = (s: string) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;')

    const sends = [
      resend.emails.send({
        from: FROM_EMAIL,
        to: [BUSINESS_EMAIL],
        ...(email ? { replyTo: email } : {}),
        subject,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:20px;">
            <h2 style="color:#0A1F3D;margin:0 0 16px;">New livestock hold request</h2>
            <p style="margin:0 0 12px;"><strong>${escape(name)}</strong> wants you to hold:</p>
            <div style="background:#f3f4f6;border-radius:8px;padding:14px 16px;margin:12px 0;">
              <div style="font-size:16px;color:#0A1F3D;font-weight:600;">${escape(product.name)}</div>
              <div style="color:#6b7280;font-size:13px;margin-top:4px;">${escape(product.category)} · ${quantity} × ${formatPrice(product.price)}</div>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:6px 10px;background:#f9fafb;"><strong>Phone</strong></td><td style="padding:6px 10px;"><a href="tel:${escape(phone)}">${escape(phone)}</a></td></tr>
              ${email ? `<tr><td style="padding:6px 10px;background:#f9fafb;"><strong>Email</strong></td><td style="padding:6px 10px;"><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>` : ''}
              ${message ? `<tr><td style="padding:6px 10px;background:#f9fafb;vertical-align:top;"><strong>Note</strong></td><td style="padding:6px 10px;">${escape(message)}</td></tr>` : ''}
            </table>
            <p style="color:#6b7280;font-size:13px;margin-top:16px;">Reply to this email${email ? '' : ' or call back'} to confirm pickup or a service-visit drop-off. No charge has been placed — follow up directly.</p>
          </div>
        `,
      }),
    ]

    if (email) {
      sends.push(
        resend.emails.send({
          from: FROM_EMAIL,
          to: [email],
          subject: `We got your hold request — ${product.name}`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:20px;">
              <h2 style="color:#0A1F3D;">Thanks, ${escape(name.split(' ')[0] ?? name)}.</h2>
              <p>Nick has been notified and will reach out to confirm pricing and arrange pickup or delivery on your next service visit.</p>
              <div style="background:#f3f4f6;border-radius:8px;padding:14px 16px;margin:12px 0;">
                <div style="font-size:16px;color:#0A1F3D;font-weight:600;">${escape(product.name)}</div>
                <div style="color:#6b7280;font-size:13px;margin-top:4px;">${quantity} × ${formatPrice(product.price)}</div>
              </div>
              <p style="color:#6b7280;font-size:13px;">If you don't hear back within a business day, call or text (561) 388-7262.</p>
            </div>
          `,
        })
      )
    }

    await Promise.allSettled(sends)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Reserve error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
