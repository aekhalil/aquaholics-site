import type { Metadata } from 'next'
import { CartPage } from '@/components/shop/CartPage'

export const metadata: Metadata = {
  title: 'Your Cart',
  robots: { index: false },
}

export default function Cart() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-gray-50">
      <CartPage />
    </main>
  )
}
