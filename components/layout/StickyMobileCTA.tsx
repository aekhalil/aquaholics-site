'use client'

import Link from 'next/link'
import { Phone, MessageSquare } from 'lucide-react'

/**
 * Sticky bottom bar visible only on mobile.
 * Always-accessible primary CTAs above the fold equivalent.
 */
export function StickyMobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-navy border-t border-white/10 safe-bottom"
      role="complementary"
      aria-label="Quick contact"
    >
      <div className="flex">
        <a
          href="tel:+15613887262"
          className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-semibold text-sm bg-aqua hover:bg-aqua-600 transition-colors"
          aria-label="Call us now"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <Link
          href="/quote"
          className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-semibold text-sm bg-gold hover:bg-gold-500 transition-colors"
          aria-label="Get a free quote"
        >
          <MessageSquare className="h-4 w-4" />
          Free Quote
        </Link>
      </div>
    </div>
  )
}
