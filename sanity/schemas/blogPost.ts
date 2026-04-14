import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: (R) => R.required().max(300) }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }], options: { list: ['Beginner Guides', 'Coral Care', 'Fish Care', 'Water Chemistry', 'Equipment', 'Troubleshooting', 'Industry News'] } }),
    defineField({ name: 'readTime', title: 'Read Time (minutes)', type: 'number' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' }), defineField({ name: 'caption', type: 'string', title: 'Caption' })] },
      ],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title Override', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description Override', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'mainImage' } },
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})
