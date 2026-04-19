'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteImages } from '@/lib/site-images'
import { cn } from '@/lib/utils'

interface Product {
  _id: string
  name: string
  slug: { current: string }
  category: string
  price: number
  inStock: boolean
  images: Array<{ asset: { url: string } }>
  shortDescription: string
  careLevel?: string
}

interface FeaturedLivestockProps {
  products: Product[]
}

const CATEGORY_COLORS: Record<string, string> = {
  corals: 'bg-pink-100 text-pink-700',
  fish: 'bg-blue-100 text-blue-700',
  inverts: 'bg-purple-100 text-purple-700',
}

const CARE_COLORS: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
  Expert: 'bg-purple-100 text-purple-700',
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0].asset.url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl">
              {product.category === 'corals' ? '🪸' : product.category === 'fish' ? '🐠' : '🦐'}
            </div>
          )}

          {product.careLevel && (
            <div className="absolute top-2 left-2">
              <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', CARE_COLORS[product.careLevel] ?? 'bg-gray-100 text-gray-600')}>
                {product.careLevel}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-navy/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center px-4">
            <Lock className="h-5 w-5 text-aqua mb-2" />
            <span className="text-white text-sm font-semibold">Sign in to see details</span>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-navy text-sm leading-tight line-clamp-2">
              {product.name}
            </h3>
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 capitalize', CATEGORY_COLORS[product.category] ?? 'bg-gray-100 text-gray-600')}>
              {product.category}
            </span>
          </div>

          <p className="text-gray-500 text-xs line-clamp-2 mb-3 flex-1">
            {product.shortDescription}
          </p>
        </div>
      </div>
    </div>
  )
}

const img = (url: string) => ({ asset: { url } })
const PLACEHOLDER_PRODUCTS: Product[] = [
  { _id: '1', name: 'Acropora millepora', slug: { current: 'acropora-millepora-green-tip' }, category: 'corals', price: 4999, inStock: true, images: [img(siteImages.shop['acropora-millepora-green-tip'])], shortDescription: 'A stunning branching SPS with vivid green polyp tips.', careLevel: 'Advanced' },
  { _id: '2', name: 'Mandarin Dragonet', slug: { current: 'mandarin-dragonet' }, category: 'fish', price: 5999, inStock: true, images: [img(siteImages.shop['mandarin-dragonet'])], shortDescription: 'One of the most strikingly colored fish in the hobby.', careLevel: 'Intermediate' },
  { _id: '3', name: 'Hammer Coral (Gold)', slug: { current: 'hammer-coral-gold' }, category: 'corals', price: 3499, inStock: true, images: [img(siteImages.shop['hammer-coral-gold'])], shortDescription: 'Gold/yellow branching hammer. LPS beginner-friendly.', careLevel: 'Beginner' },
  { _id: '4', name: 'Peppermint Shrimp (3-pack)', slug: { current: 'peppermint-shrimp-3pack' }, category: 'inverts', price: 2999, inStock: true, images: [img(siteImages.shop['peppermint-shrimp-3pack'])], shortDescription: 'Natural aiptasia eaters. Hardy, reef-safe.', careLevel: 'Beginner' },
  { _id: '6', name: 'Duncan Coral (10-head)', slug: { current: 'duncan-coral-10head' }, category: 'corals', price: 5499, inStock: true, images: [img(siteImages.shop['duncan-coral-10head'])], shortDescription: 'Australian Duncan with green centers. Fast grower.', careLevel: 'Beginner' },
  { _id: '7', name: 'Tuxedo Urchin', slug: { current: 'tuxedo-urchin' }, category: 'inverts', price: 1999, inStock: true, images: [img(siteImages.shop['tuxedo-urchin'])], shortDescription: 'Excellent algae grazer with stunning blue body.', careLevel: 'Beginner' },
  { _id: '10', name: 'Tailspot Blenny', slug: { current: 'tailspot-blenny' }, category: 'fish', price: 2499, inStock: true, images: [img(siteImages.shop['tailspot-blenny'])], shortDescription: 'Excellent algae grazer. Peaceful, reef-safe.', careLevel: 'Beginner' },
  { _id: '12', name: 'Bubble Tip Anemone (Red)', slug: { current: 'bta-red' }, category: 'inverts', price: 5999, inStock: true, images: [img(siteImages.shop['bta-red'])], shortDescription: 'RBTA, great host for clownfish. Captive-propagated.', careLevel: 'Intermediate' },
]

export function FeaturedLivestock({ products }: FeaturedLivestockProps) {
  const displayProducts = products.length > 0 ? products : PLACEHOLDER_PRODUCTS

  return (
    <section className="py-24 bg-gray-50" aria-labelledby="livestock-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Client-Only Livestock List
            </div>
            <h2
              id="livestock-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-navy"
            >
              Corals, Fish &amp; Inverts — Held for Clients
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg">
              Aquaholic isn&apos;t a store. Nick keeps a rotating holding system for service
              clients — preview below, then sign in to see what&apos;s available.
            </p>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">
              See Availability
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {displayProducts.slice(0, 8).map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-ocean-gradient rounded-3xl p-8 sm:p-12 text-white text-center"
        >
          <h3 className="font-display text-3xl font-bold mb-3">
            Want first look at new arrivals?
          </h3>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Livestock is held for clients Nick works with. Text{' '}
            <a href="tel:+15613887262" className="underline font-semibold">
              (561) 388-7262
            </a>{' '}
            for the access password, then pickup in Riviera Beach or add items to your next service
            visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="lg">
              <Link href="/shop-access">Enter Access Password</Link>
            </Button>
            <Button asChild variant="outline-white" size="lg">
              <Link href="/quote">Book a Service</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
