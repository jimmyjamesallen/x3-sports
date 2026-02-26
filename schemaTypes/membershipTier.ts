import { defineType, defineField } from 'sanity';

export const membershipTier = defineType({
  name: 'membershipTier',
  title: 'Membership Tier',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tier Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'interval',
      title: 'Billing Interval',
      type: 'string',
      initialValue: 'month',
      options: {
        list: [
          { title: 'Per Month', value: 'month' },
          { title: 'Per Year', value: 'year' },
        ],
      },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'highlighted',
      title: 'Featured Tier',
      type: 'boolean',
      description: 'Highlight this tier as the recommended option.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (rule) => rule.integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', price: 'price', interval: 'interval' },
    prepare({ title, price, interval }) {
      return {
        title,
        subtitle: price ? `$${price}/${interval === 'year' ? 'yr' : 'mo'}` : undefined,
      };
    },
  },
});
