import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Star } from 'lucide-react'

const SERVICE_LINKS = [
  { label: 'Aquarium Installation', href: '/services/installation' },
  { label: 'Maintenance Plans', href: '/services/maintenance' },
  { label: 'Aquascaping Design', href: '/services/aquascaping' },
  { label: '24/7 Emergency Service', href: '/services/emergency' },
]

const SHOP_LINKS = [
  { label: 'Corals (client access)', href: '/shop' },
  { label: 'Fish (client access)', href: '/shop' },
  { label: 'Invertebrates (client access)', href: '/shop' },
  { label: 'Enter access password', href: '/shop-access' },
]

const SERVICE_AREAS = [
  { label: 'West Palm Beach', href: '/service-areas/west-palm-beach' },
  { label: 'Palm Beach Gardens', href: '/service-areas/palm-beach-gardens' },
  { label: 'Boca Raton', href: '/service-areas/boca-raton' },
  { label: 'Jupiter', href: '/service-areas/jupiter' },
  { label: 'Wellington', href: '/service-areas/wellington' },
  { label: 'Delray Beach', href: '/service-areas/delray-beach' },
  { label: 'Boynton Beach', href: '/service-areas/boynton-beach' },
  { label: 'Lake Worth', href: '/service-areas/lake-worth' },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white" aria-label="Site footer">
      {/* Main footer grid */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Aquaholics Aquarium Services"
                width={44}
                height={44}
                className="rounded-full object-cover flex-shrink-0"
              />
              <div>
                <div className="font-display text-white font-bold text-lg leading-tight">
                  Aquaholics Aquarium Services
                </div>
                <div className="text-aqua-300 text-[10px] uppercase tracking-widest">
                  Riviera Beach, FL
                </div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Palm Beach County&apos;s premier aquarium specialists. From custom installations to
              weekly maintenance and rare livestock — we keep your reef thriving.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <a
                href="tel:+15613887262"
                className="flex items-center gap-2 hover:text-aqua transition-colors"
              >
                <Phone className="h-4 w-4 text-aqua flex-shrink-0" />
                (561) 388-7262
              </a>
              <a
                href="mailto:nick@aquaholicspb.com"
                className="flex items-center gap-2 hover:text-aqua transition-colors"
              >
                <Mail className="h-4 w-4 text-aqua flex-shrink-0" />
                nick@aquaholicspb.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-aqua flex-shrink-0 mt-0.5" />
                <span>3140 Laurel Ridge Circle, Riviera Beach, FL 33410</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/nick.pantoliano"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-aqua transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/aquaholicpb/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-aqua transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.google.com/maps/search/Aquaholics+Aquarium+Services+Riviera+Beach+FL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="See our Google reviews"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors"
                title="Google Reviews"
              >
                <Star className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-base">Services</h3>
            <ul className="space-y-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-aqua text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-base">Livestock</h3>
            <ul className="space-y-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-aqua text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-display font-semibold text-white mb-4 text-base mt-8">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/60 hover:text-aqua text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-white/60 hover:text-aqua text-sm transition-colors">
                  Aquarium Blog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/60 hover:text-aqua text-sm transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-aqua text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-base">Service Areas</h3>
            <ul className="space-y-2">
              {SERVICE_AREAS.map((area) => (
                <li key={area.href}>
                  <Link
                    href={area.href}
                    className="text-white/60 hover:text-aqua text-sm transition-colors"
                  >
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/service-areas"
              className="inline-block mt-3 text-aqua text-sm font-medium hover:underline"
            >
              View all 15 cities →
            </Link>
          </div>
        </div>

        {/* Hours */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/50">
            <span className="font-medium text-white/70">Business Hours:</span>
            <span>Mon–Fri 8am–6pm</span>
            <span>Sat 9am–4pm</span>
            <span>Sun Closed</span>
            <span className="text-aqua font-medium">24/7 Emergency Line: (561) 388-7262</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Aquaholics Aquarium Services LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
