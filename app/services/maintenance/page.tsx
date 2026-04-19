import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { MAINTENANCE_TIERS_QUERY } from '@/lib/sanity/queries'
import { MaintenancePricing } from '@/components/services/MaintenancePricing'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Aquarium Maintenance Plans | West Palm Beach, FL',
  description:
    'Professional aquarium maintenance plans starting at $200/month. Weekly or bi-weekly service visits, water changes, parameter testing, and priority emergency support. Serving all of Palm Beach County.',
  alternates: { canonical: '/services/maintenance' },
}

const DEFAULT_TIERS = [
  {
    _id: 'essential',
    name: 'Essential',
    price: 20000,
    billingCycle: 'month',
    tagline: 'Perfect for smaller systems',
    isPopular: false,
    stripePriceId: process.env.STRIPE_PRICE_ESSENTIAL ?? '',
    callToAction: 'Start Essential',
    features: [
      'Twice-monthly (bi-weekly) service visits',
      'Water change (up to 15%)',
      'Parameter testing (8 parameters)',
      'Glass & equipment cleaning',
      'Monthly health report',
      'Up to 75-gallon tank',
      'Email support',
    ],
  },
  {
    _id: 'professional',
    name: 'Professional',
    price: 60000,
    billingCycle: 'month',
    tagline: 'Our most popular plan',
    isPopular: true,
    stripePriceId: process.env.STRIPE_PRICE_PROFESSIONAL ?? '',
    callToAction: 'Start Professional',
    features: [
      'Weekly service visits',
      'Water change (up to 20%)',
      'Full parameter testing (14 parameters)',
      'Glass, sump & equipment cleaning',
      'Livestock health assessment',
      'Bi-weekly photo report',
      'Up to 300-gallon tank',
      'Priority phone support',
      '20% off emergency calls',
      '10% off livestock purchases',
    ],
  },
  {
    _id: 'premier',
    name: 'Premier',
    price: 60000,
    priceSuffix: '+',
    billingCycle: 'month',
    tagline: 'Commercial & large-system care — from $600, scaling with tank size',
    isPopular: false,
    stripePriceId: process.env.STRIPE_PRICE_PREMIER ?? '',
    callToAction: 'Request Premier Quote',
    quoteHref: '/quote?service=maintenance&plan=premier',
    features: [
      'Weekly service visits',
      'Water change (up to 25%)',
      'Complete parameter suite + ICP testing',
      'Full system cleaning & maintenance',
      'Coral & livestock fragging when needed',
      'Weekly photo & video report',
      'Tanks up to 1,000 gallons+ (larger by custom quote)',
      'Dedicated technician',
      '24/7 dedicated phone line',
      'Free emergency calls (parts only)',
      '15% off livestock purchases',
      'Annual aquascape refresh included',
      'Geared for commercial installations — scales to $1,000/mo',
    ],
  },
]

async function getTiers() {
  try {
    const tiers = await client.fetch(MAINTENANCE_TIERS_QUERY)
    return tiers.length > 0 ? tiers : DEFAULT_TIERS
  } catch {
    return DEFAULT_TIERS
  }
}

export default async function MaintenancePage() {
  const tiers = await getTiers()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Aquarium Maintenance Service',
    provider: { '@type': 'LocalBusiness', name: 'Aquaholic Aquarium Services LLC' },
    areaServed: 'Palm Beach County, FL',
    description:
      'Professional aquarium maintenance including water changes, parameter testing, glass cleaning, and livestock health assessments.',
    offers: tiers.map((tier: { name: string; price: number }) => ({
      '@type': 'Offer',
      name: `${tier.name} Maintenance Plan`,
      price: (tier.price / 100).toFixed(2),
      priceCurrency: 'USD',
    })),
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <MaintenancePricing tiers={tiers} />
    </main>
  )
}
