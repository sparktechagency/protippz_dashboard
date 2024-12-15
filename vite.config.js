import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', 
    // host: '3.135.129.190', 
    port: 3000, 
  }
})