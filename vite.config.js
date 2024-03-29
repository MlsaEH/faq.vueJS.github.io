import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import vue from './node_modules/@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/faq/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/faq/'
    : '/'
})
