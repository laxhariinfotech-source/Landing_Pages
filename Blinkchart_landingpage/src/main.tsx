import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './JoinWaitList.css'
import CookieBanner from './components/CookieBanner'
import AnalyticsGate from './components/AnalyticsGate'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <CookieBanner />
    <AnalyticsGate />
  </StrictMode>,
)
