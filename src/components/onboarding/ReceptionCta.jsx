/**
 * BAYONA · ACCESO A RECEPCIÓN
 * ---------------------------------------------------------------------------
 * El héroe ofrecía dos puertas y las dos llevaban a comprar: "VER PLANES" e
 * "IR DIRECTO A LA DECISIÓN". Quien llega sin saber qué necesita —que es la
 * mayoría— no tenía ninguna puerta a su medida.
 *
 * Esta es la tercera: la de "ayúdame a elegir". Lleva a la recepción, que ya
 * existía en /onboarding y estaba escondida en el último enlace del menú. No
 * pide cuenta ni datos, dura menos de un minuto y devuelve tres cosas: un plan
 * a su nivel, un recurso gratuito y la puerta de la comunidad.
 *
 * Cuando la persona ya ha pasado por recepción, el mismo hueco cambia de
 * función y la devuelve a su ruta en lugar de repetirle la pregunta.
 */

import { ArrowUpRight, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useVisitorJourney } from '../../lib/onboarding/VisitorJourneyProvider.jsx'
import { trackEvent } from '../../lib/analytics/analytics.js'
import '../../styles/reception-cta.css'

export default function ReceptionCta() {
  const { route, hasRoute } = useVisitorJourney()

  if (hasRoute) {
    return (
      <Link
        className="reception-cta is-resuming"
        to={route.planHref ?? '/programs'}
        onClick={() => trackEvent('reception_resume', { plan: route.plan })}
      >
        <Compass size={16} strokeWidth={1.4} aria-hidden="true" />
        <span>
          <em>TU RECORRIDO CONTINÚA</em>
          <strong>{route.plan}</strong>
        </span>
        <ArrowUpRight size={15} strokeWidth={1.4} aria-hidden="true" />
      </Link>
    )
  }

  return (
    <Link
      className="reception-cta"
      to="/onboarding"
      onClick={() => trackEvent('reception_open', { source: 'home_hero' })}
    >
      <Compass size={16} strokeWidth={1.4} aria-hidden="true" />
      <span>
        <em>60 SEGUNDOS · SIN CUENTA</em>
        <strong>NO SÉ POR DÓNDE EMPEZAR</strong>
      </span>
      <ArrowUpRight size={15} strokeWidth={1.4} aria-hidden="true" />
    </Link>
  )
}
