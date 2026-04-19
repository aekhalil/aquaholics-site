/**
 * Stripe Setup Script
 * Creates the 3 maintenance subscription products and prices.
 * Run: npm run stripe:setup
 *
 * After running, copy the Price IDs printed to .env.local:
 *   STRIPE_PRICE_ESSENTIAL=price_xxx
 *   STRIPE_PRICE_PROFESSIONAL=price_xxx
 *   STRIPE_PRICE_PREMIER=price_xxx
 */

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' })

const PLANS = [
  {
    envKey: 'STRIPE_PRICE_ESSENTIAL',
    name: 'Essential Maintenance Plan',
    description: 'Twice-monthly (bi-weekly) aquarium maintenance for tanks up to 75 gallons. Includes water change, parameter testing, and glass cleaning.',
    price: 20000, // $200.00/mo
  },
  {
    envKey: 'STRIPE_PRICE_PROFESSIONAL',
    name: 'Professional Maintenance Plan',
    description: 'Weekly aquarium maintenance for tanks up to 300 gallons. Full service including livestock health assessment and bi-weekly photo report.',
    price: 60000, // $600.00/mo
  },
  {
    envKey: 'STRIPE_PRICE_PREMIER',
    name: 'Premier Maintenance Plan',
    description: 'Weekly commercial & large-system maintenance for tanks up to 1,000 gallons+. Starting at $600/mo, scaling to $1,000/mo for larger commercial installations. Dedicated technician, full parameter suite, ICP testing, and annual aquascape refresh.',
    price: 60000, // $600.00/mo starting; scales to $100000 for commercial
  },
]

async function setupStripe() {
  console.log('🐠 Aquaholic Stripe Setup Script\n')
  console.log('Creating subscription products and prices...\n')

  for (const plan of PLANS) {
    // Create product
    const product = await stripe.products.create({
      name: plan.name,
      description: plan.description,
      metadata: { source: 'aquaholic_setup_script' },
    })

    // Create recurring price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.price,
      currency: 'usd',
      recurring: { interval: 'month' },
      metadata: { plan: plan.envKey },
    })

    console.log(`✅ ${plan.name}`)
    console.log(`   Product ID: ${product.id}`)
    console.log(`   Price ID:   ${price.id}`)
    console.log(`   Add to .env.local:`)
    console.log(`   ${plan.envKey}=${price.id}\n`)
  }

  console.log('✅ All plans created. Add the Price IDs above to your .env.local file.')
  console.log('\nDone! 🎉')
}

setupStripe().catch(console.error)
