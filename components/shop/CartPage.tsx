'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/shop/CartProvider'
import { useToast } from '@/components/ui/use-toast'
import { formatPrice } from '@/lib/utils'

export function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const [checkingOut, setCheckingOut] = React.useState(false)
  const { toast } = useToast()

  const handleCheckout = async () => {
    if (items.length === 0) return
    setCheckingOut(true)
    try {
      const res = await fetch('/api/stripe/create-product-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            stripePriceId: item.stripePriceId,
          })),
        }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch {
      toast({ title: 'Checkout error', description: 'Please try again or call us.', variant: 'destructive' })
    } finally {
      setCheckingOut(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 max-w-2xl text-center py-20">
        <div className="text-8xl mb-6">🐠</div>
        <h1 className="font-display text-3xl font-bold text-navy mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some livestock or equipment to get started.</p>
        <Button asChild size="lg">
          <Link href="/shop">Browse Shop</Link>
        </Button>
      </div>
    )
  }

  const shipping = 0 // Calculated at checkout
  const tax = Math.round(total * 0.07) // FL sales tax estimate

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-navy">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4"
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-aqua/10 flex items-center justify-center text-2xl">
                    🐠
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/shop/${item.slug}`}
                  className="font-semibold text-navy hover:text-aqua transition-colors line-clamp-1"
                >
                  {item.name}
                </Link>
                <p className="text-gray-500 text-sm mt-0.5">{formatPrice(item.price)} each</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 hover:bg-gray-50 text-gray-600"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-3 py-2 font-medium text-sm min-w-[36px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-50 text-gray-600"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-navy">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-navy mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-emerald-600">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (est.)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-navy text-base">
                <span>Total (est.)</span>
                <span>{formatPrice(total + tax)}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={checkingOut}
              variant="gold"
              size="lg"
              className="w-full gap-2 mb-4"
            >
              {checkingOut ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Redirecting…
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/shop">Continue Shopping</Link>
            </Button>

            <div className="mt-6 space-y-2 text-xs text-gray-400 text-center">
              <p>🔒 Secure checkout powered by Stripe</p>
              <p>🐠 48-hour DOA guarantee on all livestock</p>
              <p>✈️ Overnight shipping available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
