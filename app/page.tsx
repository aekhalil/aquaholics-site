import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import {
  FEATURED_PRODUCTS_QUERY,
  TESTIMONIALS_QUERY,
  FAQS_QUERY,
  ALL_GALLERY_QUERY,
} from '@/lib/sanity/queries'
import { Hero } from '@/components/home/Hero'
import { TrustBadges } from '@/components/home/TrustBadges'
import { BrandPartners } from '@/components/home/BrandPartners'
import { ServiceTiers } from '@/components/home/ServiceTiers'
import { CommercialSection } from '@/components/home/CommercialSection'
import { FeaturedLivestock } from '@/components/home/FeaturedLivestock'
import { BeforeAfterGallery } from '@/components/home/BeforeAfterGallery'
import { WhyAquaholics } from '@/components/home/WhyAquaholics'
import { Testimonials } from '@/components/home/Testimonials'
import { CalBooking } from '@/components/home/CalBooking'
import { HomeFAQ } from '@/components/home/HomeFAQ'
import { NewsletterBanner } from '@/components/home/NewsletterBanner'

// ISR — revalidate home page every 60s so CMS updates appear quickly
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Aquaholics Aquarium Services | #1 Aquarium Service in West Palm Beach, FL',
  description:
    'Palm Beach County\'s saltwater specialists. Aquaholics handles installation, maintenance, relocation & coral care — 20-gallon nano reefs to 500-gallon custom builds. Jupiter, WPB, Palm Beach Gardens, Lake Worth & more.',
  alternates: {
    canonical: '/',
  },
}

async function getHomeData() {
  // Parallel data fetching for all home page sections
  const [products, testimonials, faqs, galleryProjects] = await Promise.allSettled([
    client.fetch(FEATURED_PRODUCTS_QUERY),
    client.fetch(TESTIMONIALS_QUERY),
    client.fetch(FAQS_QUERY),
    client.fetch(ALL_GALLERY_QUERY),
  ])

  return {
    products: products.status === 'fulfilled' ? products.value : [],
    testimonials: testimonials.status === 'fulfilled' ? testimonials.value : [],
    faqs: faqs.status === 'fulfilled' ? faqs.value : [],
    galleryProjects: galleryProjects.status === 'fulfilled' ? galleryProjects.value : [],
  }
}

export default async function HomePage() {
  const { products, testimonials, faqs, galleryProjects } = await getHomeData()

  return (
    <>
      <Hero />
      <TrustBadges />
      <BrandPartners />
      <ServiceTiers />
      <CommercialSection />
      <FeaturedLivestock products={products} />
      <BeforeAfterGallery projects={galleryProjects} />
      <WhyAquaholics />
      <Testimonials testimonials={testimonials} />
      <CalBooking />
      <HomeFAQ faqs={faqs} />
      <NewsletterBanner />
    </>
  )
}
