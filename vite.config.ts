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
          src: 'new-campaign.html',
          dest: '.'
        },
        {
          src: 'campaign-creation.html',
          dest: '.'
        },
        {
          src: 'campaign-step2.html',
          dest: '.'
        },
        {
          src: 'campaign-step2-updated.html',
          dest: '.'
        },
        {
          src: 'campaign-step3.html',
          dest: '.'
        },
        {
          src: 'campaign-step3-updated.html',
          dest: '.'
        },
        {
          src: 'campaign-step4.html',
          dest: '.'
        },
        {
          src: 'campaign-step4-updated.html',
          dest: '.'
        },
        {
          src: 'campaign-step5.html',
          dest: '.'
        },
        {
          src: 'campaign-step5-review.html',
          dest: '.'
        },
        {
          src: 'audience-modals.html',
          dest: '.'
        },
        {
          src: 'creative-modals.html',
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