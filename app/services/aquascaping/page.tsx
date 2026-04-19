import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { portfolioPhotos } from '@/lib/site-images'

export const metadata: Metadata = {
  title: 'Aquascaping & Tank Design | Palm Beach County',
  description: 'Professional aquascaping and tank redesign services in Palm Beach County. Transform your existing aquarium with a stunning new aquascape.',
}

export default function AquascapingPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-ocean-gradient py-24 pt-36 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6">
            Aquascaping & Tank Design
          </h1>
          <p className="text-white/70 text-xl mb-8">
            Transform your existing tank into a work of art. Our aquascapers combine
            technical expertise with an artist&apos;s eye to create displays that stop conversations.
          </p>
          <Button asChild variant="gold" size="xl">
            <Link href="/quote?service=aquascaping">Book Aquascape Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Featured aquascape */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              portfolioPhotos.greenOrangeReefBlue,
              portfolioPhotos.reefMixedAcropora,
            ].map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gray-100 shadow-md"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-navy mb-6">
                Design Philosophy
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Great aquascaping follows the same principles as great landscape architecture:
                balance, flow, negative space, and focal points. Our designs reference natural reef
                structures, Japanese wabi-kusa aesthetics, and contemporary sculptural minimalism.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Every aquascape we create is designed specifically for your tank dimensions,
                livestock, and maintenance routine — not copied from a template.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href="/gallery?filter=aquascaping">View Our Work →</Link>
              </Button>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-gray-100 shadow-md">
              <Image
                src={portfolioPhotos.reefCubeNanoColorful.src}
                alt={portfolioPhotos.reefCubeNanoColorful.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-12 bg-gray-50 rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="font-semibold text-navy mb-6 text-xl">What&apos;s Included</h3>
              {['In-person consultation & tank assessment', 'Custom 3D aquascape mockup', 'Premium rock or driftwood work', 'Substrate placement & leveling', 'Initial plant or coral placement', 'Flow & lighting optimization', '30-day settling review visit'].map((item) => (
                <div key={item} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0 text-sm text-gray-700">
                  <span className="text-aqua">✓</span>
                  {item}
                </div>
              ))}
              <Button asChild variant="default" size="lg" className="w-full mt-6">
                <Link href="/quote?service=aquascaping">Get a Quote</Link>
              </Button>
            </div>
          </div>
      </section>
    </main>
  )
}
