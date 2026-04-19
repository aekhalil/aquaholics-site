'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Play } from 'lucide-react'
import { siteImages } from '@/lib/site-images'

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-ocean-gradient"
      aria-label="Hero section"
    >
      {/* Animated background bubbles — desktop only. On mobile, 8 infinite
          rAF loops + the blur-3xl radial glow below forced a full-viewport
          composite every scroll frame on iOS, which caused the stutter. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-aqua/10 border border-aqua/20 will-change-transform"
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              left: `${10 + i * 11}%`,
              bottom: `-${40 + i * 20}px`,
            }}
            animate={{
              y: [0, -(600 + i * 100)],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeInOut',
            }}
          />
        ))}
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-aqua/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            {/* Trust badge pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-aqua/20 border border-aqua/30 rounded-full px-4 py-1.5 mb-6"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-white text-sm font-medium">
                5 Stars · Google &amp; Facebook Reviews
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
            >
              West Palm Beach&apos;s
              <span className="block text-aqua">Premier Aquarium</span>
              Specialists
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/75 text-xl leading-relaxed mb-8 max-w-lg"
            >
              Residential and commercial aquarium installation, monthly maintenance, and rare
              coral frags — from 20-gallon nano tanks to 5,000-gallon showpiece builds, using
              Red Sea, EcoTech, Neptune, Abyzz &amp; Octo by someone who genuinely loves the reef.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button asChild size="xl" variant="gold">
                <Link href="/quote">
                  Get Free Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline-white">
                <Link href="/gallery">
                  <Play className="h-4 w-4" />
                  View Portfolio
                </Link>
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { value: '20→5k', label: 'Gallon Range' },
                { value: '5★', label: 'Google Rating' },
                { value: 'WPB→Boca', label: 'Service Area' },
                { value: '24/7', label: 'Emergency Line' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl font-bold text-aqua">{stat.value}</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Hero visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            {/* Hero aquarium image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-aqua/20 shadow-2xl shadow-aqua/10">
              <Image
                src={siteImages.hero}
                alt="Stunning custom saltwater reef aquarium by Aquaholic"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0vw, 45vw"
              />
              {/* Dark gradient for text overlay contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/10" />

              {/* Floating card: Google Reviews */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-8 left-8 bg-white rounded-2xl p-4 shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-aqua/20 flex items-center justify-center text-sm">
                    🌊
                  </div>
                  <span className="font-semibold text-navy text-sm">Google Reviews</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">5.0 · Google &amp; Facebook</p>
              </motion.div>

              {/* Floating card: Available now */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-8 right-8 bg-emerald-500 text-white rounded-2xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-sm font-semibold">Taking new clients</span>
                </div>
                <p className="text-xs text-emerald-100 mt-0.5">Palm Beach County</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
