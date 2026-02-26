import { defineType, defineField } from 'sanity';

export const coach = defineType({
  name: 'coach',
  title: 'Coach',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'MMA', value: 'mma' },
          { title: 'Boxing', value: 'boxing' },
          { title: 'Kickboxing', value: 'kickboxing' },
          { title: 'Muay Thai', value: 'muay-thai' },
          { title: 'Brazilian Jiu-Jitsu', value: 'bjj' },
          { title: 'Wrestling', value: 'wrestling' },
          { title: 'Strength & Conditioning', value: 'strength-conditioning' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      specialty0: 'specialties.0',
      specialty1: 'specialties.1',
      specialty2: 'specialties.2',
      media: 'photo',
    },
    prepare({ title, specialty0, specialty1, specialty2, media }) {
      const specialties = [specialty0, specialty1, specialty2].filter(Boolean);
      return {
        title,
        subtitle: specialties.length > 0 ? specialties.join(', ') : undefined,
        media,
      };
    },
  },
});
