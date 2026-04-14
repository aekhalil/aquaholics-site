'use client'

import { motion } from 'framer-motion'

const BRANDS = [
  {
    name: 'Red Sea',
    desc: 'MAX & REEFER systems',
    wordmark: 'RED SEA',
    accent: '#C41E1E',
  },
  {
    name: 'EcoTech Marine',
    desc: 'VorTech & Radion',
    wordmark: 'ECOTECH',
    accent: '#005EB8',
  },
  {
    name: 'Neptune Systems',
    desc: 'Apex controllers',
    wordmark: 'NEPTUNE',
    accent: '#1A6B3C',
  },
  {
    name: 'Octo',
    desc: 'Elite protein skimmers',
    wordmark: 'OCTO',
    accent: '#2D2D2D',
  },
  {
    name: 'Abyzz',
    desc: 'High-performance pumps',
    wordmark: 'ABYZZ',
    accent: '#1A3C6E',
  },
  {
    name: 'Innovative Marine',
    desc: 'NUVO reef systems',
    wordmark: 'INNOVATIVE MARINE',
    accent: '#0A7D8C',
  },
]

export function BrandPartners() {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100" aria-label="Brand partners">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Equipment We Install &amp; Service
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">
            The Industry&apos;s Best Brands. Installed Right.
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            We don&apos;t just sell this equipment — we build with it, service it, and know
            every quirk of every system. Your gear is in hands that actually know it.
          </p>
        </motion.div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              {/* Wordmark bar */}
              <div
                className="w-full rounded-lg py-2.5 px-3 mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${brand.accent}12` }}
              >
                <span
                  className="font-display font-black text-sm tracking-tight leading-none"
                  style={{ color: brand.accent }}
                >
                  {brand.wordmark}
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-snug">{brand.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-gray-400 mt-8"
        >
          Residential · Commercial · Hospitality · Healthcare · Corporate
        </motion.p>
      </div>
    </section>
  )
}
