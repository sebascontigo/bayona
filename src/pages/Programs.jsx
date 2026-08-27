import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  Accessibility,
  ArrowUpRight,
  Baby,
  Check,
  ChevronDown,
  Dumbbell,
  MessageCircle,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { GoldButton, PageHero, SectionLabel } from '../components/Layout'
import Bridge from '../components/Bridge'
import { sceneBackgroundProps } from '../components/SceneBackground.jsx'
import TestimonialMarquee from '../components/TestimonialMarquee'
import VideoSection from '../components/VideoSection.jsx'
import PlanCalculator from '../components/PlanCalculator.jsx'
import { useCapabilities } from '../engine/hooks/useCapabilities.js'
import RecommendedMark from '../components/onboarding/RecommendedMark.jsx'
import { GUARANTEE } from '../config/commitments.js'
import { planConversionMessages } from '../config/conversionContent.js'
import { siteMedia } from '../config/siteMedia.js'
import { useCartStore } from '../store/cartStore.js'
import '../styles/programs.css'
import {
  buildExperienceWhatsAppUrl,
  buildWhatsAppUrl,
  calculateExperience,
  COMMERCIAL_SCOPE_NOTICE,
  editorialServices,
  formatCop,
  membershipComparisonRows,
  membershipPlans as plans,
  programAudiences,
  serviceCategoryDefinitions,
  sessionServices,
} from '../config/offerings.js'

const audienceIcons = {
  accessibility: Accessibility,
  baby: Baby,
  dumbbell: Dumbbell,
  sparkles: Sparkles,
  trophy: Trophy,
}

const pillars = [
  { icon: Zap, title: 'DECISIONES EXPLICADAS', copy: 'Sabes qué haces, para qué sirve y cómo se ajusta a tu punto de partida.' },
  { icon: Dumbbell, title: 'PROGRESO REVISABLE', copy: 'Registras el proceso y ajustas carga, técnica y volumen con criterio.' },
  { icon: Users, title: 'ACOMPAÑAMIENTO SEGÚN TU PLAN', copy: 'Cada nivel detalla la frecuencia de sesiones, revisiones y soporte incluidos.' },
]

const visualizationPoints = [
  'Llegas a cada sesión con una tarea definida.',
  'Registras cargas, repeticiones y sensaciones para revisar el progreso.',
  'Organizas el entrenamiento alrededor de tu agenda real.',
  'Recibes el seguimiento y los ajustes incluidos en tu plan.',
  'Construyes continuidad sin depender de empezar de cero cada lunes.',
]

const SESSION_SERVICE_IDS = new Set(sessionServices.map(({ id }) => id))
const SERVICE_CATEGORY_ICONS = Object.freeze({
  CLASES: Dumbbell,
  RECUPERACIÓN: ShieldCheck,
  RENDIMIENTO: Trophy,
})
const ADDON_SERVICE_GROUPS = serviceCategoryDefinitions.map((category) => ({
  ...category,
  Icon: SERVICE_CATEGORY_ICONS[category.id],
  services: editorialServices.filter((service) => service.category === category.id),
}))
const COMPARISON_PLAN_NAMES = Object.freeze({
  RAIZ: 'RAÍZ',
  FUERZA: 'FUERZA',
  RENDIMIENTO: 'RENDIM.',
  ELITE: 'ELITE',
})
const PLAN_DECISION_PATHS = Object.freeze([
  Object.freeze({ planId: 'RAIZ', situation: 'Si retomas después de una pausa', plan: 'RAÍZ' }),
  Object.freeze({ planId: 'FUERZA', situation: 'Si quieres revisión semanal', plan: 'FUERZA' }),
  Object.freeze({ planId: 'RENDIMIENTO', situation: 'Si quieres seguimiento avanzado', plan: 'RENDIMIENTO' }),
  Object.freeze({ planId: 'ELITE', situation: 'Si quieres contacto privado', plan: 'ELITE' }),
])
const PULSING_BADGE_COPY = /(?:MÁS ELEGIDO|10 CUPOS)/i
const PLAN_TILT_LIMIT = 3.5
const LUXURY_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'

const shouldPulseBadge = (value = '') => PULSING_BADGE_COPY.test(value)
const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)

function GuaranteeStamp({ className = '', reducedMotion = false }) {
  return (
    <motion.div
      className={`proof-badge guarantee-badge ${reducedMotion ? '' : 'program-guarantee-glow'} ${className}`.trim()}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={reducedMotion ? undefined : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="badge-icon"><ShieldCheck size={42} /></div>
      <div className="badge-content">
        {/*
          Decía "Consulta requisitos, procedimiento y exclusiones", remitiendo a
          una letra pequeña que no existe, mientras las páginas de plan prometen
          devolución sin condiciones. Ahora las dos leen de commitments.js.
        */}
        <span className="guarantee-microband">{GUARANTEE.badge}</span>
        <h3>{GUARANTEE.days} DÍAS PARA EVALUARLO.</h3>
        <p>{GUARANTEE.promise}</p>
      </div>
    </motion.div>
  )
}

function PlanJourneyCard({ plan, index, conversionMessage, pointerEffectsEnabled, reducedMotion }) {
  const [addonsOpen, setAddonsOpen] = useState(false)
  const [serviceQuantities, setServiceQuantities] = useState({})
  const [extraIds, setExtraIds] = useState([])
  const selection = useMemo(
    () => ({ planId: plan.id, serviceQuantities, extraIds }),
    [plan.id, serviceQuantities, extraIds],
  )
  const calculation = useMemo(() => calculateExperience(selection), [selection])
  const whatsappUrl = useMemo(() => buildExperienceWhatsAppUrl(selection), [selection])
  const panelId = `plan-${plan.id.toLowerCase()}-addons`
  const extrasTotal = calculation.totalCop - plan.priceCop
  const selectedItems = [
    ...calculation.sessions
      .filter((service) => service.quantity > 0)
      .map((service) => ({
        id: service.id,
        label: `${service.quantity} × ${service.label}`,
        subtotalCop: service.subtotalCop,
      })),
    ...calculation.extras.map((service) => ({
      id: service.id,
      label: service.label,
      subtotalCop: service.subtotalCop,
    })),
  ]

  const updateQuantity = (serviceId, quantity, control) => {
    setServiceQuantities((current) => ({ ...current, [serviceId]: Number(quantity) }))

    if (!reducedMotion && typeof control?.animate === 'function') {
      control.getAnimations?.().forEach((animation) => animation.cancel())
      control.animate(
        [
          { borderColor: 'rgba(255, 255, 255, 0.3)', boxShadow: '0 0 0 0 rgba(244, 162, 97, 0)' },
          { borderColor: '#F4A261', boxShadow: '0 0 0 4px rgba(244, 162, 97, 0.18)' },
          { borderColor: 'rgba(255, 255, 255, 0.3)', boxShadow: '0 0 0 0 rgba(244, 162, 97, 0)' },
        ],
        { duration: 420, easing: LUXURY_EASING },
      )
    }
  }

  const updatePointerPosition = (event) => {
    if (!pointerEffectsEnabled) return

    const shell = event.currentTarget
    const bounds = shell.getBoundingClientRect()
    const pointerX = clamp((event.clientX - bounds.left) / bounds.width, 0, 1)
    const pointerY = clamp((event.clientY - bounds.top) / bounds.height, 0, 1)
    const tiltX = (0.5 - pointerY) * PLAN_TILT_LIMIT * 2
    const tiltY = (pointerX - 0.5) * PLAN_TILT_LIMIT * 2

    shell.style.setProperty('--program-spot-x', `${pointerX * 100}%`)
    shell.style.setProperty('--program-spot-y', `${pointerY * 100}%`)
    shell.style.setProperty('--program-tilt-x', `${tiltX}deg`)
    shell.style.setProperty('--program-tilt-y', `${tiltY}deg`)
  }

  const resetPointerPosition = (event) => {
    const shell = event.currentTarget
    shell.style.setProperty('--program-spot-x', '50%')
    shell.style.setProperty('--program-spot-y', '24%')
    shell.style.setProperty('--program-tilt-x', '0deg')
    shell.style.setProperty('--program-tilt-y', '0deg')
  }

  const toggleExtra = (serviceId) => {
    setExtraIds((current) => current.includes(serviceId)
      ? current.filter((id) => id !== serviceId)
      : [...current, serviceId])
  }

  return (
    <div
      className={`program-plan-tilt-shell ${pointerEffectsEnabled ? 'is-pointer-interactive' : ''}`.trim()}
      onPointerMove={pointerEffectsEnabled ? updatePointerPosition : undefined}
      onPointerLeave={pointerEffectsEnabled ? resetPointerPosition : undefined}
    >
      <motion.article
        id={`plan-${plan.id.toLowerCase()}`}
        className={`plan-accordion-item ${plan.featured ? 'featured' : ''}`}
        initial={reducedMotion ? false : { opacity: 0, y: 40 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={reducedMotion ? undefined : { delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        data-plan-id={plan.id}
      >
        <span className="program-plan-spotlight" aria-hidden="true" />
        <div className="program-plan-header">
          <div>
            {/* Solo se pinta si la recepción sugirió este plan a quien mira. */}
            <RecommendedMark planId={plan.id} />
            <div className="plan-tag">
              {plan.featured ? (
                <span className={`featured-badge ${shouldPulseBadge(plan.tag) ? 'program-pulse-badge' : ''}`.trim()}>{plan.tag}</span>
              ) : (
                <span className={shouldPulseBadge(plan.tag) ? 'program-pulse-badge' : undefined}>{plan.tag}</span>
              )}
            </div>
            <h3 className="program-plan-name">
              {plan.name}{plan.journey && <span className="program-plan-journey"> — {plan.journey}</span>}
            </h3>
          </div>
          <div className="program-plan-price">
            <strong>{plan.price}</strong>
            <small>{plan.currency}</small>
            <span>
              <span aria-hidden="true">· </span>
              <span>{plan.eur}</span>
              <span aria-hidden="true"> · </span>
              <span>{plan.usdDisplay}</span>
            </span>
          </div>
        </div>

        <div className="program-plan-body">
          <div className="program-plan-copy">
            <div className="program-plan-section"><h4>PARA QUIÉN</h4><p>{plan.audience}</p></div>
            <div className="program-plan-section"><h4>LO QUE CAMBIA</h4><p>{plan.problem}</p></div>
            <div className="program-plan-section"><h4>LO QUE SIENTES</h4><p>{plan.feeling}</p></div>
            {plan.scarcity && (
              <p className={`program-plan-scarcity ${shouldPulseBadge(plan.scarcity) ? 'program-pulse-badge' : ''}`.trim()}>
                {plan.scarcity}
              </p>
            )}
          </div>

          <blockquote className="program-plan-proof-anchor">
            “{conversionMessage.proofAnchor}”
          </blockquote>

          <div className="program-plan-details">
            <div className="program-plan-section">
              <h4>INCLUYE</h4>
              {plan.includedLead && <p className="included-lead">{plan.includedLead}</p>}
              <ul className="program-plan-list">{plan.included.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            {plan.excluded && (
              <div className="program-plan-section program-plan-excluded">
                <h4>NO INCLUYE</h4>
                <ul className="program-plan-list">{plan.excluded.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            )}
          </div>

          <div className="program-plan-actions">
            <Link className="plan-presentation-cta" to={`/plan/${plan.id.toLowerCase()}`}>
              <Sparkles size={16} aria-hidden="true" /> VER PRESENTACIÓN
            </Link>
            <a href={plan.cta} target="_blank" rel="noreferrer" className={`plan-cta ${plan.featured ? 'featured-cta' : ''}`}>
              ELEGIR {plan.name}<ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              className="plan-addons-toggle"
              aria-expanded={addonsOpen}
              aria-controls={panelId}
              onClick={() => setAddonsOpen((current) => !current)}
            >
              <Plus size={17} />
              {addonsOpen ? 'CERRAR CLASES Y SERVICIOS' : 'AÑADIR CLASES Y SERVICIOS'}
              <ChevronDown size={18} aria-hidden="true" />
            </button>
          </div>

          {addonsOpen && (
            <div id={panelId} className="plan-addons-panel">
              <div className="plan-addons-heading">
                <div>
                  <span>PERSONALIZA {plan.name}</span>
                  <h4>SUMA SOLO LO QUE TE HACE AVANZAR</h4>
                </div>
                <p>Cada elección actualiza tu total mensual y tu mensaje de WhatsApp.</p>
              </div>

              <div className="plan-addon-groups">
                {ADDON_SERVICE_GROUPS.map((group) => {
                  const CategoryIcon = group.Icon

                  return (
                    <section key={group.id} className="plan-addon-group">
                      <header className="plan-addon-group-heading">
                        <CategoryIcon size={20} aria-hidden="true" />
                        <div>
                          <h5>{group.title}</h5>
                          <p>{group.promise}</p>
                        </div>
                      </header>
                      <ul>
                        {group.services.map((service) => {
                          const isQuantityService = SESSION_SERVICE_IDS.has(service.id)
                          const quantity = serviceQuantities[service.id] ?? 0
                          const selected = extraIds.includes(service.id)

                          return (
                            <li key={service.id} className={quantity > 0 || selected ? 'is-selected' : ''}>
                              <div className="plan-addon-service-copy">
                                <strong>{service.label}</strong>
                                <p>{service.description}</p>
                                <span>{service.priceDisplay} COP{isQuantityService ? ' / sesión' : ''}</span>
                              </div>
                              {isQuantityService ? (
                                <label className="plan-addon-quantity" htmlFor={`${plan.id}-${service.id}-quantity`}>
                                  <span>Cantidad</span>
                                  <select
                                    id={`${plan.id}-${service.id}-quantity`}
                                    value={quantity}
                                    onChange={(event) => updateQuantity(service.id, event.target.value, event.currentTarget)}
                                  >
                                    {service.quantities.map((value) => (
                                      <option key={value} value={value}>{value}</option>
                                    ))}
                                  </select>
                                </label>
                              ) : (
                                <button
                                  type="button"
                                  className="plan-addon-select"
                                  aria-pressed={selected}
                                  onClick={() => toggleExtra(service.id)}
                                >
                                  {selected ? 'AÑADIDO' : 'AÑADIR'}
                                </button>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </section>
                  )
                })}
              </div>

              <aside className="plan-addon-summary" aria-live="polite">
                <div className="plan-addon-summary-total">
                  <span>TU TRANSFORMACIÓN MENSUAL</span>
                  <strong key={calculation.totalCop} className={reducedMotion ? undefined : 'program-animated-total'}>
                    {calculation.totalDisplay} COP
                  </strong>
                  <small>{plan.priceDisplay} plan + {formatCop(extrasTotal)} servicios</small>
                  <p className="plan-addon-decision-line">Tu transformación empieza cuando decides.</p>
                </div>
                <div className="plan-addon-summary-selection">
                  <h5>LO QUE AÑADISTE</h5>
                  {selectedItems.length > 0 ? (
                    <ul>
                      {selectedItems.map((item) => (
                        <li key={item.id}><span>{item.label}</span><strong>{formatCop(item.subtotalCop)}</strong></li>
                      ))}
                    </ul>
                  ) : <p>Aún no has añadido servicios. Tu plan ya está listo para elegir.</p>}
                </div>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="plan-addon-whatsapp">
                  <MessageCircle size={18} /> DAR EL PRIMER PASO
                </a>
              </aside>
            </div>
          )}
        </div>
        {plan.urgency && <p className="program-plan-urgency">{plan.urgency}</p>}
        {plan.featured && <div className="featured-glow" />}
      </motion.article>
    </div>
  )
}

export default function Programs() {
  const capabilities = useCapabilities()
  const addItem = useCartStore((state) => state.addItem)
  const { reducedMotion } = capabilities
  const pointerEffectsEnabled = capabilities.mode === 'desktop' && !reducedMotion
  const visualizationRef = useRef(null)
  const plansRef = useRef(null)
  const comparisonRef = useRef(null)
  const [comparisonVisible, setComparisonVisible] = useState(reducedMotion)
  const [hoveredComparisonColumn, setHoveredComparisonColumn] = useState(null)
  const [activeServiceCategory, setActiveServiceCategory] = useState(ADDON_SERVICE_GROUPS[0]?.id)
  const [lastAddedServiceId, setLastAddedServiceId] = useState(null)
  const activeComparisonColumn = pointerEffectsEnabled ? hoveredComparisonColumn : null
  const activeServiceGroupIndex = Math.max(
    0,
    ADDON_SERVICE_GROUPS.findIndex(({ id }) => id === activeServiceCategory),
  )
  const activeServiceGroup = ADDON_SERVICE_GROUPS[activeServiceGroupIndex]

  useEffect(() => {
    if (reducedMotion) {
      setComparisonVisible(true)
      return undefined
    }

    const comparisonNode = comparisonRef.current
    if (!comparisonNode || typeof IntersectionObserver === 'undefined') {
      setComparisonVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setComparisonVisible(true)
      observer.disconnect()
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 })

    observer.observe(comparisonNode)
    return () => observer.disconnect()
  }, [reducedMotion])

  const getScrollBehavior = () => (reducedMotion ? 'auto' : 'smooth')
  const scrollToVisualization = () => visualizationRef.current?.scrollIntoView({ behavior: getScrollBehavior() })
  const scrollToPlans = () => plansRef.current?.scrollIntoView({ behavior: getScrollBehavior() })
  const handleComparisonPointerOver = (event) => {
    if (!pointerEffectsEnabled) return
    const columnCell = event.target.closest?.('[data-comparison-column]')
    setHoveredComparisonColumn(columnCell ? Number(columnCell.dataset.comparisonColumn) : null)
  }
  const generalWhatsAppUrl = buildWhatsAppUrl('Hola BAYONA, quiero empezar mi transformación. ¿Cuál es el mejor camino para mí?')
  const addServiceToCart = (service) => {
    addItem({
      type: 'servicio',
      name: service.label,
      priceCOP: service.priceCop,
      qty: 1,
      img: null,
    })
    setLastAddedServiceId(service.id)
    toast.success('Añadido', { description: `${service.label} está en tu carrito.` })
  }

  return (
    <>
      <PageHero
        title="ENTRENAMIENTO CON DIRECCIÓN CLARA."
        kicker="BAYONA • PROGRAMAS DE ENTRENAMIENTO"
        media={siteMedia.programs.hero}
      >
        <p>Cuatro membresías mensuales. Distinto nivel de sesiones, seguimiento y contacto.</p>
        <button className="text-button hero-cta" onClick={scrollToVisualization}>
          COMPARAR PROGRAMAS
          <ArrowUpRight size={15} />
        </button>
      </PageHero>

      <section className="programs-pain section-shell">
        <SectionLabel>01 / PUNTOS DE PARTIDA</SectionLabel>
        <h2>TU EDAD, TU NIVEL<br /><span>Y TU OBJETIVO IMPORTAN.</span></h2>
        <p className="pain-subtitle">Revisa las propuestas por etapa y confirma disponibilidad antes de elegir.</p>

        <div className="age-paths-list">
          {programAudiences.map((path, index) => {
            const Icon = audienceIcons[path.icon]
            return (
              <motion.article
                key={path.id}
                {...sceneBackgroundProps(siteMedia.programs.audiences[index], {
                  className: `age-path-item ${path.id === 'deportistas' ? 'is-athlete' : ''}`.trim(),
                  variant: 'subtle',
                })}
                initial={reducedMotion ? false : { opacity: 0, x: -30 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={reducedMotion ? undefined : { delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="age-path-icon"><Icon size={24} /></div>
                <div className="age-path-content">
                  <span className="age-path-age">{path.detail}</span>
                  <h3>{path.title}</h3>
                  <p>{path.copy}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
        <p className="method-value-statement">Sea cual sea tu punto de partida, hay un camino para ti.</p>
      </section>

      <section className="programs-method section-shell">
        <SectionLabel>02 / CÓMO TRABAJAMOS</SectionLabel>
        <h2>VALORAR. PLANIFICAR.<br /><span>REVISAR.</span></h2>
        <div className="method-pillars">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                {...sceneBackgroundProps(siteMedia.programs.pillars[index], {
                  className: 'pillar',
                  variant: 'accent',
                })}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reducedMotion ? undefined : { delay: index * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Icon size={28} />
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </motion.div>
            )
          })}
        </div>
        <p className="method-value-statement">Compara frecuencia, sesiones y seguimiento antes de elegir.</p>
      </section>

      <section className="programs-proof section-shell" aria-label="Garantía de 30 días">
        <GuaranteeStamp reducedMotion={reducedMotion} className="guarantee-after-method" />
      </section>

      <section
        {...sceneBackgroundProps(siteMedia.programs.ninetyDays, {
          className: 'programs-visualization section-shell',
          variant: 'subtle',
          pseudo: 'after',
        })}
        ref={visualizationRef}
      >
        <SectionLabel>03 / ANTES DE ELEGIR</SectionLabel>
        <h2>ASÍ PUEDE VERSE<br /><span>UN PROCESO ORDENADO</span></h2>
        <p className="pain-subtitle">No son resultados garantizados: son hábitos de trabajo que puedes construir con constancia.</p>
        <div className="method-pillars programs-visualization-list">
          {visualizationPoints.map((point, index) => (
            <motion.div
              key={point}
              className="pillar programs-visualization-item"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? undefined : { delay: index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Check size={24} />
              <p>{point}</p>
            </motion.div>
          ))}
        </div>
        <p className="method-value-statement">La planificación ordena el proceso; los resultados dependen del contexto, la ejecución y la constancia.</p>
        <button className="text-button" onClick={scrollToPlans}>
          COMPARAR LOS PLANES<ArrowUpRight size={15} />
        </button>
      </section>

      <section className="programs-offer" ref={plansRef}>
        <div className="section-shell">
          <SectionLabel>04 / MEMBRESÍAS MENSUALES</SectionLabel>
          <h2>CUATRO NIVELES DE<br /><span>ACOMPAÑAMIENTO.</span></h2>
          <p className="pain-subtitle">Compara sesiones, seguimiento, contacto, prestaciones y precio antes de elegir.</p>

          <VideoSection
            title="CÓMO ELEGIR TU CAMINO"
            subtitle="Sebastián te guía para elegir entre RAÍZ, FUERZA, RENDIMIENTO y ELITE según tu momento y tu objetivo."
            poster={siteMedia.programs.services[0].src}
            duration="2 MIN"
            placement="contained"
          />

          <div className="plans-accordion">
            {plans.map((plan, index) => (
              <Fragment key={plan.id}>
                <PlanJourneyCard
                  plan={plan}
                  index={index}
                  conversionMessage={planConversionMessages[plan.id]}
                  pointerEffectsEnabled={pointerEffectsEnabled}
                  reducedMotion={reducedMotion}
                />
                {index === 1 && <GuaranteeStamp reducedMotion={reducedMotion} className="guarantee-between-plans" />}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="programs-comparison-section section-shell" aria-labelledby="comparison-title">
        <SectionLabel>05 / DECIDE SIN DUDAS</SectionLabel>
        <aside className="program-decision-helper" aria-labelledby="decision-helper-title">
          <div className="program-decision-helper-heading">
            <span>UN CAMINO PARA CADA MOMENTO</span>
            <h2 id="decision-helper-title">¿NO SABES CUÁL ELEGIR?</h2>
          </div>
          <ul>
            {PLAN_DECISION_PATHS.map((path) => (
              <li key={path.planId}>
                <span>{path.situation}</span>
                <a href={`#plan-${path.planId.toLowerCase()}`}>{path.plan}<ArrowUpRight size={15} aria-hidden="true" /></a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="program-comparison">
          <div className="program-comparison-intro">
            <div>
              <h3 id="comparison-title">8 DATOS QUE IMPORTAN.<br /><span>NADA MÁS.</span></h3>
            </div>
            <p>Solo las diferencias que cambian tu decisión. Sin ruido. Sin redundancias.</p>
          </div>
          <p className="comparison-swipe-hint" id="comparison-scroll-hint">Desliza para comparar los cuatro caminos →</p>
          <div
            ref={comparisonRef}
            className="program-comparison-scroll"
            role="region"
            aria-label="Comparación de membresías BAYONA"
            aria-describedby="comparison-scroll-hint"
            tabIndex="0"
          >
            <table
              className={`program-comparison-table ${reducedMotion ? '' : 'program-comparison-stagger'} ${comparisonVisible ? 'is-comparison-visible' : ''}`.trim()}
              onPointerOver={pointerEffectsEnabled ? handleComparisonPointerOver : undefined}
              onPointerLeave={pointerEffectsEnabled ? () => setHoveredComparisonColumn(null) : undefined}
            >
              <caption>Ocho diferencias que importan entre RAÍZ, FUERZA, RENDIMIENTO y ELITE.</caption>
              <thead>
                <tr>
                  <th scope="col" className="comparison-feature-heading">LO QUE RECIBES</th>
                  {plans.map((plan, index) => (
                    <th
                      key={plan.id}
                      scope="col"
                      data-comparison-column={index}
                      className={[
                        plan.featured ? 'comparison-featured-column' : '',
                        activeComparisonColumn === index ? 'is-column-hovered' : '',
                      ].filter(Boolean).join(' ') || undefined}
                    >
                      <strong>{COMPARISON_PLAN_NAMES[plan.id]}</strong>
                      <span className="comparison-plan-price">${plan.priceCop / 1000}k</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {membershipComparisonRows.map((row, rowIndex) => (
                  <tr key={row.feature} style={{ '--program-row-index': rowIndex }}>
                    <th scope="row">{row.feature}</th>
                    {row.values.map((value, index) => (
                      <td
                        key={`${row.feature}-${plans[index].id}`}
                        data-comparison-column={index}
                        className={[
                          plans[index].featured ? 'comparison-featured-column' : '',
                          activeComparisonColumn === index ? 'is-column-hovered' : '',
                        ].filter(Boolean).join(' ') || undefined}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Bridge
        media={siteMedia.programs.community}
        eyebrow="COMUNIDAD · ACCESO ABIERTO"
        title="CONVERSACIONES Y RECURSOS"
        titleAccent="MÁS ALLÁ DEL PLAN."
        hook="El acceso abierto es gratuito. La frecuencia de seguimiento, la prioridad y el contacto directo cambian según la membresía contratada."
        free
        freeLabel="ACCESO ABIERTO · SIN NECESIDAD DE PLAN"
        ctaLabel="CONOCER LA COMUNIDAD"
        ctaHref="/community"
        ctaSecondary
        layout="stacked"
      >
        <TestimonialMarquee
          testimonials={[
            {
              author: 'ESTADO EDITORIAL',
              quote: 'Actualmente no hay testimonios verificados y autorizados para publicar.',
            },
            {
              author: 'CRITERIO DE PUBLICACIÓN',
              quote: 'Las experiencias se añadirán con consentimiento expreso y sin presentar resultados individuales como garantía.',
            },
          ]}
        />
      </Bridge>

      <section className="programs-services section-shell" aria-labelledby="services-title">
        <SectionLabel>06 / SERVICIOS ADICIONALES</SectionLabel>
        <div className="programs-services-heading">
          <h2 id="services-title">PERSONALIZA<br /><span>TU PLAN.</span></h2>
          <p>Añade sesiones o servicios solo cuando su descripción, precio y alcance encajen con tu objetivo.</p>
        </div>

        <div className="program-service-showroom-shell">
          <nav className="program-service-categories" aria-label="Explorar servicios por categoría">
            <ol>
              {ADDON_SERVICE_GROUPS.map((group, index) => {
                const isActive = group.id === activeServiceGroup.id

                return (
                  <li key={group.id}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-controls="program-services-active-panel"
                      onClick={() => setActiveServiceCategory(group.id)}
                    >
                      <span className="program-service-category-index" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="program-service-category-copy">
                        <strong>{group.title}</strong>
                        <small>{group.promise}</small>
                      </span>
                      <span className="program-service-category-count" aria-label={`${group.services.length} servicios`}>
                        {String(group.services.length).padStart(2, '0')}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          <motion.section
            key={activeServiceGroup.id}
            id="program-services-active-panel"
            {...sceneBackgroundProps(siteMedia.programs.services[activeServiceGroupIndex], {
              className: 'program-service-showroom',
              variant: 'subtle',
              position: 'center 42%',
              overlay: 'linear-gradient(115deg, rgba(5, 5, 5, 0.7), rgba(5, 5, 5, 0.92) 72%)',
              blur: 2,
            })}
            aria-labelledby={`program-service-category-${activeServiceGroup.id.toLowerCase()}`}
            aria-live="polite"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reducedMotion ? undefined : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="program-service-showroom-heading">
              <span className="program-service-showroom-icon" aria-hidden="true">
                {(() => {
                  const ActiveCategoryIcon = activeServiceGroup.Icon
                  return <ActiveCategoryIcon size={28} />
                })()}
              </span>
              <div>
                <p>{activeServiceGroup.services.length} SERVICIOS · SELECCIÓN ABIERTA</p>
                <h3 id={`program-service-category-${activeServiceGroup.id.toLowerCase()}`}>
                  {activeServiceGroup.title}
                </h3>
                <span>{activeServiceGroup.promise}. Revisa una opción y añádela cuando encaje contigo.</span>
              </div>
            </header>

            <ol className="program-service-grid">
              {activeServiceGroup.services.map((service, index) => {
                const isSessionService = SESSION_SERVICE_IDS.has(service.id)
                const wasAdded = lastAddedServiceId === service.id

                return (
                  <li
                    key={service.id}
                    className={`program-service-card${wasAdded ? ' is-added' : ''}`}
                    data-service-id={service.id}
                  >
                    <div className="program-service-card-meta">
                      <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <em>{isSessionService ? 'SESIÓN ADICIONAL' : 'SERVICIO ESPECIALIZADO'}</em>
                    </div>
                    <div className="program-service-card-copy">
                      <h4>{service.label}</h4>
                      <p>{service.description}</p>
                    </div>
                    <div className="program-service-card-scope">
                      <span>{service.presencial ? 'PRESENCIAL · CONFIRMA DISPONIBILIDAD' : 'AÑADIBLE A TU PLAN'}</span>
                    </div>
                    <div className="program-service-card-footer">
                      <div className="program-service-card-price">
                        <span>INVERSIÓN ADICIONAL</span>
                        <strong>{service.priceDisplay}</strong>
                        <small>COP</small>
                      </div>
                      <button
                        className="program-service-cart"
                        type="button"
                        aria-label={`Añadir ${service.label} al carrito por ${service.priceDisplay} COP`}
                        onClick={() => addServiceToCart(service)}
                      >
                        {wasAdded ? <Check size={15} aria-hidden="true" /> : <ShoppingCart size={15} aria-hidden="true" />}
                        {wasAdded ? 'AÑADIR OTRO' : 'AÑADIR AL CARRITO'}
                      </button>
                    </div>
                  </li>
                )
              })}
            </ol>

            <footer className="program-service-showroom-note">
              <span>PRECIOS PUBLICADOS EN COP</span>
              <p>Los servicios presenciales dependen de ubicación y disponibilidad. Puedes revisar el total en el configurador siguiente.</p>
            </footer>
          </motion.section>
        </div>
      </section>

      <section className="programs-calculator">
        <div className="section-shell">
          <SectionLabel>07 / CONFIGURA EL TOTAL</SectionLabel>
          <h2>ELIGE PLAN Y<br /><span>SERVICIOS.</span></h2>
          <p className="programs-calculator-intro">Revisa el total mensual y el detalle de la solicitud antes de enviarla.</p>
          <PlanCalculator />
          {/*
            Fase 4 (DP-3): /checkout no tenía ninguna entrada en el sitio.
            La calculadora de esta página es el paso natural hacia el
            configurador completo, donde se prepara la solicitud de WhatsApp.
          */}
          <GoldButton to="/checkout" className="programs-calculator-open">
            ABRIR EL CONFIGURADOR BAYONA COMPLETO
          </GoldButton>
          <p className="programs-calculator-open-note">
            Sin pago: configuras tu solicitud y la envías por WhatsApp.
          </p>
        </div>
      </section>

      <section className="programs-cta-stack section-shell">
        <GuaranteeStamp reducedMotion={reducedMotion} className="guarantee-before-cta" />
        <div className="programs-closing-copy">
          <SectionLabel>08 / SIGUIENTE PASO</SectionLabel>
          <h2>COMPARA. CONFIRMA.<br /><span>DESPUÉS DECIDE.</span></h2>
          <p>Revisa prestaciones, disponibilidad, garantía y condiciones antes de pagar.</p>
        </div>
        <p className="programs-closing-urgency">Si necesitas contexto, consulta tu objetivo y disponibilidad por WhatsApp.</p>
        <div className="cta-stack">
          <a href={generalWhatsAppUrl} target="_blank" rel="noreferrer" className="gold-button primary-cta">
            CONSULTAR POR WHATSAPP<ArrowUpRight size={18} />
          </a>
          <GoldButton to="/faq" className="secondary-cta">REVISAR PREGUNTAS FRECUENTES</GoldButton>
        </div>
      </section>

      <footer className="programs-legal-note section-shell">
        <small>{COMMERCIAL_SCOPE_NOTICE}</small>
      </footer>
    </>
  )
}
