import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  CirclePlay,
  ClipboardCheck,
  Crown,
  Dumbbell,
  FlaskConical,
  HeartPulse,
  // Se renombra: el icono se llama Infinity y tapaba el global Infinity en
  // todo el módulo. Aquí no se usaba el número, pero es una trampa a futuro.
  Infinity as InfinityIcon,
  MessageCircle,
  MonitorPlay,
  Salad,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  UserRound,
  Users,
} from 'lucide-react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { sceneBackgroundProps } from '../components/SceneBackground.jsx'
import { buildWhatsAppUrl, formatCop, membershipPlans } from '../config/offerings.js'
import { planPresentations } from '../config/planPresentations.js'
import { siteMedia } from '../config/siteMedia.js'
import '../styles/plan-presentation.css'
// Refinamientos que eran globales en main.jsx: solo aplican a /plan/*.
import '../styles/plan-hero-refinements.css'
import '../styles/plan-value-refinements.css'
import '../styles/plan-summary-refinements.css'
import '../styles/plan-final-refinements.css'

const valueIcons = Object.freeze({
  app: Smartphone,
  assessment: ClipboardCheck,
  calendar: CalendarDays,
  coach: UserRound,
  community: Users,
  lifetime: InfinityIcon,
  nutrition: Salad,
  progress: TrendingUp,
  science: FlaskConical,
  session: Dumbbell,
  video: MonitorPlay,
  vip: Crown,
  whatsapp: MessageCircle,
})

const methodPillars = Object.freeze([
  Object.freeze({
    icon: FlaskConical,
    title: 'CIENCIA',
    copy: '+8 años de experiencia y formación europea convertidos en decisiones que entiendes.',
  }),
  Object.freeze({
    icon: UserRound,
    title: 'PERSONAL',
    copy: 'Tu plan es tuyo. No una plantilla copiada para todo el mundo.',
  }),
  Object.freeze({
    icon: Activity,
    title: 'SEGUIMIENTO',
    copy: 'Alguien revisa. Alguien ajusta. Alguien te empuja.',
  }),
])

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.68, delay, ease: [0.2, 0.72, 0.2, 1] }}
    >
      {children}
    </Component>
  )
}

function MagneticAnchor({ children, className = '', ...props }) {
  const reduceMotion = useReducedMotion()

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16
    event.currentTarget.style.setProperty('--magnetic-x', `${x}px`)
    event.currentTarget.style.setProperty('--magnetic-y', `${y}px`)
  }

  const resetPosition = (event) => {
    event.currentTarget.style.setProperty('--magnetic-x', '0px')
    event.currentTarget.style.setProperty('--magnetic-y', '0px')
  }

  return (
    <a
      className={`plan-presentation-button ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      {...props}
    >
      {children}
    </a>
  )
}

function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <header className="plan-presentation-section-heading">
      <p className="plan-presentation-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className="plan-presentation-section-lead">{description}</p>}
    </header>
  )
}

function AnimatedValue({ value }) {
  const reduceMotion = useReducedMotion()
  const valueRef = useRef(null)
  const inView = useInView(valueRef, { once: true, amount: 0.6 })
  const count = useMotionValue(reduceMotion ? value : 0)
  const formatted = useTransform(count, (latest) => formatCop(Math.round(latest / 1000) * 1000))

  useEffect(() => {
    if (!inView) return undefined
    if (reduceMotion) {
      count.set(value)
      return undefined
    }

    const controls = animate(count, value, {
      duration: 1.35,
      ease: [0.2, 0.75, 0.2, 1],
    })

    return controls.stop
  }, [count, inView, reduceMotion, value])

  return <motion.strong ref={valueRef}>{formatted}</motion.strong>
}

function InvalidPlan() {
  return (
    <section className="plan-presentation-invalid" aria-labelledby="invalid-plan-title">
      <span>404 / PLAN NO ENCONTRADO</span>
      <h1 id="invalid-plan-title">ESE CAMINO NO EXISTE.<br /><em>PERO EL TUYO SÍ.</em></h1>
      <p>Vuelve a los programas y elige la transformación que encaja contigo.</p>
      <Link to="/programs" className="plan-presentation-button">
        VER LOS PLANES <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  )
}

export default function PlanPresentation({ planId }) {
  const normalizedPlanId = String(planId ?? '').toUpperCase()
  const plan = membershipPlans.find(({ id }) => id === normalizedPlanId)
  const presentation = planPresentations[normalizedPlanId]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [normalizedPlanId])

  const questionsUrl = useMemo(() => {
    if (!plan) return '#'
    return buildWhatsAppUrl(
      `Hola Sebastián, tengo una duda sobre el plan ${plan.name}. ¿Podemos hablar?`,
    )
  }, [plan])

  if (!plan || !presentation) return <InvalidPlan />

  const planMedia = siteMedia.plans[plan.id]
  const savingsCop = presentation.totalValueCop - plan.priceCop
  const savingsPercentage = Math.round((savingsCop / presentation.totalValueCop) * 100)
  const usdPrice = plan.usdDisplay
  const availability = plan.id === 'ELITE' ? 'Máximo 10' : 'Disponibles'
  const testimonialLabel = `${presentation.testimonial.name}, ${presentation.testimonial.age}, ${presentation.testimonial.countryCode}`

  return (
    <article className="plan-presentation" data-plan={plan.id}>
      <section className="plan-presentation-hero" aria-labelledby="plan-presentation-title">
        <div className="plan-presentation-orbit plan-presentation-orbit-one" aria-hidden="true" />
        <div className="plan-presentation-orbit plan-presentation-orbit-two" aria-hidden="true" />
        <div
          {...sceneBackgroundProps(planMedia.hero, {
            className: 'plan-presentation-hero-shell',
            variant: 'hero',
            motion: true,
          })}
        >
          <Link to="/programs" className="plan-presentation-back">
            <ArrowLeft size={15} aria-hidden="true" /> COMPARAR PLANES
          </Link>

          <div className="plan-presentation-hero-grid">
            <motion.div
              className="plan-presentation-hero-copy"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.72, 0.2, 1] }}
            >
              <p className="plan-presentation-eyebrow">BAYONA <span aria-hidden="true">•</span> {plan.name}</p>
              <h1 id="plan-presentation-title">{presentation.heroTitle}</h1>
              <p className="plan-presentation-hero-lead">{presentation.heroSubtitle}</p>

              <div className="plan-presentation-hero-offer">
                <div className="plan-presentation-price">
                  <span>INVERSIÓN MENSUAL</span>
                  <strong>{plan.priceDisplay}</strong>
                  <small className="plan-presentation-currency-line">
                    <span>{plan.currency}</span>
                    <i aria-hidden="true">·</i>
                    <span>{plan.eur}</span>
                    <i aria-hidden="true">·</i>
                    <span>{usdPrice}</span>
                  </small>
                </div>
                <MagneticAnchor href={plan.cta} target="_blank" rel="noreferrer">
                  QUIERO EMPEZAR <ArrowUpRight size={19} aria-hidden="true" />
                </MagneticAnchor>
              </div>
            </motion.div>

            <motion.div
              {...sceneBackgroundProps(planMedia.poster, {
                className: 'plan-presentation-video',
                variant: 'accent',
              })}
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.2, 0.72, 0.2, 1] }}
            >
              <div
                className="plan-presentation-video-frame"
                role="img"
                aria-label={`Espacio reservado para el video de presentación del plan ${plan.name}`}
              >
                <span className="plan-presentation-video-index">FILM / {plan.id}</span>
                <CirclePlay size={74} strokeWidth={1} aria-hidden="true" />
                <small>VIDEO PRÓXIMAMENTE</small>
              </div>
              <p>Mira cómo funciona BAYONA</p>
            </motion.div>
          </div>

          <a href="#transformacion" className="plan-presentation-scroll-cue">
            DESCUBRE TU CAMBIO <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        id="transformacion"
        className="plan-presentation-section plan-presentation-transformations"
        aria-labelledby="transformations-title"
      >
        <div className="plan-presentation-shell">
          <SectionHeading
            eyebrow="01 / TU TRANSFORMACIÓN"
            title="ESTO ES LO QUE VA A CAMBIAR"
            id="transformations-title"
          />
          <ol className="plan-presentation-transformation-list">
            {presentation.transformations.map((transformation, index) => {
              const [before, after] = transformation.split('→').map((part) => part.trim())

              return (
                <Reveal key={transformation} as="li" delay={index * 0.1}>
                  <span className="plan-presentation-card-index">0{index + 1}</span>
                  <p>
                    <span>{before}</span>
                    <ArrowRight size={24} aria-hidden="true" />
                    <strong>{after}</strong>
                  </p>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      <section
        className="plan-presentation-section plan-presentation-day"
        aria-labelledby="day-title"
      >
        <div className="plan-presentation-shell">
          <SectionHeading
            eyebrow="02 / ASÍ ES CONTIGO"
            title="UN DÍA EN BAYONA"
            description="No tienes que imaginar cómo encajará. Este es el ritmo que empieza a ordenar tu proceso."
            id="day-title"
          />
          <ol className="plan-presentation-timeline">
            {presentation.timeline.map((item, index) => (
              <Reveal key={item.moment} as="li" delay={index * 0.08}>
                <span className="plan-presentation-timeline-node" aria-hidden="true">{index + 1}</span>
                <div>
                  <h3>{item.moment}</h3>
                  <p>{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="plan-presentation-section plan-presentation-value"
        aria-labelledby="value-title"
      >
        <div className="plan-presentation-shell">
          <SectionHeading
            eyebrow="03 / TU ARSENAL COMPLETO"
            title="TODO LO QUE INCLUYE TU PLAN"
            description="No compras una lista. Construyes un sistema que elimina dudas, corrige el rumbo y sostiene tu avance."
            id="value-title"
          />

          <div className="plan-presentation-value-layout">
            <ol className="plan-presentation-value-list">
              {presentation.valueStack.map((item, index) => {
                const Icon = valueIcons[item.icon] ?? Check
                const proportion = Math.max(10, (item.valueCop / presentation.totalValueCop) * 100)

                return (
                  <Reveal key={item.name} as="li" delay={(index % 4) * 0.06}>
                    <div className="plan-presentation-value-icon"><Icon size={22} aria-hidden="true" /></div>
                    <div className="plan-presentation-value-copy">
                      <span>0{index + 1}</span>
                      <h3>{item.name}</h3>
                      <p>{item.benefit}</p>
                      <i style={{ '--value-width': `${proportion}%` }} aria-hidden="true" />
                    </div>
                    <div className="plan-presentation-value-price">
                      <span>VALOR REAL</span>
                      <strong>{formatCop(item.valueCop)} COP</strong>
                    </div>
                  </Reveal>
                )
              })}
            </ol>

            <Reveal className="plan-presentation-value-summary">
              <p>TOTAL DE VALOR REAL</p>
              <AnimatedValue value={presentation.totalValueCop} />
              <span>COP</span>
              <div className="plan-presentation-value-summary-row">
                <small>TU PRECIO</small>
                <b>{plan.priceDisplay} <em>COP/mes</em></b>
              </div>
              <div className="plan-presentation-value-summary-row is-saving">
                <small>TÚ AHORRAS</small>
                <b>{formatCop(savingsCop)} <em>({savingsPercentage}%)</em></b>
              </div>
              <MagneticAnchor href={plan.cta} target="_blank" rel="noreferrer">
                ACTIVAR {plan.name} <ArrowUpRight size={18} aria-hidden="true" />
              </MagneticAnchor>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="plan-presentation-section plan-presentation-method"
        aria-labelledby="method-title"
      >
        <div className="plan-presentation-shell">
          <SectionHeading
            eyebrow="04 / POR QUÉ FUNCIONA"
            title="NO ES SUERTE. ES MÉTODO."
            id="method-title"
          />
          <div className="plan-presentation-method-layout">
            <div className="plan-presentation-method-list">
              {methodPillars.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <Reveal key={pillar.title} className="plan-presentation-method-card" delay={index * 0.1}>
                    <Icon size={28} aria-hidden="true" />
                    <span>0{index + 1}</span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.copy}</p>
                  </Reveal>
                )
              })}
            </div>
            <Reveal className="plan-presentation-authority">
              <Sparkles size={28} aria-hidden="true" />
              <strong>+2.000</strong>
              <span>PERSONAS ENTRENADAS</span>
              <p>Un método construido en el terreno: observando, ajustando y acompañando cuerpos reales.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="plan-presentation-section plan-presentation-guarantee" aria-labelledby="guarantee-title">
        <div className="plan-presentation-shell">
          <Reveal className="plan-presentation-guarantee-box">
            <div className="plan-presentation-guarantee-mark" aria-hidden="true">
              <ShieldCheck size={70} strokeWidth={1.2} />
              <span>30</span>
              <small>DÍAS</small>
            </div>
            <div>
              <p className="plan-presentation-eyebrow">TODO EL RIESGO ES NUESTRO</p>
              <h2 id="guarantee-title">30 DÍAS.<br /><span>CERO RIESGO.</span></h2>
              <p>Si en 30 días no sientes que BAYONA es para ti, te devolvemos <strong>cada peso</strong>. Sin preguntas. Sin trabas. Sin culpa. Sin “pero tienes que...”.</p>
              <p>Confiamos tanto en el método que asumimos todo el riesgo.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="plan-presentation-section plan-presentation-testimonial"
        aria-labelledby="testimonial-title"
      >
        <div className="plan-presentation-shell">
          <SectionHeading
            eyebrow="05 / PERSONAS COMO TÚ"
            title="ALGUIEN YA ESTABA DONDE TÚ ESTÁS"
            id="testimonial-title"
          />
          <Reveal className="plan-presentation-testimonial-card">
            <div
              className="plan-presentation-testimonial-photo"
              role="img"
              aria-label={`Espacio de fotografía para ${testimonialLabel}`}
            >
              <span>{presentation.testimonial.initial}</span>
              <small>FOTO / PRÓXIMAMENTE</small>
            </div>
            <blockquote>
              <span aria-hidden="true">“</span>
              <p>{presentation.testimonial.quote}</p>
              <footer>
                <strong>{testimonialLabel}</strong>
                <small>{presentation.testimonial.result}</small>
              </footer>
            </blockquote>
          </Reveal>
          <p className="plan-presentation-testimonial-notice">Ejemplos representativos. Testimonios verificados próximamente.</p>
        </div>
      </section>

      <section
        className="plan-presentation-section plan-presentation-final"
        aria-labelledby="final-title"
      >
        <div className="plan-presentation-shell">
          <SectionHeading eyebrow="06 / TU DECISIÓN" title="¿ESTÁS LISTO?" id="final-title" />
          <div className="plan-presentation-final-layout">
            <Reveal className="plan-presentation-final-summary">
              <p>{presentation.urgency}</p>
              <dl>
                <div><dt>PLAN</dt><dd>{plan.name}</dd></div>
                <div>
                  <dt>INVERSIÓN</dt>
                  <dd>
                    {plan.priceDisplay} COP/mes
                    <small className="plan-presentation-currency-line">
                      <span>{plan.eur}</span>
                      <i aria-hidden="true">·</i>
                      <span>{usdPrice}</span>
                    </small>
                  </dd>
                </div>
                <div><dt>GARANTÍA</dt><dd>30 días sin riesgo</dd></div>
                <div><dt>CUPOS</dt><dd>{availability}</dd></div>
              </dl>
            </Reveal>

            <Reveal className="plan-presentation-final-cta" delay={0.1}>
              <HeartPulse size={32} aria-hidden="true" />
              <p>Tu cuerpo no necesita otra promesa.<br /><strong>Necesita una decisión.</strong></p>
              <MagneticAnchor href={plan.cta} target="_blank" rel="noreferrer">
                QUIERO EMPEZAR AHORA <ArrowUpRight size={20} aria-hidden="true" />
              </MagneticAnchor>
              <a href={questionsUrl} target="_blank" rel="noreferrer" className="plan-presentation-question-link">
                ¿Tienes dudas? Habla con Sebastián <MessageCircle size={16} aria-hidden="true" />
              </a>
              <small><ShieldCheck size={14} aria-hidden="true" /> 30 días sin riesgo. Si no es para ti, devolvemos todo.</small>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="plan-presentation-section plan-presentation-faq" aria-labelledby="faq-title">
        <div className="plan-presentation-shell plan-presentation-faq-shell">
          <SectionHeading eyebrow="07 / SIN LETRA PEQUEÑA" title="TUS ÚLTIMAS DUDAS" id="faq-title" />
          <div className="plan-presentation-faq-list">
            {presentation.faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.08}>
                <details>
                  <summary>
                    <span>0{index + 1}</span>
                    <strong>{faq.question}</strong>
                    <ChevronDown size={22} aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
          <div className="plan-presentation-faq-close">
            <p>Ya conoces el camino.<br /><strong>Ahora toca caminarlo.</strong></p>
            <MagneticAnchor href={plan.cta} target="_blank" rel="noreferrer">
              EMPEZAR CON {plan.name} <ArrowUpRight size={18} aria-hidden="true" />
            </MagneticAnchor>
          </div>
        </div>
      </section>
    </article>
  )
}
