import { motion } from 'framer-motion'
import { ArrowUpRight, Award, BrainCircuit, GraduationCap, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import GlobeTestimonials from '../components/GlobeTestimonials.jsx'
import { StickyStage } from '../engine/scroll/StickyStage.jsx'
import Bridge from '../components/Bridge'
import { sceneBackgroundProps } from '../components/SceneBackground.jsx'
import { PageHero, SectionLabel } from '../components/Layout'
import { siteMedia } from '../config/siteMedia.js'
import { whatsAppLink } from '../config/site.config.js'
import { useCapabilities } from '../engine/hooks/useCapabilities.js'
import '../styles/about.css'

const stages = [
  {
    number: '01',
    year: '2003',
    title: 'EL MOVIMIENTO',
    copy: 'Desde niño, el movimiento fue mi forma de explorar y aprender. Ese interés por entender el cuerpo apareció mucho antes de convertirlo en profesión.',
  },
  {
    number: '02',
    year: '2014',
    title: 'LA PRÁCTICA DEL PARKOUR',
    copy: 'El parkour me enseñó a observar, adaptar y repetir con criterio. Su cultura de práctica y respeto sigue presente en la forma de entrenar de BAYONA.',
  },
  {
    number: '03',
    year: '2019-2025',
    title: 'EXPERIENCIA Y FORMACIÓN',
    copy: 'Trabajé en gimnasios y clubes y completé formación europea en preparación física. La experiencia práctica y el estudio dieron estructura al método.',
  },
  {
    number: '04',
    year: '2026',
    title: 'NACE BAYONA',
    copy: 'BAYONA reúne entrenamiento, fuerza, nutrición y seguimiento en una propuesta clara: valorar el punto de partida, planificar y ajustar el proceso.',
  },
]

const values = [
  [BrainCircuit, 'CRITERIO', 'Cada decisión de entrenamiento se explica y se ajusta al contexto de la persona.'],
  [ShieldCheck, 'RESPETO', 'Escuchamos tu historia, tus límites y tus objetivos antes de planificar.'],
  [GraduationCap, 'EDUCACIÓN', 'Te explicamos qué haces, para qué sirve y cómo ejecutarlo con seguridad.'],
  [Award, 'RIGOR', 'Revisamos el plan y lo ajustamos con información del proceso, no con promesas.'],
]

const methodSteps = [
  {
    number: '01',
    title: 'VALORAR',
    copy: 'Leemos tu punto de partida, experiencia, disponibilidad y objetivo antes de proponer una dirección.',
  },
  {
    number: '02',
    title: 'PLANIFICAR',
    copy: 'Convertimos esa información en una ruta comprensible, progresiva y compatible con tu vida real.',
  },
  {
    number: '03',
    title: 'AJUSTAR',
    copy: 'Revisamos lo que ocurre durante el proceso y modificamos la planificación cuando el contexto lo exige.',
  },
]

const sebastianWhatsAppUrl = whatsAppLink('Hola Sebastián, quiero conocer mi camino con BAYONA.')

export default function About() {
  const { reducedMotion } = useCapabilities()

  return (
    <div className="about-page">
      <PageHero
        title={(
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900 }}>
            MOVIMIENTO. FORMACIÓN.<br />MÉTODO.
          </span>
        )}
        kicker="BAYONA • SOBRE EL MÉTODO"
        media={siteMedia.about.hero}
      >
        <p className="hero-subtitle">Entrenamiento, fuerza y nutrición organizados alrededor de tu punto de partida.</p>
      </PageHero>

      <section className="about-problem-section" aria-labelledby="about-purpose-title">
        <div className="about-problem section-shell">
          <span className="about-vertical-word" aria-hidden="true">PROPÓSITO</span>
          <div className="about-problem-heading">
            <SectionLabel>01 / POR QUÉ BAYONA</SectionLabel>
            <h2 id="about-purpose-title">UN PLAN SIRVE<br /><span>CUANDO ENCAJA CONTIGO.</span></h2>
          </div>
          <p className="about-problem-copy">
            Vi a muchas personas entrenar sin una estructura compatible con su tiempo, su nivel y su objetivo. El problema casi nunca era la motivación: faltaba valoración, explicación y seguimiento. BAYONA existe para ordenar ese proceso.
          </p>
        </div>
        <div className="about-reason-strip" aria-label="Los tres fundamentos de BAYONA">
          <span><b>01</b> VALORAR ANTES DE PRESCRIBIR</span>
          <span><b>02</b> EXPLICAR ANTES DE EXIGIR</span>
          <span><b>03</b> REVISAR ANTES DE AJUSTAR</span>
        </div>
      </section>

      <section
        {...sceneBackgroundProps(siteMedia.about.story, {
          className: 'about-story about-story-scene',
          variant: 'hero',
          pseudo: 'after',
          position: 'center 34%',
          blur: 1,
        })}
        aria-labelledby="about-story-title"
      >
        <div className="about-story-heading section-shell">
          <span className="about-vertical-word about-vertical-word--light" aria-hidden="true">RECORRIDO</span>
          <div>
            <SectionLabel>02 / EL RECORRIDO</SectionLabel>
            <h2 id="about-story-title">DEL PARKOUR A<br /><span>UN MÉTODO DE TRABAJO</span></h2>
            <p className="about-problem-copy">
              Práctica, experiencia profesional y formación aplicada al entrenamiento. No es una sucesión de credenciales: es la historia de cómo observar, planificar y ajustar se convirtió en un sistema.
            </p>
          </div>
        </div>
        {/*
          FASE 8 · BLOQUE G — "LA LÍNEA DE VIDA" (sección RECORRIDO de About).
          Identidad PROPIA, tercera y distinta: la Home recorre una secuencia
          lógica en horizontal; parkour sube una escalera; About ES EL TIEMPO —
          una biografía. El marco queda fijado y cada etapa reemplaza a la
          anterior en el mismo plano, con el año como sello gigante que
          permanece unos instantes y cede su sitio al siguiente. La historia
          de una vida se lee con el scroll, no como lista de credenciales
          (el copy ya lo prometía: "no es una sucesión de credenciales").
          Motor: StickyStage del engine (2D puro). Reduced-motion/móvil: pila
          estática legible por diseño del componente.
        */}
        <StickyStage
          length="400vh"
          states={stages.length}
          className="about-timeline about-timeline--stage section-shell"
        >
          {({ index, isStatic }) => (
            <div className="about-timeline-stage" aria-live="polite">
              {stages
                .filter((stage, stageIndex) => (isStatic ? stageIndex === index : true))
                .map((stage, stageIndex) => {
                const isActive = stageIndex === index
                return (
                  <article
                    key={stage.number}
                    className={[
                      'about-timeline-entry',
                      'about-timeline-entry--stage',
                      isActive ? 'about-timeline-entry--active' : '',
                    ].filter(Boolean).join(' ')}
                    data-year={stage.year}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <div className="about-timeline-meta">
                      <span>{stage.number}</span>
                      <time>{stage.year}</time>
                    </div>
                    <div className="about-timeline-copy">
                      <h3>{stage.title}</h3>
                      <p>{stage.copy}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </StickyStage>
      </section>

      <section className="about-values-section" aria-labelledby="about-values-title">
        <div className="about-values section-shell">
          <div className="about-promise-header">
            <span className="about-vertical-word about-vertical-word--dark" aria-hidden="true">PROMESA</span>
            <div>
              <SectionLabel>03 / LO QUE TE PROMETO</SectionLabel>
              <h2 id="about-values-title">CUATRO PRINCIPIOS.<br /><span>UNA FORMA DE RESPONDER.</span></h2>
              <p>
                No son palabras decorativas. Son el criterio con el que se decide antes, durante y después de cada sesión.
              </p>
            </div>
          </div>
          <div className="about-values-list">
            {values.map(([Icon, title, text], index) => (
              <motion.article
                key={title}
                className="about-value"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: reducedMotion ? 0 : 0.48, delay: reducedMotion ? 0 : index * 0.05 }}
              >
                <span className="about-value-number">0{index + 1}</span>
                <Icon aria-hidden="true" size={24} />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="about-globe-section about-globe-testimonials-section section-shell"
        aria-labelledby="about-globe-title"
      >
        <div className="about-globe-copy about-globe-testimonials-heading">
          <SectionLabel>04 / EXPERIENCIAS</SectionLabel>
          <h2 id="about-globe-title">HISTORIAS<br /><span>EN MOVIMIENTO</span></h2>
          <p>Este espacio reúne experiencias publicadas con autorización. No usamos una cifra total como prueba ni presentamos resultados individuales como garantía.</p>
        </div>
        <GlobeTestimonials />
      </section>

      <Bridge
        className="about-community-bridge"
        media={siteMedia.about.values[1]}
        eyebrow="COMUNIDAD ABIERTA"
        title="ENTRENA. PREGUNTA."
        titleAccent="COMPARTE."
        hook="La comunidad es gratuita. El acompañamiento individual, la frecuencia de revisión y el contacto directo dependen del plan contratado."
        free
        ctaLabel="CONOCER LA COMUNIDAD"
        ctaHref="/community"
      />

      <section
        {...sceneBackgroundProps(siteMedia.about.values[3], {
          className: 'about-method about-method-scene',
          variant: 'hero',
          pseudo: 'after',
          position: 'center 36%',
          blur: 1,
        })}
        aria-labelledby="about-method-title"
      >
        <div className="about-method-inner section-shell">
          <span className="about-vertical-word about-vertical-word--light" aria-hidden="true">PROCESO</span>
          <div className="about-method-heading">
            <SectionLabel>05 / EL MÉTODO</SectionLabel>
            <h2 id="about-method-title">NO ES UNA RUTINA.<br /><span>ES UNA DECISIÓN TRAS OTRA.</span></h2>
            <p>Una estructura clara para saber qué observamos, qué hacemos con esa información y cómo evitamos entrenar por inercia.</p>
          </div>

          <ol className="about-method-grid" aria-label="Las tres fases del método BAYONA">
            {methodSteps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>

          <blockquote>
            ENTRENAR, REGISTRAR Y AJUSTAR. SIN PROMESAS VACÍAS.
          </blockquote>

          <div className="about-cta-actions">
            <Link to="/programs" className="cta-primary">
              VER PLANES
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={sebastianWhatsAppUrl}
              className="cta-secondary"
              target="_blank"
              rel="noreferrer"
            >
              HABLAR CON SEBASTIÁN
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer className="about-disclaimer">
        <div className="section-shell">
          <small>
            BAYONA ofrece acompañamiento de entrenamiento dentro de un marco no médico. No diagnostica, trata ni sustituye atención sanitaria.
          </small>
        </div>
      </footer>
    </div>
  )
}
