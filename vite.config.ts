import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

console.log('PAGES_BUILD=' + process.env.PAGES_BUILD);

// https://vite.dev/config/
export default defineConfig({
  base: process.env.PAGES_BUILD ? 'https://spicalous.github.io/temporal-pixels/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
