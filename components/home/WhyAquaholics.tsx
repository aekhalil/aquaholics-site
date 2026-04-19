'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const COMPARISON = [
  { feature: 'Real 5-star reviews from local clients',       us: true,  them: false },
  { feature: 'Owner on every job — not a subcontractor',     us: true,  them: false },
  { feature: 'Commercial & residential installations',        us: true,  them: false },
  { feature: 'Online booking & free consultation',           us: true,  them: false },
  { feature: 'Monthly maintenance subscription plans',       us: true,  them: false },
  { feature: '24/7 emergency response line',                 us: true,  them: false },
  { feature: 'Red Sea · EcoTech · Neptune · Abyzz · Octo',  us: true,  them: true  },
  { feature: 'Live inventory — in stock when listed',        us: true,  them: false },
  { feature: 'Tank relocation service',                      us: true,  them: false },
  { feature: 'Aiptasia & pest removal',                      us: true,  them: false },
]

export function WhyAquaholics() {
  return (
    <section className="py-24 bg-white" aria-labelledby="why-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Why Aquaholic
          </div>
          <h2
            id="why-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4"
          >
            Not All Aquarium Companies
            <span className="block text-aqua">Are Built the Same</span>
          </h2>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            A lot of companies sell tanks. Few actually show up, know the equipment, and keep
            your reef alive long-term.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_120px_120px] bg-navy text-white text-sm font-semibold">
            <div className="px-6 py-4">Feature</div>
            <div className="px-4 py-4 text-center text-aqua">Aquaholic</div>
            <div className="px-4 py-4 text-center text-white/40">The Rest</div>
          </div>

          {/* Rows */}
          {COMPARISON.map(({ feature, us, them }, i) => (
            <div
              key={feature}
              className={`grid grid-cols-[1fr_120px_120px] items-center border-t border-gray-100 ${
                i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              <div className="px-6 py-4 text-gray-700 text-sm font-medium">{feature}</div>
              <div className="px-4 py-4 flex justify-center">
                {us ? (
                  <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </span>
                ) : (
                  <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                    <X className="h-4 w-4 text-gray-300" />
                  </span>
                )}
              </div>
              <div className="px-4 py-4 flex justify-center">
                {them ? (
                  <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </span>
                ) : (
                  <span className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="h-4 w-4 text-red-400" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA below table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button asChild variant="default" size="xl">
            <Link href="/quote">
              Start with a Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="text-gray-400 text-sm mt-3">No obligation. Responds within 24 hours.</p>
        </motion.div>

      </div>
    </section>
  )
}
