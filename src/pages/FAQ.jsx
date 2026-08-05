import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, MessageCircle, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionLabel } from '../components/Layout'
import { sceneBackgroundProps } from '../components/SceneBackground.jsx'
import { buildWhatsAppUrl, membershipPlans } from '../config/offerings.js'
import { siteMedia } from '../config/siteMedia.js'

const pricingPlans = membershipPlans.map((plan) => ({
  id: plan.id,
  name: plan.name,
  cop: plan.priceDisplay,
  eur: plan.eur,
  usd: plan.usdDisplay,
  featured: plan.id === 'FUERZA',
  badge: plan.id === 'FUERZA' ? 'DESTACADO' : plan.id === 'ELITE' ? '10 CUPOS' : '',
}))

const questionCategories = [
  {
    title: 'PROGRAMAS',
    questions: [
      {
        q: '¿Necesito experiencia previa?',
        a: 'No. Hay propuestas desde iniciación hasta rendimiento. Antes de contratar revisamos tu punto de partida, objetivo y disponibilidad para orientar la elección.',
      },
      {
        q: '¿Hay programas para niños?',
        a: 'Sí. La oferta publicada contempla niños de 5 a 11 años y jóvenes de 12 a 17, además de adultos, deportistas y personas de 60 años o más. La actividad concreta depende de nivel, ubicación y disponibilidad.',
      },
      {
        q: '¿Qué incluye cada plan?',
        a: 'RAÍZ incluye plan mensual personalizado, una sesión virtual 1:1, guía de alimentación y seguimiento quincenal. FUERZA eleva el seguimiento a semanal e incluye dos sesiones virtuales al mes y una videollamada mensual con Sebastián. RENDIMIENTO incluye cuatro sesiones virtuales, evaluación inicial y ajustes semanales. ELITE incluye ocho sesiones privadas y contacto directo con Sebastián, con un máximo publicado de 10 cupos. Revisa siempre la ficha vigente antes de pagar. BAYONA+ sigue en desarrollo y no se presenta como una prestación operativa hoy.',
      },
      {
        q: '¿Puedo cambiar de plan?',
        a: 'El cambio se coordina por WhatsApp y queda sujeto al ciclo de facturación, la disponibilidad y las condiciones vigentes. Te confirmamos por escrito cuándo se aplica antes de procesarlo.',
      },
      {
        q: '¿Hay permanencia?',
        a: 'Los planes se publican con precio mensual. Antes de pagar te confirmamos por escrito renovación, fecha de corte y procedimiento de cancelación para que decidas con la información completa.',
      },
    ],
  },
  {
    title: 'PRECIOS',
    questions: [
      {
        q: '¿Cuánto cuesta?',
        a: 'Aquí ves los precios mensuales publicados en COP y sus equivalencias aproximadas en EUR y USD. Confirma el importe final, la disponibilidad y las condiciones de la garantía antes de pagar.',
        pricing: true,
      },
      {
        q: '¿Qué métodos de pago aceptáis?',
        a: 'El medio disponible depende del país y se confirma por WhatsApp antes del cobro. No envíes datos de tarjeta por el chat; si corresponde, recibirás un enlace de pago seguro.',
      },
      {
        q: '¿Hay descuentos para familias?',
        a: 'No hay un descuento familiar fijo publicado. Pregunta por WhatsApp y te confirmamos si existe una condición vigente para tu caso antes de contratar.',
      },
    ],
  },
  {
    title: 'BAYONA+',
    questions: [
      {
        q: '¿La app funciona en iOS y Android?',
        a: 'Todavía no. BAYONA+ está en desarrollo y no hay una app operativa para descargar. iOS, Android y web son formatos contemplados en el concepto, no compatibilidades confirmadas.',
      },
      {
        q: '¿Cuándo estará lista la app?',
        a: 'No hay una fecha pública confirmada. Si se abre una prueba o acceso anticipado, se comunicarán por escrito los requisitos, dispositivos compatibles y funciones disponibles. RENDIMIENTO y ELITE contemplan acceso anticipado cuando exista una versión utilizable; no significa acceso inmediato.',
      },
      {
        q: '¿Qué incluirá la app?',
        a: 'La página de BAYONA+ muestra funciones en exploración: plan diario, registro de sesiones, recursos, comunidad y contacto según el plan. El alcance puede cambiar durante el desarrollo y ninguna maqueta garantiza una función final.',
      },
    ],
  },
  {
    title: 'MÉTODO',
    questions: [
      {
        q: '¿Es apto si tengo una lesión?',
        a: 'No podemos determinarlo sin conocer tu caso y no diagnosticamos lesiones. Si tienes dolor, una lesión activa o indicación clínica, consulta primero con un profesional sanitario. Con su autorización, podemos valorar adaptaciones dentro del alcance del entrenamiento.',
      },
      {
        q: '¿Qué material necesito?',
        a: 'Depende del programa y del objetivo. Puede incluir peso corporal, bandas o mancuernas. Antes de empezar te confirmamos el material y las alternativas disponibles.',
      },
      {
        q: '¿Hay clases presenciales?',
        a: 'El servicio es principalmente online. Las sesiones presenciales dependen de ubicación y disponibilidad; ELITE contempla sesiones virtuales o presenciales en España. Confirma la modalidad antes de contratar.',
      },
    ],
  },
  {
    title: 'COMUNIDAD',
    questions: [
      {
        q: '¿Cómo accedo a la comunidad?',
        a: 'El acceso abierto es gratuito y se solicita por WhatsApp. No necesitas comprar un plan. El seguimiento individual y la prioridad de respuesta dependen de la membresía contratada.',
      },
      {
        q: '¿Puedo regalar una membresía?',
        a: 'Consulta por WhatsApp la disponibilidad y las condiciones vigentes. Si puede emitirse como regalo, te confirmamos plan, precio, activación y datos necesarios antes de cobrar.',
      },
    ],
  },
]

const videoCallUrl = buildWhatsAppUrl([
  'Hola BAYONA, quiero coordinar una videollamada informativa de 15 minutos con Sebastián.',
  '¿Qué disponibilidad tenéis?',
].join('\n'))

const quickQuestionUrl = buildWhatsAppUrl([
  'Hola BAYONA, tengo una pregunta concreta sobre los programas y servicios.',
  '¿Podéis ayudarme?',
].join('\n'))

function PricingBlock() {
  return (
    <div className="faq-pricing" aria-label="Opciones y precios mensuales BAYONA">
      <header className="faq-pricing-heading">
        <span>TUS OPCIONES · PRECIOS CLAROS</span>
        <h4>ELIGE TU NIVEL</h4>
      </header>

      <div className="faq-pricing-grid">
        {pricingPlans.map((plan) => (
          <article
            className={`faq-price-card${plan.featured ? ' is-featured' : ''}${plan.id === 'ELITE' ? ' is-limited' : ''}`}
            key={plan.id}
          >
            <div className="faq-price-card-header">
              <h5>{plan.name}</h5>
              {plan.badge && <span>{plan.badge}</span>}
            </div>
            <div className="faq-price-main">
              <strong>{plan.cop}</strong>
              <small>COP / MES</small>
            </div>
            <div className="faq-price-equivalents" aria-label={`Equivalencias aproximadas de ${plan.name}`}>
              <span>{plan.eur}</span>
              <span>{plan.usd}</span>
            </div>
          </article>
        ))}
      </div>

      <p className="faq-price-microcopy">Equivalencias aproximadas. Confirma importe, disponibilidad y condiciones vigentes antes de pagar.</p>
    </div>
  )
}

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(0)
  const reducedMotion = useReducedMotion()

  return (
    <div className="faq-page">
      <header
        {...sceneBackgroundProps(siteMedia.faq.hero, {
          className: 'faq-hero section-shell',
          variant: 'subtle',
          pseudo: 'after',
        })}
      >
        <SectionLabel>BAYONA / INFORMACIÓN ANTES DE ELEGIR</SectionLabel>
        <h1 aria-label="FAQ / PREGUNTAS FRECUENTES"><span>FAQ /</span>{' '}<br />PREGUNTAS FRECUENTES</h1>
        <p>
          Programas, precios, comunidad y BAYONA+. Respuestas directas para comparar antes de decidir.
        </p>
      </header>

      <section className="faq-section section-shell" aria-labelledby="faq-questions-title">
        <SectionLabel>01 / RESPUESTAS CLARAS</SectionLabel>
        <h2 id="faq-questions-title">LO QUE NECESITAS SABER<br />{' '}<span>ANTES DE ELEGIR.</span></h2>

        <div className="faq-categories">
          {questionCategories.map((category, categoryIndex) => {
            const startIndex = questionCategories
              .slice(0, categoryIndex)
              .reduce((total, entry) => total + entry.questions.length, 0)
            const categoryNumber = String(categoryIndex + 1).padStart(2, '0')

            return (
              <section
                className="faq-category"
                data-category-number={categoryNumber}
                key={category.title}
                aria-labelledby={`faq-category-${categoryIndex}`}
              >
                <h3 className="faq-category-title" id={`faq-category-${categoryIndex}`}>
                  <span>{categoryNumber} /</span> {category.title}
                </h3>
                <div className="faq-list">
                  {category.questions.map((item, questionIndex) => {
                    const globalIndex = startIndex + questionIndex
                    const isOpen = openQuestion === globalIndex
                    const questionId = `faq-question-${globalIndex}`
                    const answerId = `faq-answer-${globalIndex}`

                    return (
                      <article className={`faq-accordion${isOpen ? ' open' : ''}`} key={item.q}>
                        <button
                          type="button"
                          id={questionId}
                          aria-expanded={isOpen}
                          aria-controls={answerId}
                          onClick={() => setOpenQuestion(isOpen ? -1 : globalIndex)}
                        >
                          <span className="faq-question-number" aria-hidden="true">
                            {String(globalIndex + 1).padStart(2, '0')}
                          </span>
                          <span className="faq-question-text">{item.q}</span>
                          <ChevronDown className="faq-question-icon" aria-hidden="true" focusable="false" />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              className="faq-answer"
                              id={answerId}
                              role="region"
                              aria-labelledby={questionId}
                              initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                              animate={reducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                              exit={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                              transition={{ duration: reducedMotion ? 0 : 0.46, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <div className="faq-answer-inner">
                                <p>{item.a}</p>
                                {item.pricing && <PricingBlock />}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        <p className="faq-scope-notice">
          Si hay dolor, una lesión o algo de tu salud que necesita atención, lo primero es cuidarte. Aquí te orientamos sobre entrenamiento; un profesional sanitario cuida lo clínico.
        </p>
      </section>

      <section className="faq-contact section-shell" aria-labelledby="faq-contact-title">
        <SectionLabel>02 / RESUELVE LO QUE FALTA</SectionLabel>
        <div className="faq-contact-heading">
          <h2 id="faq-contact-title">ELIGE TU<br />{' '}<span>SIGUIENTE PASO.</span></h2>
          <p>Compara los programas, plantea una duda concreta o empieza con un recurso gratuito.</p>
        </div>

        <div className="faq-contact-grid">
          <article className="faq-contact-card faq-contact-card--primary">
            <Video aria-hidden="true" />
            <span className="faq-contact-meta">15 MIN · SOLICITUD POR WHATSAPP</span>
            <h3>VIDEOLLAMADA INFORMATIVA</h3>
            <p>Revisamos tu objetivo y las diferencias entre planes. La disponibilidad se confirma antes de agendar.</p>
            <a href={videoCallUrl} target="_blank" rel="noopener noreferrer">
              SOLICITAR VIDEOLLAMADA <ArrowUpRight aria-hidden="true" />
            </a>
          </article>

          <article className="faq-contact-card">
            <MessageCircle aria-hidden="true" />
            <span className="faq-contact-meta">CONSULTA POR WHATSAPP</span>
            <h3>UNA PREGUNTA CONCRETA</h3>
            <p>Escribe qué necesitas confirmar sobre alcance, precio, disponibilidad o condiciones.</p>
            <a href={quickQuestionUrl} target="_blank" rel="noopener noreferrer">
              CONSULTAR POR WHATSAPP <ArrowUpRight aria-hidden="true" />
            </a>
          </article>

          <article className="faq-contact-card faq-contact-card--free">
            <span className="faq-free-mark" aria-hidden="true">00</span>
            <span className="faq-contact-meta">RETO + GUÍAS GRATUITAS</span>
            <h3>EMPIEZA POR LOS RECURSOS</h3>
            <p>Lee las condiciones del reto o abre las guías antes de comparar una membresía.</p>
            <Link to="/resources">
              VER RECURSOS <ArrowUpRight aria-hidden="true" />
            </Link>
          </article>
        </div>

        <blockquote className="faq-founder-close">
          <p>EL CAMBIO NO EMPIEZA CON UN PLAN PERFECTO. EMPIEZA CON UNA DECISIÓN.</p>
          <cite>— SEBASTIÁN</cite>
        </blockquote>
      </section>

    </div>
  )
}
