'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { siteImages } from '@/lib/site-images'

const BRANDS = [
  { name: 'Red Sea', desc: 'MAX & REEFER systems', wordmark: 'RED SEA', accent: '#C41E1E', image: siteImages.brands['red-sea'] },
  { name: 'EcoTech Marine', desc: 'VorTech & Radion', wordmark: 'ECOTECH', accent: '#005EB8', image: siteImages.brands['ecotech-marine'] },
  { name: 'Neptune Systems', desc: 'Apex controllers', wordmark: 'NEPTUNE', accent: '#1A6B3C', image: siteImages.brands['neptune-systems'] },
  { name: 'Octo', desc: 'Elite protein skimmers', wordmark: 'OCTO', accent: '#2D2D2D', image: siteImages.brands['octo'] },
  { name: 'Abyzz', desc: 'High-performance pumps', wordmark: 'ABYZZ', accent: '#1A3C6E', image: siteImages.brands['abyzz'] },
  { name: 'Innovative Marine', desc: 'NUVO reef systems', wordmark: 'INNOVATIVE MARINE', accent: '#0A7D8C', image: siteImages.brands['innovative-marine'] },
]

export function BrandPartners() {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100" aria-label="Brand partners">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            Equipment We Install &amp; Service
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">
            The Industry&apos;s Best Brands. Installed Right.
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            We don&apos;t just sell this equipment — we build with it, service it, and know
            every quirk of every system. Your gear is in hands that actually know it.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-200"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={brand.image}
                  alt={`${brand.name} equipment`}
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
              <div className="p-4 text-center">
                <div
                  className="inline-block rounded-md py-1 px-2.5 mb-1.5"
                  style={{ backgroundColor: `${brand.accent}15` }}
                >
                  <span
                    className="font-display font-black text-[11px] tracking-tight leading-none"
                    style={{ color: brand.accent }}
                  >
                    {brand.wordmark}
                  </span>
                </div>
                <p className="text-gray-600 text-xs leading-snug">{brand.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-gray-500 mt-8"
        >
          Residential · Commercial · Hospitality · Healthcare · Corporate
        </motion.p>
      </div>
    </section>
  )
}
