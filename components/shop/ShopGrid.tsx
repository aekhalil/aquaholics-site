'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, CheckCircle, XCircle, Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/components/shop/CartProvider'
import { useToast } from '@/components/ui/use-toast'
import { formatPrice, cn } from '@/lib/utils'

interface Product {
  _id: string
  name: string
  slug: { current: string }
  category: string
  price: number
  compareAtPrice?: number
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
  { value: 'all', label: 'All Items' },
  { value: 'corals', label: '🪸 Corals' },
  { value: 'fish', label: '🐠 Fish' },
  { value: 'inverts', label: '🦐 Invertebrates' },
  { value: 'equipment', label: '⚙️ Equipment' },
]

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A–Z' },
  { value: 'in_stock', label: 'In Stock First' },
]

const CARE_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
const CARE_COLORS: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
  Expert: 'bg-purple-100 text-purple-700',
}

// Placeholder products for when Sanity isn't connected
const PLACEHOLDER_PRODUCTS: Product[] = [
  { _id: '1', name: 'Acropora millepora (Green Tip)', slug: { current: 'acropora-millepora-green-tip' }, category: 'corals', price: 4999, inStock: true, stockCount: 3, images: [], shortDescription: 'Stunning SPS coral with vivid green polyp tips. High flow, high light required.', careLevel: 'Advanced', isFeatured: true },
  { _id: '2', name: 'Mandarin Dragonet', slug: { current: 'mandarin-dragonet' }, category: 'fish', price: 5999, inStock: true, stockCount: 2, images: [], shortDescription: 'Trained to eat frozen food. One of the most colorful fish in the hobby.', careLevel: 'Intermediate' },
  { _id: '3', name: 'Hammer Coral (Gold)', slug: { current: 'hammer-coral-gold' }, category: 'corals', price: 3499, inStock: true, stockCount: 5, images: [], shortDescription: 'LPS beginner-friendly with excellent polyp extension. Gold/yellow coloration.', careLevel: 'Beginner', isFeatured: true },
  { _id: '4', name: 'Peppermint Shrimp 3-Pack', slug: { current: 'peppermint-shrimp-3pack' }, category: 'inverts', price: 2999, inStock: true, stockCount: 10, images: [], shortDescription: 'Natural aiptasia eaters. Hardy, reef-safe cleaners.', careLevel: 'Beginner' },
  { _id: '5', name: 'Orange Storm Clownfish (Pair)', slug: { current: 'orange-storm-clownfish-pair' }, category: 'fish', price: 8999, inStock: false, images: [], shortDescription: 'Designer clownfish in a captive-bred mated pair. ORA certified.', careLevel: 'Beginner' },
  { _id: '6', name: 'Duncan Coral (10 heads)', slug: { current: 'duncan-coral-10head' }, category: 'corals', price: 5499, inStock: true, stockCount: 4, images: [], shortDescription: 'Australian Duncan with green centers. Fast grower in medium light.', careLevel: 'Beginner' },
  { _id: '7', name: 'Tuxedo Urchin', slug: { current: 'tuxedo-urchin' }, category: 'inverts', price: 1999, inStock: true, stockCount: 8, images: [], shortDescription: 'Excellent algae grazer with stunning blue body. Safe for most reefs.', careLevel: 'Beginner' },
  { _id: '8', name: 'AI Prime 16HD LED', slug: { current: 'ai-prime-16hd' }, category: 'equipment', price: 26999, inStock: true, stockCount: 6, images: [], shortDescription: 'WiFi-controlled full spectrum LED for tanks up to 24".', careLevel: undefined },
  { _id: '9', name: 'Blastomussa Wellsi (Rainbow)', slug: { current: 'blastomussa-rainbow' }, category: 'corals', price: 3999, inStock: true, stockCount: 3, images: [], shortDescription: 'Rainbow Blasto with multi-colored polyps. Low-light, beginner LPS.', careLevel: 'Beginner' },
  { _id: '10', name: 'Tailspot Blenny', slug: { current: 'tailspot-blenny' }, category: 'fish', price: 2499, inStock: true, stockCount: 4, images: [], shortDescription: 'Excellent algae grazer. Peaceful, reef-safe, personable fish.', careLevel: 'Beginner' },
  { _id: '11', name: 'Hammer Coral (Branching Purple)', slug: { current: 'hammer-coral-branching-purple' }, category: 'corals', price: 4499, inStock: false, images: [], shortDescription: 'Purple branching hammer with teal tips. Medium light, medium flow.', careLevel: 'Beginner' },
  { _id: '12', name: 'Bubble Tip Anemone (Red)', slug: { current: 'bta-red' }, category: 'inverts', price: 5999, inStock: true, stockCount: 2, images: [], shortDescription: 'RBTA, great host for clownfish. Captive-propagated.', careLevel: 'Intermediate' },
]

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.inStock) return
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.asset?.url,
      slug: product.slug.current,
    })
    toast({ title: 'Added to cart!', description: product.name, variant: 'success' as never })
  }

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null

  return (
    <Link href={`/shop/${product.slug.current}`} className="group block h-full">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image */}
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
                {product.category === 'corals' ? '🪸' : product.category === 'fish' ? '🐠' : product.category === 'inverts' ? '🦐' : '⚙️'}
              </span>
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full">
                Out of Stock
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            )}
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

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-navy text-sm leading-tight line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 mb-3 flex-1">
            {product.shortDescription}
          </p>

          {/* Stock indicator */}
          {product.inStock && product.stockCount !== undefined && product.stockCount <= 3 && (
            <p className="text-amber-600 text-xs font-medium mb-2">
              ⚠️ Only {product.stockCount} left
            </p>
          )}

          <div className="flex items-center justify-between mt-auto">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-navy text-lg">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-gray-400 text-sm line-through">{formatPrice(product.compareAtPrice)}</span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {product.inStock ? (
                  <>
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-600 text-xs font-medium">In Stock</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 text-red-400" />
                    <span className="text-red-500 text-xs font-medium">Out of Stock</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              aria-label={`Add ${product.name} to cart`}
              className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center hover:bg-aqua transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ShopGrid({ initialProducts }: ShopGridProps) {
  const products = initialProducts.length > 0 ? initialProducts : PLACEHOLDER_PRODUCTS
  const [category, setCategory] = React.useState('all')
  const [sort, setSort] = React.useState('default')
  const [search, setSearch] = React.useState('')
  const [showFilters, setShowFilters] = React.useState(false)

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

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          ✅ {inStockCount} items in stock right now
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-3">
          Live Inventory
        </h1>
        <p className="text-gray-500 text-lg max-w-xl">
          Every item listed is available in our facility today. DOA guarantee on all livestock.
        </p>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search livestock & equipment…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-11 px-3 rounded-md border border-input bg-background text-sm"
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              category === cat.value
                ? 'bg-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {cat.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-500 self-center">
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl mb-2">😕</p>
          <p className="text-gray-500">No products found. Try adjusting your filters.</p>
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

      {/* DOA policy reminder */}
      <div className="mt-12 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
        <h3 className="font-semibold text-emerald-800 mb-1">🛡️ 48-Hour DOA Guarantee</h3>
        <p className="text-emerald-700 text-sm">
          All livestock is backed by our Dead on Arrival policy. If any animal doesn&apos;t
          arrive alive and healthy, we&apos;ll issue a full credit.{' '}
          <Link href="/doa-policy" className="underline font-medium">
            See DOA policy →
          </Link>
        </p>
      </div>
    </div>
  )
}
