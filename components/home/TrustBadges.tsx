'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Zap, Building2, Star, Wrench } from 'lucide-react'

const BADGES = [
  {
    icon: Star,
    title: '5-Star Rated',
    subtitle: 'Google & Facebook reviews',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: Building2,
    title: 'Commercial & Residential',
    subtitle: '20-gallon to 5,000-gallon builds',
    color: 'text-aqua',
    bg: 'bg-aqua/10',
  },
  {
    icon: Wrench,
    title: 'Premium Equipment',
    subtitle: 'Red Sea · EcoTech · Neptune · Abyzz',
    color: 'text-navy',
    bg: 'bg-navy/10',
  },
  {
    icon: Shield,
    title: 'Client-First Livestock',
    subtitle: 'Hand-selected, held for service clients',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: Zap,
    title: '24/7 Emergency',
    subtitle: 'Real person answers every call',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    icon: Clock,
    title: 'Serving Palm Beach County',
    subtitle: 'Jupiter · WPB · Boca · Lake Worth',
    color: 'text-aqua',
    bg: 'bg-aqua/10',
  },
]

export function TrustBadges() {
  return (
    <section className="py-10 bg-white border-b border-gray-100" aria-label="Trust signals">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full ${badge.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`h-5 w-5 ${badge.color}`} />
                </div>
                <div className="font-semibold text-navy text-sm leading-tight">{badge.title}</div>
                <div className="text-gray-500 text-xs mt-0.5 leading-snug">{badge.subtitle}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
