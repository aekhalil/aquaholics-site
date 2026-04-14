import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { ALL_PRODUCTS_QUERY } from '@/lib/sanity/queries'
import { ShopGrid } from '@/components/shop/ShopGrid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Shop — Corals, Fish, Inverts & Equipment',
  description:
    'Buy live saltwater fish, coral frags, invertebrates, and aquarium equipment online. Real-time inventory — if it\'s listed, it\'s in stock. DOA guarantee on all livestock.',
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
