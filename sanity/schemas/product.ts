import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: 'sku', title: 'SKU', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['corals', 'fish', 'inverts', 'equipment'] }, validation: (R) => R.required() }),
    defineField({ name: 'price', title: 'Price (cents)', type: 'number', validation: (R) => R.required().min(0) }),
    defineField({ name: 'compareAtPrice', title: 'Compare-At Price (cents)', type: 'number' }),
    defineField({ name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true }),
    defineField({ name: 'stockCount', title: 'Stock Count', type: 'number' }),
    defineField({ name: 'isFeatured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })] }] }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 2, validation: (R) => R.required().max(200) }),
    defineField({ name: 'description', title: 'Full Description', type: 'text', rows: 5 }),
    defineField({ name: 'careLevel', title: 'Care Level', type: 'string', options: { list: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] } }),
    defineField({ name: 'waterType', title: 'Water Type', type: 'string', options: { list: ['saltwater', 'freshwater', 'brackish', 'n/a'] } }),
    defineField({ name: 'careGuide', title: 'Care Guide', type: 'text', rows: 6 }),
    defineField({ name: 'doaPolicy', title: 'DOA Policy Note', type: 'text', rows: 2 }),
    defineField({ name: 'stripeProductId', title: 'Stripe Product ID', type: 'string' }),
    defineField({ name: 'stripePriceId', title: 'Stripe Price ID', type: 'string' }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', type: 'string', title: 'Reviewer Name' }),
          defineField({ name: 'rating', type: 'number', title: 'Rating (1-5)' }),
          defineField({ name: 'text', type: 'text', title: 'Review Text' }),
          defineField({ name: 'date', type: 'string', title: 'Date' }),
        ],
      }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'images.0', inStock: 'inStock' },
    prepare(v) { return { title: v.title, subtitle: `${v.subtitle} · ${v.inStock ? 'In Stock' : 'Out of Stock'}` } },
  },
})
