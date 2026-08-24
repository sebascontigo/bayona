/**
 * BAYONA · COMPARTIR E INVITAR
 * ---------------------------------------------------------------------------
 * QUÉ RESUELVE
 *
 * Todo el negocio entra por WhatsApp, y aun así no había una sola forma de que
 * alguien pasara el enlace a otra persona. La palanca de crecimiento más barata
 * que tiene un negocio de acompañamiento —que un cliente le mande la web a un
 * amigo— no existía en la interfaz.
 *
 * CÓMO
 *
 * 1. `navigator.share` cuando está disponible (prácticamente todo el móvil).
 *    Abre la hoja nativa del sistema: WhatsApp, Telegram, correo, AirDrop.
 * 2. Si no, se copia el enlace al portapapeles con confirmación visible.
 * 3. Y siempre, un acceso directo a WhatsApp, que es donde de verdad se comparte
 *    en su mercado.
 *
 * Sin contadores de invitados, sin recompensas por invitar y sin pedir la
 * agenda. Compartir algo que te ha servido no necesita soborno, y montar un
 * programa de referidos con premios exigiría condiciones publicadas que hoy no
 * existen.
 */

import { useState } from 'react'
import { Check, Copy, MessageCircle, Share2 } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, whatsAppLink } from '../config/site.config.js'
import { nextChapter } from '../config/chapters.js'
import { trackEvent } from '../lib/analytics/analytics.js'
import '../styles/share-invite.css'

const SHARE_TITLE = 'BAYONA — Entrenamiento con método y acompañamiento real'
const SHARE_TEXT =
  'Te comparto esto: entrenamiento con método, seguimiento real y recursos gratuitos para empezar hoy.'

/** Mensaje para el acceso directo de WhatsApp. */
const whatsAppShareUrl = whatsAppLink(`${SHARE_TEXT}\n${SITE_URL}`)

export default function ShareInvite() {
  const { pathname } = useLocation()
  const [state, setState] = useState('idle')

  /**
   * Solo en las rutas del itinerario, la misma condición que NextChapter. En el
   * checkout o en el 404 pedir que se comparta sería, respectivamente,
   * inoportuno y absurdo.
   */
  const isItineraryRoute = Boolean(nextChapter(pathname))

  const canUseNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const share = async () => {
    trackEvent('share_open', { method: canUseNativeShare ? 'native' : 'clipboard' })

    if (canUseNativeShare) {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: SITE_URL })
        setState('shared')
        trackEvent('share_completed', { method: 'native' })
      } catch {
        /* La persona canceló la hoja de compartir. No es un error. */
      }
      return
    }

    try {
      await navigator.clipboard.writeText(SITE_URL)
      setState('copied')
      trackEvent('share_completed', { method: 'clipboard' })
    } catch {
      /* Sin permiso de portapapeles: queda el acceso de WhatsApp al lado. */
      setState('idle')
    }
  }

  const feedback = {
    copied: 'ENLACE COPIADO',
    shared: 'GRACIAS POR COMPARTIR',
  }[state]

  if (!isItineraryRoute) return null

  return (
    <section className="share-invite" aria-labelledby="share-invite-title">
      <div className="section-shell share-invite-inner">
        <div className="share-invite-copy">
          <p className="share-invite-eyebrow">SI ESTO LE SIRVE A ALGUIEN</p>
          <h2 id="share-invite-title">
            PÁSALO.
            <br />
            <span>NO CUESTA NADA.</span>
          </h2>
          <p>
            Los recursos son gratis y la comunidad está abierta. Si conoces a alguien que lleva
            tiempo queriendo empezar, esto le puede servir más que un consejo.
          </p>
        </div>

        <div className="share-invite-actions">
          <button type="button" className="share-invite-primary" onClick={share}>
            {state === 'idle' ? (
              <>
                {canUseNativeShare ? (
                  <Share2 size={16} strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Copy size={16} strokeWidth={1.5} aria-hidden="true" />
                )}
                {canUseNativeShare ? 'COMPARTIR' : 'COPIAR ENLACE'}
              </>
            ) : (
              <>
                <Check size={16} strokeWidth={1.8} aria-hidden="true" />
                {feedback}
              </>
            )}
          </button>

          <a
            className="share-invite-whatsapp"
            href={whatsAppShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('share_completed', { method: 'whatsapp' })}
          >
            <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
            ENVIAR POR WHATSAPP
          </a>
        </div>

        {/* Confirmación anunciada para lectores de pantalla. */}
        <p className="share-invite-status" role="status" aria-live="polite">
          {feedback ?? ''}
        </p>
      </div>
    </section>
  )
}
