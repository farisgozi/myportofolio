// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://muhammadfarigozi.com',
  integrations: [
    tailwind({
      // Optimize CSS for production
      config: { applyBaseStyles: false }
    }),
    react(),
    sitemap(),
    compress({
      // Enable compression for HTML, CSS, JavaScript, and images
      css: true,
      html: true,
      img: true,
      js: true,
      svg: true
    })
  ],
  // Production optimizations
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
    format: 'file'
  },
  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: []
  },
  // Performance optimizations
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'animations': ['framer-motion', 'gsap']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@fontsource/poppins', '@fontsource/montserrat']
    }
  }
});