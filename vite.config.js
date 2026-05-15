import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    watch: {
      usePolling: true,
    },
    hmr: true,
  },

  build: {
    // Smaller chunk size warning threshold
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — cached separately, never changes
          'vendor-react': ['react', 'react-dom'],

          // Framer Motion — heavy animation lib, split out
          'vendor-framer': ['framer-motion'],

          // Swiper — only used in Testimonials section
          'vendor-swiper': ['swiper'],

          // All react-icons bundled together
          'vendor-icons': ['react-icons'],

          // React Helmet
          'vendor-helmet': ['react-helmet-async'],
        },
      },
    },
  },

  // Pre-bundle these for faster dev server cold start
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'swiper',
      'react-icons/fa',
      'react-icons/md',
      'react-helmet-async',
    ],
  },
})