function getSecret(): string {
  return (
    process.env.NEWSLETTER_UNSUBSCRIBE_SECRET ||
    process.env.SHOP_ACCESS_SALT ||
    'aquaholics-newsletter-default-secret'
  )
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32)
}

export async function generateUnsubscribeToken(email: string): Promise<string> {
  return hmac(email.trim().toLowerCase())
}

export async function verifyUnsubscribeToken(email: string, token: string): Promise<boolean> {
  const expected = await generateUnsubscribeToken(email)
  if (expected.length !== token.length) return false
  // constant-time compare
  let diff = 0
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ token.charCodeAt(i)
  }
  return diff === 0
}

export function unsubscribeUrl(siteUrl: string, email: string, token: string): string {
  const params = new URLSearchParams({ email, t: token })
  return `${siteUrl}/api/newsletter/unsubscribe?${params.toString()}`
}
