import { defineField, defineType } from 'sanity'

export const galleryProject = defineType({
  name: 'galleryProject',
  title: 'Gallery Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['saltwater', 'freshwater', 'commercial', 'residential'] }, validation: (R) => R.required() }),
    defineField({ name: 'location', title: 'City / Location', type: 'string' }),
    defineField({ name: 'tankSize', title: 'Tank Size', type: 'string' }),
    defineField({ name: 'completedAt', title: 'Completion Date', type: 'date' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'images', title: 'Gallery Images', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })] }] }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'services', title: 'Services Used', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'coverImage' } },
})
