import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { ALL_GALLERY_QUERY } from '@/lib/sanity/queries'
import { portfolioPhotos } from '@/lib/site-images'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Aquarium Portfolio & Gallery | Aquaholic',
  description: 'Browse our portfolio of custom aquarium installations across Palm Beach County — saltwater reefs, freshwater planted tanks, and commercial displays.',
  alternates: { canonical: '/gallery' },
}

async function getProjects() {
  try { return await client.fetch(ALL_GALLERY_QUERY) } catch { return [] }
}

type GalleryItem = {
  _id: string
  title: string
  slug: { current: string }
  category: string
  location: string
  tankSize: string
  coverImage: { asset: { url: string } } | null
  alt?: string
}

const toCover = (photo: { src: string }) => ({ asset: { url: photo.src } })

const PLACEHOLDER: GalleryItem[] = [
  { _id: '1', title: 'Luxury Living Room Red Sea Build', slug: { current: 'living-room-white-cabinet' }, category: 'residential', location: 'Palm Beach County', tankSize: '250 gallons', coverImage: toCover(portfolioPhotos.livingRoomWhiteCabinet), alt: portfolioPhotos.livingRoomWhiteCabinet.alt },
  { _id: '2', title: 'Acrylic Schooling Fish Display', slug: { current: 'acrylic-schooling-fish' }, category: 'saltwater', location: 'Palm Beach County', tankSize: '220 gallons', coverImage: toCover(portfolioPhotos.acrylicSchoolingFish), alt: portfolioPhotos.acrylicSchoolingFish.alt },
  { _id: '3', title: 'Home Bar Reef Display', slug: { current: 'home-bar-reef-barstools' }, category: 'residential', location: 'Palm Beach County', tankSize: '180 gallons', coverImage: toCover(portfolioPhotos.barReefBarstools), alt: portfolioPhotos.barReefBarstools.alt },
  { _id: '4', title: 'Law Office Red Sea Reef', slug: { current: 'law-office-red-sea-reef' }, category: 'commercial', location: 'West Palm Beach', tankSize: '250 gallons', coverImage: toCover(portfolioPhotos.officeRedSeaReef), alt: portfolioPhotos.officeRedSeaReef.alt },
  { _id: '5', title: 'Vibrant Green & Orange Reef', slug: { current: 'green-orange-reef-blue' }, category: 'saltwater', location: 'Palm Beach County', tankSize: '120 gallons', coverImage: toCover(portfolioPhotos.greenOrangeReefBlue), alt: portfolioPhotos.greenOrangeReefBlue.alt },
  { _id: '6', title: 'Established Mixed Reef', slug: { current: 'established-mixed-reef' }, category: 'saltwater', location: 'Palm Beach County', tankSize: '150 gallons', coverImage: toCover(portfolioPhotos.colorfulReefFish), alt: portfolioPhotos.colorfulReefFish.alt },
  { _id: '7', title: 'Restaurant Bamboo & Lionfish Build', slug: { current: 'restaurant-bamboo-lionfish' }, category: 'commercial', location: 'Palm Beach County', tankSize: '300 gallons', coverImage: toCover(portfolioPhotos.restaurantBambooLionfish), alt: portfolioPhotos.restaurantBambooLionfish.alt },
  { _id: '8', title: 'Commercial Column Display Tank', slug: { current: 'commercial-fish-column' }, category: 'commercial', location: 'Palm Beach County', tankSize: '200 gallons', coverImage: toCover(portfolioPhotos.commercialFishColumn), alt: portfolioPhotos.commercialFishColumn.alt },
  { _id: '9', title: 'Modern Living Room Cube', slug: { current: 'modern-living-room-cube' }, category: 'residential', location: 'Palm Beach County', tankSize: '90 gallons', coverImage: toCover(portfolioPhotos.cubeModernLivingRoom), alt: portfolioPhotos.cubeModernLivingRoom.alt },
  { _id: '10', title: 'Red Sea New Install — Pendant Lights', slug: { current: 'red-sea-pendant-lights' }, category: 'residential', location: 'Palm Beach County', tankSize: '175 gallons', coverImage: toCover(portfolioPhotos.redSeaPendantLights), alt: portfolioPhotos.redSeaPendantLights.alt },
  { _id: '11', title: 'Classic Oak Cabinet Build', slug: { current: 'oak-cabinet-classic' }, category: 'saltwater', location: 'Palm Beach County', tankSize: '120 gallons', coverImage: toCover(portfolioPhotos.oakCabinetClassic), alt: portfolioPhotos.oakCabinetClassic.alt },
  { _id: '12', title: 'Mixed Acropora SPS Reef', slug: { current: 'mixed-acropora-reef' }, category: 'saltwater', location: 'Palm Beach County', tankSize: '110 gallons', coverImage: toCover(portfolioPhotos.reefMixedAcropora), alt: portfolioPhotos.reefMixedAcropora.alt },
  { _id: '13', title: 'Colorful Nano Cube Reef', slug: { current: 'nano-cube-reef' }, category: 'saltwater', location: 'Palm Beach County', tankSize: '30 gallons', coverImage: toCover(portfolioPhotos.reefCubeNanoColorful), alt: portfolioPhotos.reefCubeNanoColorful.alt },
  { _id: '14', title: 'Blastomussa Coral Close-Up', slug: { current: 'blastomussa-closeup' }, category: 'saltwater', location: 'Palm Beach County', tankSize: 'Coral detail', coverImage: toCover(portfolioPhotos.coralCloseupBlastomussa), alt: portfolioPhotos.coralCloseupBlastomussa.alt },
  { _id: '15', title: 'Outdoor Koi Pond Build', slug: { current: 'outdoor-koi-pond' }, category: 'freshwater', location: 'Palm Beach County', tankSize: 'Custom pond', coverImage: toCover(portfolioPhotos.outdoorKoiPond), alt: portfolioPhotos.outdoorKoiPond.alt },
]

const CAT_COLORS: Record<string, string> = {
  saltwater: 'bg-blue-100 text-blue-700',
  freshwater: 'bg-emerald-100 text-emerald-700',
  commercial: 'bg-purple-100 text-purple-700',
  residential: 'bg-gold/20 text-gold-600',
}

export default async function GalleryPage() {
  const projects = await getProjects()
  const display = projects.length > 0 ? projects : PLACEHOLDER

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl font-bold text-navy mb-4">Our Portfolio</h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            Custom aquariums we&apos;ve designed and built across Palm Beach County.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((project: GalleryItem) => (
            <div
              key={project._id}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-navy/20 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {project.coverImage ? (
                <Image
                  src={(project.coverImage as { asset: { url: string } }).asset.url}
                  alt={project.alt ?? project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-ocean-gradient flex items-center justify-center">
                  <span className="text-7xl">{project.category === 'freshwater' ? '🌿' : '🐠'}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full mb-2 inline-block ${CAT_COLORS[project.category] ?? 'bg-white/20 text-white'}`}>
                  {project.category}
                </span>
                <h3 className="font-display font-bold text-white text-lg">{project.title}</h3>
                <p className="text-white/70 text-sm">{project.tankSize} · {project.location}</p>
              </div>
              <div className="absolute top-3 left-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CAT_COLORS[project.category] ?? 'bg-white/80 text-gray-700'}`}>
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">Want your dream tank in this gallery?</p>
          <Link href="/quote" className="inline-flex items-center gap-2 bg-aqua text-white font-semibold px-8 py-4 rounded-xl hover:bg-aqua-600 transition-colors">
            Start Your Custom Build →
          </Link>
        </div>
      </div>
    </main>
  )
}
