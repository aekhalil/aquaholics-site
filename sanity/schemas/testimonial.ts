import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'location', title: 'City', type: 'string' }),
    defineField({ name: 'rating', title: 'Star Rating', type: 'number', options: { list: [1, 2, 3, 4, 5] }, initialValue: 5, validation: (R) => R.required() }),
    defineField({ name: 'text', title: 'Review Text', type: 'text', rows: 4, validation: (R) => R.required() }),
    defineField({ name: 'service', title: 'Service Type', type: 'string', options: { list: ['Custom Installation', 'Maintenance Plan', 'Aquascaping', '24/7 Emergency', 'Livestock Purchase'] } }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'avatar', title: 'Avatar', type: 'image' }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'name', subtitle: 'location' } },
})
