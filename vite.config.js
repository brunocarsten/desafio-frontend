import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@style': path.resolve(__dirname, './src/assets/scss/'),
      '@component': path.resolve(__dirname, './src/components/'),
      '@page': path.resolve(__dirname, './src/pages/')
    }
  }
})
