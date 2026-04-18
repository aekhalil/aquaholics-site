import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { PRODUCT_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import { ProductDetail } from '@/components/shop/ProductDetail'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
    if (!product) return { title: 'Not Found', robots: { index: false, follow: false } }
    return {
      title: `${product.name} — Client Livestock`,
      description: product.shortDescription,
      robots: { index: false, follow: false },
    }
  } catch {
    return { title: 'Livestock', robots: { index: false, follow: false } }
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let product = null
  try {
    product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
  } catch {
    // Will use placeholder
  }
  if (!product) notFound()
  return (
    <main className="min-h-screen pt-20">
      <ProductDetail product={product} />
    </main>
  )
}
