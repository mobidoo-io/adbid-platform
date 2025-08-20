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
          src: '*.html',
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
        main: path.resolve(__dirname, 'index.html'),
        dashboard: path.resolve(__dirname, 'dashboard.html'),
        analytics: path.resolve(__dirname, 'analytics-dashboard.html'),
        audiences: path.resolve(__dirname, 'audiences.html'),
        billing: path.resolve(__dirname, 'billing.html'),
        creatives: path.resolve(__dirname, 'creatives.html'),
        integrations: path.resolve(__dirname, 'integrations.html'),
        pixels: path.resolve(__dirname, 'pixels.html'),
        settings: path.resolve(__dirname, 'settings.html'),
        'meta-ads': path.resolve(__dirname, 'meta-ads-accounts.html')
      }
    }
  }
})