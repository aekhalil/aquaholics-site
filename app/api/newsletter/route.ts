import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { getShopPassword } from '@/lib/shop-gate'
import { generateUnsubscribeToken, unsubscribeUrl } from '@/lib/newsletter'
import { escapeHtml } from '@/lib/html-escape'
import { newsletterLimiter, getClientIp, rateLimitResponse } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  try {
    const { success } = await newsletterLimiter.limit(getClientIp(req))
    if (!success) return rateLimitResponse()

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 })
    }
    const { email } = parsed.data

    const password = await getShopPassword()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aquaholicspb.com'
    const unsubToken = await generateUnsubscribeToken(email)
    const unsubLink = unsubscribeUrl(siteUrl, email, unsubToken)

    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      await resend.contacts
        .create({ email, audienceId, unsubscribed: false })
        .catch(() => {
          // ignore duplicate-contact errors — still send the welcome email
        })
    }

    const passwordBlock = password
      ? `
        <p style="margin:0 0 12px;">Your access password for available livestock:</p>
        <div style="background:#0A1F3D;color:#fff;border-radius:10px;padding:18px;text-align:center;margin:12px 0 20px;">
          <div style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#00B4D8;margin-bottom:6px;">Password</div>
          <div style="font-family:monospace;font-size:22px;font-weight:700;letter-spacing:0.05em;">${escapeHtml(password)}</div>
        </div>
        <div style="text-align:center;margin:20px 0 28px;">
          <a href="${siteUrl}/shop-access" style="background:#00B4D8;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
            Browse Available Livestock →
          </a>
        </div>`
      : `
        <p style="margin:0 0 12px;">We'll text you the access code the next time new livestock comes in. Feel free to call <a href="tel:+15613887262">(561) 388-7262</a> if you want it sooner.</p>`

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: '🪸 Your livestock access — Aquaholic',
      headers: {
        'List-Unsubscribe': `<${unsubLink}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:20px;background:#f9fafb;">
          <div style="background:linear-gradient(135deg,#0A1F3D,#0F3460);padding:28px;text-align:center;border-radius:12px 12px 0 0;">
            <h1 style="color:#fff;margin:0;font-size:22px;">You're on the livestock list 🐠</h1>
          </div>
          <div style="padding:28px;background:#fff;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none;">
            <p style="margin:0 0 14px;">Thanks for joining. Aquaholic isn't a retail store — Nick keeps a small rotating holding system for service clients and a short list of folks who want first look when new corals, fish, and inverts come in.</p>
            ${passwordBlock}
            <p style="color:#6b7280;font-size:13px;margin:16px 0 6px;">What to expect next:</p>
            <ul style="color:#4b5563;font-size:13px;line-height:1.6;margin:0 0 14px;padding-left:20px;">
              <li>An occasional note from Nick when new livestock arrives</li>
              <li>No spam — you can unsubscribe any time</li>
              <li>Pickup or drop-off on your next service visit — no shipping</li>
            </ul>
            <p style="color:#6b7280;font-size:12px;margin-top:20px;">
              Questions? Call or text <a href="tel:+15613887262" style="color:#00B4D8;">(561) 388-7262</a>.
            </p>
          </div>
          <p style="text-align:center;color:#9ca3af;font-size:11px;margin-top:12px;">
            Aquaholic Aquarium Services LLC · Riviera Beach, FL<br/>
            Don't want these? <a href="${unsubLink}" style="color:#9ca3af;text-decoration:underline;">Unsubscribe</a>.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, passwordSent: Boolean(password) })
  } catch (err) {
    console.error('Newsletter API error:', err)
    return NextResponse.json(
      { error: 'Could not subscribe you right now. Please try again or text (561) 388-7262.' },
      { status: 500 }
    )
  }
}
