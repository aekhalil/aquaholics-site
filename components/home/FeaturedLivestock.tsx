'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingCart, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/components/shop/CartProvider'
import { useToast } from '@/components/ui/use-toast'
import { formatPrice } from '@/lib/utils'

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
  equipment: 'bg-gray-100 text-gray-700',
}

const CARE_COLORS: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
  Expert: 'bg-purple-100 text-purple-700',
}

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
    toast({
      title: 'Added to cart!',
      description: product.name,
      variant: 'success' as never,
    })
  }

  return (
    <Link href={`/shop/${product.slug.current}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image */}
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
              {product.category === 'corals' ? '🪸' : product.category === 'fish' ? '🐠' : product.category === 'inverts' ? '🦐' : '⚙️'}
            </div>
          )}

          {/* Stock status overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}

          {/* Care level badge */}
          {product.careLevel && (
            <div className="absolute top-2 left-2">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  CARE_COLORS[product.careLevel] ?? 'bg-gray-100 text-gray-600'
                }`}
              >
                {product.careLevel}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-navy text-sm leading-tight line-clamp-2">
              {product.name}
            </h3>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                CATEGORY_COLORS[product.category] ?? 'bg-gray-100 text-gray-600'
              }`}
            >
              {product.category}
            </span>
          </div>

          <p className="text-gray-500 text-xs line-clamp-2 mb-3 flex-1">
            {product.shortDescription}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="font-bold text-navy text-lg">
                {formatPrice(product.price)}
              </span>
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
              className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center hover:bg-aqua transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Static placeholder products shown before Sanity loads
const PLACEHOLDER_PRODUCTS: Product[] = [
  { _id: '1', name: 'Acropora millepora (Green Tip)', slug: { current: 'acropora-millepora-green-tip' }, category: 'corals', price: 4999, inStock: true, images: [], shortDescription: 'A stunning branching SPS coral with vivid green polyp tips. Perfect for high-flow, high-light SPS systems.', careLevel: 'Advanced' },
  { _id: '2', name: 'Mandarin Dragonet', slug: { current: 'mandarin-dragonet' }, category: 'fish', price: 5999, inStock: true, images: [], shortDescription: 'One of the most strikingly colored fish in the hobby. Trained to eat frozen food.', careLevel: 'Intermediate' },
  { _id: '3', name: 'Hammer Coral (Gold)', slug: { current: 'hammer-coral-gold' }, category: 'corals', price: 3499, inStock: true, images: [], shortDescription: 'Gold/yellow branching hammer with excellent polyp extension. LPS beginner-friendly.', careLevel: 'Beginner' },
  { _id: '4', name: 'Peppermint Shrimp (3-pack)', slug: { current: 'peppermint-shrimp-3pack' }, category: 'inverts', price: 2999, inStock: true, images: [], shortDescription: 'Natural aiptasia eaters. Hardy, active cleaners safe for reef tanks.', careLevel: 'Beginner' },
  { _id: '5', name: 'Orange Storm Clownfish (Pair)', slug: { current: 'orange-storm-clownfish-pair' }, category: 'fish', price: 8999, inStock: false, images: [], shortDescription: 'Stunning designer clownfish in a captive-bred mated pair. ORA stock.', careLevel: 'Beginner' },
  { _id: '6', name: 'Duncan Coral (10-head)', slug: { current: 'duncan-coral-10head' }, category: 'corals', price: 5499, inStock: true, images: [], shortDescription: 'Large 10-head Australian Duncan with green centers. Fast grower in medium light.', careLevel: 'Beginner' },
  { _id: '7', name: 'Tuxedo Urchin', slug: { current: 'tuxedo-urchin' }, category: 'inverts', price: 1999, inStock: true, images: [], shortDescription: 'Excellent algae grazer with a stunning blue body. Safe for most reef fish.', careLevel: 'Beginner' },
  { _id: '8', name: 'AI Prime 16HD LED', slug: { current: 'ai-prime-16hd' }, category: 'equipment', price: 26999, inStock: true, images: [], shortDescription: 'Versatile, WiFi-controlled reef LED with full spectrum output. Covers tanks up to 24".', careLevel: undefined },
]

export function FeaturedLivestock({ products }: FeaturedLivestockProps) {
  const displayProducts = products.length > 0 ? products : PLACEHOLDER_PRODUCTS

  return (
    <section className="py-24 bg-gray-50" aria-labelledby="livestock-heading">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Live Inventory — Updated Daily
            </div>
            <h2
              id="livestock-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-navy"
            >
              Fresh Livestock &amp; Equipment
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg">
              Every item listed is <strong className="text-navy">in our facility right now</strong>.
              No bait-and-switch, no backorder surprises.
            </p>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">
              Shop All Inventory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Product grid */}
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

        {/* Shop CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-ocean-gradient rounded-3xl p-8 sm:p-12 text-white text-center"
        >
          <h3 className="font-display text-3xl font-bold mb-3">
            🐠 New Livestock Arrives Every Thursday
          </h3>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Sign up for restock alerts and get first access to rare corals, designer clowns, and
            specialty fish before they sell out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="lg">
              <Link href="/shop">Browse Full Inventory</Link>
            </Button>
            <Button asChild variant="outline-white" size="lg">
              <Link href="/quote?type=livestock">Request Specific Livestock</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
