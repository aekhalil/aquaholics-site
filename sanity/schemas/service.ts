import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 2 }),
    defineField({ name: 'icon', title: 'Icon Name (Lucide)', type: 'string' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'tagline', media: 'heroImage' } },
})
