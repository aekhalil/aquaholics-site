import { Resend } from 'resend'

let client: Resend | null = null

function getClient(): Resend {
    if (!client) client = new Resend(process.env.RESEND_API_KEY)
    return client
}

export const resend = new Proxy({} as Resend, {
    get(_target, prop) {
          const c = getClient() as unknown as Record<string | symbol, unknown>
          return c[prop]
    },
})

export const FROM_EMAIL =
    process.env.RESEND_FROM_EMAIL ?? 'noreply@aquaholicaquariumservices.com'

export const BUSINESS_EMAIL =
    process.env.NEXT_PUBLIC_EMAIL ?? 'aquaholicspb@gmail.com'
