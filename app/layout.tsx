import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Fraunces } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { ExitIntentPopup } from '@/components/layout/ExitIntentPopup'
import { CartProvider } from '@/components/shop/CartProvider'
import { Toaster } from '@/components/ui/toaster'

// Geist is Next.js 15+ only — Inter is the closest clean sans-serif for Next.js 14
const inter = Inter({
  variable: '--font-geist-sans', // keep same CSS var so Tailwind config needs no changes
  subsets: ['latin'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aquaholicaquariumservices.com'
const PHONE = process.env.NEXT_PUBLIC_PHONE ?? '+15613887262'
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Aquaholics Aquarium Services | West Palm Beach, FL',
    template: '%s | Aquaholics Aquarium Services',
  },
  description:
    'Premier aquarium installation, maintenance, and livestock sales in West Palm Beach & Palm Beach County. Custom saltwater & freshwater tanks, coral frags, rare fish, and monthly service contracts.',
  keywords: [
    'aquarium service west palm beach',
    'aquarium maintenance palm beach county',
    'saltwater tank installation florida',
    'coral frags west palm beach',
    'fish tank cleaning service wpb',
    'custom aquarium design palm beach',
  ],
  authors: [{ name: 'Aquaholics Aquarium Services LLC' }],
  creator: 'Aquaholics Aquarium Services LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Aquaholics Aquarium Services',
    title: 'Aquaholics Aquarium Services | West Palm Beach, FL',
    description:
      'Premier aquarium installation, maintenance & livestock sales in Palm Beach County. Custom tanks, coral frags, rare fish & monthly service plans.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aquaholics Aquarium Services — West Palm Beach, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aquaholics Aquarium Services | WPB, FL',
    description: 'Custom aquariums, coral frags & monthly maintenance in Palm Beach County.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification token here
    // google: 'your-verification-token',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://js.stripe.com" />
        {/* Google Analytics 4 — only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`,
              }}
            />
          </>
        )}
        {/* LocalBusiness schema injected on home page; global org schema here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': `${SITE_URL}/#business`,
              name: 'Aquaholics Aquarium Services LLC',
              image: `${SITE_URL}/og-image.jpg`,
              description:
                'Premier aquarium installation, maintenance, and livestock sales serving West Palm Beach and all of Palm Beach County.',
              url: SITE_URL,
              telephone: PHONE,
              email: 'aquaholicspb@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '3140 Laurel Ridge Circle',
                addressLocality: 'Riviera Beach',
                addressRegion: 'FL',
                postalCode: '33410',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 26.7754,
                longitude: -80.0584,
              },
              areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: 26.7754,
                  longitude: -80.0584,
                },
                geoRadius: '80000',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '09:00',
                  closes: '16:00',
                },
              ],
              priceRange: '$$',
              currenciesAccepted: 'USD',
              paymentAccepted: 'Cash, Credit Card, ACH',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                reviewCount: '200',
                bestRating: '5',
                worstRating: '1',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans`}
      >
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <StickyMobileCTA />
          <WhatsAppButton />
          <ExitIntentPopup />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
