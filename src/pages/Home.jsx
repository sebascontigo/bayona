import { animate, motion, useInView } from 'framer-motion'
import { Activity, ArrowDown, ArrowUpRight, Atom, Users, Zap } from 'lucide-react'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GoldButton, SectionLabel } from '../components/Layout'
import Bridge from '../components/Bridge'
import CommunityChatPreview from '../components/CommunityChatPreview'
import ExperienceProof from '../components/home/ExperienceProof.jsx'
import { sceneBackgroundProps } from '../components/SceneBackground.jsx'
import VideoSection from '../components/VideoSection.jsx'
import ExtrasExplorer from '../components/conversion/ExtrasExplorer.jsx'
import PersistentSummary from '../components/conversion/PersistentSummary.jsx'
import PlanExplorer from '../components/conversion/PlanExplorer.jsx'
import RequestPreview from '../components/conversion/RequestPreview.jsx'
import {
  HOME_EVIDENCE_CONTEXT,
  homeContentModel,
  membershipPlanEditorialProjection,
} from '../config/conversionContent.js'
import { evidenceRegistry } from '../config/evidenceRegistry.js'
import { siteMedia } from '../config/siteMedia.js'
import { calculateExperience, membershipPlans } from '../config/offerings.js'
import { useCapabilities } from '../engine/hooks/useCapabilities.js'
import { pointerEffectsEnabled } from '../engine/providers/capabilities.js'
import { selectPublishableEvidence } from '../lib/conversion/evidence.js'

const HOME_EASE = [0.16, 1, 0.3, 1]
const HOME_NUMBER_FORMATTER = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 })
const HOME_HERO_WORDS = Object.freeze(homeContentModel.h1.split(/\s+/))

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: HOME_EASE } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const heroTitleStagger = {
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.055 } },
}

const heroWordReveal = {
  hidden: { opacity: 0, y: '0.55em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: HOME_EASE } },
}

const homeProblemBlock = homeContentModel.blocks.find(({ id }) => id === 'home-problem')
const homeVisionBlock = homeContentModel.blocks.find(({ id }) => id === 'home-vision')
const homeMechanismBlock = homeContentModel.blocks.find(({ id }) => id === 'home-mechanism')
const homeProcessBenefitsBlock = homeContentModel.blocks.find(({ id }) => id === 'home-process-benefits')
const homeEvidenceBlock = homeContentModel.blocks.find(({ id }) => id === 'home-evidence-unavailable')
const homeProcessFallbackBlock = homeContentModel.blocks.find(({ id }) => id === 'home-process-fallback')
const homeOfferBlock = homeContentModel.blocks.find(({ id }) => id === 'home-offer')
const homeActionBlock = homeContentModel.blocks.find(({ id }) => id === 'home-action')

const PILLAR_ICONS = Object.freeze([Atom, Activity, Users])

const EVIDENCE_KIND_LABELS = Object.freeze({
  testimonial: 'TESTIMONIO',
  credential: 'CREDENCIAL',
  statistic: 'DATO',
  case: 'CASO',
  process: 'PROCESO',
})

function HomeCountUp({ className = '', duration = 0.9, finalText, value }) {
  const { reducedMotion } = useCapabilities()
  const numberRef = useRef(null)
  const isInView = useInView(numberRef, { once: true, amount: 0.35 })
  const targetValue = Number.isFinite(value) ? value : 0
  const currentValueRef = useRef(reducedMotion ? targetValue : 0)
  const [displayValue, setDisplayValue] = useState(() => (
    reducedMotion ? finalText : HOME_NUMBER_FORMATTER.format(0)
  ))

  useEffect(() => {
    if (reducedMotion) {
      currentValueRef.current = targetValue
      setDisplayValue(finalText)
      return undefined
    }

    if (!isInView) return undefined

    const fromValue = currentValueRef.current

    if (fromValue === targetValue) {
      setDisplayValue(finalText)
      return undefined
    }

    const controls = animate(fromValue, targetValue, {
      duration,
      ease: HOME_EASE,
      onUpdate: (latest) => {
        currentValueRef.current = latest
        setDisplayValue(HOME_NUMBER_FORMATTER.format(Math.round(latest)))
      },
      onComplete: () => {
        currentValueRef.current = targetValue
        setDisplayValue(finalText)
      },
    })

    return () => controls.stop()
  }, [duration, finalText, isInView, reducedMotion, targetValue])

  return (
    <span
      ref={numberRef}
      className={`home-count-up ${className}`.trim()}
      aria-label={finalText}
    >
      {displayValue}
    </span>
  )
}

function NinetyDayHeading({ text }) {
  const numberIndex = text.indexOf('90')

  if (numberIndex === -1) return text

  return (
    <span aria-hidden="true">
      {text.slice(0, numberIndex)}
      <HomeCountUp
        className="vision-90-count"
        duration={1}
        finalText={text.slice(numberIndex, numberIndex + 2)}
        value={90}
      />
      {text.slice(numberIndex + 2)}
    </span>
  )
}

function HomePlanExplorer() {
  const capabilities = useCapabilities()
  const pointerEffects = pointerEffectsEnabled(capabilities)
  const interactionRef = useRef(null)

  // Estabilizar la referencia de projections para evitar re-renders innecesarios
  const stableProjections = useMemo(() => membershipPlanEditorialProjection, [])

  const resetPlanPreview = useCallback(() => {
    interactionRef.current?.querySelectorAll('.plan-showroom-preview').forEach((preview) => {
      preview.style.setProperty('--plan-tilt-x', '0deg')
      preview.style.setProperty('--plan-tilt-y', '0deg')
    })
  }, [])

  const handlePlanPointerMove = useCallback((event) => {
    if (!pointerEffects || !(event.target instanceof Element)) return

    const preview = event.target.closest('.plan-showroom-preview')
    if (!preview || !event.currentTarget.contains(preview)) return

    const bounds = preview.getBoundingClientRect()
    const localX = Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width)
    const localY = Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height)
    const normalizedX = bounds.width > 0 ? localX / bounds.width : 0.5
    const normalizedY = bounds.height > 0 ? localY / bounds.height : 0.5

    preview.style.setProperty('--plan-spotlight-x', `${localX.toFixed(1)}px`)
    preview.style.setProperty('--plan-spotlight-y', `${localY.toFixed(1)}px`)
    preview.style.setProperty('--plan-tilt-x', `${((0.5 - normalizedY) * 2).toFixed(2)}deg`)
    preview.style.setProperty('--plan-tilt-y', `${((normalizedX - 0.5) * 2).toFixed(2)}deg`)
  }, [pointerEffects])

  useEffect(() => {
    if (!pointerEffects) resetPlanPreview()
  }, [pointerEffects, resetPlanPreview])

  return (
    <div
      ref={interactionRef}
      className="home-plan-interactions"
      data-pointer-effects={pointerEffects ? 'true' : 'false'}
      onPointerMove={handlePlanPointerMove}
      onPointerLeave={resetPlanPreview}
    >
      <PlanExplorer projections={stableProjections} />
    </div>
  )
}

function restartSelectionFeedback(target, root, reducedMotion) {
  if (reducedMotion || !(target instanceof Element)) return

  const feedbackTarget = target.closest(
    '.extras-plan-options label, .extras-quantity-control select, .extras-selection-action',
  )

  if (!feedbackTarget || !root.contains(feedbackTarget)) return

  feedbackTarget.removeAttribute('data-selection-feedback')
  void feedbackTarget.offsetWidth
  feedbackTarget.setAttribute('data-selection-feedback', 'active')
}

export function HomeProofSection({
  recordsOrRegistry = evidenceRegistry,
  context = HOME_EVIDENCE_CONTEXT,
}) {
  const publishedEvidence = selectPublishableEvidence(recordsOrRegistry, context)
  const hasPublishedEvidence = publishedEvidence.length > 0
  const visibleBlock = hasPublishedEvidence ? homeEvidenceBlock : homeProcessFallbackBlock

  return (
    <section
      {...sceneBackgroundProps(siteMedia.home.proof, {
        className: 'proof-section',
        variant: 'subtle',
      })}
      aria-labelledby="home-proof-heading"
      data-content-stage="proof"
      data-content-block={visibleBlock.id}
      data-evidence-gate={hasPublishedEvidence ? 'published' : 'empty'}
    >
      <div className="proof-bg-number" aria-hidden="true">04</div>
      <div className="section-shell">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <SectionLabel>04 / EXPERIENCIA</SectionLabel>
          <motion.h2 id="home-proof-heading" variants={fadeUp}>{visibleBlock.heading}</motion.h2>
          <motion.p variants={fadeUp} className="proof-intro">{visibleBlock.body}</motion.p>
        </motion.div>

        {hasPublishedEvidence ? (
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="evidence-list"
            aria-label="Experiencia verificada de BAYONA"
          >
            {publishedEvidence.map((record) => {
              const statement = typeof record.content?.statement === 'string'
                ? record.content.statement.trim()
                : ''

              return (
                <motion.li key={record.id} variants={fadeUp} className="evidence-record" data-evidence-kind={record.kind}>
                  <p className="evidence-kind">{EVIDENCE_KIND_LABELS[record.kind] ?? 'EXPERIENCIA'}</p>
                  <h3>{record.attribution}</h3>
                  {statement && <blockquote>{statement}</blockquote>}
                  <dl className="evidence-meta">
                    <div>
                      <dt>Alcance</dt>
                      <dd>{record.scope}</dd>
                    </div>
                    <div>
                      <dt>Fuente</dt>
                      <dd>{record.sourceRef}</dd>
                    </div>
                  </dl>
                </motion.li>
              )
            })}
          </motion.ol>
        ) : (
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="proof-process-list"
            aria-label="Proceso verificable de BAYONA"
          >
            {homeProcessFallbackBlock.items.map((item) => (
              <motion.li key={item.id} variants={fadeUp} className="proof-process-item">
                <span className="proof-process-marker" aria-hidden="true">{item.marker}</span>
                <div><h3>{item.title}</h3></div>
              </motion.li>
            ))}
          </motion.ol>
        )}

      </div>
    </section>
  )
}

function HomeExperienceConfigurator() {
  const { reducedMotion } = useCapabilities()
  const [selection, setSelection] = useState(() => ({
    planId: membershipPlans[0].id,
    serviceQuantities: {},
    extraIds: [],
  }))
  const calculation = useMemo(() => calculateExperience(selection), [selection])
  const animatedCalculation = useMemo(() => ({
    ...calculation,
    totalDisplay: (
      <HomeCountUp
        className="persistent-summary-count"
        duration={0.72}
        finalText={calculation.totalDisplay}
        value={calculation.totalCop}
      />
    ),
  }), [calculation])

  const handleChangeCapture = useCallback((event) => {
    restartSelectionFeedback(event.target, event.currentTarget, reducedMotion)
  }, [reducedMotion])

  const handleClickCapture = useCallback((event) => {
    if (!(event.target instanceof Element) || !event.target.closest('.extras-selection-action')) return
    restartSelectionFeedback(event.target, event.currentTarget, reducedMotion)
  }, [reducedMotion])

  const handleAnimationEndCapture = useCallback((event) => {
    if (event.animationName === 'home-selection-feedback' && event.target instanceof Element) {
      event.target.removeAttribute('data-selection-feedback')
    }
  }, [])

  return (
    <div
      className="home-configurator-interaction"
      onChangeCapture={handleChangeCapture}
      onClickCapture={handleClickCapture}
      onAnimationEndCapture={handleAnimationEndCapture}
    >
      <div className="extras-configurator">
        <ExtrasExplorer selection={selection} onSelectionChange={setSelection} />
        <PersistentSummary calculation={animatedCalculation} />
      </div>
      <RequestPreview selection={selection} />
    </div>
  )
}

export default function Home() {
  const capabilities = useCapabilities()
  const heroPointerEffects = pointerEffectsEnabled(capabilities)
  const heroRef = useRef(null)

  // Intersection Observer para animaciones de scroll
  useEffect(() => {
    if (capabilities.reducedMotion) return undefined

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Seleccionar elementos a animar
    const elementsToAnimate = document.querySelectorAll(`
      .hero-module h1,
      .vision-section h2,
      .pain-section h2,
      .mechanism-section h2,
      .solution-section h2,
      .proof-section h2,
      .offer-section h2,
      .calculator-section h2,
      .cta-stack-section h2,
      .pain-item,
      .proof-process-item,
      .mechanism-step,
      .pillar-item,
      .evidence-record,
      .home-configurator-guide li
    `)

    elementsToAnimate.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [capabilities.reducedMotion])

  const resetHeroParallax = useCallback(() => {
    const hero = heroRef.current
    if (!hero) return

    hero.style.setProperty('--hero-content-x', '0px')
    hero.style.setProperty('--hero-content-y', '0px')
    hero.style.setProperty('--hero-aurora-x', '0px')
    hero.style.setProperty('--hero-aurora-y', '0px')
    hero.style.setProperty('--hero-particles-x', '0px')
    hero.style.setProperty('--hero-particles-y', '0px')
  }, [])

  const handleHeroPointerMove = useCallback((event) => {
    if (!heroPointerEffects) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const normalizedX = bounds.width > 0
      ? ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      : 0
    const normalizedY = bounds.height > 0
      ? ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
      : 0

    event.currentTarget.style.setProperty('--hero-content-x', `${(normalizedX * 4).toFixed(2)}px`)
    event.currentTarget.style.setProperty('--hero-content-y', `${(normalizedY * 3).toFixed(2)}px`)
    event.currentTarget.style.setProperty('--hero-aurora-x', `${(normalizedX * -8).toFixed(2)}px`)
    event.currentTarget.style.setProperty('--hero-aurora-y', `${(normalizedY * -6).toFixed(2)}px`)
    event.currentTarget.style.setProperty('--hero-particles-x', `${(normalizedX * 6).toFixed(2)}px`)
    event.currentTarget.style.setProperty('--hero-particles-y', `${(normalizedY * 4).toFixed(2)}px`)
  }, [heroPointerEffects])

  useEffect(() => {
    if (!heroPointerEffects) resetHeroParallax()
  }, [heroPointerEffects, resetHeroParallax])

  return (
    <>
      <section
        ref={heroRef}
        {...sceneBackgroundProps(siteMedia.home.hero, {
          className: 'hero-module',
          variant: 'hero',
          pseudo: 'after',
          motion: true,
        })}
        aria-labelledby="home-hero-title"
        data-pointer-effects={heroPointerEffects ? 'true' : 'false'}
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={resetHeroParallax}
      >
        <div className="hero-aurora" aria-hidden="true" />
        <div className="hero-particles" aria-hidden="true">
          <span style={{ '--particle-x': '8%', '--particle-y': '18%', '--particle-size': '3px', '--particle-opacity': '0.74' }} />
          <span style={{ '--particle-x': '22%', '--particle-y': '72%', '--particle-size': '2px', '--particle-opacity': '0.58' }} />
          <span style={{ '--particle-x': '39%', '--particle-y': '34%', '--particle-size': '4px', '--particle-opacity': '0.84' }} />
          <span style={{ '--particle-x': '58%', '--particle-y': '79%', '--particle-size': '3px', '--particle-opacity': '0.7' }} />
          <span style={{ '--particle-x': '76%', '--particle-y': '21%', '--particle-size': '2px', '--particle-opacity': '0.82' }} />
          <span style={{ '--particle-x': '91%', '--particle-y': '61%', '--particle-size': '3px', '--particle-opacity': '0.66' }} />
        </div>

        <div className="hero-layout" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
          <div className="hero-content">
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="hero-kicker">
              BAYONA <span>·</span> NO ES MOTIVACIÓN <span>·</span> ES ESTRUCTURA
            </motion.p>

            <motion.h1
              id="home-hero-title"
              aria-label={homeContentModel.h1}
              initial={capabilities.reducedMotion ? false : 'hidden'}
              animate="visible"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900 }}
            >
              <motion.span
                className="hero-title-words"
                aria-hidden="true"
                variants={heroTitleStagger}
              >
                {HOME_HERO_WORDS.map((word, index) => (
                  <Fragment key={`${word}-${index}`}>
                    <motion.span
                      className="hero-title-word"
                      variants={heroWordReveal}
                    >
                      {word}
                    </motion.span>
                    {index < HOME_HERO_WORDS.length - 1 ? ' ' : null}
                  </Fragment>
                ))}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="hero-subheadline"
            >
              Entrena con dirección, seguimiento real y una estructura que cabe en tu vida.
              No más improvisar. No más empezar cada lunes.
            </motion.p>

            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24 }}
              className="hero-actions"
              aria-label="Explorar los programas BAYONA"
            >
              <GoldButton to="/programs" className="hero-programs-cta">
                VER PLANES
              </GoldButton>

              <a className="hero-transform-cta" href="#home-offer-heading">
                IR DIRECTO A LA DECISIÓN <ArrowDown size={16} aria-hidden="true" />
              </a>
            </motion.nav>
          </div>
        </div>
      </section>

      <section
        {...sceneBackgroundProps(siteMedia.home.ninetyDays, {
          className: 'vision-section home-scene home-scene--future',
          variant: 'hero',
          pseudo: 'after',
          position: 'center 42%',
          overlay: 'linear-gradient(90deg, rgba(5, 5, 5, 0.94) 0%, rgba(5, 5, 5, 0.72) 48%, rgba(5, 5, 5, 0.25) 100%)',
        })}
        aria-labelledby="home-vision-heading"
        data-content-stage={homeVisionBlock.stage}
        data-content-block={homeVisionBlock.id}
        data-content-placement="prelude"
      >
        <div className="section-shell vision-layout">
          <span className="home-vertical-word" aria-hidden="true">FUTURO</span>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="vision-panel">
            <SectionLabel>TU FUTURO</SectionLabel>
            <motion.h2
              id="home-vision-heading"
              aria-label={homeVisionBlock.heading}
              variants={fadeUp}
            >
              <NinetyDayHeading text={homeVisionBlock.heading} />
            </motion.h2>
            <motion.p variants={fadeUp} className="vision-copy">{homeVisionBlock.body}</motion.p>
            <motion.ul variants={stagger} className="proof-process-list vision-90-list" aria-label="Hábitos de trabajo durante 90 días">
              {homeVisionBlock.items.map((item, index) => (
                <motion.li key={item.id} variants={fadeUp} className="proof-process-item">
                  <span className="proof-process-marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <p>{item.title}</p>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="hero-secondary-bridge">
              <a className="hero-transform-cta" href="#problemas">
                VER CÓMO FUNCIONA <ArrowDown size={16} aria-hidden="true" />
              </a>
              <p className="hero-fast-path">
                O si ya lo tienes claro, <a href="#home-offer-heading">elige tu acompañamiento ahora</a>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        id="problemas"
        className="pain-section home-editorial-light"
        aria-labelledby="transformation-heading"
        data-content-stage={homeProblemBlock.stage}
        data-content-block={homeProblemBlock.id}
      >
        <div className="section-shell">
          <div className="home-section-heading-grid">
            <span className="home-vertical-word home-vertical-word--dark" aria-hidden="true">PUNTO DE PARTIDA</span>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="pain-header">
              <SectionLabel>01 / ¿TE RECONOCES AQUÍ?</SectionLabel>
              <motion.h2 id="transformation-heading" variants={fadeUp}>{homeProblemBlock.heading}</motion.h2>
              <motion.p variants={fadeUp} className="pain-intro">
                {homeProblemBlock.body}
              </motion.p>
            </motion.div>
          </div>
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="pain-column"
            aria-label="Situaciones que puedes transformar"
          >
            {homeProblemBlock.items.map((situation) => (
              <motion.li
                key={situation.id}
                variants={fadeUp}
                className="pain-item"
              >
                <div className="pain-number" aria-hidden="true">{situation.marker}</div>
                <div className="pain-content">
                  <h3>{situation.title}</h3>
                  <p>{situation.body}</p>
                </div>
                <span className="pain-item-line" aria-hidden="true" />
              </motion.li>
            ))}
          </motion.ol>
          <p className="home-section-note home-pain-note">
            Si tienes dolor persistente o una condición, consulta a un profesional. Esto es método, no medicina.
          </p>
        </div>
      </section>

      <Bridge
        className="home-community-bridge"
        media={siteMedia.home.community}
        eyebrow="COMUNIDAD · NO ESTÁS SOLO"
        title="NO TE VENDO UN PLAN"
        titleAccent="Y TE DEJO SOLO."
        hook="Un plan sin gente al lado es otra cosa que empiezas y abandonas. Aquí entras a un grupo donde alguien responde. Hoy. Donde personas como tú no te dejan tirar la toalla."
        free
        ctaLabel="CONOCER LA COMUNIDAD"
        ctaHref="/community"
      >
        <div className="home-community-preview">
          <CommunityChatPreview variant="mini" />
          <p className="home-section-note home-community-note">
            El seguimiento individual depende del plan contratado.
          </p>
        </div>
      </Bridge>

      <section
        {...sceneBackgroundProps(siteMedia.home.method, {
          className: 'mechanism-section home-scene home-scene--method',
          variant: 'hero',
          pseudo: 'after',
          position: 'center 48%',
          overlay: 'linear-gradient(90deg, rgba(5, 5, 5, 0.94), rgba(5, 5, 5, 0.72) 55%, rgba(5, 5, 5, 0.34))',
          blur: 1,
        })}
        aria-labelledby="home-mechanism-heading"
        data-content-stage={homeMechanismBlock.stage}
        data-content-block={homeMechanismBlock.id}
      >
        <div className="section-shell home-scene-content">
          <span className="home-vertical-word" aria-hidden="true">MÉTODO</span>
          <div className="mechanism-body">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mechanism-header">
              <SectionLabel>02 / EL MÉTODO</SectionLabel>
              <motion.h2 id="home-mechanism-heading" variants={fadeUp}>{homeMechanismBlock.heading}</motion.h2>
              <motion.p variants={fadeUp} className="mechanism-intro">
                {homeMechanismBlock.body}
              </motion.p>
            </motion.div>

            <motion.ol
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="mechanism-steps"
            >
              {homeMechanismBlock.items.map((step) => (
                <motion.li key={step.id} variants={fadeUp} className="mechanism-step">
                  <span className="mechanism-marker" aria-hidden="true">{step.marker}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
            <motion.aside
              variants={fadeUp}
              className="medical-boundary"
              aria-label="Límite profesional"
            >
              <strong>MARCO DE TRABAJO</strong>
              <p>{homeMechanismBlock.boundary}</p>
            </motion.aside>
          </div>
        </div>
      </section>

      <VideoSection
        title="EL MÉTODO BAYONA EN 2 MIN"
        subtitle="Sebastián resume cómo se valoran el punto de partida, el plan de entrenamiento y la frecuencia de seguimiento."
        poster={siteMedia.home.pillars[0].src}
        duration="2 MIN"
        placement="standalone"
      />

      <section
        {...sceneBackgroundProps(siteMedia.home.pillars[1], {
          className: 'solution-section home-scene home-scene--benefits',
          variant: 'hero',
          pseudo: 'after',
          position: 'center 44%',
          overlay: 'linear-gradient(180deg, rgba(5, 5, 5, 0.52), rgba(5, 5, 5, 0.9) 78%)',
          blur: 1,
        })}
        aria-labelledby="home-benefits-heading"
        data-content-stage={homeProcessBenefitsBlock.stage}
        data-content-block={homeProcessBenefitsBlock.id}
      >
        <div className="solution-bg-number" aria-hidden="true">03</div>
        <div className="section-shell home-scene-content">
          <span className="home-vertical-word" aria-hidden="true">CAMBIO</span>
          <div className="solution-body">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
              <SectionLabel>03 / LO QUE CAMBIA</SectionLabel>
              <motion.h2 id="home-benefits-heading" variants={fadeUp}>{homeProcessBenefitsBlock.heading}</motion.h2>
              <motion.p variants={fadeUp} className="pillar-intro">
                {homeProcessBenefitsBlock.body}
              </motion.p>
            </motion.div>
            <motion.ol
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="pillars-stack"
              aria-label="Lo que cambia con el método BAYONA"
            >
              {homeProcessBenefitsBlock.items.map((benefit, index) => {
                const PillarIcon = PILLAR_ICONS[index]

                return (
                  <motion.li
                    key={benefit.id}
                    variants={fadeUp}
                    className="pillar-item"
                    data-marker-column="inline-start"
                  >
                    <span className="pillar-number" aria-hidden="true">{benefit.marker}</span>
                    <div className="pillar-content">
                      <PillarIcon className="pillar-icon" aria-hidden="true" />
                      <div className="pillar-copy">
                        <h3>{benefit.title}</h3>
                        <p>{benefit.body}</p>
                      </div>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ol>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="solution-bridge-cta"
            >
              <a className="hero-transform-cta" href="#home-offer-heading">
                VER MI ACOMPAÑAMIENTO <ArrowDown size={16} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <HomeProofSection />

      {/*
        Personas reales, justo antes de los precios.
        Va en su propia sección y NO dentro de HomeProofSection a propósito: esa
        sección es la puerta de evidencia y su contrato es publicar únicamente
        evidencia verificada (o el proceso, si no hay). Estas son experiencias
        publicadas con autorización, que es otro tipo de claim, así que no deben
        mezclarse ahí dentro. Cierra el momento de prueba sin número propio.
      */}
      <ExperienceProof />

      <section
        className="offer-section home-memberships-section"
        aria-labelledby="home-offer-heading"
        data-content-stage={homeOfferBlock.stage}
        data-content-block={homeOfferBlock.id}
      >
        <div className="offer-bg-number" aria-hidden="true">05</div>
        <div className="section-shell home-offer-shell">
          <div className="home-section-heading-grid home-offer-heading-layout">
            <span className="home-vertical-word" aria-hidden="true">MEMBRESÍAS</span>
            <div>
              <SectionLabel>05 / ELIGE EL ACOMPAÑAMIENTO</SectionLabel>
              <h2 id="home-offer-heading">{homeOfferBlock.heading}</h2>
              <p className="offer-intro">{homeOfferBlock.body}</p>
              <p className="home-offer-clarifier">
                Aquí eliges la membresía mensual: sesiones, seguimiento y nivel de contacto. Los servicios opcionales aparecen después y nunca sustituyen la base.
              </p>
            </div>
          </div>
          <HomePlanExplorer />
        </div>
      </section>

      <section className="calculator-section home-services-configurator">
        <div className="section-shell">
          <SectionLabel>06 / PERSONALIZA SIN CONFUNDIR</SectionLabel>
          <h2>TU MEMBRESÍA ES LA BASE.<br /><span>LOS SERVICIOS SON OPCIONALES.</span></h2>
          <p className="calculator-intro">
            Primero confirma el nivel de acompañamiento mensual. Después añade una clase o servicio únicamente si responde a una necesidad concreta. El resumen separa cada concepto antes de continuar.
          </p>
          <ol className="home-configurator-guide" aria-label="Cómo configurar tu experiencia BAYONA">
            <li><span>01</span><strong>MEMBRESÍA BASE</strong><p>Sesiones, seguimiento y contacto mensual.</p></li>
            <li><span>02</span><strong>EXTRAS OPCIONALES</strong><p>Clases y servicios que puedes sumar o dejar en cero.</p></li>
            <li><span>03</span><strong>REVISIÓN FINAL</strong><p>Total y detalle visibles antes de abrir WhatsApp.</p></li>
          </ol>
          <HomeExperienceConfigurator />
        </div>
      </section>

      <section
        {...sceneBackgroundProps(siteMedia.about.story, {
          className: 'cta-stack-section home-about-bridge',
          variant: 'hero',
          pseudo: 'after',
          position: 'center 38%',
          overlay: 'linear-gradient(90deg, rgba(5, 5, 5, 0.94), rgba(5, 5, 5, 0.64) 62%, rgba(5, 5, 5, 0.34))',
          blur: 1,
        })}
        aria-labelledby="home-about-bridge-title"
        data-content-stage={homeActionBlock.stage}
        data-content-block={homeActionBlock.id}
      >
        <div className="section-shell">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <SectionLabel>07 / CONTINÚA LA HISTORIA</SectionLabel>
            <motion.h2 id="home-about-bridge-title" variants={fadeUp}>
              {homeActionBlock.heading.split(', ')[0]}, <br />
              <span>{homeActionBlock.heading.split(', ').slice(1).join(', ')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="offer-intro">
              {homeActionBlock.body}
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="cta-stack">
            <motion.div variants={fadeUp}>
              <Link to="/about" className="cta-primary">CONOCER LA HISTORIA <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/programs" className="cta-secondary">COMPARAR PROGRAMAS <Zap size={18} aria-hidden="true" /></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="home-disclaimer" style={{ padding: '1.5rem 0', opacity: 0.62 }}>
        <div className="section-shell">
          <small className="home-disclaimer-note">
            BAYONA ofrece acompañamiento de entrenamiento en un marco no médico. Los resultados dependen de tu contexto y constancia.
          </small>
        </div>
      </footer>
    </>
  )
}
