import Stripe from 'stripe'

let client: Stripe | null = null

function getClient(): Stripe {
    if (!client) {
          client = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
                  apiVersion: '2025-02-24.acacia',
                  typescript: true,
          })
    }
    return client
}

export const stripe = new Proxy({} as Stripe, {
    get(_target, prop) {
          const c = getClient() as unknown as Record<string | symbol, unknown>
          return c[prop]
    },
})
