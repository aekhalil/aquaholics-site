'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, CheckCircle, XCircle, Star, Shield, Truck, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/components/shop/CartProvider'
import { useToast } from '@/components/ui/use-toast'
import { formatPrice, cn } from '@/lib/utils'

interface ProductDetailProps {
  product: {
    _id: string
    name: string
    slug: { current: string }
    category: string
    price: number
    compareAtPrice?: number
    inStock: boolean
    stockCount?: number
    sku?: string
    images: Array<{ asset: { url: string; metadata?: { lqip?: string } } }>
    shortDescription: string
    description?: string
    careLevel?: string
    waterType?: string
    careGuide?: string
    doaPolicy?: string
    reviews?: Array<{ name: string; rating: number; text: string; date: string }>
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [quantity, setQuantity] = React.useState(1)
  const [checkingOut, setCheckingOut] = React.useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.asset?.url,
        slug: product.slug.current,
      })
    }
    toast({ title: 'Added to cart!', description: `${quantity}× ${product.name}`, variant: 'success' as never })
  }

  const handleBuyNow = async () => {
    setCheckingOut(true)
    try {
      const res = await fetch('/api/stripe/create-product-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            name: product.name,
            price: product.price,
            quantity,
            image: product.images?.[0]?.asset?.url,
          }],
        }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch {
      toast({ title: 'Checkout error', description: 'Please try again.', variant: 'destructive' })
    } finally {
      setCheckingOut(false)
    }
  }

  const avgRating = product.reviews?.length
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : null

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images?.[0]?.asset?.url,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toFixed(2),
      priceCurrency: 'USD',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Aquaholics Aquarium Services LLC' },
    },
    ...(avgRating && product.reviews ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: product.reviews.length,
      },
    } : {}),
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
        <Link href="/shop" className="hover:text-aqua flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Shop
        </Link>
        <span>/</span>
        <span className="capitalize text-gray-600">{product.category}</span>
        <span>/</span>
        <span className="text-navy truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 mb-4">
            {product.images?.[selectedImage] ? (
              <Image
                src={product.images[selectedImage].asset.url}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-navy/10 to-aqua/10 flex items-center justify-center">
                <span className="text-9xl">
                  {product.category === 'corals' ? '🪸' : product.category === 'fish' ? '🐠' : product.category === 'inverts' ? '🦐' : '⚙️'}
                </span>
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full text-lg">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn('relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all', selectedImage === i ? 'border-aqua' : 'border-transparent hover:border-gray-300')}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img.asset.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {/* Category + care level */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="default" className="capitalize">{product.category}</Badge>
            {product.careLevel && <Badge variant="outline">{product.careLevel}</Badge>}
            {product.waterType && <Badge variant="outline">{product.waterType}</Badge>}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          {avgRating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn('h-4 w-4', i < Math.round(avgRating) ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200')} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews?.length} reviews)</span>
            </div>
          )}

          <p className="text-gray-600 leading-relaxed mb-6">{product.shortDescription}</p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-4xl font-bold text-navy">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-gray-400 text-xl line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            {product.inStock ? (
              <>
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-emerald-600 font-medium">In Stock</span>
                {product.stockCount && product.stockCount <= 5 && (
                  <span className="text-amber-600 text-sm">— Only {product.stockCount} remaining</span>
                )}
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-500 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Quantity + add to cart */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-gray-50 font-bold text-lg"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-4 py-3 font-semibold min-w-[48px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stockCount ?? 99, quantity + 1))}
                className="px-4 py-3 hover:bg-gray-50 font-bold text-lg"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              variant="navy"
              size="lg"
              className="flex-1 gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          <Button
            onClick={handleBuyNow}
            disabled={!product.inStock || checkingOut}
            variant="gold"
            size="lg"
            className="w-full mb-6"
          >
            {checkingOut ? 'Redirecting to checkout…' : 'Buy Now — Secure Checkout'}
          </Button>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: Shield, text: '48-hr DOA Guarantee' },
              { icon: Truck, text: 'Overnight shipping available' },
              { icon: CheckCircle, text: 'Captive-bred when noted' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                <Icon className="h-5 w-5 text-aqua mb-1" />
                <span className="text-xs text-gray-600">{text}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          {product.description && (
            <div className="border-t border-gray-100 pt-6">
              <h2 className="font-semibold text-navy mb-3">Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Care guide */}
          {product.careGuide && (
            <div className="border-t border-gray-100 pt-6 mt-6">
              <h2 className="font-semibold text-navy mb-3">Care Guide</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{product.careGuide}</p>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-16 border-t border-gray-100 pt-12" aria-label="Customer reviews">
          <h2 className="font-display text-2xl font-bold text-navy mb-8">
            Customer Reviews ({product.reviews.length})
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.reviews.map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={cn('h-3.5 w-3.5', j < review.rating ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200')} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-700 text-sm mb-3">&ldquo;{review.text}&rdquo;</p>
                <p className="font-semibold text-navy text-sm">{review.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
