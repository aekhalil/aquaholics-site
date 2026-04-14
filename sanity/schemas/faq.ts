import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (R) => R.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['General', 'Maintenance', 'Installation', 'Livestock', 'Billing', 'Emergency'] } }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: { select: { title: 'question', subtitle: 'category' } },
  orderings: [{ title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
