'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wrench, Droplets, Zap, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SERVICES = [
  {
    icon: Wrench,
    title: 'Custom Installation',
    tagline: 'From concept to coral',
    description:
      'Full-service design and installation of custom saltwater and freshwater systems. We handle everything from tank sourcing and cabinetry to plumbing, lighting, and initial livestock placement.',
    href: '/services/installation',
    cta: 'Start Your Build',
    color: 'from-navy to-navy-400',
    iconBg: 'bg-aqua',
    features: [
      '3D design consultation',
      'Equipment sourcing & setup',
      'Aquascape design',
      '90-day new tank warranty',
    ],
    badge: null,
  },
  {
    icon: Droplets,
    title: 'Maintenance Plans',
    tagline: 'Your tank, always thriving',
    description:
      'Weekly or bi-weekly service visits by a dedicated technician. Water changes, parameter testing, glass cleaning, equipment checks, and livestock health assessment — all on auto-pilot.',
    href: '/services/maintenance',
    cta: 'View Pricing',
    color: 'from-aqua-600 to-aqua',
    iconBg: 'bg-white',
    features: [
      'Weekly or bi-weekly visits',
      'Water change & testing',
      'Priority emergency response',
      'Monthly health report',
    ],
    badge: 'Most Popular',
  },
  {
    icon: Zap,
    title: '24/7 Emergency',
    tagline: 'We pick up. Always.',
    description:
      'Tank crashes, power failures, sick fish — aquarium emergencies don\'t wait. Our dedicated emergency line is staffed around the clock, with technicians on call across Palm Beach County.',
    href: '/services/emergency',
    cta: 'Learn More',
    color: 'from-gold-500 to-gold',
    iconBg: 'bg-white',
    features: [
      '2-hour response guarantee',
      'Same-day livestock rescue',
      'Equipment failure repair',
      'Remote diagnosis available',
    ],
    badge: '24/7',
  },
]

export function ServiceTiers() {
  return (
    <section className="py-24 bg-white" aria-labelledby="services-heading">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            What We Do
          </div>
          <h2
            id="services-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4"
          >
            Full-Spectrum Aquarium Care
          </h2>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            From the first bolt to the thousandth water change, we handle every stage of your
            aquarium&apos;s life.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group relative flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Badge */}
                {svc.badge && (
                  <div className="absolute top-5 right-5 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    {svc.badge}
                  </div>
                )}

                {/* Gradient header */}
                <div className={`bg-gradient-to-br ${svc.color} p-8`}>
                  <div
                    className={`w-14 h-14 rounded-2xl ${svc.iconBg} flex items-center justify-center mb-6`}
                  >
                    <Icon className="h-7 w-7 text-navy" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">{svc.title}</h3>
                  <p className="text-white/70 text-sm font-medium">{svc.tagline}</p>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{svc.description}</p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="h-4 w-4 text-aqua flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="navy" className="w-full group/btn">
                    <Link href={svc.href}>
                      {svc.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 mb-4">
            Not sure which service fits your needs?
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/quote">Get a personalised quote →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
