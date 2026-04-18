import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { verifyUnsubscribeToken } from '@/lib/newsletter'

export const runtime = 'nodejs'

async function unsubscribe(email: string): Promise<void> {
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!audienceId) return
  await resend.contacts
    .update({ email, audienceId, unsubscribed: true })
    .catch(() => {
      // Missing contact or misconfigured Resend — still treat as success for the user.
    })
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')?.trim().toLowerCase()
  const token = req.nextUrl.searchParams.get('t')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin

  if (!email || !token || !(await verifyUnsubscribeToken(email, token))) {
    return NextResponse.redirect(`${siteUrl}/newsletter/unsubscribed?status=invalid`)
  }

  await unsubscribe(email)
  return NextResponse.redirect(`${siteUrl}/newsletter/unsubscribed?status=ok`)
}

// RFC 8058 one-click unsubscribe (Gmail/Yahoo bulk-sender requirement).
export async function POST(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')?.trim().toLowerCase()
  const token = req.nextUrl.searchParams.get('t')

  if (!email || !token || !(await verifyUnsubscribeToken(email, token))) {
    return new NextResponse(null, { status: 400 })
  }

  await unsubscribe(email)
  return new NextResponse(null, { status: 200 })
}
