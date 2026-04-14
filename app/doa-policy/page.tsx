import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Clock, Camera, CheckCircle, XCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'DOA Policy — 48-Hour Livestock Guarantee | Aquaholics Aquarium Services',
  description: 'Our Dead on Arrival (DOA) guarantee covers all livestock purchases for 48 hours. Full store credit for any animal that arrives dead or perishes within 48 hours under proper acclimation.',
  alternates: { canonical: '/doa-policy' },
}

const STEPS = [
  {
    icon: Camera,
    step: '01',
    title: 'Photograph Immediately',
    desc: 'Take a clear photo of the animal still in the sealed shipping bag or container within 2 hours of delivery or pickup. The bag must be sealed and unopened in the photo.',
  },
  {
    icon: Phone,
    step: '02',
    title: 'Contact Us Within 2 Hours',
    desc: 'Email aquaholicspb@gmail.com or text (561) 388-7262 with the photo, your order number, and the name of the animal. Claims submitted after 2 hours of delivery cannot be processed.',
  },
  {
    icon: CheckCircle,
    step: '03',
    title: 'We Review & Confirm',
    desc: 'We review your claim within 4 business hours. If approved, you receive a full store credit equal to the purchase price of the animal. Credits never expire.',
  },
]

const COVERED = [
  'Fish that arrive dead in the shipping bag',
  'Coral frags or colonies that show no polyp extension within 48 hours under stable parameters',
  'Invertebrates (shrimp, crabs, snails) that arrive dead or expire within 48 hours',
  'Clams and other filter feeders that do not show signs of life within 24 hours',
  'Any animal that perishes within 48 hours when water parameters are within acceptable ranges (we may request parameter test results)',
]

const NOT_COVERED = [
  'Animals that die after 48 hours from date of delivery',
  'Losses caused by improper acclimation (we provide full instructions with every order)',
  'Losses from incompatible tank mates (aggression, predation)',
  'Losses from water parameters outside acceptable ranges (ammonia, nitrite, pH, salinity)',
  'Animals purchased and held live in-store for later pickup (risk transfers at pickup)',
  'Animals returned without a photo of the sealed bag submitted within 2 hours',
  'Indirect losses (e.g., a sick arrival that causes illness in other tank inhabitants)',
]

export default function DOAPolicyPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="bg-ocean-gradient py-24 pt-36 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-aqua blur-3xl" />
        </div>
        <div className="container mx-auto px-4 max-w-2xl relative">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-semibold">Backed by Our Guarantee</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6">
            48-Hour DOA
            <span className="block text-aqua">Guarantee</span>
          </h1>
          <p className="text-white/70 text-xl">
            Every fish, coral, and invertebrate we sell is backed by our Dead on Arrival guarantee.
            If it doesn&apos;t make it, you get full store credit — no argument, no hassle.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,38 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Quick summary */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Clock, label: '48-Hour Coverage', desc: 'From time of delivery or pickup' },
              { icon: Shield, label: 'Full Store Credit', desc: 'Equal to purchase price — credits never expire' },
              { icon: Camera, label: 'Photo Required', desc: 'Sealed bag, within 2 hours of arrival' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-aqua/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-aqua" />
                </div>
                <div className="font-display font-bold text-navy text-lg mb-1">{label}</div>
                <div className="text-gray-500 text-sm">{desc}</div>
              </div>
            ))}
          </div>

          {/* How to file a claim */}
          <h2 className="font-display text-3xl font-bold text-navy text-center mb-10">How to File a Claim</h2>
          <div className="space-y-6 mb-16">
            {STEPS.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-aqua/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-aqua" />
                </div>
                <div>
                  <div className="text-xs font-bold text-aqua uppercase tracking-widest mb-1">Step {step}</div>
                  <h3 className="font-display text-xl font-bold text-navy mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What's covered / not covered */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                What&apos;s Covered
              </h3>
              <ul className="space-y-3">
                {COVERED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-400" />
                What&apos;s Not Covered
              </h3>
              <ul className="space-y-3">
                {NOT_COVERED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Acclimation note */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="bg-navy rounded-3xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Proper Acclimation is Required</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              To keep your livestock alive and your DOA claim valid, all animals must be acclimated using the
              drip acclimation method. We include a printed acclimation guide with every order. Never add shipping
              water directly to your display tank.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="gold" size="lg">
                <Link href="/shop">Shop Livestock</Link>
              </Button>
              <Button asChild variant="outline-white" size="lg">
                <a href="mailto:aquaholicspb@gmail.com">File a DOA Claim</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-3xl text-sm text-gray-400 flex flex-wrap gap-4">
        <Link href="/privacy" className="hover:text-navy transition-colors">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-navy transition-colors">Terms of Service</Link>
        <Link href="/shop" className="hover:text-navy transition-colors">Shop</Link>
      </div>

    </main>
  )
}
