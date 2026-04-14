# Aquaholic Aquarium Services — Website

Production-ready Next.js 14 website for Aquaholic Aquarium Services LLC, West Palm Beach, FL.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, TypeScript, Server Components) |
| Styling | Tailwind CSS + shadcn/ui components |
| CMS | Sanity v3 (embedded Studio at `/studio`) |
| Payments | Stripe (subscriptions + one-time) |
| Email | Resend (transactional + newsletter) |
| Booking | Cal.com embed |
| Deploy | Vercel |

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.template .env.local
# Fill in all values — see .env.local.template for documentation
```

### 3. Set up Sanity CMS

1. Create a project at [sanity.io](https://sanity.io)
2. Copy your Project ID and Dataset to `.env.local`
3. Create an API token with **Editor** permissions
4. Run the seed script to populate placeholder content:

```bash
npm run seed
```

### 4. Set up Stripe

```bash
npm run stripe:setup
```

Copy the printed Price IDs to `.env.local`:
```
STRIPE_PRICE_ESSENTIAL=price_xxx
STRIPE_PRICE_PROFESSIONAL=price_xxx
STRIPE_PRICE_PREMIER=price_xxx
```

Configure a Stripe webhook pointing to `https://yourdomain.com/api/stripe/webhook` and copy the secret to `STRIPE_WEBHOOK_SECRET`.

### 5. Run development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Environment Variables Reference

See `.env.local.template` for full documentation. Key variables:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `SANITY_API_TOKEN` | Sanity write token (keep secret) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key (keep secret) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_ESSENTIAL` | Stripe Price ID for Essential plan |
| `STRIPE_PRICE_PROFESSIONAL` | Stripe Price ID for Professional plan |
| `STRIPE_PRICE_PREMIER` | Stripe Price ID for Premier plan |
| `RESEND_API_KEY` | Resend email API key |
| `LEAD_WEBHOOK_URL` | Optional CRM webhook URL |
| `NEXT_PUBLIC_CALCOM_USERNAME` | Cal.com username for booking embed |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID |

---

## Content Editing (Sanity CMS)

Access the CMS at `/studio` (requires Sanity authentication).

### Schema Types

| Type | Purpose |
|------|---------|
| `blogPost` | Blog articles with rich text, images, and SEO fields |
| `product` | Shop items — corals, fish, inverts, equipment |
| `service` | Service page content |
| `pricingTier` | Maintenance plan pricing with Stripe Price IDs |
| `galleryProject` | Portfolio items |
| `testimonial` | Client reviews |
| `faq` | Frequently asked questions |
| `serviceArea` | City-specific landing page content (15 cities) |
| `teamMember` | Staff profiles |

### Updating Live Inventory

To mark a product in stock/out of stock:
1. Open Sanity Studio → Products
2. Find the product
3. Toggle the **In Stock** checkbox
4. Update **Stock Count** if needed
5. Publish — the shop will reflect the change within 60 seconds

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard or:
vercel env add STRIPE_SECRET_KEY
# ... repeat for all variables
```

### Recommended Vercel Settings

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node.js Version**: 20.x
- **Edge Config**: Not required

### Post-Deploy Checklist

- [ ] Configure Stripe webhook endpoint to `https://yourdomain.com/api/stripe/webhook`
- [ ] Add domain to Sanity CORS origins (sanity.io → your project → API settings → CORS)
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Verify Cal.com embed with production username

---

## SEO Features

- Dynamic `metadata` on every page
- Open Graph + Twitter cards
- JSON-LD structured data: `LocalBusiness`, `Service`, `Product`, `BlogPosting`, `FAQPage`, `BreadcrumbList`, `Review`
- Programmatic pages for 15 Palm Beach County cities
- Auto-generated `sitemap.xml` with ISR
- `robots.txt` with correct disallow rules
- Canonical URLs on all pages
- Image optimization via `next/image` (AVIF + WebP)

---

## Performance Notes

- All pages use React Server Components by default
- Client components only where interactivity is required (forms, cart, animations)
- ISR with appropriate `revalidate` intervals (60s for home/shop, 3600s for service areas)
- Images lazy-loaded with LQIP blur placeholders from Sanity
- Fonts loaded via `next/font/google` (Geist + Fraunces)

---

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run type-check   # TypeScript type checking
npm run sanity       # Open Sanity Studio standalone
npm run stripe:setup # Create Stripe subscription products
npm run seed         # Seed Sanity with placeholder content
```

---

## Project Structure

```
/app
  /api
    /lead              — Lead form webhook + email notification
    /newsletter        — Newsletter signup → Resend
    /stripe
      /create-subscription-checkout
      /create-product-checkout
  /gallery             — Portfolio
  /learn               — Blog index + [slug] posts
  /quote               — Multi-step quote form
  /services            — Installation, Maintenance, Emergency, Aquascaping
  /service-areas/[city] — 15 city landing pages
  /shop                — Product grid + [slug] detail + cart
  /studio/[[...tool]]  — Embedded Sanity Studio
  layout.tsx           — Root layout with metadata + providers
  page.tsx             — Home page
  sitemap.ts           — Auto-generated sitemap
  robots.ts            — robots.txt

/components
  /forms               — QuoteForm, ContactForm
  /home                — Hero, TrustBadges, ServiceTiers, FeaturedLivestock, etc.
  /layout              — Navbar, Footer, StickyMobileCTA, ExitIntentPopup
  /service-areas       — ServiceAreaPage
  /services            — MaintenancePricing
  /shop                — CartProvider, ShopGrid, ProductDetail, CartPage
  /ui                  — shadcn/ui components

/lib
  /sanity              — client.ts, queries.ts
  stripe.ts
  resend.ts
  utils.ts
  service-areas-data.ts — Static data for 15 cities

/sanity/schemas        — All 9 Sanity schema types
/scripts               — stripe-setup.ts, seed-sanity.ts
```
