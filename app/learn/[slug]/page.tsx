import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { POST_BY_SLUG_QUERY, ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { DEMO_POSTS, getDemoPost, type DemoPost } from '@/lib/demo-posts'

export const revalidate = 300

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(ALL_POSTS_QUERY)
    if (posts?.length) return posts.map((p: { slug: { current: string } }) => ({ slug: p.slug.current }))
  } catch {}
  return DEMO_POSTS.map((p) => ({ slug: p.slug.current }))
}

type RenderedPost = {
  title: string
  excerpt: string
  publishedAt: string
  readTime?: number
  category?: string
  image?: string
  bodyParagraphs?: string[]
  sanityBody?: unknown
  relatedPosts?: { _id: string; title: string; slug: { current: string }; excerpt: string; publishedAt: string }[]
}

async function loadPost(slug: string): Promise<RenderedPost | null> {
  try {
    const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })
    if (post) {
      return {
        title: post.title,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        readTime: post.readTime,
        category: post.categories?.[0],
        image: post.mainImage?.asset?.url,
        sanityBody: post.body,
        relatedPosts: post.relatedPosts,
      }
    }
  } catch {}

  const demo = getDemoPost(slug)
  if (!demo) return null
  const related = DEMO_POSTS.filter((p) => p.slug.current !== slug)
    .slice(0, 3)
    .map((p) => ({ _id: p._id, title: p.title, slug: p.slug, excerpt: p.excerpt, publishedAt: p.publishedAt }))
  return {
    title: demo.title,
    excerpt: demo.excerpt,
    publishedAt: demo.publishedAt,
    readTime: demo.readTime,
    category: demo.category,
    image: demo.image,
    bodyParagraphs: demo.body,
    relatedPosts: related,
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/learn/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.image ? [{ url: post.image }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: post.image,
    author: { '@type': 'Organization', name: 'Aquaholic Aquarium Services LLC' },
    publisher: {
      '@type': 'Organization',
      name: 'Aquaholic Aquarium Services LLC',
      logo: { '@type': 'ImageObject', url: `${process.env.NEXT_PUBLIC_SITE_URL}/Images/Hero_logo.PNG` },
    },
  }

  return (
    <main className="min-h-screen pt-24 pb-20 bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/learn" className="inline-flex items-center gap-2 text-gray-600 hover:text-aqua text-sm mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          {post.category && (
            <span className="text-aqua text-sm font-semibold uppercase tracking-wider mb-3 block">
              {post.category}
            </span>
          )}
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl mb-6 leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            {post.readTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </span>
            )}
          </div>
        </div>

        {post.image && (
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-10 shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <article className="max-w-none mb-16">
          {post.bodyParagraphs ? (
            <div className="space-y-5">
              {post.bodyParagraphs.map((paragraph, i) => (
                <p key={i} className="text-gray-700 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : post.sanityBody ? (
            <p className="text-gray-500 italic">
              Article content managed via Sanity CMS.
            </p>
          ) : (
            <p className="text-gray-500 italic">Article content coming soon.</p>
          )}
        </article>

        <div className="bg-ocean-gradient rounded-3xl p-8 text-white text-center mb-12">
          <h3 className="font-display text-2xl font-bold mb-3">
            Need Expert Help With Your Tank?
          </h3>
          <p className="text-white/80 mb-6">
            Our Palm Beach County team is ready to assist. Free consultation, no obligation.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link href="/quote">Get Free Quote →</Link>
          </Button>
        </div>

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-navy mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {post.relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  href={`/learn/${related.slug.current}`}
                  className="group bg-white rounded-2xl p-5 hover:shadow-lg transition-all border border-gray-100"
                >
                  <h3 className="font-semibold text-navy text-sm group-hover:text-aqua transition-colors line-clamp-2 mb-2">
                    {related.title}
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
