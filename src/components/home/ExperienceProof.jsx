/**
 * BAYONA · EXPERIENCIAS EN EL RECORRIDO DE LA HOME
 * ---------------------------------------------------------------------------
 * Por qué existe este componente:
 *
 * La sección 04 de la home es el momento de prueba, y está justo antes de los
 * precios (05). Hasta ahora solo mostraba el bloque honesto "AQUÍ NO HAY HUMO",
 * porque el `evidenceRegistry` está vacío a propósito y la puerta de evidencia
 * es fail-closed. Correcto editorialmente, pero significaba que el visitante
 * llegaba al precio sin haber visto a una sola persona real.
 *
 * Mientras tanto las diez experiencias con foto, país y cita vivían solo en
 * /about, dentro de un globo 3D de 43 kB.
 *
 * Este bloque trae cuatro de esas voces al recorrido principal SIN romper la
 * regla editorial:
 * · No son "evidencia verificada" ni métricas: son experiencias publicadas con
 *   autorización, y el marco se declara de forma visible.
 * · No se toca `evidenceRegistry`. Si algún día hay evidencia verificada, la
 *   sección mostrará ese bloque y esto pasa a ser el complemento humano.
 * · Ninguna cita se presenta como resultado garantizado ni extrapolable.
 *
 * El globo completo con las diez sigue siendo exclusivo de /about, y desde aquí
 * se enlaza: la prueba también funciona como puente para seguir explorando.
 */

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { homeTestimonials, testimonialVariant } from '../../config/testimonials.js'
import { trackEvent } from '../../lib/analytics/analytics.js'
import '../../styles/experience-proof.css'

/** Misma curva y ritmo que el resto de la home, para que no se note el injerto. */
const EASE = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

/** "38 años · Empresaria · Bogotá, Colombia", omitiendo lo que falte. */
function describePerson({ age, role, city, country }) {
  return [age ? `${age} años` : null, role, [city, country].filter(Boolean).join(', ')]
    .filter(Boolean)
    .join(' · ')
}

export default function ExperienceProof() {
  return (
    /*
      Plano hueso: esta sección ya es pura tipografía (los retratos salieron de
      las tarjetas), así que en lugar de decorarla se le da un plano propio. El
      corte de negro a hueso marca el ritmo del recorrido mejor que cualquier
      ilustración, y hace que las citas se lean como una página impresa.
    */
    <section
      className="experience-proof-section v2-plane--bone"
      aria-labelledby="home-experiences-title"
    >
      <div className="section-shell experience-proof">
        <header className="experience-proof-header">
          <p className="experience-proof-eyebrow">EXPERIENCIAS PUBLICADAS</p>
          <h2 id="home-experiences-title">
            GENTE REAL.
            <br />
            <span>PUNTOS DE PARTIDA DISTINTOS.</span>
          </h2>
        </header>

        <motion.ol
          className="experience-proof-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {homeTestimonials.map((person) => (
            <motion.li className="experience-proof-card" key={person.id} variants={fadeUp}>
              <figure className="experience-proof-figure">
                <img
                  className="experience-proof-portrait"
                  src={testimonialVariant(person.image, 256)}
                  alt={`${person.name}, ${person.role}`}
                  width="72"
                  height="72"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <strong>{person.name}</strong>
                  <span>{describePerson(person)}</span>
                </figcaption>
              </figure>

              <blockquote className="experience-proof-quote">{person.quote}</blockquote>

              {/*
              `result` es la síntesis editorial de la experiencia, no una
              promesa. El texto de alcance de abajo lo enmarca explícitamente.
            */}
              <p className="experience-proof-theme">{person.result}</p>
            </motion.li>
          ))}
        </motion.ol>

        <div className="experience-proof-footer">
          <p className="experience-proof-scope">
            Experiencias publicadas con autorización. No usamos una cifra total como prueba ni
            presentamos ningún caso como resultado garantizado: cada punto de partida es distinto.
          </p>

          <Link
            className="experience-proof-link"
            to="/about"
            onClick={() => trackEvent('proof_explore', { destination: '/about', source: 'home_proof' })}
          >
            VER LAS DIEZ HISTORIAS EN EL MAPA
            <ArrowUpRight size={15} strokeWidth={1} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
