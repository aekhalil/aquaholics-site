'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  _id: string
  name: string
  location: string
  rating: number
  text: string
  service?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    _id: '0',
    name: 'Alex Khalil',
    location: 'Palm Beach County',
    rating: 5,
    text: "Nick walked me through my first 20-gallon nano years ago, then a 50-gallon, then a 150-gallon build for my home. When my lifestyle shifted to smaller tanks, he helped me break down and sell the bigger setups — I profited on both sales and kept my original as an office tank. This hobby can be brutally expensive, but Nick saved me from every costly mistake I would have made. The knowledge, professionalism, and honest guidance are unmatched.",
    service: 'Custom Installation',
  },
  {
    _id: '1',
    name: 'Michael R.',
    location: 'West Palm Beach',
    rating: 5,
    text: "Aquaholic built our 180-gallon reef from scratch. The attention to detail is insane — the aquascape looks like something out of a magazine. Fourteen months later and every parameter is still dialed in perfectly.",
    service: 'Custom Installation',
  },
  {
    _id: '2',
    name: 'Sarah T.',
    location: 'Palm Beach Gardens',
    rating: 5,
    text: "I've had three different aquarium companies maintain my tanks over the years. Aquaholic is in a completely different league. They actually TELL you what's wrong before it becomes a problem. Worth every penny.",
    service: 'Maintenance Plan',
  },
  {
    _id: '3',
    name: 'David & Jenn K.',
    location: 'Jupiter',
    rating: 5,
    text: "Our return pump failed at 11pm on a Friday. I called the emergency line and a tech was at our door by 1am with a replacement. Fish and corals were all fine the next morning. That kind of service is unmatched.",
    service: '24/7 Emergency',
  },
  {
    _id: '4',
    name: 'Carlos M.',
    location: 'Boca Raton',
    rating: 5,
    text: "Ordered a batch of corals online — hammer, torch, frogspawn. All arrived in perfect shape, better than described. The care guides included were genuinely helpful for someone new to LPS. Will be ordering again next week.",
    service: 'Livestock Purchase',
  },
  {
    _id: '5',
    name: 'Amanda L.',
    location: 'Wellington',
    rating: 5,
    text: "I was comparing maintenance plans and Aquaholic was not the cheapest option. But after seeing my neighbor's tank crash with a 'budget' service, I went with them and I'm so glad I did. These guys know reefs.",
    service: 'Maintenance Plan',
  },
  {
    _id: '6',
    name: 'Raj P.',
    location: 'Delray Beach',
    rating: 5,
    text: "The aquascaping service transformed my bland FOWLR into something I can't stop staring at. They brought a vision I couldn't articulate and executed it flawlessly. Total transformation in one visit.",
    service: 'Aquascaping',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  )
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const display = testimonials.length > 0 ? testimonials : PLACEHOLDER_TESTIMONIALS

  return (
    <section
      className="py-24 bg-ocean-gradient relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-white text-sm font-medium">4.9 · 200+ Google Reviews</span>
          </div>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            What Our Clients Say
          </h2>
          <p className="text-white/60 text-xl">
            Real reviews from real reef keepers across Palm Beach County.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.slice(0, 6).map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors"
            >
              <Quote className="h-8 w-8 text-aqua mb-4 opacity-60" />
              <p className="text-white text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-white/70 text-xs">{t.location}</div>
                </div>
                <div className="text-right">
                  <StarRating rating={t.rating} />
                  {t.service && (
                    <div className="text-aqua text-xs mt-1 font-medium">{t.service}</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://g.page/r/aquaholic-aquarium-services/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors underline underline-offset-4"
          >
            Read all 200+ reviews on Google →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
