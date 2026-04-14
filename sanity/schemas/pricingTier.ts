import { defineField, defineType } from 'sanity'

export const pricingTier = defineType({
  name: 'pricingTier',
  title: 'Pricing Tier',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Plan Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'price', title: 'Price (cents)', type: 'number', validation: (R) => R.required().min(0) }),
    defineField({ name: 'billingCycle', title: 'Billing Cycle', type: 'string', options: { list: ['month', 'year'] }, initialValue: 'month' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'isPopular', title: 'Mark as Most Popular', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
    defineField({ name: 'features', title: 'Feature List', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'stripePriceId', title: 'Stripe Price ID', type: 'string' }),
    defineField({ name: 'callToAction', title: 'Button Label', type: 'string', initialValue: 'Get Started' }),
  ],
  preview: { select: { title: 'name', subtitle: 'price' } },
})
