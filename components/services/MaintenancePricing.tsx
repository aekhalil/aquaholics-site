'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { formatPrice, cn } from '@/lib/utils'
import Link from 'next/link'

interface PricingTier {
  _id: string
  name: string
  price: number // cents
  priceSuffix?: string // e.g. "+" or "–$1,000" for tiers with a range
  billingCycle: string
  tagline: string
  features: string[]
  isPopular: boolean
  stripePriceId: string
  callToAction: string
  quoteHref?: string // if set, CTA links to quote form instead of Stripe checkout
}

interface MaintenancePricingProps {
  tiers: PricingTier[]
}

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const handleSubscribe = async () => {
    if (!tier.stripePriceId) {
      toast({ title: 'Setup in progress', description: 'Payment processing will be available shortly. Please call us to enroll.', variant: 'destructive' })
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-subscription-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: tier.stripePriceId, tierName: tier.name }),
      })
      const { url, error } = await res.json()
      if (res.status === 503) {
        toast({ title: 'Call to enroll', description: error ?? 'Online checkout is not yet available. Please call (561) 388-7262.', variant: 'destructive' })
        return
      }
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      toast({
        title: 'Checkout error',
        description: 'Please try again or call (561) 388-7262.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className={cn(
        'relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl',
        tier.isPopular
          ? 'border-aqua shadow-xl shadow-aqua/10 scale-[1.02]'
          : 'border-gray-200 hover:border-aqua/40'
      )}
    >
      {/* Popular badge */}
      {tier.isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-aqua text-white text-xs font-bold text-center py-1.5 tracking-wider uppercase">
          ⭐ Most Popular
        </div>
      )}

      {/* Header */}
      <div className={cn('p-8', tier.isPopular ? 'pt-12' : '')}>
        <h3 className="font-display text-2xl font-bold text-navy mb-1">{tier.name}</h3>
        <p className="text-gray-500 text-sm mb-6">{tier.tagline}</p>

        <div className="flex items-end gap-1 mb-1">
          <span className="font-display text-5xl font-bold text-navy">
            {formatPrice(tier.price)}
            {tier.priceSuffix ? <span className="text-3xl">{tier.priceSuffix}</span> : null}
          </span>
          <span className="text-gray-400 text-sm mb-2">/{tier.billingCycle ?? 'month'}</span>
        </div>
        <p className="text-gray-400 text-xs">
          {tier.quoteHref ? 'Custom quote · Scales with tank size' : 'Cancel anytime · No setup fees'}
        </p>
      </div>

      {/* Features */}
      <div className="px-8 pb-8 flex-1">
        <ul className="space-y-3 mb-8">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className={cn('h-4 w-4 flex-shrink-0 mt-0.5', tier.isPopular ? 'text-aqua' : 'text-emerald-500')} />
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {tier.quoteHref ? (
          <Button
            asChild
            variant={tier.isPopular ? 'default' : 'navy'}
            size="lg"
            className="w-full"
          >
            <Link href={tier.quoteHref}>
              {tier.callToAction}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button
            onClick={handleSubscribe}
            disabled={loading}
            variant={tier.isPopular ? 'default' : 'navy'}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting…
              </>
            ) : (
              <>
                {tier.callToAction}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export function MaintenancePricing({ tiers }: MaintenancePricingProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-ocean-gradient py-24 pt-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 hidden md:block" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-aqua blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Zap className="h-4 w-4 text-aqua" />
            <span className="text-white text-sm font-medium">Auto-renewing monthly subscriptions</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6">
            Aquarium Maintenance Plans
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Professional care for your reef or freshwater system. Pick a plan and we handle
            everything — from water changes to livestock health checks.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,38 1440,30 L1440,60 L0,60 Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* DIY vs Professional cost comparison */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-navy">The Real Cost of DIY</h2>
            <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm">
              Most tank owners underestimate what they spend. Here&apos;s what a typical 75-gallon reef
              actually costs to maintain yourself — vs. letting us handle it.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* DIY column */}
            <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2">DIY — What You Actually Spend</div>
              <div className="font-display text-4xl font-bold text-navy mb-5">$250–$400<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  ['RODI water & salt', '$40–60/mo'],
                  ['Test kits & dosing chemicals', '$30–50/mo'],
                  ['Replacement bulbs, media, parts', '$20–40/mo'],
                  ['Your time (3–5 hrs/mo @ $50/hr)', '$150–250/mo'],
                  ['1 livestock loss from missed parameter', '$50–500 per incident'],
                ].map(([item, cost]) => (
                  <li key={item as string} className="flex justify-between items-start gap-4">
                    <span>{item}</span>
                    <span className="font-semibold text-red-500 whitespace-nowrap">{cost}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-red-200 text-sm text-gray-500">
                Plus the stress of wondering if your tank is okay when you&apos;re on vacation.
              </div>
            </div>
            {/* Professional column */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 relative">
              <div className="absolute -top-3 left-6 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">Better Value</div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Aquaholic Essential Plan</div>
              <div className="font-display text-4xl font-bold text-navy mb-5">$200<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  'Twice-monthly visits by a certified tech',
                  'All water, salt & chemicals included',
                  '8-parameter testing every visit',
                  'Glass & equipment cleaning',
                  'Monthly health report with photos',
                  '20% off emergency calls',
                  'Peace of mind — we watch your tank',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-emerald-200 text-sm text-emerald-700 font-medium">
                Most clients save 5–10 hours per month and never lose livestock to a missed water change.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing grid */}
      <section className="py-20 bg-gray-50" aria-labelledby="pricing-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="pricing-heading" className="sr-only">Maintenance Plan Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {tiers.map((tier, i) => (
              <PricingCard key={tier._id} tier={tier} index={i} />
            ))}
          </div>

          {/* Not sure? */}
          <div className="mt-12 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold text-navy mb-3">Not Sure Which Plan?</h3>
            <p className="text-gray-500 mb-6">
              Book a free 30-minute consultation and we&apos;ll recommend the perfect plan for
              your tank size, livestock, and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg">
                <Link href="/quote?service=maintenance">Get Personalized Recommendation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+15613887262">Call (561) 388-7262</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What's included detail */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-display text-4xl font-bold text-navy text-center mb-12">
            What Every Visit Includes
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '💧', title: 'Water Change', desc: 'Fresh saltwater or freshwater mixed to precise salinity/pH.' },
              { emoji: '🔬', title: 'Parameter Testing', desc: 'Salinity, pH, ammonia, nitrite, nitrate, alkalinity, calcium, magnesium.' },
              { emoji: '🪟', title: 'Glass Cleaning', desc: 'Inside and outside glass + acrylic polishing where applicable.' },
              { emoji: '⚙️', title: 'Equipment Check', desc: 'Skimmer, return pump, wavemakers, heaters, lights — all inspected.' },
              { emoji: '🐠', title: 'Livestock Assessment', desc: 'Visual health check of all fish, corals, and invertebrates.' },
              { emoji: '📊', title: 'Service Report', desc: 'Digital report emailed after every visit with photos and readings.' },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
