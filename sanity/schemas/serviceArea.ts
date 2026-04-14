import { defineField, defineType } from 'sanity'

export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'Service Area',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'City Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'name' }, validation: (R) => R.required() }),
    defineField({ name: 'county', title: 'County', type: 'string', initialValue: 'Palm Beach' }),
    defineField({ name: 'population', title: 'Approximate Population', type: 'number' }),
    defineField({ name: 'heroTagline', title: 'Hero Tagline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro Paragraph', type: 'text', rows: 5 }),
    defineField({ name: 'neighborhoods', title: 'Neighborhoods', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url' }),
    defineField({
      name: 'testimonials',
      title: 'Local Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', type: 'string', title: 'Name' }),
          defineField({ name: 'rating', type: 'number', title: 'Rating' }),
          defineField({ name: 'text', type: 'text', title: 'Review Text' }),
          defineField({ name: 'neighborhood', type: 'string', title: 'Neighborhood' }),
        ],
      }],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'county' } },
})
