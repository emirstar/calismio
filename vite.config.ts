import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    open: 'http://127.0.0.1:5173/',
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
    open: true,
  },
})
