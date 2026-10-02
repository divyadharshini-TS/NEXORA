import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Local dev only: proxies /api calls to Express backend on port 3001
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  // In production (Vercel), VITE_API_URL env var points to Render backend
  // Frontend code uses: import.meta.env.VITE_API_URL || ''
})
