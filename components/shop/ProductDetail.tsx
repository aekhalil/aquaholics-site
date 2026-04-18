'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ReserveButton } from '@/components/shop/ReserveButton'
import { formatPrice, cn } from '@/lib/utils'

interface ProductDetailProps {
  product: {
    _id: string
    name: string
    slug: { current: string }
    category: string
    price: number
    inStock: boolean
    stockCount?: number
    sku?: string
    images: Array<{ asset: { url: string; metadata?: { lqip?: string } } }>
    shortDescription: string
    description?: string
    careLevel?: string
    waterType?: string
    careGuide?: string
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = React.useState(0)

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
        <Link href="/shop" className="hover:text-aqua flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to livestock
        </Link>
        <span>/</span>
        <span className="capitalize text-gray-600">{product.category}</span>
        <span>/</span>
        <span className="text-navy truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
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
                  {product.category === 'corals' ? '🪸' : product.category === 'fish' ? '🐠' : '🦐'}
                </span>
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full text-lg">Currently unavailable</span>
              </div>
            )}
          </div>

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

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="default" className="capitalize">{product.category}</Badge>
            {product.careLevel && <Badge variant="outline">{product.careLevel}</Badge>}
            {product.waterType && <Badge variant="outline">{product.waterType}</Badge>}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-3">
            {product.name}
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">{product.shortDescription}</p>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-4xl font-bold text-navy">{formatPrice(product.price)}</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            {product.inStock ? (
              <>
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-emerald-600 font-medium">Available</span>
                {product.stockCount && product.stockCount <= 5 && (
                  <span className="text-amber-600 text-sm">— Only {product.stockCount} in holding</span>
                )}
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-500 font-medium">Currently unavailable</span>
              </>
            )}
          </div>

          <div className="mb-8">
            <ReserveButton
              productId={product._id}
              productName={product.name}
              inStock={product.inStock}
              stockCount={product.stockCount}
            />
          </div>

          <div className="rounded-2xl bg-aqua/5 border border-aqua/20 p-4 text-sm text-navy/80 leading-relaxed mb-8">
            <strong className="text-navy">Local only.</strong> Aquaholics isn&apos;t an online store
            and doesn&apos;t ship. Pickup at Nick&apos;s holding system in Riviera Beach, or add it
            to your next service visit.
          </div>

          {product.description && (
            <div className="border-t border-gray-100 pt-6">
              <h2 className="font-semibold text-navy mb-3">Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {product.careGuide && (
            <div className="border-t border-gray-100 pt-6 mt-6">
              <h2 className="font-semibold text-navy mb-3">Care Guide</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{product.careGuide}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
