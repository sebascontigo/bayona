import { ArrowDown, ArrowRight, Clock3, MapPin, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionLabel } from '../components/Layout.jsx'
import { sceneBackgroundProps } from '../components/SceneBackground.jsx'
import { siteMedia } from '../config/siteMedia.js'
import { whatsAppLink } from '../config/site.config.js'
import { StickyStage } from '../engine/scroll/StickyStage.jsx'
import '../styles/parkour-academy.css'

const agePaths = [
  ['8—12', 'EXPLORADORES', 'Juego, coordinación y confianza para aprender a moverse con atención.'],
  ['13—17', 'IMPULSO', 'Técnica, fuerza y decisiones para convertir energía en movimiento controlado.'],
  ['18+', 'MOVIMIENTO ADULTO', 'Una entrada progresiva al parkour, con o sin experiencia previa.'],
]

const levels = [
  ['01', 'BASE', 'Aterrizar antes de volar', ['Recepciones', 'Equilibrio', 'Desplazamientos', 'Fuerza esencial']],
  ['02', 'FLUJO', 'Conectar decisiones', ['Saltos de precisión', 'Pasavallas', 'Escalada', 'Secuencias']],
  ['03', 'RENDIMIENTO', 'Refinar bajo criterio', ['Eficiencia', 'Potencia', 'Lectura del entorno', 'Autonomía técnica']],
]

const method = [
  ['01', 'OBSERVAR', 'Leemos el espacio, el nivel actual y la intención antes de elegir una progresión.'],
  ['02', 'PREPARAR', 'Construimos movilidad, fuerza y control para la habilidad que se va a practicar.'],
  ['03', 'PROGRESAR', 'Dividimos cada gesto en pasos claros. La dificultad llega después del dominio.'],
  ['04', 'INTEGRAR', 'Conectamos lo aprendido en recorridos donde técnica, atención y decisión trabajan juntas.'],
]

const faqs = [
  ['¿Necesito experiencia previa?', 'No. BASE está diseñada para empezar desde los fundamentos. Antes de la primera clase se confirma edad, experiencia y cualquier limitación declarada.'],
  ['¿El parkour es solo para personas jóvenes?', 'No. La dificultad se adapta al punto de partida. En adultos se priorizan control, fuerza útil y progresiones revisables.'],
  ['¿Qué necesito llevar?', 'Ropa que permita moverte, calzado deportivo con buen agarre y agua. Los requisitos definitivos se envían al confirmar cada sesión.'],
  ['¿Dónde y cuándo son las clases?', 'La sede, los horarios y la fecha de apertura se confirman antes de reservar. Ahora puedes registrar tu interés sin realizar ningún pago.'],
  ['¿Cómo se gestiona la seguridad?', 'Cada sesión empieza con preparación específica y progresiones acordes al nivel observado. No se obliga a ejecutar una habilidad y el dolor es señal para detenerse.'],
]

const interestUrl = whatsAppLink('Hola BAYONA, quiero registrar mi interés en la Academia de Parkour.')

export default function ParkourAcademy() {
  const media = siteMedia.parkourAcademy

  return (
    <div className="parkour-academy">
      <section
        {...sceneBackgroundProps(media.hero, {
          className: 'academy-hero', variant: 'hero', motion: true, position: 'center 38%',
        })}
        aria-labelledby="academy-title"
      >
        <div className="academy-hero-inner">
          <div className="academy-hero-copy">
            <SectionLabel>BAYONA / PARKOUR ACADEMY</SectionLabel>
            <h1 id="academy-title">LA CIUDAD<br /><span>SE APRENDE</span><br />EN <span className="academy-hero-final-word">MOVIMIENTO.</span></h1>
            <p>Técnica, fuerza y criterio para descubrir de qué es capaz tu cuerpo sin saltarte los fundamentos.</p>
            <div className="academy-actions">
              <a className="academy-action academy-action--primary" href={interestUrl} target="_blank" rel="noreferrer">
                REGISTRAR MI INTERÉS <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="academy-action academy-action--quiet" href="#academy-paths">
                CONOCER EL MÉTODO <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
            <small>Interés abierto · Sin pago · Sede y horarios por confirmar</small>
          </div>
          <div className="academy-hero-words" aria-hidden="true">
            <span>FUERZA</span><span>CONTROL</span><span>ADAPTACIÓN</span>
          </div>
        </div>
      </section>

      <aside className="academy-principles" aria-label="Principios de la Academia">
        <span>NO COMPITES CONTRA OTRO CUERPO</span>
        <span>PROGRESAS DESDE EL TUYO</span>
        <span>LA TÉCNICA PRECEDE AL RIESGO</span>
      </aside>

      <section className="academy-section academy-paths" id="academy-paths" aria-labelledby="academy-paths-title">
        <header className="academy-heading">
          <SectionLabel>UN LENGUAJE PARA CADA ETAPA</SectionLabel>
          <h2 id="academy-paths-title">NO HAY UN CUERPO IDEAL.<br /><span>HAY UN SIGUIENTE MOVIMIENTO.</span></h2>
          <p>Cada grupo comparte un método, pero no una exigencia idéntica. La progresión empieza en la persona que llega.</p>
        </header>
        <div className="academy-age-track">
          {agePaths.map(([range, title, copy]) => (
            <article className="academy-age" key={range}>
              <strong>{range}</strong><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section
        {...sceneBackgroundProps(media.levels, {
          className: 'academy-section academy-levels', variant: 'accent', motion: true, opacity: 0.56,
        })}
        aria-labelledby="academy-levels-title"
      >
        <header className="academy-heading academy-heading--compact">
          <SectionLabel>PROGRESIÓN VISIBLE</SectionLabel>
          <h2 id="academy-levels-title">TRES NIVELES.<br /><span>NINGÚN ATAJO.</span></h2>
          <p>El paso entre niveles depende de la ejecución observada, no del calendario.</p>
        </header>
        {/*
          FASE 8 · BLOQUE F — "LA ESCALERA" (cinematic-stage 2D del blueprint de
          parkour, M.5 ALTO con degradaciones escritas desde Fase 6).
          Identidad PROPIA, no un clon de la Home: allí el marco es horizontal
          (una secuencia lógica que avanza); aquí el recorrido es VERTICAL y
          ASCENDENTE — cada nivel SUBE al siguiente, porque la progresión de
          parkour es física: primer salto → control. El paso activo queda a la
          altura de los ojos y el siguiente asoma desde abajo; el hilo de luz
          del marcador de nivel es la misma escalera iluminándose.
          Motor: StickyStage del engine (2D puro, 0 WebGL). Reduced-motion y
          móvil: pila estática legible por diseño del componente.
        */}
        <StickyStage length="300vh" states={levels.length} className="academy-level-grid academy-level-grid--stage">
          {({ index }) => (
            <div
              className="academy-level-stage"
              aria-live="polite"
              style={{ '--stage-fill': `${((index + 1) / levels.length) * 100}%` }}
            >
              {levels.map(([number, title, subtitle, skills], levelIndex) => {
                const isActive = levelIndex === index
                const isPast = levelIndex < index
                return (
                  <article
                    key={number}
                    className={[
                      'academy-level',
                      'academy-level--stage',
                      isActive ? 'academy-level--active' : '',
                      isPast ? 'academy-level--past' : '',
                    ].filter(Boolean).join(' ')}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span>{number}</span><p>{subtitle}</p><h3>{title}</h3>
                    <ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                  </article>
                )
              })}
            </div>
          )}
        </StickyStage>
      </section>

      <section className="academy-section academy-method" aria-labelledby="academy-method-title">
        <header className="academy-heading">
          <SectionLabel>EL MÉTODO BAYONA</SectionLabel>
          <h2 id="academy-method-title">EL MOVIMIENTO SE ENSEÑA.<br /><span>LA CONFIANZA SE CONSTRUYE.</span></h2>
        </header>
        <ol className="academy-method-list">
          {method.map(([number, title, copy]) => (
            <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>
          ))}
        </ol>
      </section>

      <section
        {...sceneBackgroundProps(media.safety, {
          className: 'academy-section academy-safety', variant: 'hero', motion: true, position: 'center 34%',
        })}
        aria-labelledby="academy-safety-title"
      >
        <div className="academy-safety-copy">
          <ShieldCheck size={34} strokeWidth={1.2} aria-hidden="true" />
          <SectionLabel>SEGURIDAD ACTIVA</SectionLabel>
          <h2 id="academy-safety-title">VALENTÍA NO ES<br /><span>IMPROVISACIÓN.</span></h2>
          <p>Preparación específica, progresiones observables y permiso para detenerse. Aprender parkour no significa normalizar el dolor ni ejecutar habilidades para las que aún no existe una base.</p>
          <small>La Academia no sustituye evaluación, diagnóstico ni tratamiento sanitario.</small>
        </div>
      </section>

      <section className="academy-section academy-logistics" aria-labelledby="academy-logistics-title">
        <header className="academy-heading academy-heading--compact">
          <SectionLabel>PRIMERA APERTURA</SectionLabel>
          <h2 id="academy-logistics-title">REGISTRA TU INTERÉS.<br /><span>DECIDE CON LOS DATOS COMPLETOS.</span></h2>
        </header>
        <div className="academy-logistics-grid">
          <article><Users aria-hidden="true" /><span>FORMATO</span><h3>Presencial</h3><p>Organización por edad, experiencia y disponibilidad declarada.</p></article>
          <article><Clock3 aria-hidden="true" /><span>HORARIOS</span><h3>Por confirmar</h3><p>Recibirás las franjas disponibles antes de aceptar una plaza.</p></article>
          <article><MapPin aria-hidden="true" /><span>UBICACIÓN</span><h3>Por confirmar</h3><p>La sede exacta se comunica antes de cualquier reserva o pago.</p></article>
        </div>
      </section>

      <section className="academy-section academy-faq" aria-labelledby="academy-faq-title">
        <header className="academy-heading academy-heading--compact">
          <SectionLabel>ANTES DE EMPEZAR</SectionLabel>
          <h2 id="academy-faq-title">PREGUNTAS CLARAS.<br /><span>RESPUESTAS SIN HUMO.</span></h2>
        </header>
        <div className="academy-faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question}><summary><span>{String(index + 1).padStart(2, '0')}</span>{question}</summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section
        {...sceneBackgroundProps(media.closing, {
          className: 'academy-closing', variant: 'hero', motion: true, position: 'center 40%',
        })}
        aria-labelledby="academy-closing-title"
      >
        <div>
          <SectionLabel>EL PRIMER OBSTÁCULO ES EMPEZAR</SectionLabel>
          <h2 id="academy-closing-title">TU PRÓXIMO<br /><span>MOVIMIENTO.</span></h2>
          <p>Registra tu interés. BAYONA te contactará cuando existan sede, horarios y condiciones confirmadas.</p>
          <a className="academy-action academy-action--primary" href={interestUrl} target="_blank" rel="noreferrer">
            REGISTRAR MI INTERÉS <ArrowRight size={18} aria-hidden="true" />
          </a>
          <Link className="academy-program-link" to="/programs">Mientras tanto, explorar programas de entrenamiento</Link>
        </div>
      </section>
    </div>
  )
}
