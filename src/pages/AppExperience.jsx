import { useEffect } from 'react'
import { ArrowUpRight, ChevronDown, MessageCircle, Smartphone, Tablet, Watch } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionLabel } from '../components/Layout'
import Bridge from '../components/Bridge'
import VideoSection from '../components/VideoSection.jsx'
import { sceneBackgroundProps } from '../components/SceneBackground.jsx'
import { siteMedia } from '../config/siteMedia.js'
import { whatsAppLink } from '../config/site.config.js'
// app.css era global en main.jsx (88 kB en todas las rutas). Ahora viaja con /app.
import '../styles/app.css'

const WHATSAPP_EARLY_ACCESS_URL = whatsAppLink('Hola BAYONA, quiero recibir novedades sobre BAYONA+, que está en desarrollo.')

const VISION_POINTS = [
  'Consultar el plan del día y sus indicaciones desde un mismo lugar.',
  'Registrar sesiones, hábitos y sensaciones para revisar el proceso.',
  'Acceder al canal de soporte incluido en cada plan.',
  'Encontrar la comunidad y sus recursos sin cambiar de plataforma.',
  'Entender el propósito de cada bloque de entrenamiento.',
]

const PAIN_POINTS = [
  {
    title: 'DATOS SIN CONTEXTO',
    copy: 'Una cifra aislada no explica qué decisión tomar ni cuándo conviene ajustar el entrenamiento.',
  },
  {
    title: 'RUTINAS GENÉRICAS',
    copy: 'Un programa útil necesita un objetivo, un punto de partida y criterios claros para progresar.',
  },
  {
    title: 'SEGUIMIENTO FRAGMENTADO',
    copy: 'Plan, registro y conversación suelen vivir en herramientas distintas. BAYONA+ explora cómo reunirlos.',
  },
]

const DIFFERENTIATORS = [
  {
    title: 'MOVIMIENTO Y PARKOUR',
    copy: 'La propuesta incorpora principios de práctica, adaptación y técnica procedentes de la experiencia de BAYONA con el parkour.',
  },
  {
    title: 'ENTRENAMIENTO, NUTRICIÓN Y RECUPERACIÓN',
    copy: 'El concepto busca ordenar estas áreas dentro del alcance de cada plan, sin sustituir atención sanitaria ni nutrición clínica.',
  },
  {
    title: 'FORMACIÓN APLICADA',
    copy: 'La experiencia práctica y la formación europea en preparación física orientan el contenido que se está diseñando.',
  },
  {
    title: 'PRODUCTO DIGITAL EN DESARROLLO',
    copy: 'Arquitectura, funciones, dispositivos compatibles y fechas siguen en definición. Esta página presenta una dirección, no un producto disponible.',
  },
]

export const APP_FEATURES = [
  {
    id: 'plan-ritmo',
    title: 'PLAN DIARIO',
    copy: 'La visión es reunir la sesión prevista, sus explicaciones y las alternativas definidas por el entrenador.',
  },
  {
    id: 'datos-entendidos',
    title: 'REGISTRO CON CONTEXTO',
    copy: 'Sesiones, hábitos y sensaciones podrían organizarse para facilitar la revisión, sin convertir un dato aislado en una recomendación médica.',
  },
  {
    id: 'cuerpo-mapa',
    title: 'MAPA DE MOVIMIENTO',
    copy: 'Se exploran recursos educativos para observar patrones, rangos y técnica dentro del trabajo de entrenamiento.',
  },
  {
    id: 'anatomia-movimiento',
    title: 'ANATOMÍA VISUAL',
    copy: 'Se estudian visualizaciones educativas de músculos y cuerpo. Su alcance aún no está definido y no sustituirán una evaluación clínica.',
  },
  {
    id: 'entrenador-siempre',
    title: 'CANAL CON TU ENTRENADOR',
    copy: 'El objetivo es centralizar el contacto incluido en tu plan. La disponibilidad y los tiempos de respuesta dependerán de sus condiciones.',
  },
  {
    id: 'recuperacion-inteligente',
    title: 'REGISTRO DE RECUPERACIÓN',
    copy: 'Sueño, esfuerzo y sensaciones podrían aportar contexto para revisar la carga con el entrenador, no para diagnosticar.',
  },
  {
    id: 'comunidad-empuja',
    title: 'COMUNIDAD CONECTADA',
    copy: 'La propuesta contempla acceso a conversaciones y recursos de la comunidad desde el mismo entorno.',
  },
  {
    id: 'progreso-real',
    title: 'PROGRESO REVISABLE',
    copy: 'El concepto permite registrar indicadores elegidos para cada objetivo y compararlos a lo largo del tiempo.',
  },
  {
    id: 'modo-offline',
    title: 'ACCESO SIN CONEXIÓN',
    copy: 'La descarga de sesiones para uso sin conexión está en evaluación y no se anuncia todavía como función confirmada.',
  },
]

const FOUNDING_BENEFITS = [
  {
    title: 'ACTUALIZACIONES DE DESARROLLO',
    copy: 'Recibe novedades cuando exista información concreta sobre pruebas, funciones o fechas.',
  },
  {
    title: 'POSIBLES PRUEBAS PILOTO',
    copy: 'Si se abre un piloto compatible con tu perfil, recibirás sus requisitos y condiciones antes de decidir.',
  },
  {
    title: 'FEEDBACK DOCUMENTADO',
    copy: 'Podrás compartir necesidades y observaciones. Se evaluarán, sin prometer que cada solicitud se convierta en una función.',
  },
  {
    title: 'CONDICIONES ANTES DE PAGAR',
    copy: 'No hay compra ni precio fundador activo. Cualquier oferta futura se explicará por escrito antes de contratar.',
  },
]

const PHONE_MODULES = [
  { title: 'ESTADO', value: 'CONCEPTO', meta: 'EJEMPLO DE INTERFAZ' },
  { title: 'MOVILIDAD', value: 'REGISTRO', meta: 'INDICADOR POR DEFINIR' },
  { title: 'RUTINA', value: 'BLOQUE A', meta: 'EJEMPLO DE SESIÓN' },
  { title: 'RECUPERACIÓN', value: 'REGISTRO', meta: 'SIN DIAGNÓSTICO' },
  { title: 'COMUNIDAD', value: 'ACCESO', meta: 'SEGÚN DISPONIBILIDAD' },
  { title: 'PROGRESO', value: 'HISTORIAL', meta: 'MÉTRICAS POR DEFINIR' },
]

function useAppReveal() {
  useEffect(() => {
    const page = document.querySelector('.app-page')
    if (!page) return undefined

    const revealElements = page.querySelectorAll('.app-reveal, .app-reveal-stagger')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerEffectsQuery = window.matchMedia(
      '(min-width: 769px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    let revealObserver

    if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('visible'))
    } else {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('visible')
          revealObserver.unobserve(entry.target)
        })
      }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' })

      revealElements.forEach((element) => revealObserver.observe(element))
    }

    const listenToMediaQuery = (query, callback) => {
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', callback)
        return () => query.removeEventListener('change', callback)
      }

      query.addListener(callback)
      return () => query.removeListener(callback)
    }

    const animationFrames = new Set()
    const scheduleFrame = (callback) => {
      let frameId = 0
      frameId = window.requestAnimationFrame((timestamp) => {
        animationFrames.delete(frameId)
        callback(timestamp)
      })
      animationFrames.add(frameId)
      return frameId
    }

    const countTargets = []
    const registerCountTarget = (element) => {
      if (!element) return
      const original = element.textContent
      const match = original.match(/\d+/)
      if (!match) return

      element.dataset.appCountUpMetric = 'true'
      countTargets.push({
        element,
        original,
        prefix: original.slice(0, match.index),
        suffix: original.slice(match.index + match[0].length),
        digits: match[0],
        value: Number(match[0]),
        started: false,
        frameId: 0,
      })
    }

    const numericPhoneMetrics = new Set(['READINESS', 'MOVILIDAD', 'COMUNIDAD'])
    page.querySelectorAll('.app-phone-module').forEach((module) => {
      const title = module.querySelector('h4')?.textContent.trim()
      if (numericPhoneMetrics.has(title)) registerCountTarget(module.querySelector('strong'))
    })

    const watchReadiness = page.querySelector('.app-device-watch strong')
    if (watchReadiness?.textContent.includes('READINESS')) registerCountTarget(watchReadiness)

    const writeCountValue = (target, value) => {
      const number = String(value).padStart(target.digits.length, '0')
      target.element.textContent = `${target.prefix}${number}${target.suffix}`
    }

    const finishCount = (target) => {
      if (target.frameId) {
        window.cancelAnimationFrame(target.frameId)
        animationFrames.delete(target.frameId)
        target.frameId = 0
      }
      target.started = true
      writeCountValue(target, target.value)
    }

    const startCount = (target) => {
      if (target.started) return
      target.started = true

      if (reducedMotionQuery.matches) {
        finishCount(target)
        return
      }

      writeCountValue(target, 0)
      let startTime
      const step = (timestamp) => {
        if (reducedMotionQuery.matches) {
          finishCount(target)
          return
        }

        if (startTime === undefined) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / 900, 1)
        const easedProgress = 1 - ((1 - progress) ** 4)
        writeCountValue(target, Math.round(target.value * easedProgress))

        if (progress < 1) {
          target.frameId = scheduleFrame(step)
        } else {
          target.frameId = 0
          writeCountValue(target, target.value)
        }
      }

      target.frameId = scheduleFrame(step)
    }

    let countObserver
    if (reducedMotionQuery.matches) {
      countTargets.forEach(finishCount)
    } else if ('IntersectionObserver' in window) {
      countObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = countTargets.find((item) => item.element === entry.target)
          if (target) startCount(target)
          countObserver.unobserve(entry.target)
        })
      }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' })
      countTargets.forEach((target) => countObserver.observe(target.element))
    } else {
      countTargets.forEach(startCount)
    }

    const anatomyTrigger = page.querySelector('.app-anatomy-trigger')
    const anatomyCard = anatomyTrigger?.closest('.app-feature')
    let removeAnatomyInteraction = () => {}

    if (anatomyTrigger && anatomyCard) {
      anatomyCard.classList.add('app-anatomy-interactive')
      const toggleAnatomy = () => {
        const isActive = anatomyCard.classList.toggle('is-anatomy-active')
        anatomyTrigger.setAttribute('aria-pressed', String(isActive))
      }

      anatomyTrigger.addEventListener('click', toggleAnatomy)
      removeAnatomyInteraction = () => {
        anatomyTrigger.removeEventListener('click', toggleAnatomy)
        anatomyTrigger.setAttribute('aria-pressed', 'false')
        anatomyCard.classList.remove('app-anatomy-interactive', 'is-anatomy-active')
      }
    }

    const mockups = Array.from(page.querySelectorAll('.app-device'))
    const spotlightCards = Array.from(page.querySelectorAll('.app-founding-benefit'))
    let pointerCleanups = []

    const clearMockupVariables = (element) => {
      [
        '--app-pointer-x',
        '--app-pointer-y',
        '--app-follow-x',
        '--app-follow-y',
        '--app-rotate-x',
        '--app-rotate-y',
      ].forEach((property) => element.style.removeProperty(property))
    }

    const clearSpotlightVariables = (element) => {
      element.style.removeProperty('--app-spotlight-x')
      element.style.removeProperty('--app-spotlight-y')
    }

    const bindPointerTarget = (element, update, reset, clear) => {
      let frameId = 0
      let point

      const flush = () => {
        frameId = 0
        if (!point) return
        const rect = element.getBoundingClientRect()
        if (!rect.width || !rect.height) return
        const x = Math.min(1, Math.max(0, (point.x - rect.left) / rect.width))
        const y = Math.min(1, Math.max(0, (point.y - rect.top) / rect.height))
        update(x, y)
      }

      const handlePointerMove = (event) => {
        point = { x: event.clientX, y: event.clientY }
        if (!frameId) frameId = window.requestAnimationFrame(flush)
      }

      const handlePointerLeave = () => {
        point = undefined
        if (frameId) window.cancelAnimationFrame(frameId)
        frameId = 0
        reset()
      }

      reset()
      element.addEventListener('pointermove', handlePointerMove, { passive: true })
      element.addEventListener('pointerleave', handlePointerLeave)
      element.addEventListener('pointercancel', handlePointerLeave)

      return () => {
        if (frameId) window.cancelAnimationFrame(frameId)
        element.removeEventListener('pointermove', handlePointerMove)
        element.removeEventListener('pointerleave', handlePointerLeave)
        element.removeEventListener('pointercancel', handlePointerLeave)
        clear()
      }
    }

    const clearPointerBindings = () => {
      pointerCleanups.forEach((cleanup) => cleanup())
      pointerCleanups = []
    }

    const setupPointerEffects = () => {
      clearPointerBindings()
      if (!pointerEffectsQuery.matches) return

      mockups.forEach((mockup) => {
        const reset = () => {
          mockup.style.setProperty('--app-pointer-x', '50%')
          mockup.style.setProperty('--app-pointer-y', '50%')
          mockup.style.setProperty('--app-follow-x', '0px')
          mockup.style.setProperty('--app-follow-y', '0px')
          mockup.style.setProperty('--app-rotate-x', '0deg')
          mockup.style.setProperty('--app-rotate-y', '0deg')
        }
        const update = (x, y) => {
          mockup.style.setProperty('--app-pointer-x', `${(x * 100).toFixed(2)}%`)
          mockup.style.setProperty('--app-pointer-y', `${(y * 100).toFixed(2)}%`)
          mockup.style.setProperty('--app-follow-x', `${((x - 0.5) * 4).toFixed(2)}px`)
          mockup.style.setProperty('--app-follow-y', `${((y - 0.5) * 4).toFixed(2)}px`)
          mockup.style.setProperty('--app-rotate-x', `${((0.5 - y) * 1.2).toFixed(3)}deg`)
          mockup.style.setProperty('--app-rotate-y', `${((x - 0.5) * 1.6).toFixed(3)}deg`)
        }
        pointerCleanups.push(bindPointerTarget(
          mockup,
          update,
          reset,
          () => clearMockupVariables(mockup),
        ))
      })

      spotlightCards.forEach((card) => {
        const reset = () => {
          card.style.setProperty('--app-spotlight-x', '50%')
          card.style.setProperty('--app-spotlight-y', '50%')
        }
        const update = (x, y) => {
          card.style.setProperty('--app-spotlight-x', `${(x * 100).toFixed(2)}%`)
          card.style.setProperty('--app-spotlight-y', `${(y * 100).toFixed(2)}%`)
        }
        pointerCleanups.push(bindPointerTarget(
          card,
          update,
          reset,
          () => clearSpotlightVariables(card),
        ))
      })
    }

    setupPointerEffects()

    const handleReducedMotionChange = () => {
      if (!reducedMotionQuery.matches) return
      revealElements.forEach((element) => element.classList.add('visible'))
      revealObserver?.disconnect()
      countObserver?.disconnect()
      countTargets.forEach(finishCount)
    }

    const stopReducedMotionListener = listenToMediaQuery(reducedMotionQuery, handleReducedMotionChange)
    const stopPointerEffectsListener = listenToMediaQuery(pointerEffectsQuery, setupPointerEffects)

    return () => {
      revealObserver?.disconnect()
      countObserver?.disconnect()
      stopReducedMotionListener()
      stopPointerEffectsListener()
      clearPointerBindings()
      removeAnatomyInteraction()
      animationFrames.forEach((frameId) => window.cancelAnimationFrame(frameId))
      countTargets.forEach((target) => {
        target.element.textContent = target.original
        delete target.element.dataset.appCountUpMetric
      })
    }
  }, [])
}

function renderFeatureCopy(feature) {
  if (feature.id !== 'anatomia-movimiento') return feature.copy

  return feature.copy.split(/(músculos|cuerpo)/).map((part, index) => (
    /^(músculos|cuerpo)$/.test(part)
      ? <span className="app-anatomy-zone" key={`${part}-${index}`}>{part}</span>
      : part
  ))
}

function AppDivider() {
  return <div className="app-divider" aria-hidden="true" />
}

function AppSectionNumber({ children }) {
  return <span className="app-section-number" aria-hidden="true">{children}</span>
}

export default function AppExperience() {
  useAppReveal()

  return (
    <div className="app-experience app-page">
      <section
        {...sceneBackgroundProps(siteMedia.app.hero, {
          className: 'app-hero',
          variant: 'hero',
          motion: true,
        })}
        aria-labelledby="app-hero-title"
      >
        <div className="app-hero-content">
          <p className="app-eyebrow">BAYONA+ <span aria-hidden="true">•</span> PRODUCTO EN DESARROLLO</p>
          <h1 id="app-hero-title" className="app-hero-title">
            <span className="app-hero-line">ENTRENAMIENTO.</span>
            <span className="app-hero-line accent">SEGUIMIENTO.</span>
            <span className="app-hero-line">UN MISMO LUGAR.</span>
          </h1>
          <p className="app-hero-subtitle">
            BAYONA+ es un producto en desarrollo para reunir plan, registro, recursos y comunidad en un mismo lugar. Todavía no está disponible.
          </p>
          <div className="app-hero-cta">
            <a
              href={WHATSAPP_EARLY_ACCESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-primary-cta btn-primary"
            >
              RECIBIR NOVEDADES
              <MessageCircle size={18} strokeWidth={1} aria-hidden="true" />
            </a>
            <a href="#vision" className="app-text-link text-link">
              CONOCER EL CONCEPTO
              <ChevronDown size={14} strokeWidth={1} aria-hidden="true" />
            </a>
          </div>
        </div>
        <a className="app-scroll-indicator" href="#vision" aria-label="Ir al concepto de BAYONA+">
          <span className="app-scroll-line line" />
          <ChevronDown size={14} strokeWidth={1} aria-hidden="true" />
        </a>
      </section>

      <AppDivider />

      <section id="vision" className="app-vision app-section app-reveal" data-section-number="01" aria-labelledby="app-vision-title">
        <AppSectionNumber>01</AppSectionNumber>
        <div className="section-shell app-section-content container">
          <header className="app-section-header app-vision-header">
            <SectionLabel>01 / CONCEPTO DE PRODUCTO</SectionLabel>
            <h2 id="app-vision-title" className="app-section-title">UNA EXPERIENCIA<br /><span>EN EVALUACIÓN.</span></h2>
            <p className="app-section-subtitle">
              La visión es consultar el plan, registrar la sesión y acceder a recursos desde un mismo entorno. Es un escenario de diseño: todavía no describe una función disponible.
            </p>
          </header>
          <VideoSection
            title="BAYONA+: CONCEPTO EN 90 SEGUNDOS"
            subtitle="Sebastián presenta la dirección del producto, las funciones que se exploran y lo que aún está por definir."
            poster={siteMedia.app.hero.src}
            duration="90 SEG"
            placement="contained"
          />
          <ol className="app-vision-list app-reveal-stagger">
            {VISION_POINTS.map((point, index) => (
              <li
                {...sceneBackgroundProps(siteMedia.app.vision[index], {
                  className: 'app-vision-item',
                  style: { '--i': index },
                  variant: 'accent',
                })}
                key={point}
              >
                <span className="app-vision-marker">{String(index + 1).padStart(2, '0')}</span>
                <strong className="app-vision-text">{point}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <AppDivider />

      <section className="app-problem app-section app-reveal" data-section-number="02" aria-labelledby="app-problem-title">
        <AppSectionNumber>02</AppSectionNumber>
        <div className="section-shell app-section-content container">
          <div className="app-problem-layout">
            <div className="app-problem-title-col">
              <SectionLabel>02 / EL RETO DE DISEÑO</SectionLabel>
              <h2 id="app-problem-title" className="app-section-title">MUCHOS DATOS.<br /><span>POCO CONTEXTO.</span></h2>
              <p className="app-section-subtitle">El objetivo del concepto es ordenar la información útil para el entrenamiento.</p>
              <p className="app-problem-closing">BAYONA+ explora una forma de reunir plan, registro y conversación.</p>
            </div>
            <div className="app-pain-list app-reveal-stagger">
              {PAIN_POINTS.map((point, index) => (
                <article
                  {...sceneBackgroundProps(siteMedia.app.pain[index], {
                    className: 'app-pain-item',
                    style: { '--i': index },
                    variant: 'accent',
                  })}
                  key={point.title}
                >
                  <span className="app-pain-number">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="app-pain-title">{point.title}</h3>
                    <p className="app-pain-desc">{point.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AppDivider />

      <section className="app-difference app-section app-reveal" data-section-number="03" aria-labelledby="app-difference-title">
        <AppSectionNumber>03</AppSectionNumber>
        <div className="section-shell app-section-content container">
          <header className="app-section-header">
            <SectionLabel>03 / LÍNEAS DE TRABAJO</SectionLabel>
            <h2 id="app-difference-title" className="app-section-title">LO QUE ESTAMOS<br /><span>EXPLORANDO.</span></h2>
            <p className="app-authority-intro">Movimiento, entrenamiento, nutrición y seguimiento dentro de un producto cuyo alcance aún está en definición.</p>
          </header>
          <div className="app-differentiators app-reveal-stagger">
            {DIFFERENTIATORS.map((item, index) => (
              <article className="app-differentiator" key={item.title} style={{ '--i': index }}>
                <span className="app-diff-number">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="app-diff-title">{item.title}</h3>
                <p className="app-diff-desc">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AppDivider />

      <section className="app-features app-section app-reveal" data-section-number="04" aria-labelledby="app-features-title">
        <AppSectionNumber>04</AppSectionNumber>
        <div className="section-shell app-section-content container">
          <header className="app-section-header app-features-header">
            <SectionLabel>04 / FUNCIONES EN EXPLORACIÓN</SectionLabel>
            <h2 id="app-features-title" className="app-section-title">POSIBLES MÓDULOS.<br /><span>NO FUNCIONES CONFIRMADAS.</span></h2>
          </header>
          <div className="app-features-grid app-reveal-stagger" role="list" aria-label="Funciones conceptuales en evaluación para BAYONA+">
            {APP_FEATURES.map((feature, index) => (
              <article
                {...sceneBackgroundProps(
                  index < siteMedia.app.features.length - 1 ? siteMedia.app.features[index] : null,
                  {
                    className: 'app-feature-card app-feature',
                    style: { '--i': index },
                    variant: 'accent',
                    pseudo: 'after',
                  },
                )}
                key={feature.id}
                role="listitem"
              >
                {feature.id === 'anatomia-movimiento' && (
                  <button
                    type="button"
                    className="app-anatomy-trigger"
                    aria-label={feature.title}
                    aria-pressed="false"
                  />
                )}
                <span className="app-feature-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="app-feature-content">
                  <h3>{feature.title}</h3>
                  <p>{renderFeatureCopy(feature)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AppDivider />

      <section id="experiencia-bayona-plus" className="app-concept app-mockup-stage app-section app-reveal" data-section-number="05" aria-labelledby="app-experience-title">
        <AppSectionNumber>05</AppSectionNumber>
        <div
          {...sceneBackgroundProps(siteMedia.app.features[siteMedia.app.features.length - 1], {
            className: 'section-shell app-section-content container',
            variant: 'subtle',
          })}
        >
          <header className="app-section-header app-concept-heading">
            <SectionLabel>05 / MOCKUPS CONCEPTUALES</SectionLabel>
            <h2 id="app-experience-title" className="app-section-title">UNA DIRECCIÓN VISUAL<br /><span>EN TRES FORMATOS.</span></h2>
            <p className="app-section-subtitle">Teléfono, tablet y reloj ilustran una posible experiencia. No confirman dispositivos compatibles, integraciones ni funciones finales.</p>
          </header>

          <div className="app-device-stage app-mockup-container" role="group" aria-label="Mockups conceptuales de BAYONA+ en teléfono, tablet y reloj">
            <figure className="app-device app-device-phone" aria-labelledby="app-phone-caption">
              <figcaption id="app-phone-caption">
                <Smartphone size={16} strokeWidth={1} aria-hidden="true" /> TU DÍA A DÍA
              </figcaption>
              <div className="app-phone-perspective" data-phone-part="perspective">
                <span className="app-phone-depth" data-phone-part="depth" aria-hidden="true" />
                <div className="app-phone-side-controls app-phone-side-controls-left" data-phone-part="side-controls" aria-hidden="true">
                  <span data-phone-control="mute" />
                  <span data-phone-control="volume-up" />
                  <span data-phone-control="volume-down" />
                </div>
                <div className="app-phone-side-controls app-phone-side-controls-right" data-phone-part="side-controls" aria-hidden="true">
                  <span data-phone-control="power" />
                </div>
                <div className="app-phone-shell" data-phone-part="frame" aria-label="BAYONA+ para teléfono">
                  <div className="app-phone-bezel" data-phone-part="bezel">
                    <div className="app-phone-sensor" data-phone-part="camera-sensor" aria-hidden="true">
                      <span className="app-phone-camera" />
                      <span className="app-phone-speaker" />
                    </div>
                    <div className="app-device-screen app-phone-screen" data-phone-part="screen">
                      <header className="app-phone-status">
                        <p className="app-screen-brand">BAYONA+</p>
                        <span>HOY / TU PLAN</span>
                      </header>
                      <section className="app-phone-dashboard" aria-labelledby="app-phone-dashboard-title">
                        <div className="app-phone-dashboard-heading">
                          <span>TU DÍA A DÍA</span>
                          <h3 id="app-phone-dashboard-title">Tu cuerpo. Tu dirección.</h3>
                        </div>
                        <div className="app-phone-modules" role="list" aria-label="Módulos de tu día con BAYONA+">
                          {PHONE_MODULES.map((module) => (
                            <article className="app-phone-module" role="listitem" key={module.title}>
                              <h4>{module.title}</h4>
                              <strong>{module.value}</strong>
                              <span>{module.meta}</span>
                            </article>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </figure>

            <figure className="app-device app-device-tablet" aria-labelledby="app-tablet-caption">
              <figcaption id="app-tablet-caption">
                <Tablet size={16} strokeWidth={1} aria-hidden="true" /> TU SEMANA COMPLETA
              </figcaption>
              <div className="app-device-frame" aria-label="BAYONA+ para tablet">
                <div className="app-device-screen">
                  <div className="app-tablet-header">
                    <p className="app-screen-brand">BAYONA+</p>
                    <span className="app-screen-meta">SEMANA 08</span>
                  </div>
                  <h3>Todo tu progreso,<br /><em>en perspectiva.</em></h3>
                  <div className="app-tablet-track" aria-hidden="true">
                    <span>Movimiento</span><i /><span>Recuperación</span><i /><span>Hábitos</span>
                  </div>
                  <p className="app-tablet-footnote">ENTRENAMIENTO · RECUPERACIÓN · HÁBITOS</p>
                </div>
              </div>
            </figure>

            <figure className="app-device app-device-watch" aria-labelledby="app-watch-caption">
              <figcaption id="app-watch-caption">
                <Watch size={16} strokeWidth={1} aria-hidden="true" /> CONCEPTO PARA RELOJ
              </figcaption>
              <div className="app-watch-strap" aria-hidden="true" />
              <div className="app-device-frame" aria-label="Mockup conceptual de BAYONA+ para reloj">
                <div className="app-device-screen">
                  <p className="app-screen-brand">BAYONA+</p>
                  <span className="app-watch-pulse" aria-hidden="true" />
                  <strong>ESTADO —</strong>
                  <small>MÉTRICA POR DEFINIR</small>
                </div>
              </div>
            </figure>
          </div>
          <p className="app-device-caption app-mockup-caption">Representaciones conceptuales. El producto todavía no está disponible.</p>
        </div>
      </section>

      <AppDivider />

      <section className="app-founding app-section app-reveal" data-section-number="06" aria-labelledby="app-founding-title">
        <AppSectionNumber>06</AppSectionNumber>
        <div className="section-shell app-section-content container">
          <div className="app-founding-card">
            <SectionLabel>06 / LISTA DE INTERÉS</SectionLabel>
            <h2 id="app-founding-title" className="app-founding-title">SIGUE<br /><span>EL DESARROLLO.</span></h2>
            <p className="app-founding-intro app-founding-subtitle">Deja un mensaje para recibir novedades cuando exista información concreta. Apuntarte no reserva plaza, no activa una compra y no garantiza acceso a una prueba.</p>
            <ol className="app-founding-benefits app-reveal-stagger">
              {FOUNDING_BENEFITS.map((benefit, index) => (
                <li className="app-founding-benefit" key={benefit.title} style={{ '--i': index }}>
                  <span className="app-founding-benefit-num">{String(index + 1).padStart(2, '0')}</span>
                  <div className="app-founding-benefit-text">
                    <strong>{benefit.title}</strong>
                    <p>{benefit.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href={WHATSAPP_EARLY_ACCESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-primary-cta app-founding-cta"
            >
              RECIBIR NOVEDADES
              <MessageCircle size={18} strokeWidth={1} aria-hidden="true" />
            </a>
            <p className="app-founding-scarcity">No hay precio fundador, cupos ni fecha de lanzamiento confirmados.</p>
            <Bridge
              compact
              hook="Mientras BAYONA+ sigue en desarrollo, puedes conocer los programas actuales o entrar a la comunidad abierta."
              free
              ctaLabel="CONOCER LA COMUNIDAD"
              ctaHref="/community"
              ctaSecondary
            />
          </div>
        </div>
      </section>

      <AppDivider />

      <section className="app-program-connection app-section app-reveal" data-section-number="07" aria-labelledby="app-program-connection-title">
        <AppSectionNumber>07</AppSectionNumber>
        <div className="section-shell app-section-content container">
          <SectionLabel>07 / CONEXIÓN PREVISTA</SectionLabel>
          <div className="app-program-connection-grid">
            <h2 id="app-program-connection-title" className="app-section-title">PLAN, REGISTRO<br /><span>Y RECURSOS.</span></h2>
            <div className="app-program-connection-copy">
              <p className="app-section-subtitle">La dirección de producto es conectar los planes RAÍZ, FUERZA, RENDIMIENTO y ELITE con herramientas de seguimiento. La integración final aún no está confirmada.</p>
              <Link to="/programs" className="app-secondary-cta">
                VER PROGRAMAS ACTUALES
                <ArrowUpRight size={18} strokeWidth={1} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AppDivider />

      <section className="app-final-cta app-closing app-section app-reveal" data-section-number="08" aria-labelledby="app-final-title">
        <AppSectionNumber>08</AppSectionNumber>
        <div className="section-shell app-section-content app-closing-content container">
          <SectionLabel>08 / ESTADO ACTUAL</SectionLabel>
          <h2 id="app-final-title" className="app-closing-title">BAYONA+ ESTÁ<br /><span>EN DESARROLLO.</span></h2>
          <p className="app-closing-subtitle">No hay fecha de lanzamiento, compatibilidad ni funciones finales confirmadas.</p>
          <p className="app-closing-detail">Puedes solicitar novedades por WhatsApp. Solo recibirás información cuando exista una actualización concreta; apuntarte no garantiza acceso.</p>
          <div className="app-final-actions app-closing-cta">
            <a
              href={WHATSAPP_EARLY_ACCESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="app-primary-cta btn-primary"
            >
              RECIBIR ACTUALIZACIONES
              <MessageCircle size={18} strokeWidth={1} aria-hidden="true" />
            </a>
            <Link to="/programs" className="app-closing-program-link">
              <span>¿Quieres entrenar ahora?</span>
              <strong>VER PROGRAMAS DISPONIBLES</strong>
              <ArrowUpRight size={16} strokeWidth={1} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <AppDivider />

      <aside className="app-development-note app-footer-note" aria-label="Nota sobre el desarrollo de BAYONA+">
        <p className="section-shell">BAYONA+ está en desarrollo. Las imágenes son conceptos de diseño, no funciones operativas garantizadas.</p>
      </aside>
    </div>
  )
}
