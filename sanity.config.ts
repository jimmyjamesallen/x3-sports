import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const singletonTypes = new Set(['siteSettings', 'navigation']);
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'default',
  title: 'X3 Sports',

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.listItem()
              .title('Navigation')
              .id('navigation')
              .child(
                S.document()
                  .schemaType('navigation')
                  .documentId('navigation'),
              ),
            S.divider(),
            S.documentTypeListItem('page').title('Pages'),
            S.documentTypeListItem('hero').title('Hero Sections'),
            S.divider(),
            S.documentTypeListItem('coach').title('Coaches'),
            S.documentTypeListItem('classType').title('Class Types'),
            S.documentTypeListItem('classSchedule').title('Class Schedule'),
            S.divider(),
            S.documentTypeListItem('membershipTier').title('Membership Tiers'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('faq').title('FAQ Items'),
          ]),
    }),
    visionTool({ defaultApiVersion: '2025-01-28' }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
