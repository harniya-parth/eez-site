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
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom') || id.includes('react')) {
            return 'vendor-react'
          }

          if (id.includes('framer-motion')) {
            return 'vendor-framer'
          }

          if (id.includes('swiper')) {
            return 'vendor-swiper'
          }

          if (id.includes('react-icons')) {
            return 'vendor-icons'
          }

          if (id.includes('react-helmet-async')) {
            return 'vendor-helmet'
          }
        },
      },
    },
  },

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