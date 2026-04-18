/** @type {import('next').NextConfig} */

// Security headers applied to every route. CSP is intentionally omitted here
// because Sanity Studio, Stripe.js, and GA all require carefully scoped allowlists —
// ship that in a follow-up with Report-Only first, then enforce.
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    // SAMEORIGIN, not DENY — Sanity Studio embeds preview iframes from /studio.
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
      'browsing-topics=()',
      'payment=(self "https://js.stripe.com")',
    ].join(', '),
  },
]

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Required for Sanity Studio embedded route
  transpilePackages: ['next-sanity'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Service worker must not be cached — bumping CACHE_VERSION inside sw.js
        // is the rollout mechanism; if the SW itself is cached, clients never see
        // new versions.
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
    ]
  },
}

export default nextConfig
