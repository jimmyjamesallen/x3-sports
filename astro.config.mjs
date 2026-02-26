// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import node from '@astrojs/node';

const env = loadEnv(process.env.NODE_ENV || '', process.cwd(), 'PUBLIC_');

// https://astro.build/config
export default defineConfig({
  adapter: node({ mode: 'standalone' }),

  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      useCdn: false,
      apiVersion: '2025-01-28',
      studioBasePath: '/admin',
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
