import { defineType, defineField } from 'sanity';

export const classSchedule = defineType({
  name: 'classSchedule',
  title: 'Class Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
        ],
      },
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g. "9:00 AM"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'classType',
      title: 'Class Type',
      type: 'reference',
      to: [{ type: 'classType' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coach',
      title: 'Coach',
      type: 'reference',
      to: [{ type: 'coach' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "60 min"',
    }),
  ],
  orderings: [
    {
      title: 'Day & Time',
      name: 'dayTimeAsc',
      by: [
        { field: 'day', direction: 'asc' },
        { field: 'time', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      day: 'day',
      time: 'time',
      classTitle: 'classType.title',
      coachName: 'coach.name',
    },
    prepare({ day, time, classTitle, coachName }) {
      const dayLabel = day ? day.charAt(0).toUpperCase() + day.slice(1) : '';
      return {
        title: `${dayLabel} @ ${time || ''}`,
        subtitle: [classTitle, coachName].filter(Boolean).join(' — '),
      };
    },
  },
});
