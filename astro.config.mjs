// @ts-check
import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

import node from '@astrojs/node';

import clerk from '@clerk/astro';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [db(), clerk()],
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    server: {
      host: true, // Allow external connections
      allowedHosts: true // Permit all hosts (temporary development only)
    },

    plugins: [tailwindcss()]
  }
});