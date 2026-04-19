import { defineField, defineType } from 'sanity'

export const pricingTier = defineType({
  name: 'pricingTier',
  title: 'Pricing Tier',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Plan Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'price', title: 'Price (cents)', type: 'number', validation: (R) => R.required().min(0) }),
    defineField({ name: 'priceSuffix', title: 'Price Suffix (e.g. "+")', type: 'string', description: 'Optional — shown next to the price for tiers with a range (e.g. "+" indicates "$600+/mo").' }),
    defineField({ name: 'billingCycle', title: 'Billing Cycle', type: 'string', options: { list: ['month', 'year'] }, initialValue: 'month' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'isPopular', title: 'Mark as Most Popular', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
    defineField({ name: 'features', title: 'Feature List', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'stripePriceId', title: 'Stripe Price ID', type: 'string' }),
    defineField({ name: 'callToAction', title: 'Button Label', type: 'string', initialValue: 'Get Started' }),
    defineField({ name: 'quoteHref', title: 'Quote Link (optional)', type: 'string', description: 'If set, the CTA button links here instead of Stripe checkout. Use for commercial/custom-quote tiers (e.g. "/quote?service=maintenance&plan=premier").' }),
  ],
  preview: { select: { title: 'name', subtitle: 'price' } },
})
