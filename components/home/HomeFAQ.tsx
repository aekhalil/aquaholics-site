'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface FAQ {
  _id: string
  question: string
  answer: string
}

interface HomeFAQProps {
  faqs?: FAQ[]
}

const DEFAULT_FAQS: FAQ[] = [
  {
    _id: '1',
    question: 'What areas do you serve in Palm Beach County?',
    answer:
      'We service all of Palm Beach County including West Palm Beach, Palm Beach Gardens, Jupiter, Wellington, Boca Raton, Delray Beach, Boynton Beach, Lake Worth, Riviera Beach, North Palm Beach, Juno Beach, Tequesta, Greenacres, Royal Palm Beach, and Palm Beach island. We also take select clients in Broward County — contact us to confirm your address.',
  },
  {
    _id: '2',
    question: 'How much does aquarium maintenance cost?',
    answer:
      'Our maintenance plans start at $149/month for tanks up to 50 gallons (bi-weekly visits). Most residential clients pay $199–$299/month for weekly service on 75–200 gallon systems. Commercial and very large tanks (300+ gallons) are priced on a custom basis. Every plan includes water changes, parameter testing, glass cleaning, and equipment checks.',
  },
  {
    _id: '3',
    question: 'Can I buy livestock from Aquaholic?',
    answer:
      'Aquaholic is not a retail store and does not ship. Nick keeps a small rotating holding system for service clients. Request a client account, and once approved you can see what corals, fish, and inverts are currently available for pickup in Riviera Beach or for drop-off on your next service visit.',
  },
  {
    _id: '4',
    question: 'How long does a custom aquarium installation take?',
    answer:
      'The timeline depends on the complexity of the build. A standard 100-gallon display with a built-in sump typically takes 2–4 weeks from design approval to livestock placement. Large custom builds (300+ gallons, built-in cabinetry) can take 6–10 weeks. We will give you a firm timeline during the free consultation.',
  },
  {
    _id: '5',
    question: 'Can you set up a tank in a rental property or condo?',
    answer:
      'Absolutely. We have extensive experience working in condos, apartments, and rental units. We use waterproofing mats, drip trays, and careful plumbing practices to meet HOA requirements.',
  },
  {
    _id: '6',
    question: 'What is included in an emergency callout?',
    answer:
      'Our 24/7 emergency service covers tank crashes, power outages, equipment failures, disease outbreaks, and livestock rescues. Emergency calls are priced at a flat $150 callout fee plus parts/labor (typically $75–$200 total). Clients on an active maintenance plan receive 20% off all emergency calls.',
  },
]

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = React.useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="border border-gray-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-navy pr-4">{faq.question}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aqua/10 flex items-center justify-center">
          {open ? (
            <Minus className="h-3.5 w-3.5 text-aqua" />
          ) : (
            <Plus className="h-3.5 w-3.5 text-aqua" />
          )}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{faq.answer}</div>
      )}
    </motion.div>
  )
}

export function HomeFAQ({ faqs }: HomeFAQProps) {
  const display = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS

  // JSON-LD FAQ schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: display.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="py-24 bg-white" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              FAQ
            </div>
            <h2
              id="faq-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4"
            >
              Common Questions
            </h2>
            <p className="text-gray-500 text-lg">
              Everything you need to know before getting started.
            </p>
          </motion.div>

          {/* FAQ list */}
          <div className="space-y-3">
            {display.map((faq, i) => (
              <FAQItem key={faq._id} faq={faq} index={i} />
            ))}
          </div>

          {/* More questions CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 text-gray-500"
          >
            Still have questions?{' '}
            <a href="/contact" className="text-aqua font-medium hover:underline">
              Contact our team →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
