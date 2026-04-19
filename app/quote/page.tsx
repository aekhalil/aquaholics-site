import type { Metadata } from 'next'
import { QuoteForm } from '@/components/forms/QuoteForm'

export const metadata: Metadata = {
  title: 'Get a Free Quote',
  description:
    'Request a free aquarium quote from Aquaholic Aquarium Services. Custom installations, maintenance plans, and livestock — serving West Palm Beach and all of Palm Beach County.',
  alternates: { canonical: '/quote' },
}

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            100% Free · No Obligation
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4">
            Get Your Free Quote
          </h1>
          <p className="text-gray-500 text-lg">
            Tell us about your project and we&apos;ll have a personalised proposal in your inbox
            within 24 hours.
          </p>
        </div>
        <QuoteForm />
      </div>
    </main>
  )
}
