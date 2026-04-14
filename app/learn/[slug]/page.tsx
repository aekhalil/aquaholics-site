import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { POST_BY_SLUG_QUERY, ALL_POSTS_QUERY } from '@/lib/sanity/queries'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'

export const revalidate = 300

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(ALL_POSTS_QUERY)
    return posts.map((p: { slug: { current: string } }) => ({ slug: p.slug.current }))
  } catch { return [] }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })
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
        images: post.mainImage ? [{ url: post.mainImage.asset.url }] : [],
      },
    }
  } catch { return { title: 'Blog Post' } }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = null
  try { post = await client.fetch(POST_BY_SLUG_QUERY, { slug }) } catch {}
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: post.mainImage?.asset?.url,
    author: { '@type': 'Organization', name: 'Aquaholics Aquarium Services LLC' },
    publisher: {
      '@type': 'Organization',
      name: 'Aquaholics Aquarium Services LLC',
      logo: { '@type': 'ImageObject', url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png` },
    },
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back link */}
        <Link href="/learn" className="flex items-center gap-2 text-gray-400 hover:text-aqua text-sm mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          {post.categories?.[0] && (
            <span className="text-aqua text-sm font-semibold uppercase tracking-wider mb-3 block">
              {post.categories[0]}
            </span>
          )}
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-500 text-xl mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </span>
            )}
          </div>
        </div>

        {/* Cover image */}
        {post.mainImage && (
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-10">
            <Image
              src={post.mainImage.asset.url}
              alt={post.title}
              fill
              className="object-cover"
              priority
              placeholder={post.mainImage.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={post.mainImage.asset.metadata?.lqip}
            />
          </div>
        )}

        {/* Article body — Sanity rich text rendered as plain text for now */}
        {/* In production, use @portabletext/react to render Sanity's block content */}
        <article className="prose prose-lg prose-aqua max-w-none mb-16">
          {post.body ? (
            <p className="text-gray-600 leading-relaxed">
              {/* Portable text blocks — install @portabletext/react and replace this */}
              {JSON.stringify(post.body).substring(0, 500)}…
            </p>
          ) : (
            <p className="text-gray-500 italic">Article content managed via Sanity CMS.</p>
          )}
        </article>

        {/* In-article CTA */}
        <div className="bg-ocean-gradient rounded-3xl p-8 text-white text-center mb-12">
          <h3 className="font-display text-2xl font-bold mb-3">
            Need Expert Help With Your Tank?
          </h3>
          <p className="text-white/70 mb-6">
            Our Palm Beach County team is ready to assist. Free consultation, no obligation.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link href="/quote">Get Free Quote →</Link>
          </Button>
        </div>

        {/* Related posts */}
        {post.relatedPosts?.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-navy mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {post.relatedPosts.map((related: { _id: string; title: string; slug: { current: string }; excerpt: string; publishedAt: string }) => (
                <Link
                  key={related._id}
                  href={`/learn/${related.slug.current}`}
                  className="group bg-gray-50 rounded-2xl p-5 hover:bg-white hover:shadow-lg transition-all"
                >
                  <h3 className="font-semibold text-navy text-sm group-hover:text-aqua transition-colors line-clamp-2 mb-2">
                    {related.title}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
