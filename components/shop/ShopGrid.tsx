'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Search, Phone, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { formatPrice, cn } from '@/lib/utils'
import { siteImages } from '@/lib/site-images'

interface Product {
  _id: string
  name: string
  slug: { current: string }
  category: string
  price: number
  inStock: boolean
  stockCount?: number
  images: Array<{ asset: { url: string; metadata?: { lqip?: string } } }>
  shortDescription: string
  careLevel?: string
  isFeatured?: boolean
}

interface ShopGridProps {
  initialProducts: Product[]
}

const CATEGORIES = [
  { value: 'all', label: 'All Livestock' },
  { value: 'corals', label: '🪸 Corals' },
  { value: 'fish', label: '🐠 Fish' },
  { value: 'inverts', label: '🦐 Invertebrates' },
]

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A–Z' },
  { value: 'in_stock', label: 'Available First' },
]

const CARE_COLORS: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
  Expert: 'bg-purple-100 text-purple-700',
}

const img = (url: string) => ({ asset: { url } })
const PLACEHOLDER_PRODUCTS: Product[] = [
  { _id: '1', name: 'Acropora millepora (Green Tip)', slug: { current: 'acropora-millepora-green-tip' }, category: 'corals', price: 4999, inStock: true, stockCount: 3, images: [img(siteImages.shop['acropora-millepora-green-tip'])], shortDescription: 'Stunning SPS coral with vivid green polyp tips. High flow, high light required.', careLevel: 'Advanced', isFeatured: true },
  { _id: '2', name: 'Mandarin Dragonet', slug: { current: 'mandarin-dragonet' }, category: 'fish', price: 5999, inStock: true, stockCount: 2, images: [img(siteImages.shop['mandarin-dragonet'])], shortDescription: 'Trained to eat frozen food. One of the most colorful fish in the hobby.', careLevel: 'Intermediate' },
  { _id: '3', name: 'Hammer Coral (Gold)', slug: { current: 'hammer-coral-gold' }, category: 'corals', price: 3499, inStock: true, stockCount: 5, images: [img(siteImages.shop['hammer-coral-gold'])], shortDescription: 'LPS beginner-friendly with excellent polyp extension. Gold/yellow coloration.', careLevel: 'Beginner', isFeatured: true },
  { _id: '4', name: 'Peppermint Shrimp 3-Pack', slug: { current: 'peppermint-shrimp-3pack' }, category: 'inverts', price: 2999, inStock: true, stockCount: 10, images: [img(siteImages.shop['peppermint-shrimp-3pack'])], shortDescription: 'Natural aiptasia eaters. Hardy, reef-safe cleaners.', careLevel: 'Beginner' },
  { _id: '5', name: 'Orange Storm Clownfish (Pair)', slug: { current: 'orange-storm-clownfish-pair' }, category: 'fish', price: 8999, inStock: false, images: [img(siteImages.shop['orange-storm-clownfish-pair'])], shortDescription: 'Designer clownfish in a captive-bred mated pair. ORA certified.', careLevel: 'Beginner' },
  { _id: '6', name: 'Duncan Coral (10 heads)', slug: { current: 'duncan-coral-10head' }, category: 'corals', price: 5499, inStock: true, stockCount: 4, images: [img(siteImages.shop['duncan-coral-10head'])], shortDescription: 'Australian Duncan with green centers. Fast grower in medium light.', careLevel: 'Beginner' },
  { _id: '7', name: 'Tuxedo Urchin', slug: { current: 'tuxedo-urchin' }, category: 'inverts', price: 1999, inStock: true, stockCount: 8, images: [img(siteImages.shop['tuxedo-urchin'])], shortDescription: 'Excellent algae grazer with stunning blue body. Safe for most reefs.', careLevel: 'Beginner' },
  { _id: '9', name: 'Blastomussa Wellsi (Rainbow)', slug: { current: 'blastomussa-rainbow' }, category: 'corals', price: 3999, inStock: true, stockCount: 3, images: [img(siteImages.shop['blastomussa-rainbow'])], shortDescription: 'Rainbow Blasto with multi-colored polyps. Low-light, beginner LPS.', careLevel: 'Beginner' },
  { _id: '10', name: 'Tailspot Blenny', slug: { current: 'tailspot-blenny' }, category: 'fish', price: 2499, inStock: true, stockCount: 4, images: [img(siteImages.shop['tailspot-blenny'])], shortDescription: 'Excellent algae grazer. Peaceful, reef-safe, personable fish.', careLevel: 'Beginner' },
  { _id: '11', name: 'Hammer Coral (Branching Purple)', slug: { current: 'hammer-coral-branching-purple' }, category: 'corals', price: 4499, inStock: false, images: [img(siteImages.shop['hammer-coral-branching-purple'])], shortDescription: 'Purple branching hammer with teal tips. Medium light, medium flow.', careLevel: 'Beginner' },
  { _id: '12', name: 'Bubble Tip Anemone (Red)', slug: { current: 'bta-red' }, category: 'inverts', price: 5999, inStock: true, stockCount: 2, images: [img(siteImages.shop['bta-red'])], shortDescription: 'RBTA, great host for clownfish. Captive-propagated.', careLevel: 'Intermediate' },
]

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug.current}`} className="group block h-full">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0].asset.url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              placeholder={product.images[0].asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={product.images[0].asset.metadata?.lqip}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-navy/10 to-aqua/10 flex items-center justify-center">
              <span className="text-6xl">
                {product.category === 'corals' ? '🪸' : product.category === 'fish' ? '🐠' : '🦐'}
              </span>
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full">
                Unavailable
              </span>
            </div>
          )}

          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.careLevel && (
              <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', CARE_COLORS[product.careLevel] ?? 'bg-gray-100 text-gray-600')}>
                {product.careLevel}
              </span>
            )}
          </div>

          {product.isFeatured && (
            <div className="absolute top-2 right-2">
              <span className="bg-gold text-white text-xs font-bold px-2 py-0.5 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-navy text-sm leading-tight line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 mb-3 flex-1">
            {product.shortDescription}
          </p>

          {product.inStock && product.stockCount !== undefined && product.stockCount <= 3 && (
            <p className="text-amber-600 text-xs font-medium mb-2">
              Only {product.stockCount} in holding
            </p>
          )}

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="font-bold text-navy text-lg">{formatPrice(product.price)}</span>
              <div className="flex items-center gap-1 mt-0.5">
                {product.inStock ? (
                  <>
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-600 text-xs font-medium">Available</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 text-red-400" />
                    <span className="text-red-500 text-xs font-medium">Unavailable</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ShopGrid({ initialProducts }: ShopGridProps) {
  // Placeholder products are a dev-time convenience so the grid renders
  // when Sanity isn't configured locally. In production they'd be dead
  // links — each placeholder slug 404s on /shop/[slug] because those IDs
  // don't exist in Sanity — so prod falls through to the empty state.
  const products =
    initialProducts.length > 0
      ? initialProducts
      : process.env.NODE_ENV === 'development'
        ? PLACEHOLDER_PRODUCTS
        : []
  const [category, setCategory] = React.useState('all')
  const [sort, setSort] = React.useState('default')
  const [search, setSearch] = React.useState('')

  const filtered = React.useMemo(() => {
    let result = [...products]
    if (category !== 'all') result = result.filter((p) => p.category === category)
    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDescription.toLowerCase().includes(search.toLowerCase()))

    switch (sort) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break
      case 'price_desc': result.sort((a, b) => b.price - a.price); break
      case 'name_asc': result.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'in_stock': result.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0)); break
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }
    return result
  }, [products, category, sort, search])

  const inStockCount = products.filter((p) => p.inStock).length

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Inventory rotating
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4">
            Nothing in holding right now
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Nick&apos;s livestock rotates constantly and the next batch may already be on its way.
            Call or text for current availability, or leave your email and we&apos;ll ping you the
            moment new corals, fish, and inverts arrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="tel:+15613887262"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-navy text-white font-medium hover:bg-navy/90 transition"
            >
              <Phone className="h-4 w-4" /> (561) 388-7262
            </Link>
            <Link
              href="mailto:nick@aquaholicspb.com"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              <Mail className="h-4 w-4" /> nick@aquaholicspb.com
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="mb-10">
        <div className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          {inStockCount} {inStockCount === 1 ? 'animal' : 'animals'} currently in holding
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-3">
          Available Livestock
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Corals, fish, and inverts Nick is holding right now. This isn&apos;t a storefront — there&apos;s
          no shipping. Hold what you want, and we&apos;ll arrange pickup or drop it on your next
          service visit.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search livestock…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-11 px-3 rounded-md border border-input bg-background text-sm"
          aria-label="Sort livestock"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              category === cat.value ? 'bg-navy text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {cat.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-500 self-center">
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">Nothing matches those filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.5) }}
              layout
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
