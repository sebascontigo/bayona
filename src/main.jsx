import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ExperienceProvider } from './engine'
import './styles.css'
import './styles/social.css'
import './styles/home.css'
import './styles/home-scroll-animations.css'
import './styles/app.css'
import './styles/faq.css'
import './styles/media-scenes.css'
import './styles/plan-hero-refinements.css'
import './styles/plan-value-refinements.css'
import './styles/plan-summary-refinements.css'
import './styles/plan-final-refinements.css'
import './overrides.css'
import './styles/premium-route-chrome.css'
import './styles/luxury-system.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ExperienceProvider>
        <App />
      </ExperienceProvider>
    </BrowserRouter>
  </StrictMode>,
)
