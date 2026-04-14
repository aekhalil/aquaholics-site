'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GalleryProject {
  _id: string
  title: string
  slug: { current: string }
  category: string
  location: string
  tankSize?: string
  coverImage?: { asset: { url: string; metadata?: { lqip?: string } } }
}

interface BeforeAfterGalleryProps {
  projects: GalleryProject[]
}

const PLACEHOLDER_PROJECTS: GalleryProject[] = [
  { _id: '1', title: '200g Mixed Reef — West Palm Beach', slug: { current: '200g-mixed-reef-wpb' }, category: 'saltwater', location: 'West Palm Beach', tankSize: '200 gallons' },
  { _id: '2', title: 'Office Reef Wall — Palm Beach Gardens', slug: { current: 'office-reef-wall-pbg' }, category: 'commercial', location: 'Palm Beach Gardens', tankSize: '450 gallons' },
  { _id: '3', title: 'Freshwater Planted Scape — Boca Raton', slug: { current: 'freshwater-planted-boca' }, category: 'freshwater', location: 'Boca Raton', tankSize: '90 gallons' },
  { _id: '4', title: 'SPS Dominant Reef — Jupiter', slug: { current: 'sps-reef-jupiter' }, category: 'saltwater', location: 'Jupiter', tankSize: '150 gallons' },
  { _id: '5', title: 'Lobby Jellyfish Display — WPB Hotel', slug: { current: 'lobby-jellyfish-hotel' }, category: 'commercial', location: 'West Palm Beach', tankSize: '120 gallons' },
  { _id: '6', title: 'Peninsula Tank — Wellington Estate', slug: { current: 'peninsula-tank-wellington' }, category: 'saltwater', location: 'Wellington', tankSize: '300 gallons' },
]

const CATEGORY_LABELS: Record<string, string> = {
  saltwater: 'Saltwater Reef',
  freshwater: 'Freshwater',
  commercial: 'Commercial',
  residential: 'Residential',
}

const CATEGORY_COLORS: Record<string, string> = {
  saltwater: 'bg-blue-100 text-blue-700',
  freshwater: 'bg-emerald-100 text-emerald-700',
  commercial: 'bg-purple-100 text-purple-700',
  residential: 'bg-gold/20 text-gold-600',
}

export function BeforeAfterGallery({ projects }: BeforeAfterGalleryProps) {
  const display = projects.length > 0 ? projects : PLACEHOLDER_PROJECTS

  return (
    <section className="py-24 bg-gray-50" aria-labelledby="gallery-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Portfolio
            </div>
            <h2
              id="gallery-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-navy"
            >
              Our Work Speaks For Itself
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg">
              Custom installations and transformations across Palm Beach County.
            </p>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/gallery">
              View Full Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {display.slice(0, 6).map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/gallery/${project.slug.current}`}
                className="group block relative aspect-[4/3] rounded-2xl overflow-hidden bg-navy-400/20 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {project.coverImage ? (
                  <Image
                    src={project.coverImage.asset.url}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder={project.coverImage.asset.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={project.coverImage.asset.metadata?.lqip}
                  />
                ) : (
                  <div className="absolute inset-0 bg-ocean-gradient flex items-center justify-center">
                    <span className="text-6xl">
                      {project.category === 'freshwater' ? '🌿' : '🐠'}
                    </span>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="font-display font-bold text-white text-lg leading-tight mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        CATEGORY_COLORS[project.category] ?? 'bg-white/20 text-white'
                      }`}
                    >
                      {CATEGORY_LABELS[project.category] ?? project.category}
                    </span>
                    {project.tankSize && (
                      <span className="text-white/70 text-xs">{project.tankSize}</span>
                    )}
                  </div>
                </div>

                {/* Always-visible category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      CATEGORY_COLORS[project.category] ?? 'bg-white/80 text-gray-700'
                    }`}
                  >
                    {CATEGORY_LABELS[project.category] ?? project.category}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
