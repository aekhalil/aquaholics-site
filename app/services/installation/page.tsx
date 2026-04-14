import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Building2, Home, Zap, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Custom Aquarium Installation — Residential & Commercial | Palm Beach County, FL',
  description:
    'Aquaholics installs custom saltwater aquariums for homes, offices, restaurants, hotels & commercial spaces across Palm Beach County. Red Sea, EcoTech, Neptune, Abyzz, Octo, Innovative Marine. 20-gallon to 1,000+ gallon builds.',
  alternates: { canonical: '/services/installation' },
}

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Free Consultation',
    desc: 'We visit your space, assess the location, discuss your vision, budget, and timeline. No commitment required — residential or commercial.',
  },
  {
    number: '02',
    title: 'Design & Equipment Spec',
    desc: 'We build a detailed proposal with aquascape mockups, full equipment spec (Red Sea, EcoTech, Neptune, Abyzz, Octo, Innovative Marine), and fixed pricing. No surprises.',
  },
  {
    number: '03',
    title: 'Procurement at Trade Pricing',
    desc: 'We source every component — tank, sump, lighting, filtration, rock, sand, and initial livestock — at trade pricing passed on to you.',
  },
  {
    number: '04',
    title: 'Professional Installation',
    desc: 'Nick and the team handle every aspect of the build. Minimal disruption to your space, maximum precision in execution.',
  },
  {
    number: '05',
    title: 'Cycling & Livestock Introduction',
    desc: 'We establish the biological cycle, test parameters daily for 2–4 weeks, and introduce livestock gradually to ensure a healthy, stable reef from day one.',
  },
  {
    number: '06',
    title: '90-Day Warranty + Ongoing Care',
    desc: 'All installations come with a 90-day workmanship warranty. After that, lock in a maintenance plan and never worry about your tank again.',
  },
]

const BRANDS = [
  { name: 'Red Sea', note: 'MAX & REEFER series — the gold standard in reef systems' },
  { name: 'EcoTech Marine', note: 'Radion lighting & VorTech wavemakers' },
  { name: 'Neptune Systems', note: 'Apex controllers & intelligent monitoring' },
  { name: 'Abyzz', note: 'High-performance return & circulation pumps' },
  { name: 'Octo', note: 'Elite protein skimmers & filtration equipment' },
  { name: 'Innovative Marine', note: 'NUVO Fusion & peninsula systems' },
]

const COMMERCIAL_VENUES = [
  { icon: Building2, label: 'Corporate Lobbies & Offices' },
  { icon: Home, label: 'Luxury Residential' },
  { icon: Zap, label: 'Restaurants & Bars' },
]

export default function InstallationPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="bg-ocean-gradient py-24 pt-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-aqua/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Building2 className="h-4 w-4 text-aqua" />
            <span className="text-white/80 text-sm font-medium">Residential &amp; Commercial</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6">
            Custom Aquarium
            <span className="block text-aqua">Installation</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-4">
            From a 20-gallon nano reef in your living room to a 1,000-gallon lobby centrepiece
            in a hotel or office — we design, build, and service it all across Palm Beach County.
          </p>
          <p className="text-white/50 text-sm mb-10">
            Red Sea · EcoTech Marine · Neptune Systems · Abyzz · Octo · Innovative Marine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="xl">
              <Link href="/quote?service=installation">
                Start Your Build
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline-white" size="xl">
              <a href="tel:+15613887262">Call (561) 388-7262</a>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,38 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Commercial callout strip */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-navy/5 border border-navy/10 rounded-2xl p-6">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-aqua mb-1">Commercial Work Welcome</p>
              <h3 className="font-display text-xl font-bold text-navy">
                We handle large-scale commercial projects — budgets from $5K to $100K+
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {COMMERCIAL_VENUES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200 text-sm text-navy font-medium shadow-sm">
                  <Icon className="h-4 w-4 text-aqua" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Equipment We Spec & Install</p>
            <h2 className="font-display text-3xl font-bold text-navy">
              The Best Brands in the Hobby — Installed Right
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              We don&apos;t recommend equipment we don&apos;t know inside out. Every brand below
              is something Nick has built with personally.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANDS.map(({ name, note }) => (
              <div
                key={name}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-aqua mt-2 flex-shrink-0" />
                <div>
                  <div className="font-display font-bold text-navy text-base">{name}</div>
                  <div className="text-gray-500 text-sm mt-0.5">{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-display text-4xl font-bold text-navy text-center mb-16">
            Our Installation Process
          </h2>
          <div className="space-y-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-aqua/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-2xl font-bold text-aqua">{step.number}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-display text-4xl font-bold text-navy text-center mb-12">
            Every Installation Includes
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Professional aquascape design',
              'Premium live rock placement',
              'Custom cabinetry integration (if applicable)',
              'Complete plumbing & sump setup',
              'LED lighting programming',
              'Initial water chemistry setup',
              'Starter livestock package',
              '90-day workmanship warranty',
              'Full handover documentation & parameter baseline',
              'Ongoing maintenance plan option',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100"
              >
                <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="xl" variant="default">
              <Link href="/quote?service=installation">
                Get Your Installation Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Investment Guide */}
      <section className="py-20 bg-navy/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-4">
              <DollarSign className="h-4 w-4 text-gold" />
              <span className="text-gold text-sm font-semibold">Investment Guide</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-navy">What Does It Cost?</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Every build is custom-quoted — but here&apos;s a realistic range so you can plan your budget
              before we talk.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                label: 'Starter Reef',
                range: '$3,500 – $8,000',
                size: '20–75 gallons',
                details: [
                  'Nano or mid-size display tank',
                  'Entry-level premium equipment',
                  'Basic sump & filtration',
                  'Starter livestock package',
                  'Ideal for home offices or bedrooms',
                ],
              },
              {
                label: 'Statement Build',
                range: '$8,000 – $25,000',
                size: '75–200 gallons',
                details: [
                  'Display-grade tank & cabinetry',
                  'EcoTech / Red Sea / Neptune spec',
                  'Full sump, skimmer & automation',
                  'Premium aquascape & coral selection',
                  'Most popular for living rooms & offices',
                ],
                popular: true,
              },
              {
                label: 'Showpiece / Commercial',
                range: '$25,000 – $100K+',
                size: '200–1,000+ gallons',
                details: [
                  'Custom or peninsula systems',
                  'Abyzz / Octo top-tier equipment',
                  'Full controller & monitoring suite',
                  'Dedicated ongoing maintenance plan',
                  'Hotels, restaurants, corporate lobbies',
                ],
              },
            ].map((tier) => (
              <div
                key={tier.label}
                className={`relative rounded-3xl border-2 p-6 bg-white ${
                  tier.popular ? 'border-aqua shadow-xl shadow-aqua/10' : 'border-gray-100'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-aqua text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Most Common
                  </div>
                )}
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{tier.size}</div>
                <div className="font-display text-xl font-bold text-navy mb-1">{tier.label}</div>
                <div className="font-display text-2xl font-bold text-aqua mb-4">{tier.range}</div>
                <ul className="space-y-2">
                  {tier.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">
            All quotes are fixed-price — no surprise invoices. Financing available through third-party providers.
          </p>
          <div className="text-center mt-8">
            <Button asChild size="xl" variant="default">
              <Link href="/quote?service=installation">
                Get Your Custom Quote — It&apos;s Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Commercial CTA */}
      <section className="py-20 bg-navy text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <Building2 className="h-12 w-12 text-aqua mx-auto mb-6" />
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Planning a Commercial Project?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Hotels, restaurants, corporate offices, luxury residential — we&apos;ve done them
            all. Tell us your vision and we&apos;ll scope the full project for free.
          </p>
          <Button asChild variant="gold" size="xl">
            <Link href="/quote?service=commercial">
              Discuss Your Commercial Build
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

    </main>
  )
}
