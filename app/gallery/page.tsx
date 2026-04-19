import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { ALL_GALLERY_QUERY } from '@/lib/sanity/queries'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Aquarium Portfolio & Gallery | Aquaholic',
  description: 'Browse our portfolio of custom aquarium installations across Palm Beach County — saltwater reefs, freshwater planted tanks, and commercial displays.',
  alternates: { canonical: '/gallery' },
}

async function getProjects() {
  try { return await client.fetch(ALL_GALLERY_QUERY) } catch { return [] }
}

const PLACEHOLDER = [
  { _id: '1', title: '200g Mixed Reef — West Palm Beach', slug: { current: 'reef-wpb' }, category: 'saltwater', location: 'West Palm Beach', tankSize: '200 gallons', coverImage: null },
  { _id: '2', title: 'Office Reef Wall — Palm Beach Gardens', slug: { current: 'office-pbg' }, category: 'commercial', location: 'Palm Beach Gardens', tankSize: '450 gallons', coverImage: null },
  { _id: '3', title: 'Planted Scape — Boca Raton', slug: { current: 'planted-boca' }, category: 'freshwater', location: 'Boca Raton', tankSize: '90 gallons', coverImage: null },
  { _id: '4', title: 'SPS Reef — Jupiter', slug: { current: 'sps-jupiter' }, category: 'saltwater', location: 'Jupiter', tankSize: '150 gallons', coverImage: null },
  { _id: '5', title: 'Lobby Jellyfish — WPB Hotel', slug: { current: 'jellyfish-hotel' }, category: 'commercial', location: 'West Palm Beach', tankSize: '120 gallons', coverImage: null },
  { _id: '6', title: 'Peninsula Reef — Wellington Estate', slug: { current: 'peninsula-wellington' }, category: 'saltwater', location: 'Wellington', tankSize: '300 gallons', coverImage: null },
]

const CAT_COLORS: Record<string, string> = {
  saltwater: 'bg-blue-100 text-blue-700',
  freshwater: 'bg-emerald-100 text-emerald-700',
  commercial: 'bg-purple-100 text-purple-700',
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
          {display.map((project: typeof PLACEHOLDER[0]) => (
            <div
              key={project._id}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-navy/20 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {project.coverImage ? (
                <Image
                  src={(project.coverImage as { asset: { url: string } }).asset.url}
                  alt={project.title}
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
