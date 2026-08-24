import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, MessageCircle, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionLabel } from '../components/Layout'
import { sceneBackgroundProps } from '../components/SceneBackground.jsx'
import { questionCategories } from '../config/faqContent.js'
import { buildWhatsAppUrl, membershipPlans } from '../config/offerings.js'
import { siteMedia } from '../config/siteMedia.js'
// faq.css era global en main.jsx. Ahora viaja con la ruta /faq.
import '../styles/faq.css'

const pricingPlans = membershipPlans.map((plan) => ({
  id: plan.id,
  name: plan.name,
  cop: plan.priceDisplay,
  eur: plan.eur,
  usd: plan.usdDisplay,
  featured: plan.id === 'FUERZA',
  badge: plan.id === 'FUERZA' ? 'DESTACADO' : plan.id === 'ELITE' ? '10 CUPOS' : '',
}))

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
