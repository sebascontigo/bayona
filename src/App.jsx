import { Route, Routes } from 'react-router-dom'
import { Footer, Navbar, WhatsAppButton } from './components/Layout'
import { ScrollProgress } from './components/Experience'
import { PageTransition } from './engine'
import PremiumRouteChrome from './components/PremiumRouteChrome'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import ParkourAcademy from './pages/ParkourAcademy'
import PlanPresentation from './pages/PlanPresentation'
import Shop from './pages/Shop'
import AppExperience from './pages/AppExperience'
import Community from './pages/Community'
import Resources from './pages/Resources'
import FAQ from './pages/FAQ'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Onboarding from './pages/Onboarding'

function Site() {
  return (
    <>
      <a href="#main-content" className="skip-link">Saltar al contenido</a>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <PageTransition>
        <main id="main-content">
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
            <Route path="*" element={<Home />} />
          </Routes>
          <PremiumRouteChrome />
        </main>
      </PageTransition>
      <WhatsAppButton />
      <Footer />
    </>
  )
}

export default function App() {
  return <Site />
}
