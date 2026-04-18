import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Instagram, Facebook, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Aquaholics Aquarium Service | Palm Beach County, FL',
  description:
    'Meet Nick Pantoliano — Palm Beach County reef keeper turned professional. Aquaholics specializes in saltwater aquarium installation, maintenance, and relocation from 20-gallon nanos to 500-gallon custom builds.',
}

const SPECIALTIES = [
  { emoji: '🏢', title: 'Commercial Builds', desc: 'Hotels, restaurants, offices, medical — large-scale installations from $5K to $100K+ with full maintenance contracts.' },
  { emoji: '🪸', title: 'Coral Care', desc: 'Torch corals, zoanthids, euphyllia, acropora, mushrooms — we keep your reef colorful and thriving.' },
  { emoji: '🔧', title: 'Full Installations', desc: 'Red Sea, EcoTech, Neptune, Abyzz, Octo, Innovative Marine — specced, installed, and dialed in.' },
  { emoji: '📦', title: 'Tank Relocations', desc: 'Safe, stress-minimized moves for tanks of all sizes across Palm Beach County.' },
  { emoji: '🚨', title: 'Pest Removal', desc: 'Aiptasia, flatworms, dinoflagellates — we identify and eliminate tank threats fast.' },
  { emoji: '🧹', title: 'Deep Cleans', desc: 'Glass, sumps, equipment, rock — full reset services for neglected or inherited tanks.' },
]

const STATS = [
  { value: '20 gal', label: 'Smallest tank we service' },
  { value: '500 gal', label: 'Largest build completed' },
  { value: '5★', label: 'Across Google & Facebook' },
  { value: '24/7', label: 'Emergency response line' },
]

const COMMUNITY_TAGS = [
  '#reef2reef', '#worldwidecorals', '#floridareefs', '#floridacoraladdict',
  '#palmbeachreef', '#saltwaterfish', '#reeftank', '#coralreef',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="bg-ocean-gradient py-24 pt-36">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-white/80 text-sm font-medium">Palm Beach County · Since Day One</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6">
            We Live and Breathe Saltwater
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            Aquaholics Aquarium Service isn&apos;t a cleaning company that happens to do tanks.
            We&apos;re fellow hobbyists who turned a reef obsession into Palm Beach County&apos;s
            most trusted aquarium service.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-14 items-start">

            {/* Left — copy */}
            <div>
              <h2 className="font-display text-4xl font-bold text-navy mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Nick Pantoliano founded Aquaholics Aquarium Service right here in Palm Beach County
                after years of building and maintaining his own reef systems. What started as helping
                friends with their tanks quickly became the go-to service for hobbyists and
                businesses across Jupiter, Palm Beach Gardens, Lake Worth, and the surrounding area.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                We specialize in saltwater — the full spectrum. From a 20-gallon nano reef getting
                its first coral frag to a custom-built 500-gallon showpiece in a luxury home or
                commercial lobby, every tank gets the same hands-on expertise and genuine care.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our philosophy is simple: your tank is always in the hands of someone who cares
                about it as much as you do. That means no shortcuts on water chemistry, honest
                conversations about livestock health, and showing up on time every single visit.
              </p>

              {/* Contact block */}
              <div className="space-y-3 text-sm">
                <a
                  href="tel:+15613887262"
                  className="flex items-center gap-3 text-navy font-medium hover:text-aqua transition-colors"
                >
                  <Phone className="h-4 w-4 text-aqua flex-shrink-0" />
                  (561) 388-7262
                </a>
                <a
                  href="mailto:nick@aquaholicspb.com"
                  className="flex items-center gap-3 text-navy font-medium hover:text-aqua transition-colors"
                >
                  <Mail className="h-4 w-4 text-aqua flex-shrink-0" />
                  nick@aquaholicspb.com
                </a>
                <div className="flex items-start gap-3 text-navy font-medium">
                  <MapPin className="h-4 w-4 text-aqua flex-shrink-0 mt-0.5" />
                  Riviera Beach, FL · Serving all of Palm Beach County
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-6">
                <a
                  href="https://www.instagram.com/aquaholicpb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow @aquaholicpb on Instagram"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Instagram className="h-4 w-4" />
                  @aquaholicpb
                </a>
                <a
                  href="https://www.facebook.com/nick.pantoliano"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find us on Facebook"
                  className="flex items-center gap-2 bg-[#1877F2] text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              </div>
            </div>

            {/* Right — logo + stats */}
            <div className="flex flex-col gap-6">
              {/* Logo card */}
              <div className="bg-navy rounded-3xl p-8 flex items-center justify-center">
                <Image
                  src="/Images/Hero_logo.PNG"
                  alt="Aquaholics Aquarium Service logo"
                  width={180}
                  height={180}
                  className="rounded-2xl object-cover"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-5 text-center">
                    <div className="font-display text-3xl font-bold text-aqua mb-1">{value}</div>
                    <div className="text-gray-500 text-xs leading-snug">{label}</div>
                  </div>
                ))}
              </div>

              {/* Review snippet */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic mb-3">
                  &ldquo;Friendly, knowledgeable, and reasonably priced. Nick genuinely loves what
                  he does and it shows in how he treats your tank. Highly recommend to anyone in
                  Palm Beach County.&rdquo;
                </p>
                <p className="text-xs text-gray-400 font-medium">5-Star Google Review</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-navy mb-4">What We Do</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              No tank is too big or too small. No problem is too niche. We handle the full
              spectrum of saltwater aquarium service.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-aqua/30 transition-all duration-200"
              >
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className="font-semibold text-navy text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand partners */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Equipment We Spec, Install &amp; Service
          </p>
          <h2 className="font-display text-2xl font-bold text-navy mb-8">
            The Industry&apos;s Most Trusted Brands
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Red Sea', 'EcoTech Marine', 'Neptune Systems', 'Abyzz', 'Octo', 'Innovative Marine'].map((brand) => (
              <span
                key={brand}
                className="bg-navy text-aqua font-display font-bold text-sm px-5 py-2.5 rounded-full tracking-wide"
              >
                {brand}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-6 max-w-lg mx-auto">
            We don&apos;t just sell this equipment — we build with it daily. Every brand above
            is something Nick has personally installed, tuned, and serviced on real tanks.
          </p>
        </div>
      </section>

      {/* Community roots */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Part of the Reef Community
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            We&apos;re active in the same forums, groups, and communities you are. Follow our
            builds and livestock on Instagram — that&apos;s the tank nerd side of Aquaholics.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {COMMUNITY_TAGS.map((tag) => (
              <span
                key={tag}
                className="bg-white/10 text-aqua text-sm font-medium px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href="https://www.instagram.com/aquaholicpb/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <Instagram className="h-5 w-5" />
            Follow @aquaholicpb on Instagram
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ocean-gradient text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            DM us on Instagram, give us a call, or fill out the quote form — we respond fast and
            there&apos;s never any obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="xl">
              <Link href="/quote">Get a Free Quote</Link>
            </Button>
            <Button asChild variant="outline-white" size="xl">
              <a href="tel:+15613887262">
                <Phone className="h-5 w-5" />
                (561) 388-7262
              </a>
            </Button>
          </div>
        </div>
      </section>

    </main>
  )
}
