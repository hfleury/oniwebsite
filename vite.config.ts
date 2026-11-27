/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// Source maps are built and uploaded to Sentry only when SENTRY_AUTH_TOKEN is
// set (CI on main). They are 'hidden' (no sourceMappingURL comment) and deleted
// from dist/ after upload, so they never reach the droplet.
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryAuthToken
      ? sentryVitePlugin({
          org: 'oni-web-officer-ve',
          project: 'oniweb-frontend',
          authToken: sentryAuthToken,
          telemetry: false,
          sourcemaps: {
            filesToDeleteAfterUpload: ['./dist/**/*.map'],
          },
        })
      : null,
  ],
  build: {
    sourcemap: sentryAuthToken ? 'hidden' : false,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
})
