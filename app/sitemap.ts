import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import { SERVICE_AREAS } from '@/lib/service-areas-data'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aquaholicspb.com'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/services/installation`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/maintenance`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/services/emergency`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/aquascaping`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/learn`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Service area routes (15 cities)
  const areaRoutes: MetadataRoute.Sitemap = SERVICE_AREAS.map((area) => ({
    url: `${SITE_URL}/service-areas/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Dynamic blog posts
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await client.fetch(ALL_POSTS_QUERY)
    blogRoutes = posts.map((post: { slug: { current: string }; publishedAt: string }) => ({
      url: `${SITE_URL}/learn/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {}

  return [...staticRoutes, ...areaRoutes, ...blogRoutes]
}
