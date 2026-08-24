import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Footer, Navbar, WhatsAppButton } from './components/Layout'
import { ScrollProgress } from './components/Experience'
import { PageTransition } from './engine'
import PremiumRouteChrome from './components/PremiumRouteChrome'
import CustomCursor from './components/CustomCursor'
import RouteSeo from './components/seo/RouteSeo.jsx'
import RouteEffects from './components/RouteEffects.jsx'
import ConsentBanner from './components/consent/ConsentBanner.jsx'
import JourneyRibbon from './components/onboarding/JourneyRibbon.jsx'
import Home from './pages/Home'

/**
 * Home se importa de forma estática porque es la ruta de entrada y determina
 * el LCP: retrasarla con un chunk aparte empeoraría la primera impresión.
 *
 * El resto de páginas se cargan bajo demanda. Antes eran 16 imports estáticos,
 * así que la primera visita descargaba las 16 páginas y sus 24 hojas de estilo
 * aunque solo se viera una. Con `lazy` cada ruta baja su propio chunk y su CSS.
 */
const About = lazy(() => import('./pages/About'))
const Programs = lazy(() => import('./pages/Programs'))
const ParkourAcademy = lazy(() => import('./pages/ParkourAcademy'))
const PlanPresentation = lazy(() => import('./pages/PlanPresentation'))
const Shop = lazy(() => import('./pages/Shop'))
const AppExperience = lazy(() => import('./pages/AppExperience'))
const Community = lazy(() => import('./pages/Community'))
const Resources = lazy(() => import('./pages/Resources'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const Onboarding = lazy(() => import('./pages/Onboarding'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Estado de carga de una ruta diferida. Anunciado para lectores de pantalla. */
function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span>
        Cargando
        <i aria-hidden="true" />
      </span>
    </div>
  )
}

function Site() {
  return (
    <>
      <a href="#main-content" className="skip-link">Saltar al contenido</a>
      <RouteSeo />
      <RouteEffects />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <PageTransition>
        <main id="main-content">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/parkour-academy" element={<ParkourAcademy />} />
              <Route path="/plan/raiz" element={<PlanPresentation planId="raiz" />} />
              <Route path="/plan/fuerza" element={<PlanPresentation planId="fuerza" />} />
              <Route path="/plan/rendimiento" element={<PlanPresentation planId="rendimiento" />} />
              <Route path="/plan/elite" element={<PlanPresentation planId="elite" />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/app" element={<AppExperience />} />
              <Route path="/community" element={<Community />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/entrar" element={<Onboarding />} />
              {/*
                404 real. Antes esta ruta devolvía <Home />, lo que generaba un
                "soft 404": cualquier URL inexistente respondía 200 con la home.
              */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <PremiumRouteChrome />
        </main>
      </PageTransition>
      <WhatsAppButton />
      <Footer />
      {/* Acompaña la visita cuando la persona ya pasó por recepción. */}
      <JourneyRibbon />
      <ConsentBanner />
    </>
  )
}

export default function App() {
  return <Site />
}
