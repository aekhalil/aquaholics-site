import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { SERVICE_AREA_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import { SERVICE_AREAS } from '@/lib/service-areas-data'
import { ServiceAreaPage } from '@/components/service-areas/ServiceAreaPage'

export const revalidate = 3600

// Generate static params for all 15 cities
export async function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ city: area.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const area = SERVICE_AREAS.find((a) => a.slug === city)
  if (!area) return { title: 'Not Found' }

  const title = `Aquarium Service in ${area.name}, FL | Aquaholics`
  const description = `Professional aquarium installation, maintenance & livestock in ${area.name}, FL. Serving ${area.name} and all of Palm Beach County. Free consultation — call (561) 388-7262.`

  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${city}` },
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

async function getAreaData(city: string) {
  const staticArea = SERVICE_AREAS.find((a) => a.slug === city)
  if (!staticArea) return null

  // Try Sanity first for richer content, fall back to static data
  try {
    const sanityArea = await client.fetch(SERVICE_AREA_BY_SLUG_QUERY, { slug: city })
    return sanityArea ?? staticArea
  } catch {
    return staticArea
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const area = await getAreaData(city)
  if (!area) notFound()

  return (
    <main className="min-h-screen">
      <ServiceAreaPage area={area} />
    </main>
  )
}
