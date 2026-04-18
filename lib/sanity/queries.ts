import { groq } from 'next-sanity'

// ── Blog ────────────────────────────────────────────────────────────────────
export const ALL_POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt,
    mainImage { asset->{ url, metadata { lqip, dimensions } } },
    categories, readTime
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, excerpt, publishedAt, readTime, categories,
    mainImage { asset->{ url, metadata { lqip, dimensions } } },
    body,
    "relatedPosts": *[_type == "blogPost" && slug.current != $slug] | order(publishedAt desc)[0..2] {
      _id, title, slug, excerpt, publishedAt,
      mainImage { asset->{ url, metadata { lqip, dimensions } } }
    }
  }
`

// ── Livestock ────────────────────────────────────────────────────────────────
export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product" && category in ["corals", "fish", "inverts"]] | order(_createdAt desc) {
    _id, name, slug, category, price,
    inStock, stockCount, isFeatured,
    images[0] { asset->{ url, metadata { lqip, dimensions } } },
    shortDescription, careLevel
  }
`

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug && category in ["corals", "fish", "inverts"]][0] {
    _id, name, slug, category, price,
    inStock, stockCount, sku,
    images[] { asset->{ url, metadata { lqip, dimensions } } },
    shortDescription, description, careLevel, waterType, careGuide
  }
`

export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && isFeatured == true && category in ["corals", "fish", "inverts"]][0..7] {
    _id, name, slug, category, price, inStock,
    images[0] { asset->{ url, metadata { lqip, dimensions } } },
    shortDescription, careLevel
  }
`

// ── Services ─────────────────────────────────────────────────────────────────
export const ALL_SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    _id, title, slug, tagline, shortDescription, icon,
    heroImage { asset->{ url, metadata { lqip, dimensions } } }
  }
`

// ── Pricing Tiers ─────────────────────────────────────────────────────────────
export const MAINTENANCE_TIERS_QUERY = groq`
  *[_type == "pricingTier"] | order(order asc) {
    _id, name, price, billingCycle, tagline, features, isPopular,
    stripePriceId, callToAction
  }
`

// ── Testimonials ──────────────────────────────────────────────────────────────
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(rating desc)[0..11] {
    _id, name, location, rating, text, service, date,
    avatar { asset->{ url } }
  }
`

// ── Gallery ───────────────────────────────────────────────────────────────────
export const ALL_GALLERY_QUERY = groq`
  *[_type == "galleryProject"] | order(_createdAt desc) {
    _id, title, slug, category, location, tankSize,
    coverImage { asset->{ url, metadata { lqip, dimensions } } },
    images[0..2] { asset->{ url, metadata { lqip, dimensions } } }
  }
`

// ── FAQs ──────────────────────────────────────────────────────────────────────
export const FAQS_QUERY = groq`
  *[_type == "faq"] | order(order asc) {
    _id, question, answer, category
  }
`

// ── Team Members ──────────────────────────────────────────────────────────────
export const TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, bio, certifications,
    photo { asset->{ url, metadata { lqip, dimensions } } }
  }
`

// ── Service Areas ─────────────────────────────────────────────────────────────
export const ALL_SERVICE_AREAS_QUERY = groq`
  *[_type == "serviceArea"] | order(name asc) {
    _id, name, slug, county, population, heroTagline
  }
`

export const SERVICE_AREA_BY_SLUG_QUERY = groq`
  *[_type == "serviceArea" && slug.current == $slug][0] {
    _id, name, slug, county, population,
    heroTagline, intro, services, faqs,
    testimonials[] { name, rating, text, neighborhood },
    mapEmbedUrl, neighborhoods
  }
`
