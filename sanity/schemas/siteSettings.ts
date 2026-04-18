import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      initialValue: 'Site Settings',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'shopPassword',
      title: 'Livestock Access Password',
      type: 'string',
      description:
        'The shared password clients use at /shop-access to see available livestock. Change it any time — existing browsers will be kicked out within ~30 seconds.',
      validation: (R) => R.required().min(4),
    }),
    defineField({
      name: 'shopAccessMessage',
      title: 'Message on Password Screen',
      type: 'text',
      rows: 3,
      description: 'Optional — shows above the password prompt on /shop-access.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
