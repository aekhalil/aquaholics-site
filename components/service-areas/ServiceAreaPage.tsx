import Link from 'next/link'
import { MapPin, Phone, Star, Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SERVICE_AREAS, type ServiceAreaData } from '@/lib/service-areas-data'

interface ServiceAreaPageProps {
  area: ServiceAreaData
}

export function ServiceAreaPage({ area }: ServiceAreaPageProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aquaholicspb.com'

  // Local Business schema with city-specific data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Aquaholic Aquarium Services LLC',
    description: `Professional aquarium installation, maintenance, and livestock services in ${area.name}, FL and surrounding Palm Beach County.`,
    url: `${siteUrl}/service-areas/${area.slug}`,
    telephone: '+15613887262',
    areaServed: {
      '@type': 'City',
      name: area.name,
      containedIn: { '@type': 'AdministrativeArea', name: `${area.county} County, FL` },
    },
    geo: { '@type': 'GeoCoordinates', latitude: area.lat, longitude: area.lng },
    ...(area.testimonials?.length ? {
      review: area.testimonials.map((t) => ({
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 },
        author: { '@type': 'Person', name: t.name },
        reviewBody: t.text,
      })),
    } : {}),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${siteUrl}/service-areas` },
      { '@type': 'ListItem', position: 3, name: area.name, item: `${siteUrl}/service-areas/${area.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="bg-ocean-gradient py-24 pt-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-aqua blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/service-areas/west-palm-beach" className="hover:text-white transition-colors">Service Areas</Link>
            <span>/</span>
            <span className="text-white">{area.name}</span>
          </nav>

          <div className="flex items-start gap-3 mb-4">
            <MapPin className="h-6 w-6 text-aqua mt-1 flex-shrink-0" />
            <div className="inline-block bg-aqua/20 border border-aqua/30 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full">
              {area.county} County, FL
            </div>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4 max-w-3xl">
            Aquarium Services in {area.name}, FL
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mb-8">
            {area.heroTagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild variant="gold" size="xl">
              <Link href="/quote">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline-white" size="xl">
              <a href="tel:+15613887262">
                <Phone className="h-5 w-5" />
                (561) 388-7262
              </a>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,38 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Intro + services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Intro text */}
            <div>
              <h2 className="font-display text-3xl font-bold text-navy mb-6">
                Your Local {area.name} Aquarium Experts
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">{area.intro}</p>

              {area.neighborhoods && (
                <div>
                  <h3 className="font-semibold text-navy mb-3">Neighborhoods We Serve</h3>
                  <div className="flex flex-wrap gap-2">
                    {area.neighborhoods.map((hood) => (
                      <span
                        key={hood}
                        className="bg-aqua/10 text-aqua text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {hood}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services list */}
            <div className="bg-gray-50 rounded-3xl p-8">
              <h3 className="font-display text-2xl font-bold text-navy mb-6">
                Services Available in {area.name}
              </h3>
              <ul className="space-y-4">
                {[
                  { label: 'Custom Aquarium Installation', href: '/services/installation' },
                  { label: 'Weekly & Bi-Weekly Maintenance', href: '/services/maintenance' },
                  { label: 'Aquascaping & Tank Redesign', href: '/services/aquascaping' },
                  { label: '24/7 Emergency Service', href: '/services/emergency' },
                  { label: 'Live Coral, Fish & Invert Sales (client access)', href: '/shop' },
                ].map((svc) => (
                  <li key={svc.href} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <Link href={svc.href} className="text-navy hover:text-aqua transition-colors font-medium">
                      {svc.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button asChild variant="default" size="lg" className="w-full mt-6">
                <Link href="/quote">
                  Get a Free {area.name} Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {area.testimonials && area.testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-navy mb-8 text-center">
              What {area.name} Clients Say
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {area.testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-navy text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.neighborhood}, {area.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy mb-8 text-center">
            Serving {area.name} &amp; Surrounding Areas
          </h2>
          <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg h-80">
            <iframe
              title={`Map of ${area.name}, FL`}
              src={area.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Other service areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy mb-6">
            Other Areas We Serve
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {SERVICE_AREAS.filter((a) => a.slug !== area.slug).slice(0, 10).map((a) => (
              <Link
                key={a.slug}
                href={`/service-areas/${a.slug}`}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-center text-sm font-medium text-navy hover:border-aqua hover:text-aqua transition-all"
              >
                {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-ocean-gradient">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to Get Started in {area.name}?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Free consultation. Custom quote within 24 hours. No obligation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="gold" size="xl">
              <Link href="/quote">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline-white" size="xl">
              <a href="tel:+15613887262">Call (561) 388-7262</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
