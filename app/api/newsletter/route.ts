import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, FROM_EMAIL } from '@/lib/resend'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = schema.parse(body)

    // Add to Resend audience
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      })
    }

    // Send welcome email with lead magnet
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: '🪸 Your Free Coral Care Guide is Here!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0A1F3D, #0F3460); padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">🪸 Your Free Guide is Ready!</h1>
          </div>
          <div style="padding: 32px; background: white; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p>Thanks for subscribing to Aquaholics Aquarium Services!</p>
            <p>Your <strong>Beginner's Reef Keeping Guide</strong> (20 pages) covers:</p>
            <ul>
              <li>How to cycle your first saltwater tank</li>
              <li>Essential equipment for a successful reef</li>
              <li>The 10 most beginner-friendly corals</li>
              <li>Avoiding the 5 most common mistakes</li>
              <li>Understanding water parameters</li>
            </ul>
            <div style="text-align: center; margin: 24px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/downloads/reef-guide.pdf"
                 style="background: #00B4D8; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Download Your Free Guide →
              </a>
            </div>
            <p style="color: #6b7280; font-size: 13px;">
              You'll also receive our weekly livestock restock alerts. Unsubscribe any time.
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    console.error('Newsletter API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
