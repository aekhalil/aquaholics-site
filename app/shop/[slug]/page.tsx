import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { PRODUCT_BY_SLUG_QUERY, ALL_PRODUCTS_QUERY } from '@/lib/sanity/queries'
import { ProductDetail } from '@/components/shop/ProductDetail'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const products = await client.fetch(ALL_PRODUCTS_QUERY)
    return products.map((p: { slug: { current: string } }) => ({ slug: p.slug.current }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
    if (!product) return { title: 'Product Not Found' }
    return {
      title: `${product.name} — Buy Online | Aquaholics`,
      description: product.shortDescription,
      openGraph: {
        title: product.name,
        description: product.shortDescription,
        images: product.images?.[0] ? [{ url: product.images[0].asset.url }] : [],
      },
    }
  } catch {
    return { title: 'Product' }
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
