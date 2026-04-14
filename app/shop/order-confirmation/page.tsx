import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export const metadata: Metadata = { title: 'Order Confirmed!', robots: { index: false } }

export default function OrderConfirmation() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-gray-50 flex items-center">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12">
          <div className="text-6xl mb-4">🐠</div>
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-navy mb-3">Order Confirmed!</h1>
          <p className="text-gray-500 mb-6">
            Thank you for your order! You&apos;ll receive a confirmation email shortly with
            shipping details and tracking information.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Livestock orders are typically shipped overnight on Monday–Thursday to ensure live
            arrival. Our team will email you the day before shipping.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default" size="lg">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
