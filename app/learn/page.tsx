import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'

export const revalidate = 300

async function getPosts() {
  try { return await client.fetch(ALL_POSTS_QUERY) } catch { return [] }
}

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPosts()
  const hasRealContent = posts.length > 0
  return {
    title: 'Aquarium Tips & Guides | Aquaholics Blog',
    description: "Expert aquarium care guides, reef keeping tutorials, fish profiles, and coral care tips from West Palm Beach's premier aquarium specialists.",
    alternates: { canonical: '/learn' },
    // noindex until Sanity is populated with real posts
    robots: hasRealContent
      ? { index: true, follow: true }
      : { index: false, follow: false },
  }
}

const PLACEHOLDER_POSTS = [
  { _id: '1', title: 'How to Cycle a Saltwater Tank in 30 Days', slug: { current: 'cycle-saltwater-tank' }, excerpt: 'The nitrogen cycle is the foundation of every successful reef tank. Here\'s our proven 30-day method for establishing a stable, thriving biological filter.', publishedAt: '2024-11-01', categories: ['Beginner Guides'], readTime: 8, mainImage: null },
  { _id: '2', title: 'Top 10 Corals for Beginner Reef Keepers', slug: { current: 'beginner-corals' }, excerpt: 'Starting your first reef? These 10 hardy, forgiving corals are the best place to begin. We\'ve ranked them by ease of care and visual impact.', publishedAt: '2024-10-15', categories: ['Coral Care'], readTime: 6, mainImage: null },
  { _id: '3', title: 'Understanding Water Parameters: The Complete Guide', slug: { current: 'water-parameters-guide' }, excerpt: 'Salinity, pH, alkalinity, calcium, magnesium — each parameter tells a story about your tank. Here\'s how to read them and keep everything in balance.', publishedAt: '2024-10-01', categories: ['Water Chemistry'], readTime: 12, mainImage: null },
  { _id: '4', title: 'Mandarin Dragonet: Care Guide & Feeding Tips', slug: { current: 'mandarin-dragonet-care' }, excerpt: 'The Mandarin Dragonet is one of the most stunning fish in the hobby — and one of the most challenging. Here\'s how to keep one successfully.', publishedAt: '2024-09-20', categories: ['Fish Care'], readTime: 7, mainImage: null },
  { _id: '5', title: 'Common Reef Tank Problems & How to Fix Them', slug: { current: 'reef-tank-problems' }, excerpt: 'Cyano outbreaks, aiptasia, RTN, alk crashes — we\'ve seen it all. This guide covers the 10 most common reef problems and exactly how to solve them.', publishedAt: '2024-09-05', categories: ['Troubleshooting'], readTime: 10, mainImage: null },
  { _id: '6', title: 'The Best LED Lights for Reef Tanks in 2024', slug: { current: 'best-reef-led-2024' }, excerpt: 'LED technology has transformed reef keeping. We compare the top fixtures for every budget, from the AI Prime to the Radion XR30.', publishedAt: '2024-08-20', categories: ['Equipment'], readTime: 9, mainImage: null },
]

export default async function LearnPage() {
  const posts = await getPosts()
  const hasRealContent = posts.length > 0
  const display = hasRealContent ? posts : PLACEHOLDER_POSTS

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Aquarium Education
          </div>
          <h1 className="font-display text-5xl font-bold text-navy mb-4">
            The Aquaholics Blog
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            Expert guides, care tips, and reef inspiration from West Palm Beach&apos;s most
            experienced aquarium team.
          </p>
        </div>

        {/* Coming soon notice when using placeholders */}
        {!hasRealContent && (
          <div className="max-w-xl mx-auto mb-10 bg-aqua/10 border border-aqua/20 rounded-2xl px-6 py-4 text-center text-sm text-navy/70">
            Articles coming soon — check back for reef keeping guides, coral care tips, and more from Nick.
          </div>
        )}

        {/* Post grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {display.map((post: typeof PLACEHOLDER_POSTS[0]) => (
            <Link
              key={post._id}
              href={`/learn/${post.slug.current}`}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-video bg-gradient-to-br from-navy/10 to-aqua/10 overflow-hidden">
                {post.mainImage ? (
                  <Image
                    src={(post.mainImage as { asset: { url: string } }).asset.url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">🐠</div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {post.categories?.[0] && (
                  <span className="text-aqua text-xs font-semibold uppercase tracking-wider mb-2">
                    {post.categories[0]}
                  </span>
                )}
                <h2 className="font-display text-xl font-bold text-navy mb-3 group-hover:text-aqua transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  {post.readTime && <span>{post.readTime} min read</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
