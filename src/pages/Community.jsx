import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  HeartHandshake,
  Instagram,
  MessageCircle,
  Share2,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Users,
  Youtube,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import VideoSection from '../components/VideoSection.jsx'
import { sceneBackgroundProps } from '../components/SceneBackground.jsx'
import Glyph from '../components/social/Glyph'
import { siteMedia } from '../config/siteMedia.js'
import { overrides as socialOverrides, socialLinks } from '../config/social.config'
import { fetchFeed } from '../lib/social/feed'
import { resolveProfiles } from '../lib/social/platforms'
import '../styles/community.css'

const whatsappMessage = encodeURIComponent('Hola BAYONA, quiero unirme a la comunidad. ¿Cómo entro?')
const whatsappUrl = `https://wa.me/34614988006?text=${whatsappMessage}`

const profiles = resolveProfiles(socialLinks).map((profile) => ({
  ...profile,
  ...(socialOverrides[profile.id] ?? {}),
}))
const youtubeProfile = profiles.find(profile => profile.id === 'youtube')
const instagramProfile = profiles.find(profile => profile.id === 'instagram')
const tiktokProfile = profiles.find(profile => profile.id === 'tiktok')

const youtubeUrl = youtubeProfile?.url || 'https://youtube.com/@sevisionari'
const instagramUrl = instagramProfile?.url || 'https://instagram.com/sebasbayona'
const tiktokUrl = tiktokProfile?.url || 'https://tiktok.com/@sebasbayona'

const communityFeelings = [
  {
    title: 'PERTENECES',
    detail: 'Hay personas como tú. Con las mismas dudas. Las mismas ganas.',
    icon: Users,
  },
  {
    title: 'APRENDES',
    detail: 'Cada semana algo nuevo. De Sebastián y de todos los que comparten.',
    icon: BookOpen,
  },
  {
    title: 'AVANZAS',
    detail: 'El grupo te empuja. Cuando flojeas, alguien te recuerda por qué.',
    icon: TrendingUp,
  },
  {
    title: 'CRECES',
    detail: 'Físico, mente y carácter. Y como parte de algo que crece contigo.',
    icon: Sprout,
  },
]

const identityMarkers = [
  {
    title: 'PERSONAS REALES',
    detail: 'Distintas edades e historias, unidas por el movimiento y la cultura del parkour.',
  },
  {
    title: '+8 AÑOS',
    detail: 'Creando comunidad con una forma auténtica de vivir: cercana, humana y compartida.',
  },
  {
    title: 'ABIERTO PARA TODOS',
    detail: 'Gratis, sin compromiso y con ganas de avanzar.',
  },
  {
    title: 'CADA SEMANA',
    detail: 'Contenido vivo para aprender, practicar y compartir.',
  },
]

const bayonaTraits = [
  {
    title: 'APRENDE',
    detail: 'No lo sabe todo. Quiere saber más.',
    icon: BookOpen,
  },
  {
    title: 'PRACTICA',
    detail: 'No solo lee. Se mueve.',
    icon: Activity,
  },
  {
    title: 'RESPETA',
    detail: 'Cada cuerpo es distinto. Cada proceso también.',
    icon: HeartHandshake,
  },
  {
    title: 'COMPARTE',
    detail: 'Su progreso, sus dudas, sus descubrimientos.',
    icon: Share2,
  },
]

const weekSchedule = [
  {
    day: 'LUNES',
    title: 'EMPEZAMOS CON CONTEXTO.',
    detail: 'Una idea, noticia o tendencia para arrancar la semana.',
  },
  {
    day: 'MIÉRCOLES',
    title: 'TU PREGUNTA.',
    detail: 'La resolvemos en el grupo. En video cuando de verdad aporte.',
  },
  {
    day: 'VIERNES',
    title: 'ALGO QUE PUEDES APLICAR.',
    detail: 'Un recurso práctico para tu fin de semana.',
  },
]

const accessLevels = [
  {
    name: 'ABIERTO',
    tag: 'PARA TODOS',
    description: 'Acceso al grupo y a las conversaciones abiertas. No requiere compra.',
    feeling: 'Grupo abierto y contenido comunitario.',
    icon: Users,
  },
  {
    name: 'PRIORITARIO',
    tag: 'PARA FUERZA +',
    description: 'Prioridad de respuesta y seguimiento con la frecuencia incluida en la membresía.',
    feeling: 'Disponible según las condiciones del plan contratado.',
    icon: ShieldCheck,
  },
  {
    name: 'PRIVADO',
    tag: 'PARA ELITE',
    description: 'Chat privado con Sebastián y acompañamiento dentro del alcance de ELITE.',
    feeling: 'Acceso sujeto a contratación y disponibilidad de cupo.',
    icon: ShieldCheck,
    featured: true,
  },
]

const communityEvidenceState = [
  {
    title: 'SIN CITAS PUBLICADAS',
    detail: 'Todavía no hay testimonios verificados y autorizados para mostrar en esta página.',
  },
  {
    title: 'CRITERIO DE PUBLICACIÓN',
    detail: 'Una experiencia solo se publicará con consentimiento expreso y sin alterar las palabras de la persona.',
  },
  {
    title: 'MIENTRAS TANTO',
    detail: 'Puedes revisar los canales oficiales o entrar al grupo para conocer la comunidad directamente.',
  },
]

const groupTraits = [
  {
    title: 'RESPONDE',
    detail: 'Cuando preguntas, alguien contesta. No al mes. Hoy.',
  },
  {
    title: 'EVOLUCIONA',
    detail: 'El contenido cambia cada semana. No es estático.',
  },
  {
    title: 'ACOGE',
    detail: 'No hay preguntas tontas. Todos empezamos alguna vez.',
  },
]

const luxuryEase = [0.16, 1, 0.3, 1]

function spotlightHandler(event) {
  const bounds = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - bounds.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - bounds.top}px`)
}

function getLuxuryRevealProps(index, step, reducedMotion) {
  if (reducedMotion) return { initial: false }

  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay: index * step, ease: luxuryEase },
  }
}

function useLuxuryTilt() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(query.matches)

    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  return enabled
}

function LuxuryReveal({ children, className, index, reducedMotion, step = 0.08 }) {
  return (
    <motion.div
      className={className}
      {...getLuxuryRevealProps(index, step, reducedMotion)}
    >
      {children}
    </motion.div>
  )
}

function LuxuryFeelingCard({ feeling, index, reducedMotion, tiltEnabled }) {
  const FeelingIcon = feeling.icon
  const card = (
    <article
      {...sceneBackgroundProps(siteMedia.community.feelings[index], {
        className: `community-feeling-card community-feeling lux-card${index === 0 ? ' is-large' : ''}`,
        variant: 'accent',
        pseudo: 'after',
      })}
      onMouseMove={spotlightHandler}
    >
      <span className="lux-number">{String(index + 1).padStart(2, '0')}</span>
      <span className="lux-icon"><FeelingIcon aria-hidden="true" size={30} strokeWidth={1.2} /></span>
      <h3 className="community-feeling-title">{feeling.title}</h3>
      <p className="community-feeling-desc">{feeling.detail}</p>
    </article>
  )

  return (
    <LuxuryReveal
      className={`community-feeling-shell community-feeling-shell-${index + 1}`}
      index={index}
      reducedMotion={reducedMotion}
    >
      {tiltEnabled && !reducedMotion ? (
        <Tilt
          className="lux-tilt"
          tiltMaxAngleX={4}
          tiltMaxAngleY={4}
          perspective={1200}
          transitionSpeed={700}
          scale={1.015}
          glareEnable={false}
          style={{ transformStyle: 'preserve-3d', height: '100%' }}
        >
          {card}
        </Tilt>
      ) : card}
    </LuxuryReveal>
  )
}

function formatFeedDate(value) {
  if (!value) return 'CONTENIDO RECIENTE'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'CONTENIDO RECIENTE'

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date).toUpperCase()
}

function useCommunityReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.community-page .community-reveal, .community-page .community-stagger')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' })

    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function useLatestYouTube(profile) {
  const [state, setState] = useState({ loading: Boolean(profile), item: null })

  useEffect(() => {
    if (!profile) {
      setState({ loading: false, item: null })
      return undefined
    }

    const controller = new AbortController()
    fetchFeed(profile, controller.signal).then((result) => {
      if (controller.signal.aborted) return
      setState({ loading: false, item: result.items[0] || null })
    })

    return () => controller.abort()
  }, [profile])

  return state
}

function CommunityLiveFeed() {
  const { loading, item } = useLatestYouTube(youtubeProfile)
  const youtubeTarget = item?.url || youtubeUrl

  return (
    <section
      className="community-section community-reveal community-live"
      data-section-number="07"
      aria-labelledby="community-live-title"
    >
      <div className="community-shell container community-section-content community-number-layer">
        <header className="community-section-header community-header">
          <p className="community-overline community-eyebrow">07 / BAYONA EN MOVIMIENTO</p>
          <h2 id="community-live-title" className="community-title">LO ÚLTIMO.<br /><span>EN MOVIMIENTO.</span></h2>
          <p className="community-section-subtitle community-subtitle">Esto es lo que voy creando y compartiendo. No tienes que entrar para verlo. Solo para ser parte.</p>
        </header>

        <div className="community-live-grid community-social community-stagger">
          <article className="community-live-card community-social-card is-youtube" style={{ '--i': 0 }}>
            <div className={`community-live-media community-social-thumb is-video${item?.thumb ? ' has-image' : ''}`}>
              <Youtube aria-hidden="true" size={42} strokeWidth={1} />
              {item?.thumb && (
                <img
                  src={item.thumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={(event) => { event.currentTarget.style.display = 'none' }}
                />
              )}
            </div>
            <div className="community-live-body community-social-content">
              <p className="community-live-platform community-social-platform"><Youtube aria-hidden="true" size={18} /> YOUTUBE</p>
              <h3 className="community-social-title">{item?.title || 'SEVISIONARI EN YOUTUBE'}</h3>
              <p className="community-live-date">{loading ? 'CONECTANDO CON EL CANAL' : formatFeedDate(item?.date)}</p>
              <a className="community-social-link" href={youtubeTarget} target="_blank" rel="noreferrer">
                {item ? 'VER EN YOUTUBE' : 'VER CANAL DE YOUTUBE'}
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </article>

          <article className="community-live-card community-social-card is-instagram" style={{ '--i': 1 }}>
            <div className="community-live-media community-social-thumb is-square">
              <Instagram aria-hidden="true" size={48} strokeWidth={1} />
              <span>@sebasbayona</span>
            </div>
            <div className="community-live-body community-social-content">
              <p className="community-live-platform community-social-platform"><Instagram aria-hidden="true" size={18} /> INSTAGRAM</p>
              <h3 className="community-social-title">MOVIMIENTO QUE PUEDES VER.</h3>
              <p className="community-live-date">PERFIL OFICIAL · @sebasbayona</p>
              <a className="community-social-link" href={instagramUrl} target="_blank" rel="noreferrer">
                SEGUIR EN INSTAGRAM
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </article>

          <article className="community-live-card community-social-card is-tiktok" style={{ '--i': 2 }}>
            <div className="community-live-media community-social-thumb is-square">
              <Glyph name="tiktok" size={48} />
              <span>@sebasbayona</span>
            </div>
            <div className="community-live-body community-social-content">
              <p className="community-live-platform community-social-platform"><Glyph name="tiktok" size={18} /> TIKTOK</p>
              <h3 className="community-social-title">PARKOUR, BIOHACKING Y VIDA REAL.</h3>
              <p className="community-live-date">PERFIL OFICIAL · @sebasbayona</p>
              <a className="community-social-link" href={tiktokUrl} target="_blank" rel="noreferrer">
                VER EN TIKTOK
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </article>
        </div>
        <p className="community-marketing-line is-mono community-live-note">ESTO VA CRECIENDO. LO QUE VES ES LO QUE ESTOY COMPARTIENDO.</p>
      </div>
    </section>
  )
}

export default function Community() {
  useCommunityReveal()
  const reducedMotion = useReducedMotion()
  const luxuryTiltEnabled = useLuxuryTilt()
  const [showFloatingJoin, setShowFloatingJoin] = useState(false)

  useEffect(() => {
    const updateFloatingJoin = () => {
      const isMobile = window.innerWidth <= 768
      setShowFloatingJoin(isMobile && window.scrollY > window.innerHeight * 0.8)
    }

    updateFloatingJoin()
    window.addEventListener('scroll', updateFloatingJoin, { passive: true })
    window.addEventListener('resize', updateFloatingJoin)

    return () => {
      window.removeEventListener('scroll', updateFloatingJoin)
      window.removeEventListener('resize', updateFloatingJoin)
    }
  }, [])

  return (
    <div className="community-page">
      <section
        {...sceneBackgroundProps(siteMedia.community.hero, {
          className: 'community-hero',
          variant: 'hero',
          pseudo: 'after',
          motion: true,
        })}
        aria-labelledby="community-title"
      >
        <div className="community-hero-inner">
          <p className="community-kicker">BAYONA COMMUNITY · ACCESO ABIERTO</p>
          <h1 id="community-title" className="community-hero-title">
            <span>ENTRENA CON OTROS.</span>
            <strong>COMPARTE EL PROCESO.</strong>
          </h1>
          <p className="community-hero-subtitle">
            Un espacio gratuito para hablar de entrenamiento, fuerza, nutrición y parkour. Sin comprar nada.
          </p>
          <div className="community-hero-actions community-hero-cta">
            <a className="community-button community-button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" size={20} />
              SOLICITAR ACCESO
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
            <a className="community-text-link" href="#por-que">
              CONOCER LA COMUNIDAD
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
          <p className="community-hero-free">ACCESO GRATUITO · NO REQUIERE UN PLAN</p>
          <p className="community-hero-life">
            <span className="community-hero-life-dot" aria-hidden="true">●</span>
            <span>ACCESO POR WHATSAPP · SEGUIMIENTO INDIVIDUAL SEGÚN TU PLAN</span>
          </p>
          <p className="community-hero-note">LEE LAS NORMAS DEL GRUPO ANTES DE PARTICIPAR</p>
        </div>
        <a className="community-scroll-indicator" href="#por-que" aria-label="Ir a la comunidad BAYONA">
          <span aria-hidden="true" />
          <ChevronDown aria-hidden="true" size={15} strokeWidth={1} />
        </a>
      </section>

      <section className="community-section community-reveal community-why" data-section-number="01" id="por-que" aria-labelledby="community-why-title">
        <div className="community-shell container community-section-content community-number-layer">
          <header className="community-section-header community-header">
            <p className="community-overline community-eyebrow">01 / POR QUÉ EXISTIMOS</p>
            <h2 id="community-why-title" className="community-title">LA MAYORÍA NO ABANDONA POR<br /><span>FALTA DE INFORMACIÓN.</span></h2>
            <p className="community-section-subtitle community-subtitle">
              Información y ganas sobran. Lo que falta es alguien a tu lado. Personas que entiendan lo que intentas. Un grupo que te empuje cuando tú no puedes empujarte solo. Esa es la diferencia entre seguir y abandonar.
            </p>
          </header>

          <ol className="community-identity-points community-why-list community-stagger">
            <li className="community-why-item" style={{ '--i': 0 }}>
              <span className="community-why-num">01</span>
              <div><strong className="community-why-text">AQUÍ ERES PARTE.</strong><p>No un número. No un lead. PARTE de algo que se mueve.</p></div>
            </li>
            <li className="community-why-item" style={{ '--i': 1 }}>
              <span className="community-why-num">02</span>
              <div><strong className="community-why-text">AQUÍ EVOLUCIONAS.</strong><p>Con otros. Nunca solo viendo desde fuera.</p></div>
            </li>
            <li className="community-why-item" style={{ '--i': 2 }}>
              <span className="community-why-num">03</span>
              <div><strong className="community-why-text">AQUÍ ENCUENTRAS PERSONAS.</strong><p>Reales. Como tú. Con las mismas dudas.</p></div>
            </li>
          </ol>
          <p className="community-founder-note">Yo también entrené solo durante años. Sé lo que se siente. La diferencia entre avanzar y abandonar casi siempre es esto: tener a alguien al lado.</p>
          <p className="community-marketing-line is-italic community-founder-closure">Eso es lo que construí aquí.</p>
          <p className="community-movement-line">Más que un grupo de WhatsApp: un MOVIMIENTO.</p>
        </div>
      </section>

      <section className="community-section community-reveal community-feeling" data-section-number="02" aria-labelledby="community-feeling-title">
        <div className="community-shell container community-section-content community-number-layer">
          <header className="community-section-header community-header is-centered">
            <p className="community-overline community-eyebrow">02 / CÓMO SE SIENTE</p>
            <h2 id="community-feeling-title" className="community-title">IMAGINA <span>ESTO:</span></h2>
            <p className="community-section-subtitle community-subtitle">
              Llegas al grupo un lunes. Alguien comparte un logro. Alguien te responde con generosidad.
            </p>
          </header>

          <div className="community-feeling-bento community-feelings">
            {communityFeelings.map((feeling, index) => (
              <LuxuryFeelingCard
                feeling={feeling}
                index={index}
                key={feeling.title}
                reducedMotion={reducedMotion}
                tiltEnabled={luxuryTiltEnabled}
              />
            ))}
          </div>
          <p className="community-marketing-line community-loss-question">Esa es la pregunta. No la mía. La tuya.</p>

          <div className="community-proof-strip community-stagger" aria-label="Señales de identidad de la comunidad">
            {identityMarkers.map((marker, index) => (
              <article key={marker.title} style={{ '--i': index }}>
                <strong>{marker.title}</strong>
                <p>{marker.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="community-section community-reveal community-person" data-section-number="03" aria-labelledby="community-person-title">
        <div className="community-shell container community-section-content community-number-layer">
          <header className="community-section-header community-header">
            <p className="community-overline community-eyebrow">03 / QUIÉN ERES AQUÍ</p>
            <h2 id="community-person-title" className="community-title">UNA PERSONA <span>BAYONA:</span></h2>
            <p className="community-section-subtitle community-subtitle">No necesitas ser cliente. No necesitas experiencia. No necesitas estar en forma. Solo necesitas GANAS de dejar de empezar cada lunes.</p>
          </header>

          <div className="community-trait-grid community-identity community-stagger">
            {bayonaTraits.map((trait, index) => {
              const TraitIcon = trait.icon
              return (
                <article className="community-trait-card community-trait" key={trait.title} style={{ '--i': index }}>
                  <TraitIcon className="community-trait-icon" aria-hidden="true" size={28} strokeWidth={1} />
                  <div><h3 className="community-trait-name">{trait.title}</h3><p className="community-trait-desc">{trait.detail}</p></div>
                </article>
              )
            })}
          </div>
          <p className="community-aspiration-line">Si reconoces algo de ti en esta lista, ya eres parte. Solo falta que entres.</p>
          <p className="community-marketing-line is-mono community-identity-entry">NO HAY EXAMEN DE ENTRADA. SOLO LA DECISIÓN DE EMPEZAR.</p>
        </div>
      </section>

      <section className="community-section community-reveal community-week" data-section-number="04" id="semana" aria-labelledby="community-week-title">
        <div className="community-shell container community-section-content community-number-layer">
          <header className="community-section-header community-header">
            <p className="community-overline community-eyebrow"><CalendarDays aria-hidden="true" size={17} /> 04 / LA SEMANA</p>
            <h2 id="community-week-title" className="community-title">TRES MOMENTOS.<br /><span>UN MISMO PULSO.</span></h2>
            <p className="community-section-subtitle community-subtitle">Cada semana el grupo respira así. No es un horario rígido. Es un ritmo.</p>
          </header>

          <div className="community-week-grid community-calendar">
            {weekSchedule.map((item, index) => (
              <LuxuryReveal
                className="community-day-shell"
                index={index}
                key={item.day}
                reducedMotion={reducedMotion}
              >
                <article className="community-day-card community-day lux-card" onMouseMove={spotlightHandler}>
                  <span className="community-day-index">DÍA {String(index + 1).padStart(2, '0')} / 03</span>
                  <span className="community-day-label">{item.day}</span>
                  <h3 className="community-day-title">{item.title}</h3>
                  <p className="community-day-desc">{item.detail}</p>
                </article>
              </LuxuryReveal>
            ))}
          </div>
          <p className="community-marketing-line is-mono community-week-momentum">EL RITMO ES EDITORIAL, NO UNA PROMESA DE PUBLICACIÓN DIARIA. LAS ACTIVIDADES Y LOS TIEMPOS DE RESPUESTA PUEDEN VARIAR; EL SEGUIMIENTO INDIVIDUAL DEPENDE DEL PLAN.</p>
          <p className="community-week-note">Los demás días: entrena, descansa, pregunta. Sin presión.</p>
        </div>
      </section>

      <section className="community-section community-reveal community-access" data-section-number="05" aria-labelledby="community-access-title">
        <div className="community-shell container community-section-content community-number-layer">
          <header className="community-section-header community-header">
            <p className="community-overline community-eyebrow">05 / DÓNDE ESTÁS TÚ</p>
            <h2 id="community-access-title" className="community-title">TRES NIVELES.<br /><span>UN MISMO ESPÍRITU.</span></h2>
            <p className="community-section-subtitle community-subtitle">Todos pertenecen. Pero el acompañamiento depende de tu plan. Y sí — sentir la diferencia es real.</p>
          </header>

          <div className="community-tier-grid community-tiers">
            {accessLevels.map((level, index) => {
              const LevelIcon = level.icon
              const tierClass = level.name.toLowerCase()
              return (
                <LuxuryReveal
                  className="community-tier-shell"
                  index={index}
                  key={level.name}
                  reducedMotion={reducedMotion}
                  step={0.1}
                >
                  <article
                    {...sceneBackgroundProps(siteMedia.community.tiers[index], {
                      className: `community-tier-card community-tier lux-card ${tierClass}${level.featured ? ' is-elite elite' : ''}`,
                      variant: 'accent',
                      pseudo: 'after',
                    })}
                    onMouseMove={spotlightHandler}
                  >
                    {level.featured && <span className="community-tier-badge">ELITE</span>}
                    <div className="community-tier-top">
                      <LevelIcon className="community-tier-icon" aria-hidden="true" size={28} strokeWidth={1.2} />
                      <span className="community-tier-label">{level.tag}</span>
                    </div>
                    <h3 className="community-tier-name">{level.name}</h3>
                    <p className="community-tier-desc">{level.description}</p>
                    <div className="community-tier-feeling">
                      <span className="community-tier-feeling-label">ALCANCE:</span>
                      <span className="community-tier-feeling-quote">{level.feeling}</span>
                    </div>
                  </article>
                </LuxuryReveal>
              )
            })}
          </div>
          <p className="community-marketing-line is-italic community-tier-access-note">El grupo es gratis. Lo que cambia es cuánto me acerco a ti.</p>
          <Link to="/programs" className="community-inline-link">¿CUÁL ES TU NIVEL? · VER PROGRAMAS<ArrowUpRight aria-hidden="true" size={16} /></Link>
        </div>
      </section>

      <section
        {...sceneBackgroundProps(siteMedia.community.stories, {
          className: 'community-section community-reveal community-stories',
          variant: 'subtle',
          pseudo: 'after',
        })}
        data-section-number="06"
        aria-labelledby="community-stories-title"
      >
        <div className="community-shell container community-section-content community-number-layer">
          <header className="community-section-header community-header is-centered">
            <p className="community-overline community-eyebrow">06 / TESTIMONIOS</p>
            <h2 id="community-stories-title" className="community-title">PRUEBA, CUANDO<br /><span>ESTÉ VERIFICADA.</span></h2>
            <p className="community-section-subtitle community-subtitle">No publicamos nombres, citas ni resultados sin verificar su origen y contar con autorización expresa.</p>
          </header>

          <p className="community-marketing-line is-mono community-testimonial-intro">ESTADO EDITORIAL ACTUAL: NO HAY TESTIMONIOS PUBLICADOS.</p>
          <div className="testimonial-marquee" role="region" aria-label="Estado de publicación de testimonios" aria-live="off">
            <div className="testimonial-track" role="list">
              {[...communityEvidenceState, ...communityEvidenceState].map((entry, index) => {
                const isDuplicate = index >= communityEvidenceState.length
                return (
                  <article
                    className="testimonial-card"
                    key={`${entry.title}-${index}`}
                    role="listitem"
                    aria-hidden={isDuplicate || undefined}
                    tabIndex={isDuplicate ? -1 : 0}
                  >
                    <p className="testimonial-quote">{entry.detail}</p>
                    <span className="testimonial-author">{entry.title}</span>
                  </article>
                )
              })}
            </div>
          </div>
          <p className="community-disclaimer" role="note">Esta sección se actualizará solo con experiencias verificadas y autorizadas.</p>
        </div>
      </section>

      <CommunityLiveFeed />

      <section
        {...sceneBackgroundProps(siteMedia.community.group, {
          className: 'community-section community-reveal community-group',
          variant: 'subtle',
          pseudo: 'after',
        })}
        data-section-number="08"
        aria-labelledby="community-group-title"
      >
        <div className="community-shell container community-section-content community-number-layer">
          <header className="community-section-header community-header is-centered">
            <p className="community-overline community-eyebrow">08 / EL GRUPO</p>
            <h2 id="community-group-title" className="community-title">CONVERSACIÓN,<br /><span>RECURSOS Y PRÁCTICA.</span></h2>
            <p className="community-section-subtitle community-subtitle">El grupo abierto permite compartir preguntas y recursos. El seguimiento personalizado y los tiempos de respuesta dependen del plan contratado.</p>
          </header>

          <VideoSection
            title="CÓMO FUNCIONA LA COMUNIDAD"
            subtitle="Sebastián presenta el propósito del grupo, sus normas y la diferencia entre acceso abierto y acompañamiento de pago."
            poster={siteMedia.community.group.src}
            duration="2 MIN"
            placement="contained"
          />

          <div className="community-group-traits community-stagger">
            {groupTraits.map((trait, index) => (
              <article key={trait.title} style={{ '--i': index }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{trait.title}</h3>
                <p>{trait.detail}</p>
              </article>
            ))}
          </div>

          <details className="community-chat-details" open>
            <summary>¿CÓMO SE VE UN DÍA TÍPICO?<ChevronDown aria-hidden="true" size={17} /></summary>
            <div className="community-chat community-chat-preview" aria-label="Vista conceptual de una conversación en la comunidad">
              <div className="community-chat-header">
                <span className="community-chat-avatar">B</span>
                <div className="community-chat-headinfo">
                  <span className="community-chat-name">BAYONA · COMUNIDAD</span>
                  <span className="community-chat-status">● ACTIVO AHORA</span>
                </div>
              </div>

              <div className="community-chat-bubble member">
                <span className="community-chat-author">ANDREA</span>
                <span className="community-chat-text">Siento dolor en la rodilla al hacer sentadillas. ¿Qué hago?</span>
              </div>

              <div className="community-chat-bubble sebastian">
                <span className="community-chat-author">SEBASTIÁN</span>
                <span className="community-chat-text">Detén el ejercicio que provoca dolor. Desde un chat no puedo identificar la causa. Si persiste, es intenso o aparece hinchazón o inestabilidad, consulta a un profesional sanitario. Con su autorización, revisamos carga, rango y técnica.</span>
              </div>

              <div className="community-chat-bubble member">
                <span className="community-chat-author">CARLOS</span>
                <span className="community-chat-text">Gracias por marcar el límite. Mejor revisarlo antes de seguir entrenando con dolor.</span>
              </div>
            </div>
            <p className="community-chat-caption">Ejemplo conceptual de una conversación responsable en el grupo.</p>
          </details>
          <p className="community-marketing-line is-italic community-group-proof">La comunidad orienta la conversación; no diagnostica ni sustituye atención sanitaria.</p>
          <aside className="community-mid-join community-reveal" aria-label="Unirse a la comunidad BAYONA">
            <p className="community-mid-join-label">¿TE QUEDAS FUERA O ENTRAS?</p>
            <a className="community-button community-button-primary community-mid-join-button" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" size={20} />
              QUIERO UNIRME AHORA
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </aside>
        </div>
      </section>

      <section className="community-section community-reveal community-entry" data-section-number="09" aria-labelledby="community-entry-title">
        <div className="community-shell container community-section-content community-number-layer">
          <header className="community-section-header community-header">
            <p className="community-overline community-eyebrow">09 / TU PRIMER PASO</p>
            <h2 id="community-entry-title" className="community-title">ENTRAR ES <span>SIMPLE.</span></h2>
            <p className="community-section-subtitle community-subtitle">Un mensaje. Eso es todo.</p>
          </header>

          <ol className="community-entry-steps community-stagger">
            <li style={{ '--i': 0 }}><span>1</span><strong>ESCRÍBENOS POR WHATSAPP</strong></li>
            <li style={{ '--i': 1 }}><span>2</span><strong>DINOS QUE QUIERES ENTRAR</strong></li>
            <li style={{ '--i': 2 }}><span>3</span><strong>RECIBES EL ACCESO</strong></li>
          </ol>
          <a className="community-button community-button-primary community-entry-cta" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" size={21} />QUIERO UNIRME AHORA<ArrowUpRight aria-hidden="true" size={18} /></a>
          <p className="community-marketing-line is-mono community-entry-speed">TOMA 30 SEGUNDOS. MÁS RÁPIDO QUE TU ÚLTIMO REEL.</p>
          <p className="community-entry-note">No hay formularios. No hay requisitos. Solo un mensaje.</p>
        </div>
      </section>

      <section className="community-section community-reveal community-closing" data-section-number="10" aria-labelledby="community-closing-title">
        <div className="community-shell container community-section-content community-number-layer">
          <p className="community-overline community-eyebrow">10 / SIGUIENTE PASO</p>
          <h2 id="community-closing-title" className="community-title">CONOCE EL GRUPO<br /><span>ANTES DE ELEGIR UN PLAN.</span></h2>
          <p className="community-closing-pressure">El acceso abierto no requiere compra.</p>
          <p className="community-section-subtitle community-subtitle">Solicita las normas y el enlace por WhatsApp, o compara las membresías si necesitas seguimiento individual.</p>
          <div className="community-closing-actions">
            <a className="community-button community-button-primary" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" size={20} />SOLICITAR ACCESO<ArrowUpRight aria-hidden="true" size={18} /></a>
            <Link to="/programs" className="community-button community-button-secondary">COMPARAR PROGRAMAS<ArrowUpRight aria-hidden="true" size={18} /></Link>
          </div>
        </div>
      </section>

      <footer className="community-footer-note" aria-label="Nota sobre la comunidad BAYONA">
        <p className="community-shell">La comunidad BAYONA es un espacio abierto y no sustituye seguimiento profesional ni atención sanitaria. Actualmente no se publican testimonios: solo se añadirán experiencias verificadas y autorizadas.</p>
        <p className="community-shell community-final-signature">ENTRENA CON CRITERIO. COMPARTE CON RESPETO. — BAYONA</p>
      </footer>

      <div
        className={`community-join-floating${showFloatingJoin ? ' show' : ''}`}
        aria-hidden={!showFloatingJoin}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={showFloatingJoin ? undefined : -1}
        >
          QUIERO UNIRME
        </a>
      </div>
    </div>
  )
}
