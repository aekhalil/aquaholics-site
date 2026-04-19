import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { ALL_PRODUCTS_QUERY } from '@/lib/sanity/queries'
import { ShopGrid } from '@/components/shop/ShopGrid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Available Livestock — Client Access',
  description: 'Corals, fish, and invertebrates currently held at Aquaholic in Riviera Beach, FL. Client access only — no shipping.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/shop' },
}

async function getProducts() {
  try {
    return await client.fetch(ALL_PRODUCTS_QUERY)
  } catch {
    return []
  }
}

export default async function ShopPage() {
  const products = await getProducts()
  return (
    <main className="min-h-screen pt-20">
      <ShopGrid initialProducts={products} />
    </main>
  )
}
