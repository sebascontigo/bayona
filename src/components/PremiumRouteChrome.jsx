import { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const BRAND_TAGLINE = 'BAYONA · NO ES FITNESS · ES TRANSFORMACIÓN'

const ROUTE_CONTINUATIONS = Object.freeze({
  '/': Object.freeze({
    marker: '01 — 02',
    eyebrow: 'AHORA, ELIGE ESTRUCTURA',
    title: 'COMPARA EL ACOMPAÑAMIENTO.',
    body: 'Revisa sesiones, seguimiento, alcance y precio antes de decidir.',
    action: 'VER PROGRAMAS',
    to: '/programs',
  }),
  '/about': Object.freeze({
    marker: '02 — 03',
    eyebrow: 'DEL ORIGEN A LA PRÁCTICA',
    title: 'CONOCE LOS PROGRAMAS.',
    body: 'Convierte la filosofía BAYONA en una estructura de entrenamiento revisable.',
    action: 'EXPLORAR PROGRAMAS',
    to: '/programs',
  }),
  '/programs': Object.freeze({
    marker: '03 — 04',
    eyebrow: 'OTRA FORMA DE ENTRENAR',
    title: 'DESCUBRE PARKOUR ACADEMY.',
    body: 'Técnica, fuerza y adaptación para aprender a leer cada obstáculo.',
    action: 'ENTRAR EN LA ACADEMIA',
    to: '/parkour-academy',
  }),
  '/parkour-academy': Object.freeze({
    marker: '04 — 05',
    eyebrow: 'EQUIPA LA PRÁCTICA',
    title: 'OBJETOS HECHOS PARA MOVERTE.',
    body: 'Explora prendas, material y recuperación para tu práctica real.',
    action: 'ABRIR LA TIENDA',
    to: '/shop',
  }),
  '/app': Object.freeze({
    marker: '06 — 07',
    eyebrow: 'MIENTRAS BAYONA+ EVOLUCIONA',
    title: 'EMPIEZA CON ALGO ÚTIL HOY.',
    body: 'Rutinas, guías y recursos que puedes consultar sin esperar al producto digital.',
    action: 'VER RECURSOS',
    to: '/resources',
  }),
  '/community': Object.freeze({
    marker: '07 — 05',
    eyebrow: 'DE LA CONVERSACIÓN A LA ACCIÓN',
    title: 'LLEVA EL MOVIMIENTO CONTIGO.',
    body: 'Explora el equipamiento y los objetos que acompañan la práctica BAYONA.',
    action: 'VISITAR LA TIENDA',
    to: '/shop',
  }),
  '/resources': Object.freeze({
    marker: '08 — 09',
    eyebrow: 'ANTES DE ELEGIR',
    title: 'RESUELVE LO QUE FALTA.',
    body: 'Consulta alcance, precios, condiciones y estado real de cada servicio.',
    action: 'ABRIR PREGUNTAS',
    to: '/faq',
  }),
  '/faq': Object.freeze({
    marker: '09 — 01',
    eyebrow: 'YA TIENES LA INFORMACIÓN',
    title: 'ENCUENTRA TU PUNTO DE PARTIDA.',
    body: 'Tres decisiones breves para orientar la primera ruta sin compromiso.',
    action: 'ENTRAR A BAYONA',
    to: '/onboarding',
  }),
})

const ROUTE_CONFIG = Object.freeze({
  '/': Object.freeze({
    key: 'home',
    revealSelectors: [],
    cardSelectors: [
      '.pain-item',
      '.mechanism-step',
      '.pillar-item',
      '.evidence-record',
      '.proof-process-item',
    ],
    spotlightSelectors: ['.pain-item', '.pillar-item', '.evidence-record'],
    tiltSelectors: [],
  }),
  '/about': Object.freeze({
    key: 'about',
    revealSelectors: ['.about-timeline-entry'],
    cardSelectors: ['.about-value'],
    spotlightSelectors: ['.about-value'],
    tiltSelectors: [],
  }),
  '/programs': Object.freeze({
    key: 'programs',
    revealSelectors: [],
    cardSelectors: ['.age-path-item', '.pillar', '.plan-accordion-item', '.program-service-category'],
    spotlightSelectors: ['.pillar', '.plan-accordion-item', '.program-service-category'],
    tiltSelectors: ['.plan-accordion-item.featured'],
  }),
  '/parkour-academy': Object.freeze({
    key: 'parkour-academy',
    revealSelectors: [],
    cardSelectors: ['.academy-level', '.academy-logistics-grid > article'],
    spotlightSelectors: ['.academy-level'],
    tiltSelectors: [],
  }),
  '/shop': Object.freeze({
    key: 'shop',
    revealSelectors: [],
    cardSelectors: ['.shop-collection-card'],
    spotlightSelectors: ['.shop-collection-card'],
    tiltSelectors: [],
  }),
  '/app': Object.freeze({
    key: 'app',
    revealSelectors: [],
    cardSelectors: ['.app-pain-item', '.app-differentiator', '.app-feature-card'],
    spotlightSelectors: ['.app-differentiator', '.app-feature-card'],
    tiltSelectors: ['.app-founding-card'],
  }),
  '/community': Object.freeze({
    key: 'community',
    revealSelectors: [],
    cardSelectors: [],
    spotlightSelectors: [],
    tiltSelectors: [],
  }),
  '/resources': Object.freeze({
    key: 'resources',
    revealSelectors: ['.resources-reveal'],
    cardSelectors: [],
    spotlightSelectors: [],
    tiltSelectors: [],
  }),
  '/faq': Object.freeze({
    key: 'faq',
    revealSelectors: ['.faq-category', '.faq-contact-card'],
    cardSelectors: ['.faq-contact-card'],
    spotlightSelectors: ['.faq-contact-card'],
    tiltSelectors: [],
  }),
})

function mediaMatches(query) {
  return typeof window.matchMedia === 'function' && window.matchMedia(query).matches
}

function queryTargets(root, selectors) {
  return [...new Set(selectors.flatMap((selector) => [...root.querySelectorAll(selector)]))]
}

function usePremiumRouteEnhancements(config) {
  useEffect(() => {
    if (!config) return undefined

    const main = document.getElementById('main-content')
    if (!main) return undefined

    const routeClass = `premium-route--${config.key}`
    document.body.classList.add('premium-route-active', routeClass)

    const cards = queryTargets(main, config.cardSelectors)
    cards.forEach((card) => card.classList.add('premium-card'))

    const reducedMotion = mediaMatches('(prefers-reduced-motion: reduce)')
    const canObserve = !reducedMotion && 'IntersectionObserver' in window
    const revealTargets = new Set()
    let revealIndex = 0
    const revealObserver = canObserve
      ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        })
      }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' })
      : null

    const registerRevealTargets = () => {
      queryTargets(main, config.revealSelectors).forEach((target) => {
        if (revealTargets.has(target)) return
        target.classList.add('premium-reveal')
        target.style.setProperty('--premium-reveal-delay', `${(revealIndex % 6) * 0.08}s`)
        revealIndex += 1
        revealTargets.add(target)

        if (revealObserver) revealObserver.observe(target)
        else target.classList.add('is-visible')
      })
    }

    registerRevealTargets()

    const mutationObserver = config.revealSelectors.length > 0 && 'MutationObserver' in window
      ? new MutationObserver(registerRevealTargets)
      : null
    mutationObserver?.observe(main, { childList: true, subtree: true })

    const pointerDisposers = []
    const pointerEffectsEnabled = !reducedMotion && mediaMatches('(hover: hover) and (pointer: fine)')

    if (pointerEffectsEnabled) {
      queryTargets(main, config.spotlightSelectors).forEach((target) => {
        const moveSpotlight = (event) => {
          const rect = target.getBoundingClientRect()
          target.style.setProperty('--premium-spotlight-x', `${event.clientX - rect.left}px`)
          target.style.setProperty('--premium-spotlight-y', `${event.clientY - rect.top}px`)
        }
        const resetSpotlight = () => {
          target.style.setProperty('--premium-spotlight-x', '50%')
          target.style.setProperty('--premium-spotlight-y', '50%')
        }

        target.classList.add('premium-spotlight-card')
        target.addEventListener('pointermove', moveSpotlight)
        target.addEventListener('pointerleave', resetSpotlight)
        pointerDisposers.push(() => {
          target.removeEventListener('pointermove', moveSpotlight)
          target.removeEventListener('pointerleave', resetSpotlight)
          target.classList.remove('premium-spotlight-card')
          target.style.removeProperty('--premium-spotlight-x')
          target.style.removeProperty('--premium-spotlight-y')
        })
      })

      queryTargets(main, config.tiltSelectors).forEach((target) => {
        const moveTilt = (event) => {
          const rect = target.getBoundingClientRect()
          const xRatio = (event.clientX - rect.left) / rect.width
          const yRatio = (event.clientY - rect.top) / rect.height
          target.style.setProperty('--premium-tilt-x', `${(0.5 - yRatio) * 8}deg`)
          target.style.setProperty('--premium-tilt-y', `${(xRatio - 0.5) * 8}deg`)
        }
        const startTilt = () => target.classList.add('premium-tilt-card')
        const resetTilt = () => {
          target.classList.remove('premium-tilt-card')
          target.style.setProperty('--premium-tilt-x', '0deg')
          target.style.setProperty('--premium-tilt-y', '0deg')
        }

        target.classList.add('premium-tilt-ready')
        target.addEventListener('pointerenter', startTilt)
        target.addEventListener('pointermove', moveTilt)
        target.addEventListener('pointerleave', resetTilt)
        pointerDisposers.push(() => {
          target.removeEventListener('pointerenter', startTilt)
          target.removeEventListener('pointermove', moveTilt)
          target.removeEventListener('pointerleave', resetTilt)
          target.classList.remove('premium-tilt-ready', 'premium-tilt-card')
          target.style.removeProperty('--premium-tilt-x')
          target.style.removeProperty('--premium-tilt-y')
        })
      })
    }

    return () => {
      mutationObserver?.disconnect()
      revealObserver?.disconnect()
      pointerDisposers.forEach((dispose) => dispose())
      revealTargets.forEach((target) => {
        target.classList.remove('premium-reveal', 'is-visible')
        target.style.removeProperty('--premium-reveal-delay')
      })
      cards.forEach((card) => card.classList.remove('premium-card'))
      document.body.classList.remove('premium-route-active', routeClass)
    }
  }, [config])
}

function BrandMarquee() {
  return (
    <div className="premium-brand-marquee" role="region" aria-label={BRAND_TAGLINE}>
      <span className="premium-visually-hidden">{BRAND_TAGLINE}</span>
      <div className="premium-brand-marquee-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div className="premium-brand-marquee-group" key={group}>
            {[0, 1, 2, 3].map((item) => (
              <span className="premium-brand-marquee-item" key={item}>{BRAND_TAGLINE}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function RouteContinuation({ continuation, routeKey }) {
  if (!continuation) return null

  const headingId = `premium-continuation-${routeKey}`

  return (
    <section className="premium-continuation" aria-labelledby={headingId}>
      <div className="premium-continuation-inner">
        <span className="premium-continuation-marker" aria-hidden="true">{continuation.marker}</span>
        <div className="premium-continuation-copy">
          <p>{continuation.eyebrow}</p>
          <h2 id={headingId}>{continuation.title}</h2>
          <span>{continuation.body}</span>
        </div>
        <Link className="premium-continuation-action" to={continuation.to}>
          {continuation.action}
          <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default function PremiumRouteChrome() {
  const { pathname } = useLocation()
  const config = ROUTE_CONFIG[pathname]
  const continuation = ROUTE_CONTINUATIONS[pathname]
  usePremiumRouteEnhancements(config)

  if (!config) return null

  return (
    <>
      <BrandMarquee />
      <RouteContinuation continuation={continuation} routeKey={config.key} />
    </>
  )
}
