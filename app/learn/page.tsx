import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import { DEMO_POSTS } from '@/lib/demo-posts'

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
    robots: hasRealContent
      ? { index: true, follow: true }
      : { index: false, follow: false },
  }
}

type DisplayPost = {
  _id: string
  slug: { current: string }
  title: string
  excerpt: string
  publishedAt: string
  readTime?: number
  category?: string
  image?: string
}

export default async function LearnPage() {
  const sanityPosts = await getPosts()
  const hasRealContent = sanityPosts.length > 0

  const display: DisplayPost[] = hasRealContent
    ? sanityPosts.map((p: { _id: string; slug: { current: string }; title: string; excerpt: string; publishedAt: string; readTime?: number; categories?: string[]; mainImage?: { asset: { url: string } } }) => ({
        _id: p._id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        publishedAt: p.publishedAt,
        readTime: p.readTime,
        category: p.categories?.[0],
        image: p.mainImage?.asset?.url,
      }))
    : DEMO_POSTS.map((p) => ({
        _id: p._id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        publishedAt: p.publishedAt,
        readTime: p.readTime,
        category: p.category,
        image: p.image,
      }))

  return (
    <main className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Aquarium Education
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4">
            The Aquaholics Blog
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Expert guides, care tips, and reef inspiration from West Palm Beach&apos;s most
            experienced aquarium team.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {display.map((post) => (
            <Link
              key={post._id}
              href={`/learn/${post.slug.current}`}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video bg-gradient-to-br from-navy/10 to-aqua/10 overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">🐠</div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                {post.category && (
                  <span className="text-aqua text-xs font-semibold uppercase tracking-wider mb-2">
                    {post.category}
                  </span>
                )}
                <h2 className="font-display text-xl font-bold text-navy mb-3 group-hover:text-aqua transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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
