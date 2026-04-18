import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Wrench, Waves, AlertCircle, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aquarium Services — Installation, Maintenance, Aquascaping & Emergency | Aquaholics',
  description:
    'Full-service saltwater and reef aquarium care in Palm Beach County, FL. Custom installation, weekly maintenance plans, professional aquascaping, and 24/7 emergency service.',
  alternates: { canonical: '/services' },
}

const SERVICES = [
  {
    icon: Building2,
    title: 'Custom Installation',
    href: '/services/installation',
    desc: 'Residential and commercial aquarium design and build — 20 gallons to 1,000+. Red Sea, EcoTech, Neptune, and more.',
    tagline: 'Residential & Commercial',
  },
  {
    icon: Wrench,
    title: 'Maintenance Plans',
    href: '/services/maintenance',
    desc: 'Weekly, bi-weekly, and monthly service plans. Water changes, filter cleaning, testing, and livestock health checks.',
    tagline: 'From $180/month',
  },
  {
    icon: Waves,
    title: 'Aquascaping',
    href: '/services/aquascaping',
    desc: 'Professional rockscape and coral layout design. Transform an empty tank into a natural reef centerpiece.',
    tagline: 'One-time or refresh',
  },
  {
    icon: AlertCircle,
    title: '24/7 Emergency Service',
    href: '/services/emergency',
    desc: 'Leak? Power failure? Livestock crisis? We respond same-day anywhere in Palm Beach County.',
    tagline: 'Same-day response',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-ocean-gradient pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-aqua/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-white text-sm font-medium">What We Do</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Aquarium Services in
            <span className="block text-aqua">Palm Beach County</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Full-service saltwater and reef care — from first-time installs to weekly maintenance
            on 1,000-gallon commercial systems.
          </p>
          <Button asChild variant="gold" size="xl">
            <Link href="/quote">Get a Free Quote</Link>
          </Button>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {SERVICES.map(({ icon: Icon, title, href, desc, tagline }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-aqua/10 flex items-center justify-center mb-5 group-hover:bg-aqua/20 transition-colors">
                  <Icon className="h-7 w-7 text-aqua" />
                </div>
                <div className="text-aqua text-xs font-semibold uppercase tracking-wider mb-2">
                  {tagline}
                </div>
                <h2 className="font-display text-2xl font-bold text-navy mb-3 group-hover:text-aqua transition-colors">
                  {title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-navy font-semibold group-hover:text-aqua transition-colors">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4">
            Not sure what you need?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Call Nick directly or send a message. Free consultation, no pressure — we&apos;ll help you
            figure out the right fit for your tank and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg">
              <Link href="/quote">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+15613887262">Call (561) 388-7262</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
