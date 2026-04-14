'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Building2, Utensils, Heart, Home, Hotel, Briefcase, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const COMMERCIAL_TYPES = [
  {
    icon: Building2,
    title: 'Corporate Lobbies',
    desc: 'Floor-to-ceiling statement pieces that turn a reception area into an experience.',
  },
  {
    icon: Utensils,
    title: 'Restaurants & Bars',
    desc: 'Custom reef walls and feature tanks that become the centerpiece of your dining room.',
  },
  {
    icon: Hotel,
    title: 'Hotels & Resorts',
    desc: 'Large-scale installations with managed maintenance contracts — zero burden on your staff.',
  },
  {
    icon: Heart,
    title: 'Medical & Dental Offices',
    desc: 'Research-backed calming aquariums for waiting rooms. Turnkey setup and monthly service.',
  },
  {
    icon: Home,
    title: 'Luxury Residential',
    desc: 'Custom built-ins, room dividers, and whole-wall reef systems for high-end homes.',
  },
  {
    icon: Briefcase,
    title: 'Real Estate & Staging',
    desc: 'Rental reef systems for model homes, showrooms, and high-value property listings.',
  },
]

export function CommercialSection() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden" aria-labelledby="commercial-heading">

      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-aqua/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-aqua/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-aqua/10 border border-aqua/20 rounded-full px-4 py-1.5 mb-5">
            <Building2 className="h-4 w-4 text-aqua" />
            <span className="text-aqua text-sm font-semibold">Commercial Installations</span>
          </div>
          <h2
            id="commercial-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-white mb-5"
          >
            Big Visions.
            <span className="block text-aqua">Bigger Builds.</span>
          </h2>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            From a 50-gallon dental office reef to a 10,000-gallon statement build — Aquaholics
            handles commercial and specialty aquarium projects of any scale across South Florida,
            including bespoke builds for high-end clients and one-of-a-kind installs.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {COMMERCIAL_TYPES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-aqua/30 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-aqua/10 flex items-center justify-center mb-4 group-hover:bg-aqua/20 transition-colors">
                <Icon className="h-6 w-6 text-aqua" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom differentiator strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto text-center"
        >
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            We spec and install <span className="text-aqua font-semibold">Red Sea, EcoTech, Neptune Systems, Abyzz, Octo,</span> and{' '}
            <span className="text-aqua font-semibold">Innovative Marine</span> — the same
            brands used by the world&apos;s best reef builders. Commercial clients get a
            dedicated maintenance contract, 24/7 emergency coverage, and a single point of
            contact for every issue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="lg">
              <Link href="/quote?service=commercial">
                Discuss Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline-white" size="lg">
              <a href="tel:+15613887262">Call (561) 388-7262</a>
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
