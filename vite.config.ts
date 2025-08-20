import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'dashboard.html',
          dest: '.'
        },
        {
          src: 'analytics-dashboard.html',
          dest: '.'
        },
        {
          src: 'audiences.html',
          dest: '.'
        },
        {
          src: 'billing.html',
          dest: '.'
        },
        {
          src: 'creatives.html',
          dest: '.'
        },
        {
          src: 'integrations.html',
          dest: '.'
        },
        {
          src: 'pixels.html',
          dest: '.'
        },
        {
          src: 'settings.html',
          dest: '.'
        },
        {
          src: 'meta-ads-accounts.html',
          dest: '.'
        },
        {
          src: 'src/assets/*',
          dest: 'assets'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
})