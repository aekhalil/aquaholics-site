/** @type {import('next').NextConfig} */

// CSP is shipped in Report-Only mode first. Browsers log violations to the
// console (and to the `report-to` endpoint if we add one) without blocking.
// Watch the console across Studio, shop, quote, and checkout flows for a
// few deploys, add any third-party origins the policy flagged, then flip
// to the enforcing `Content-Security-Policy` header.
//
// Known allowlists below. 'unsafe-inline' on script-src is because the root
// layout emits inline JSON-LD + (optional) GA bootstrap, and Next hydration
// uses inline chunks. 'unsafe-eval' is for Sanity Studio. When we enforce,
// we can scope these to /studio only via a separate header block.
const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com https://cdn.sanity.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://*.stripe.com https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.sanity.io https://*.apicdn.sanity.io https://*.sanity.io wss://*.api.sanity.io https://api.stripe.com https://*.stripe.com https://vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com",
  "media-src 'self' blob: https://cdn.sanity.io",
  'upgrade-insecure-requests',
].join('; ')

// Security headers applied to every route.
const securityHeaders = [
  {
    key: 'Content-Security-Policy-Report-Only',
    value: cspDirectives,
  },
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
