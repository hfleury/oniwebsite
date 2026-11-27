import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.tsx'
import StyleRoot from './StyleRoot.tsx'
import { I18nProvider, getBasename } from './i18n.tsx'
import { initAnalytics } from './analytics.ts'
import { dropBotEvents } from './sentryFilter.ts'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [window.location.origin, 'localhost'],
  beforeSend: dropBotEvents,
})

void initAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={getBasename()}>
      <I18nProvider>
        <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
          <StyleRoot>
            <App />
          </StyleRoot>
        </Sentry.ErrorBoundary>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
)
