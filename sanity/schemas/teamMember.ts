import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({ name: 'certifications', title: 'Certifications', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
