import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Minimal Vite config for the FarmAssist React app
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
})
