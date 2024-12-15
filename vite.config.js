import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // host: '3.15.72.3',
    host: '0.0.0.0',
    // host: '3.135.129.190', 
    port: 3000, 
  }
})