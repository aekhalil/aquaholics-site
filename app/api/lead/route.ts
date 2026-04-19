import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, FROM_EMAIL, BUSINESS_EMAIL } from '@/lib/resend'
import { escapeHtml, escapeAttr } from '@/lib/html-escape'
import { leadLimiter, getClientIp, rateLimitResponse } from '@/lib/rate-limit'

// ── Input validation ─────────────────────────────────────────────────────────
// lastName/phone/city are optional so the lightweight ContactForm (which only
// collects name + email + subject + message) can share this endpoint with the
// multi-step QuoteForm. Subject is contact-form-only.
const leadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().optional(),
  subject: z.string().optional(),
  tankSize: z.string().optional(),
  waterType: z.string().optional(),
  serviceType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
  hearAbout: z.string().optional(),
  source: z.string().optional(),
})

type LeadData = z.infer<typeof leadSchema>

// ── HTML email templates ─────────────────────────────────────────────────────
function buildNotificationEmail(data: LeadData): string {
  // Every user-supplied field must be HTML-escaped — values land in an email
  // the business owner opens, so injected anchors / inline content would forge
  // credible phishing UI inside what looks like our own template.
  const e = escapeHtml
  const nameHtml = `${e(data.firstName)}${data.lastName ? ` ${e(data.lastName)}` : ''}`
  return `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb;">
    <div style="background: #0A1F3D; padding: 24px; border-radius: 12px 12px 0 0;">
      <h1 style="color: #00B4D8; margin: 0; font-size: 22px;">🐠 New Lead: Aquaholic Quote Form</h1>
      <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0 0; font-size: 14px;">
        Received ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
      </p>
    </div>
    <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="background: #f3f4f6;">
          <td style="padding: 10px 12px; font-weight: 600; color: #374151; width: 40%;">Name</td>
          <td style="padding: 10px 12px; color: #111827;">${nameHtml}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Email</td>
          <td style="padding: 10px 12px;"><a href="mailto:${escapeAttr(data.email)}" style="color: #00B4D8;">${e(data.email)}</a></td>
        </tr>
        <tr style="background: #f3f4f6;">
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Phone</td>
          <td style="padding: 10px 12px;">${data.phone ? `<a href="tel:${escapeAttr(data.phone)}" style="color: #00B4D8;">${e(data.phone)}</a>` : '—'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">City</td>
          <td style="padding: 10px 12px;">${e(data.city) || '—'}</td>
        </tr>
        ${data.subject ? `
        <tr style="background: #f3f4f6;">
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Subject</td>
          <td style="padding: 10px 12px;">${e(data.subject)}</td>
        </tr>` : ''}
        <tr style="background: #f3f4f6;">
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Tank Size</td>
          <td style="padding: 10px 12px;">${e(data.tankSize) || '—'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Water Type</td>
          <td style="padding: 10px 12px;">${e(data.waterType) || '—'}</td>
        </tr>
        <tr style="background: #f3f4f6;">
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Service Type</td>
          <td style="padding: 10px 12px;">${e(data.serviceType) || '—'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Budget</td>
          <td style="padding: 10px 12px;">${e(data.budget) || '—'}</td>
        </tr>
        <tr style="background: #f3f4f6;">
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Timeline</td>
          <td style="padding: 10px 12px;">${e(data.timeline) || '—'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Source</td>
          <td style="padding: 10px 12px;">${e(data.source) || 'website'}</td>
        </tr>
        <tr style="background: #f3f4f6;">
          <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Heard About Us</td>
          <td style="padding: 10px 12px;">${e(data.hearAbout) || '—'}</td>
        </tr>
        ${data.message ? `
        <tr>
          <td style="padding: 10px 12px; font-weight: 600; color: #374151; vertical-align: top;">Message</td>
          <td style="padding: 10px 12px; white-space: pre-wrap;">${e(data.message)}</td>
        </tr>` : ''}
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #ecfdf5; border-radius: 8px; border: 1px solid #a7f3d0;">
        <p style="margin: 0; color: #065f46; font-size: 13px; font-weight: 600;">⚡ Action Required: Respond within 24 hours to maximize close rate.</p>
      </div>
    </div>
  </div>`
}

function buildConfirmationEmail(data: LeadData): string {
  return `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb;">
    <div style="background: linear-gradient(135deg, #0A1F3D 0%, #0F3460 100%); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 16px;">🐠</div>
      <h1 style="color: white; margin: 0; font-size: 28px;">We've Got Your Request!</h1>
      <p style="color: rgba(255,255,255,0.7); margin: 12px 0 0 0; font-size: 16px;">
        Thanks, ${escapeHtml(data.firstName)}. We'll be in touch within 24 hours.
      </p>
    </div>
    <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
      <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
        Our team is reviewing your request for <strong>${escapeHtml(data.serviceType) || 'aquarium services'}</strong>
        and will prepare a personalised proposal for you.
      </p>

      <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 24px 0; border-left: 4px solid #00B4D8;">
        <h3 style="margin: 0 0 12px 0; color: #0A1F3D; font-size: 16px;">What Happens Next?</h3>
        <ol style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
          <li>We review your request and prepare a custom proposal</li>
          <li>You receive a detailed quote via email within 24 hours</li>
          <li>We schedule a free consultation at your convenience</li>
        </ol>
      </div>

      <p style="color: #4b5563; font-size: 14px;">
        Need immediate help? Call us anytime at
        <a href="tel:+15613887262" style="color: #00B4D8; font-weight: 600;">(561) 388-7262</a> —
        our 24/7 emergency line is always staffed.
      </p>

      <div style="text-align: center; margin-top: 32px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account/signup" style="display: inline-block; background: #D4AF37; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
          Request Livestock Access →
        </a>
      </div>
    </div>
    <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
      Aquaholic Aquarium Services LLC · 3140 Laurel Ridge Circle, Riviera Beach, FL 33410
    </p>
  </div>`
}

export async function POST(req: NextRequest) {
  try {
    const { success } = await leadLimiter.limit(getClientIp(req))
    if (!success) return rateLimitResponse()

    // Parse and validate
    const body = await req.json()
    const result = leadSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.issues },
        { status: 400 }
      )
    }

    const data = result.data

    // Send emails in parallel. The business notification MUST succeed — if it
    // fails we lose the lead, so we surface a 500 and let the client retry.
    // The customer confirmation is best-effort.
    const notifySubject =
      data.subject ??
      `🐠 New Quote Request — ${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}${data.city ? ` (${data.city})` : ''}`
    const [notifyResult, confirmResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: [BUSINESS_EMAIL],
        replyTo: data.email,
        subject: notifySubject,
        html: buildNotificationEmail(data),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: [data.email],
        subject: 'Got your request — Aquaholic Aquarium Services',
        html: buildConfirmationEmail(data),
      }),
    ])
    if (notifyResult.status === 'rejected') {
      console.error('Lead notification email failed:', notifyResult.reason)
      return NextResponse.json(
        { error: 'Could not submit right now. Please call (561) 388-7262.' },
        { status: 502 }
      )
    }
    if (confirmResult.status === 'rejected') {
      console.error('Lead confirmation email failed:', confirmResult.reason)
    }

    // Forward to external CRM/webhook if configured
    const webhookUrl = process.env.LEAD_WEBHOOK_URL
    if (webhookUrl) {
      // Fire and forget — don't block the response
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source_url: req.headers.get('referer') ?? '',
        }),
      }).catch(() => {
        // Webhook failure should not fail the lead submission
        console.error('Lead webhook POST failed')
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
