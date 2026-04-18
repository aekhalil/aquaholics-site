import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Livestock',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: 'sku', title: 'SKU', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['corals', 'fish', 'inverts'] }, validation: (R) => R.required() }),
    defineField({ name: 'price', title: 'Price (cents)', type: 'number', validation: (R) => R.required().min(0) }),
    defineField({ name: 'inStock', title: 'Available', type: 'boolean', initialValue: true }),
    defineField({ name: 'stockCount', title: 'Quantity On Hand', type: 'number' }),
    defineField({ name: 'isFeatured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })] }] }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 2, validation: (R) => R.required().max(200) }),
    defineField({ name: 'description', title: 'Full Description', type: 'text', rows: 5 }),
    defineField({ name: 'careLevel', title: 'Care Level', type: 'string', options: { list: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] } }),
    defineField({ name: 'careGuide', title: 'Care Guide', type: 'text', rows: 6 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'images.0', inStock: 'inStock' },
    prepare(v) { return { title: v.title, subtitle: `${v.subtitle} · ${v.inStock ? 'Available' : 'Unavailable'}` } },
  },
})
