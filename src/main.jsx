import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import AppErrorBoundary from './components/AppErrorBoundary.jsx'
import { ExperienceProvider } from './engine'
import { VisitorJourneyProvider } from './lib/onboarding/VisitorJourneyProvider.jsx'
import { initAnalytics } from './lib/analytics/analytics.js'

/**
 * Hojas globales. Las de página (about, shop, community, resources…) se
 * importan desde su propia página, así que ahora viajan en el chunk de esa
 * ruta en lugar de en el CSS de entrada.
 */
import './styles.css'
import './styles/social.css'
import './styles/home.css'
import './styles/home-scroll-animations.css'
import './styles/media-scenes.css'
import './overrides.css'
import './styles/premium-route-chrome.css'
import './styles/luxury-system.css'
/*
 * Último en la cascada a propósito: son detalles de acabado (tipografía óptica,
 * foco, superficie, scroll bajo la barra fija) que deben poder matizar
 * cualquier hoja anterior sin recurrir a !important.
 */
import './styles/elite-refinements.css'
/*
 * Sistema visual v2. Va después de todo lo anterior porque tiene que poder
 * matizar el `border-radius: 0 !important` global de styles.css en las
 * superficies que flotan, sin perderlo donde construye la marca.
 */
import './styles/v2-surface.css'
/*
 * La escala tipográfica va después de la superficie porque hace un reset por
 * rol semántico sobre los 258 tamaños distintos que había repartidos en 26
 * hojas. Tiene que poder ganarles.
 */
import './styles/v2-typography.css'
import './styles/v2-editorial.css'
import './styles/v2-hero-depth.css'
import './styles/v2-image-grade.css'
import './styles/v2-pricing.css'
import './styles/v2-scroll-motion.css'
/*
 * V3 finish: grano fílmico, selección/scroll de lujo, acento champán y
 * micro-interacciones. Última capa, solo añade pulido.
 */
import './styles/v3-finish.css'
/*
 * Design System 2.0 (Fase 3). Capa ADITIVA y prefijada `.ds-`: declara tokens
 * en :root y estilos de los componentes base del sistema. No toca ningún
 * selector existente: las 17 rutas conservan su estado visual hasta que cada
 * página migre al sistema en su propia fase.
 */
import './styles/ds-tokens.css'
import './styles/ds-base.css'

/**
 * Arranca la medición. No carga ningún proveedor hasta que haya consentimiento
 * explícito (RGPD) y es no-op si no hay IDs configurados en el entorno.
 */
initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ExperienceProvider>
            {/*
              Memoria del recorrido. Va por encima de App para que sobreviva a
              los cambios de ruta, y solo en memoria: el onboarding promete que
              no se guarda nada. Ver VisitorJourneyProvider.jsx.
            */}
            <VisitorJourneyProvider>
              <App />
            </VisitorJourneyProvider>
          </ExperienceProvider>
        </BrowserRouter>
      </HelmetProvider>
    </AppErrorBoundary>
  </StrictMode>,
)
