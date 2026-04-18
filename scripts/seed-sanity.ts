/**
 * Sanity Seed Script
 * Populates the CMS with realistic placeholder content for all 15 Palm Beach County cities
 * and other schema types.
 *
 * Run: npm run seed
 * Requires SANITY_API_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 */

import { createClient } from '@sanity/client'
import { SERVICE_AREAS } from '../lib/service-areas-data'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

// ── Service Areas ─────────────────────────────────────────────────────────────
async function seedServiceAreas() {
  console.log('Seeding service areas...')
  for (const area of SERVICE_AREAS) {
    await client.createOrReplace({
      _id: `serviceArea-${area.slug}`,
      _type: 'serviceArea',
      name: area.name,
      slug: { _type: 'slug', current: area.slug },
      county: area.county,
      population: area.population,
      heroTagline: area.heroTagline,
      intro: area.intro,
      neighborhoods: area.neighborhoods,
      mapEmbedUrl: area.mapEmbedUrl,
      testimonials: area.testimonials,
    })
    console.log(`  ✓ ${area.name}`)
  }
}

// ── Pricing Tiers ─────────────────────────────────────────────────────────────
async function seedPricingTiers() {
  console.log('Seeding pricing tiers...')
  const tiers = [
    { _id: 'pricingTier-essential', name: 'Essential', price: 14900, billingCycle: 'month', tagline: 'Perfect for smaller systems', isPopular: false, order: 1, callToAction: 'Start Essential', stripePriceId: process.env.STRIPE_PRICE_ESSENTIAL ?? '', features: ['Bi-weekly service visits', 'Water change (up to 15%)', 'Parameter testing (8 parameters)', 'Glass & equipment cleaning', 'Monthly health report', 'Up to 50-gallon tank', 'Email support'] },
    { _id: 'pricingTier-professional', name: 'Professional', price: 24900, billingCycle: 'month', tagline: 'Our most popular plan', isPopular: true, order: 2, callToAction: 'Start Professional', stripePriceId: process.env.STRIPE_PRICE_PROFESSIONAL ?? '', features: ['Weekly service visits', 'Water change (up to 20%)', 'Full parameter testing (14 parameters)', 'Glass, sump & equipment cleaning', 'Livestock health assessment', 'Bi-weekly photo report', 'Up to 150-gallon tank', 'Priority phone support', '20% off emergency calls', '10% off livestock purchases'] },
    { _id: 'pricingTier-premier', name: 'Premier', price: 44900, billingCycle: 'month', tagline: 'White-glove, hands-off care', isPopular: false, order: 3, callToAction: 'Start Premier', stripePriceId: process.env.STRIPE_PRICE_PREMIER ?? '', features: ['Weekly service visits', 'Water change (up to 25%)', 'Complete parameter suite + ICP testing', 'Full system cleaning & maintenance', 'Coral & livestock fragging when needed', 'Weekly photo & video report', 'Unlimited tank size', 'Dedicated technician', '24/7 dedicated phone line', 'Free emergency calls (parts only)', '15% off livestock purchases', 'Annual aquascape refresh included'] },
  ]
  for (const tier of tiers) {
    await client.createOrReplace({ _type: 'pricingTier', ...tier })
    console.log(`  ✓ ${tier.name}`)
  }
}

// ── FAQs ──────────────────────────────────────────────────────────────────────
async function seedFAQs() {
  console.log('Seeding FAQs...')
  const faqs = [
    { q: 'What areas do you serve in Palm Beach County?', a: 'We service all of Palm Beach County including West Palm Beach, Palm Beach Gardens, Jupiter, Wellington, Boca Raton, Delray Beach, Boynton Beach, Lake Worth, Riviera Beach, North Palm Beach, Juno Beach, Tequesta, Greenacres, Royal Palm Beach, and Palm Beach island. We also take select clients in Broward County — contact us to confirm your address.', cat: 'General' },
    { q: 'How much does aquarium maintenance cost?', a: 'Our maintenance plans start at $149/month for tanks up to 50 gallons (bi-weekly visits). Most residential clients pay $199–$299/month for weekly service on 75–200 gallon systems. Commercial and very large tanks (300+ gallons) are priced on a custom basis. Every plan includes water changes, parameter testing, glass cleaning, and equipment checks.', cat: 'Maintenance' },
    { q: 'Can I buy livestock from Aquaholics?', a: 'Aquaholics is not a retail store and does not ship. Nick keeps a small rotating holding system for service clients. Request a client account, and once approved you can see what corals, fish, and inverts are available for pickup in Riviera Beach or drop-off on your next service visit.', cat: 'Livestock' },
    { q: 'How long does a custom aquarium installation take?', a: 'A standard 100-gallon display typically takes 2–4 weeks from design approval to livestock placement. Large custom builds (300+ gallons) can take 6–10 weeks. We will give you a firm timeline during the free consultation.', cat: 'Installation' },
    { q: 'Can you set up a tank in a rental property or condo?', a: 'Absolutely. We have extensive experience working in condos, apartments, and rental units. We use waterproofing mats, drip trays, and careful plumbing practices to meet HOA requirements.', cat: 'Installation' },
    { q: 'What is included in an emergency callout?', a: 'Our 24/7 emergency service covers tank crashes, power outages, equipment failures, disease outbreaks, and livestock rescues. Emergency calls are priced at a flat $150 callout fee plus parts/labor. Clients on an active maintenance plan receive 20% off all emergency calls.', cat: 'Emergency' },
  ]
  for (let i = 0; i < faqs.length; i++) {
    const faq = faqs[i]
    await client.createOrReplace({ _id: `faq-${i + 1}`, _type: 'faq', question: faq.q, answer: faq.a, category: faq.cat, order: i + 1 })
    console.log(`  ✓ FAQ ${i + 1}`)
  }
}

// ── Testimonials ──────────────────────────────────────────────────────────────
async function seedTestimonials() {
  console.log('Seeding testimonials...')
  const testimonials = [
    { name: 'Michael R.', location: 'West Palm Beach', rating: 5, text: "Aquaholic built our 180-gallon reef from scratch. The attention to detail is insane — the aquascape looks like something out of a magazine. Fourteen months later and every parameter is still dialed in perfectly.", service: 'Custom Installation' },
    { name: 'Sarah T.', location: 'Palm Beach Gardens', rating: 5, text: "I've had three different aquarium companies maintain my tanks over the years. Aquaholic is in a completely different league. They actually TELL you what's wrong before it becomes a problem. Worth every penny.", service: 'Maintenance Plan' },
    { name: 'David & Jenn K.', location: 'Jupiter', rating: 5, text: "Our return pump failed at 11pm on a Friday. I called the emergency line and a tech was at our door by 1am with a replacement. Fish and corals were all fine the next morning. Unmatched service.", service: '24/7 Emergency' },
    { name: 'Carlos M.', location: 'Boca Raton', rating: 5, text: "Ordered a batch of corals online — all arrived in perfect shape, better than described. The care guides included were genuinely helpful. Will be ordering again next week.", service: 'Livestock Purchase' },
    { name: 'Amanda L.', location: 'Wellington', rating: 5, text: "I was comparing maintenance plans and Aquaholic was not the cheapest option. But after seeing my neighbor's tank crash with a 'budget' service, I went with them and I'm so glad I did.", service: 'Maintenance Plan' },
    { name: 'Raj P.', location: 'Delray Beach', rating: 5, text: "The aquascaping service transformed my bland FOWLR into something I can't stop staring at. They brought a vision I couldn't articulate and executed it flawlessly. Total transformation.", service: 'Aquascaping' },
  ]
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i]
    await client.createOrReplace({ _id: `testimonial-${i + 1}`, _type: 'testimonial', ...t, featured: true })
    console.log(`  ✓ ${t.name}`)
  }
}

// ── Sample Blog Posts ─────────────────────────────────────────────────────────
async function seedBlogPosts() {
  console.log('Seeding blog posts...')
  const posts = [
    { slug: 'cycle-saltwater-tank', title: 'How to Cycle a Saltwater Tank in 30 Days', excerpt: "The nitrogen cycle is the foundation of every successful reef tank. Here's our proven 30-day method for establishing a stable, thriving biological filter.", categories: ['Beginner Guides'], readTime: 8 },
    { slug: 'beginner-corals', title: 'Top 10 Corals for Beginner Reef Keepers', excerpt: "Starting your first reef? These 10 hardy, forgiving corals are the best place to begin. We've ranked them by ease of care and visual impact.", categories: ['Coral Care'], readTime: 6 },
    { slug: 'water-parameters-guide', title: 'Understanding Water Parameters: The Complete Guide', excerpt: "Salinity, pH, alkalinity, calcium, magnesium — each parameter tells a story about your tank. Here's how to read them and keep everything in balance.", categories: ['Water Chemistry'], readTime: 12 },
  ]
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    await client.createOrReplace({
      _id: `blogPost-${post.slug}`,
      _type: 'blogPost',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      categories: post.categories,
      readTime: post.readTime,
      publishedAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
    })
    console.log(`  ✓ ${post.title}`)
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🐠 Aquaholic Sanity Seed Script\n')
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'}\n`)

  await seedServiceAreas()
  await seedPricingTiers()
  await seedFAQs()
  await seedTestimonials()
  await seedBlogPosts()

  console.log('\n✅ Seed complete! Open Sanity Studio to review the data.')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
