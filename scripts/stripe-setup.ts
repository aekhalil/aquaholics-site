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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-20.acacia' })

const PLANS = [
  {
    envKey: 'STRIPE_PRICE_ESSENTIAL',
    name: 'Essential Maintenance Plan',
    description: 'Bi-weekly aquarium maintenance for tanks up to 50 gallons. Includes water change, parameter testing, and glass cleaning.',
    price: 14900, // $149.00/mo
  },
  {
    envKey: 'STRIPE_PRICE_PROFESSIONAL',
    name: 'Professional Maintenance Plan',
    description: 'Weekly aquarium maintenance for tanks up to 150 gallons. Full service including livestock health assessment and bi-weekly photo report.',
    price: 24900, // $249.00/mo
  },
  {
    envKey: 'STRIPE_PRICE_PREMIER',
    name: 'Premier Maintenance Plan',
    description: 'White-glove weekly maintenance for unlimited tank size. Dedicated technician, full parameter suite, and annual aquascape refresh.',
    price: 44900, // $449.00/mo
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

setupStripe().catch((err) => {
  console.error('Stripe setup failed:', err.message)
  process.exit(1)
})
