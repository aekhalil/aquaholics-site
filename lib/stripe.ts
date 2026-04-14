import Stripe from 'stripe'

// Server-side Stripe instance (never expose this to the browser)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

/**
 * Maintenance plan Price IDs, pulled from environment.
 * Created by: npm run stripe:setup
 */
export const MAINTENANCE_PRICES = {
  essential: process.env.STRIPE_PRICE_ESSENTIAL!,
  professional: process.env.STRIPE_PRICE_PROFESSIONAL!,
  premier: process.env.STRIPE_PRICE_PREMIER!,
} as const

export type MaintenanceTier = keyof typeof MAINTENANCE_PRICES
