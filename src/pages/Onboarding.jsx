import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PaseBayona from '../components/onboarding/PaseBayona.jsx'
import { sceneBackgroundProps } from '../components/SceneBackground.jsx'
import { buildWhatsAppUrl } from '../config/offerings.js'
import { siteMedia } from '../config/siteMedia.js'
import {
  createOnboardingMessage,
  validateOnboarding,
} from '../lib/forms/privacy.js'
import {
  hasCompleteAnswers,
  mapAnswersToRoute,
} from '../lib/onboarding/routeMap.js'
import { useVisitorJourney } from '../lib/onboarding/VisitorJourneyProvider.jsx'
import '../styles/onboarding.css'

const INITIAL_ANSWERS = Object.freeze({
  goal: '',
  experience: '',
  availability: '',
})

/**
 * Las tres preguntas de recepción.
 *
 * Se redujo el texto a propósito. Antes cada pantalla pedía leer: antetítulo,
 * titular, un párrafo de tranquilización y cuatro opciones con una frase
 * completa cada una. El párrafo repetía lo que las propias opciones ya dicen, y
 * sumaba carga en lugar de quitarla.
 *
 * Los `detail` pasan de frase a fragmento: se leen de un vistazo, no se leen.
 */
const QUESTIONS = Object.freeze([
  Object.freeze({
    key: 'goal',
    eyebrow: 'OBJETIVO',
    title: '¿QUÉ QUIERES CONSTRUIR?',
    options: Object.freeze([
      Object.freeze({ value: 'constancia', label: 'Constancia', detail: 'Un ritmo sostenible' }),
      Object.freeze({ value: 'fuerza-general', label: 'Fuerza general', detail: 'Más capaz cada día' }),
      Object.freeze({ value: 'movilidad-general', label: 'Movilidad', detail: 'Moverme sin límites' }),
      Object.freeze({ value: 'comparar-planes', label: 'Comparar planes', detail: 'Solo estoy mirando' }),
    ]),
  }),
  Object.freeze({
    key: 'experience',
    eyebrow: 'PUNTO DE PARTIDA',
    title: '¿DÓNDE ESTÁS HOY?',
    options: Object.freeze([
      Object.freeze({ value: 'inicio', label: 'Empezando', detail: 'Desde cero' }),
      Object.freeze({ value: 'retomo', label: 'Retomando', detail: 'Vuelvo después de un tiempo' }),
      Object.freeze({ value: 'constante', label: 'Ya entreno', detail: 'Quiero más estructura' }),
    ]),
  }),
  Object.freeze({
    key: 'availability',
    eyebrow: 'TU SEMANA',
    title: '¿CUÁNTO TIEMPO TIENES?',
    options: Object.freeze([
      Object.freeze({ value: 'uno-dos', label: '1–2 días', detail: 'Poco, bien usado' }),
      Object.freeze({ value: 'tres', label: '3 días', detail: 'Ritmo sólido' }),
      Object.freeze({ value: 'cuatro-mas', label: '4 o más', detail: 'Voy en serio' }),
    ]),
  }),
])

const INTRO_WORDS = Object.freeze(['BIENVENIDO', 'A', 'BAYONA.'])
const FUNNEL_EASE = [0.16, 1, 0.3, 1]

function createTemporaryCode() {
  const fragment = Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, '0')
  return `BYN-V-${fragment}`
}

function answerLabel(key, value) {
  return QUESTIONS
    .find((question) => question.key === key)
    ?.options.find((option) => option.value === value)
    ?.label ?? 'Por definir'
}

function QuestionScreen({
  answers,
  code,
  headingRef,
  index,
  onAnswer,
  onBack,
  route,
}) {
  const question = QUESTIONS[index]
  const selectedValue = answers[question.key]

  return (
    <section className="funnel-stage funnel-question" aria-labelledby="funnel-question-title">
      <div className="funnel-shell funnel-question__shell">
        <header className="funnel-question__topbar">
          <button type="button" onClick={onBack} className="funnel-back">
            <ArrowLeft size={16} strokeWidth={1.25} aria-hidden="true" />
            ATRÁS
          </button>
          <div
            className="funnel-progress"
            role="progressbar"
            aria-label={`Pregunta ${index + 1} de ${QUESTIONS.length}`}
            aria-valuemin="1"
            aria-valuemax={QUESTIONS.length}
            aria-valuenow={index + 1}
          >
            <span>{index + 1} / {QUESTIONS.length}</span>
            <div aria-hidden="true">
              <i style={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }} />
            </div>
          </div>
          <span className="funnel-question__time">MENOS DE 60 SEGUNDOS</span>
        </header>

        <div className="funnel-question__layout">
          <div className="funnel-question__content">
            {/*
              Cifra grande de fondo: da peso visual y orienta sin gastar texto.
              Sustituye al "· DECISIÓN N" del antetítulo, que hacía sentir que
              cada toque comprometía a algo.
            */}
            <span className="funnel-question__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="funnel-eyebrow">{question.eyebrow}</p>
            <h1 id="funnel-question-title" ref={headingRef} tabIndex="-1">
              {question.title}
            </h1>

            <div
              className="funnel-options"
              role="radiogroup"
              aria-label={question.title}
            >
              {question.options.map((option, optionIndex) => {
                const selected = selectedValue === option.value

                return (
                  <button
                    className={selected ? 'is-selected' : ''}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    key={option.value}
                    onClick={() => onAnswer(question.key, option.value)}
                  >
                    <span className="funnel-option__number" aria-hidden="true">
                      {String(optionIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="funnel-option__copy">
                      <strong>{option.label}</strong>
                      <small>{option.detail}</small>
                    </span>
                    <ArrowRight size={18} strokeWidth={1.25} aria-hidden="true" />
                  </button>
                )
              })}
            </div>
          </div>

          <aside className="funnel-pass-column" aria-label="Tu Pase BAYONA en construcción">
            <PaseBayona
              answers={answers}
              route={route}
              code={code}
              visitType="personalized"
              compact
            />
          </aside>
        </div>
      </div>
    </section>
  )
}

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState(INITIAL_ANSWERS)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({})
  const [preparedUrl, setPreparedUrl] = useState('')
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const headingRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const passCode = useMemo(createTemporaryCode, [])
  const route = useMemo(() => mapAnswersToRoute(answers), [answers])
  const completeAnswers = hasCompleteAnswers(answers)
  const errorMessages = Object.values(errors)
  const { completeJourney } = useVisitorJourney()

  /**
   * En el paso 4 la persona ya tiene su ruta delante. Desde aquí el resto de la
   * web la recuerda durante la visita: Programas marca su plan, Recursos pone
   * su recurso primero y el configurador arranca en su nivel.
   *
   * Solo en memoria. El onboarding promete que no se guarda nada, y esa promesa
   * se respeta: al recargar o cerrar, desaparece.
   */
  useEffect(() => {
    if (step < 4 || !route) return
    completeJourney({ answers, route, visitType: 'personalized' })
  }, [step, route, answers, completeJourney])

  useLayoutEffect(() => {
    document.body.classList.add('onboarding-route')

    return () => {
      document.body.classList.remove('onboarding-route', 'onboarding-immersive')
    }
  }, [])

  useLayoutEffect(() => {
    document.body.classList.toggle('onboarding-immersive', step < 5)
  }, [step])

  useEffect(() => {
    if (step === 0) return undefined

    const frame = window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [step])

  const sceneMotion = reducedMotion
    ? {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.16 },
    }
    : {
      initial: { opacity: 0, x: direction * 42 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: direction * -32 },
      transition: { duration: 0.56, ease: FUNNEL_EASE },
    }

  function goToStep(nextStep) {
    setDirection(nextStep >= step ? 1 : -1)
    setErrors({})
    setPreparedUrl('')
    setStep(nextStep)
  }

  function startFunnel() {
    setAnswers(INITIAL_ANSWERS)
    setConsent(false)
    setShowWhatsApp(false)
    goToStep(1)
  }

  function answerQuestion(key, value) {
    setAnswers((current) => ({ ...current, [key]: value }))
    setDirection(1)
    setErrors({})
    setPreparedUrl('')
    setStep((current) => Math.min(current + 1, 4))
  }

  function goBackFromQuestion() {
    goToStep(Math.max(step - 1, 0))
  }

  function toggleWhatsApp() {
    setShowWhatsApp((current) => !current)
    setErrors({})
    setPreparedUrl('')
  }

  function updateConsent(event) {
    setConsent(event.target.checked)
    setErrors({})
    setPreparedUrl('')
  }

  function prepareWhatsApp(event) {
    event.preventDefault()
    const values = { ...answers, consent }
    const validation = validateOnboarding(values)

    if (!completeAnswers || !validation.valid) {
      setErrors({
        ...validation.errors,
        ...(!completeAnswers ? { answers: 'Completa las tres decisiones antes de preparar el mensaje.' } : {}),
      })
      setPreparedUrl('')
      return
    }

    setErrors({})
    setPreparedUrl(buildWhatsAppUrl(createOnboardingMessage(values)))
  }

  return (
    <div className="onboarding-page" data-step={step}>
      <AnimatePresence mode="wait" initial={false}>
        {step === 0 && (
          <motion.section
            {...sceneBackgroundProps(siteMedia.onboarding.threshold, {
              className: 'funnel-stage funnel-threshold',
              variant: 'hero',
              pseudo: 'after',
            })}
            aria-labelledby="funnel-threshold-title"
            key="threshold"
            {...sceneMotion}
          >
            <div className="funnel-threshold__architecture" aria-hidden="true">
              <motion.div
                className="funnel-door funnel-door--left"
                initial={reducedMotion ? false : { x: 0, rotateY: 0, opacity: 1 }}
                animate={reducedMotion
                  ? { opacity: 0 }
                  : { x: '-102%', rotateY: -8, opacity: 0.96 }}
                transition={{
                  duration: reducedMotion ? 0 : 1.18,
                  delay: reducedMotion ? 0 : 0.08,
                  ease: FUNNEL_EASE,
                }}
              />
              <motion.div
                className="funnel-door funnel-door--right"
                initial={reducedMotion ? false : { x: 0, rotateY: 0, opacity: 1 }}
                animate={reducedMotion
                  ? { opacity: 0 }
                  : { x: '102%', rotateY: 8, opacity: 0.96 }}
                transition={{
                  duration: reducedMotion ? 0 : 1.18,
                  delay: reducedMotion ? 0 : 0.08,
                  ease: FUNNEL_EASE,
                }}
              />
              <motion.div
                className="funnel-threshold__glow"
                initial={reducedMotion ? false : { opacity: 0.2, scaleY: 0.72 }}
                animate={{ opacity: reducedMotion ? 0.45 : 1, scaleY: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.72, delay: reducedMotion ? 0 : 0.24 }}
              />
            </div>

            <button className="funnel-skip" type="button" onClick={startFunnel}>
              SALTAR INTRO
            </button>

            <div className="funnel-threshold__content">
              <p className="funnel-eyebrow">EL UMBRAL · TU PUNTO DE PARTIDA</p>
              <h1 id="funnel-threshold-title" aria-label="BIENVENIDO A BAYONA.">
                {INTRO_WORDS.map((word, index) => (
                  <motion.span
                    aria-hidden="true"
                    key={word}
                    initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.52,
                      delay: reducedMotion ? 0 : 0.24 + (index * 0.1),
                      ease: FUNNEL_EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              {/*
                Se quitó "Sin cuenta, sin datos guardados" de aquí: ya lo dice
                el sello de abajo. Decirlo dos veces en la misma pantalla añadía
                lectura sin añadir confianza.
              */}
              <p className="funnel-threshold__lead">
                Tres preguntas y te digo por dónde empezar.
              </p>
              <p className="funnel-threshold__sebastian">
                “Hola, soy Sebastián. Vamos a encontrar tu camino.”
              </p>

              <div className="funnel-threshold__actions">
                <button className="funnel-button funnel-button--primary" type="button" onClick={startFunnel}>
                  EMPEZAR · 60 SEGUNDOS
                  <ArrowRight size={18} strokeWidth={1.25} aria-hidden="true" />
                </button>
                <Link className="funnel-button funnel-button--ghost" to="/programs">
                  SOLO QUIERO MIRAR
                  <ArrowUpRight size={17} strokeWidth={1.25} aria-hidden="true" />
                </Link>
              </div>
              <small className="funnel-threshold__privacy">
                SIN CUENTA · SIN COOKIES · SIN DATOS GUARDADOS
              </small>
            </div>
          </motion.section>
        )}

        {step >= 1 && step <= 3 && (
          <motion.div key={`question-${step}`} {...sceneMotion}>
            <QuestionScreen
              answers={answers}
              code={passCode}
              headingRef={headingRef}
              index={step - 1}
              onAnswer={answerQuestion}
              onBack={goBackFromQuestion}
              route={route}
            />
          </motion.div>
        )}

        {step === 4 && (
          <motion.section
            className="funnel-stage funnel-route"
            aria-labelledby="funnel-route-title"
            key="route"
            {...sceneMotion}
          >
            <div className="funnel-shell">
              <header className="funnel-route__topbar">
                <button className="funnel-back" type="button" onClick={() => goToStep(3)}>
                  <ArrowLeft size={16} strokeWidth={1.25} aria-hidden="true" />
                  AJUSTAR RESPUESTAS
                </button>
                <span>04 · TU CAMINO</span>
              </header>

              <div className="funnel-route__layout">
                <div className="funnel-route__content">
                  <p className="funnel-eyebrow">TRES DECISIONES · UNA DIRECCIÓN CLARA</p>
                  <h1 id="funnel-route-title" ref={headingRef} tabIndex="-1">
                    TU PUNTO DE PARTIDA<br /><span>ESTÁ AQUÍ.</span>
                  </h1>
                  <p className="funnel-route__lead">
                    No es un diagnóstico. Es la ruta más coherente con lo que elegiste hoy.
                  </p>

                  <section className="funnel-recommendation" aria-label="Tu recomendación BAYONA">
                    <div className="funnel-recommendation__hero">
                      <span>PLAN SUGERIDO</span>
                      <strong>{route?.plan ?? 'RUTA EN CONSTRUCCIÓN'}</strong>
                      <p>{route?.note}</p>
                    </div>
                    <dl>
                      <div>
                        <dt>RECURSO GRATIS</dt>
                        <dd>{route?.resource}</dd>
                        <small>{route?.resourceNote}</small>
                      </div>
                      <div>
                        <dt>COMUNIDAD</dt>
                        <dd>{route?.community} · GRATIS</dd>
                        <small>{route?.communityNote}</small>
                      </div>
                    </dl>
                  </section>

                  <div className="funnel-health-note" role="note">
                    <ShieldCheck size={20} strokeWidth={1.25} aria-hidden="true" />
                    <p>
                      <strong>ORIENTACIÓN, NO ATENCIÓN SANITARIA.</strong>
                      Esta ruta usa reglas generales. No evalúa tu salud, no prescribe ejercicio y no sustituye una valoración profesional.
                    </p>
                  </div>

                  <p className="funnel-route__vision">
                    Imagina 90 días con una dirección clara: menos energía decidiendo y más energía avanzando.
                  </p>

                  <button className="funnel-button funnel-button--primary" type="button" onClick={() => goToStep(5)}>
                    VER MI SIGUIENTE PASO
                    <ArrowRight size={18} strokeWidth={1.25} aria-hidden="true" />
                  </button>
                </div>

                <aside className="funnel-pass-column" aria-label="Tu Pase BAYONA completo">
                  <PaseBayona
                    answers={answers}
                    route={route}
                    code={passCode}
                    visitType="personalized"
                    compact
                  />
                </aside>
              </div>
            </div>
          </motion.section>
        )}

        {step === 5 && (
          <motion.section
            className="funnel-final"
            aria-labelledby="funnel-final-title"
            key="final"
            {...sceneMotion}
          >
            <div className="funnel-final__shell">
              <p className="funnel-eyebrow">05 · EL SIGUIENTE PASO</p>
              <h1 id="funnel-final-title" ref={headingRef} tabIndex="-1">
                ¿EMPEZAMOS?
              </h1>
              <p className="funnel-final__lead">
                Ya no estás eligiendo a ciegas. Tu primera ruta es <strong>{route?.plan}</strong>. Ahora solo necesitas dar un paso.
              </p>

              {/*
                Fase 4 (D9): la recepción ya calculó una ruta (routeMap). El
                paso principal lleva a esa ficha de plan concreta en vez de
                devolver a la persona al catálogo general; comparar todos los
                planes queda como opción explícita, no como destino único.
                Fail-closed: sin ruta resuelta, vuelve a /programs.
              */}
              <div className="funnel-final__primary">
                <Link className="funnel-button funnel-button--primary" to={route?.planHref ?? '/programs'}>
                  EMPIEZA TU CAMINO
                  <ArrowUpRight size={18} strokeWidth={1.25} aria-hidden="true" />
                </Link>
                <small>TU PRIMERA RUTA · DECIDE SIN PRISA</small>
              </div>

              <div className="funnel-final__secondary" aria-label="Otras formas de continuar">
                <button
                  className="funnel-button funnel-button--ghost"
                  type="button"
                  onClick={toggleWhatsApp}
                  aria-expanded={showWhatsApp}
                  aria-controls="funnel-whatsapp-panel"
                >
                  HABLAR POR WHATSAPP
                  <MessageCircle size={17} strokeWidth={1.25} aria-hidden="true" />
                </button>
                <Link className="funnel-button funnel-button--ghost" to="/programs">
                  COMPARAR TODOS LOS PLANES
                  <ArrowUpRight size={17} strokeWidth={1.25} aria-hidden="true" />
                </Link>
                <Link className="funnel-button funnel-button--ghost" to="/resources">
                  EXPLORAR RECURSOS GRATIS
                  <ArrowUpRight size={17} strokeWidth={1.25} aria-hidden="true" />
                </Link>
              </div>

              <AnimatePresence initial={false}>
                {showWhatsApp && (
                  <motion.section
                    id="funnel-whatsapp-panel"
                    className="funnel-whatsapp"
                    aria-labelledby="funnel-whatsapp-title"
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -12 }}
                    animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto', y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: reducedMotion ? 0.16 : 0.48, ease: FUNNEL_EASE }}
                  >
                    <div className="funnel-whatsapp__heading">
                      <div>
                        <p className="funnel-eyebrow">CANAL HUMANO · TÚ CONTROLAS EL ENVÍO</p>
                        <h2 id="funnel-whatsapp-title">PREPARA. REVISA. DECIDE.</h2>
                      </div>
                      <MessageCircle size={24} strokeWidth={1.1} aria-hidden="true" />
                    </div>

                    <dl className="funnel-whatsapp__review" aria-label="Selecciones que se incluirán">
                      {QUESTIONS.map((question) => (
                        <div key={question.key}>
                          <dt>{question.eyebrow}</dt>
                          <dd>{answerLabel(question.key, answers[question.key])}</dd>
                        </div>
                      ))}
                    </dl>

                    <form onSubmit={prepareWhatsApp} noValidate>
                      <label className="funnel-consent" htmlFor="funnel-consent">
                        <input
                          id="funnel-consent"
                          type="checkbox"
                          checked={consent}
                          onChange={updateConsent}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby="funnel-consent-help"
                        />
                        <span>
                          Consiento preparar mis tres selecciones para compartirlas por WhatsApp. Entiendo que nada se envía automáticamente, que revisaré el mensaje y que yo decido si lo abro y lo envío.
                        </span>
                      </label>
                      <small id="funnel-consent-help">
                        Pase anónimo y temporal. Sin servidor, cookies o almacenamiento local. No compartas archivos ni datos de salud.
                      </small>

                      {errorMessages.length > 0 && (
                        <div className="funnel-errors" role="alert" aria-live="assertive">
                          <strong>REVISA ESTE PASO</strong>
                          <ul>
                            {errorMessages.map((message) => <li key={message}>{message}</li>)}
                          </ul>
                        </div>
                      )}

                      <button className="funnel-prepare" type="submit">
                        PREPARAR
                        <ArrowRight size={17} strokeWidth={1.25} aria-hidden="true" />
                      </button>
                      <p className="funnel-prepare__note">Preparar no envía datos.</p>

                      {preparedUrl && (
                        <div className="funnel-prepared" role="status" aria-live="polite">
                          <CheckCircle2 size={22} strokeWidth={1.25} aria-hidden="true" />
                          <div>
                            <strong>MENSAJE PREPARADO</strong>
                            <p>Revísalo en WhatsApp. Solo se enviará si tú pulsas enviar.</p>
                            <a href={preparedUrl} target="_blank" rel="noopener noreferrer">
                              REVISAR Y ABRIR WHATSAPP
                              <ArrowUpRight size={16} strokeWidth={1.25} aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      )}
                    </form>
                  </motion.section>
                )}
              </AnimatePresence>

              <div className="funnel-final__boundary" role="note">
                <ShieldCheck size={19} strokeWidth={1.25} aria-hidden="true" />
                <p>Orientación, no atención sanitaria. Este recorrido no pide ni guarda archivos médicos.</p>
              </div>

              <blockquote>
                “EL CAMBIO NO EMPIEZA CON UN PLAN PERFECTO. EMPIEZA CON UNA DECISIÓN.”
                <cite>— SEBASTIÁN</cite>
              </blockquote>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
