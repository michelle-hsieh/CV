import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://michelle-hsieh.github.io',
  base: '/',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: true }),
  ],
  output: 'static',
});
