/**
 * BAYONA · LO QUE TE LLEVAS SIN PAGAR
 * ---------------------------------------------------------------------------
 * Por qué existe:
 *
 * El recorrido de la home iba 01 problema → 02 método → 03 lo que cambia →
 * 04 experiencia → 05 PRECIOS. La persona recorría toda la argumentación y lo
 * primero que se le ofrecía era pagar.
 *
 * Y mientras tanto hay valor real y gratuito: el Protocolo 7 días, el Reto 30
 * días y una comunidad de acceso abierto que no exige contratar nada. Estaba
 * en /resources y /community, la parada 7 y 6 de un itinerario de 9. Quien no
 * llegaba tan lejos no se enteraba de que existía.
 *
 * Esta sección se coloca ANTES de los precios a propósito. Primero se da, y
 * después se pregunta. No es táctica: es lo que hace que la oferta se lea como
 * una consecuencia y no como un peaje.
 *
 * Nada de lo que aquí se enumera se inventa: las tres puertas existen y son
 * gratuitas hoy.
 */

import { ArrowUpRight, CalendarCheck, MessageCircle, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { trackEvent } from '../../lib/analytics/analytics.js'
import '../../styles/free-value.css'

const DOORS = Object.freeze([
  Object.freeze({
    id: 'protocolo',
    icon: MessageCircle,
    tag: 'GUÍA · 7 DÍAS',
    title: 'PROTOCOLO 7 DÍAS',
    copy: 'Una primera semana con estructura, para probar el método sin comprometerte a nada.',
    action: 'Abrir la guía',
    href: '/resources',
  }),
  Object.freeze({
    id: 'reto',
    icon: CalendarCheck,
    tag: 'RETO · 30 DÍAS',
    title: 'RETO 30 DÍAS',
    copy: 'Un recorrido voluntario para poner a prueba tu constancia. Las reglas, antes de entrar.',
    action: 'Ver las condiciones',
    href: '/resources',
  }),
  Object.freeze({
    id: 'comunidad',
    icon: Users,
    tag: 'ACCESO ABIERTO',
    title: 'LA COMUNIDAD',
    copy: 'Entra al grupo y ve cómo entrena la gente. No necesitas comprar ningún plan.',
    action: 'Solicitar acceso',
    href: '/community',
  }),
])

export default function FreeValue() {
  return (
    <section className="free-value" aria-labelledby="home-free-title">
      <div className="section-shell">
        <header className="free-value-header">
          <p className="free-value-eyebrow">ANTES DE HABLAR DE PRECIOS</p>
          <h2 id="home-free-title">
            EMPIEZA HOY
            <br />
            <span>SIN PAGAR NADA.</span>
          </h2>
          <p className="free-value-lead">
            Tres puertas abiertas. Sin cuenta, sin tarjeta y sin que nadie te persiga después.
            Si con esto te basta, ya habrá servido.
          </p>
        </header>

        <ul className="free-value-grid">
          {DOORS.map((door) => {
            const Icon = door.icon

            return (
              <li key={door.id}>
                <Link
                  className="free-value-card"
                  to={door.href}
                  onClick={() => trackEvent('free_value_open', { door: door.id, destination: door.href })}
                >
                  <Icon size={26} strokeWidth={1.1} aria-hidden="true" />
                  <span className="free-value-tag">{door.tag}</span>
                  <strong>{door.title}</strong>
                  <p>{door.copy}</p>
                  <em>
                    {door.action}
                    <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </em>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
