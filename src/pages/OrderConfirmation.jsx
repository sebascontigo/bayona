import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buildWhatsAppUrl } from '../config/offerings.js'

const whatsappUrl = buildWhatsAppUrl([
  'Hola BAYONA, envié una solicitud desde la web.',
  'Quiero revisar la información disponible sobre los siguientes pasos.',
  'Entiendo que el tiempo de respuesta puede variar y que este mensaje no completa ninguna compra ni cobro.',
].join('\n'))

export default function OrderConfirmation() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="confirmation" aria-labelledby="confirmation-title">
      <div className="confirmation-lines" aria-hidden="true" />

      <motion.div
        className="confirmation-shell"
        data-motion={prefersReducedMotion ? 'static' : 'enhanced'}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <header className="confirmation-intro">
          <div className="confirmation-status">
            <span className="confirmation-check" aria-hidden="true">
              <Check size={20} strokeWidth={1.8} />
            </span>
            <p>BAYONA / SOLICITUD RECIBIDA</p>
          </div>

          <h1 id="confirmation-title">
            ¡RECIBÍ TU <span>SOLICITUD!</span>
          </h1>
          <p className="confirmation-lead">
            Hemos recibido los datos que decidiste compartir. Esto registra únicamente tu solicitud;
            ninguna compra ni cobro se completa en esta página.
          </p>
        </header>

        <section className="confirmation-next" aria-labelledby="confirmation-next-title">
          <div className="confirmation-next-heading">
            <p>QUÉ OCURRE AHORA</p>
            <h2 id="confirmation-next-title">SIGUIENTES PASOS</h2>
          </div>

          <ol className="confirmation-steps" aria-label="Siguientes pasos después de enviar la solicitud">
            <li>
              <span aria-hidden="true">01</span>
              <div>
                <h3>REVISA WHATSAPP</h3>
                <p>
                  La conversación y la confirmación de los siguientes pasos continúan por WhatsApp.
                  El tiempo de respuesta puede variar y no tiene un plazo garantizado.
                </p>
                <a
                  className="confirmation-step-link"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Revisar en WhatsApp <ArrowRight aria-hidden="true" size={17} />
                </a>
              </div>
            </li>

            <li>
              <span aria-hidden="true">02</span>
              <div>
                <h3>COMUNIDAD ABIERTA</h3>
                <p>
                  Puedes conocer el espacio comunitario y pedir la información vigente sin una compra previa.
                </p>
                <Link className="confirmation-step-link" to="/community">
                  Conocer la comunidad <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </li>

            <li>
              <span aria-hidden="true">03</span>
              <div>
                <h3>EMPIEZA GRATIS</h3>
                <p>
                  Explora el Reto 30 Días voluntario y los recursos gratuitos a tu ritmo, sin promesas de resultados.
                </p>
                <Link className="confirmation-step-link" to="/resources#reto-30-dias">
                  Ver Reto 30 Días y recursos <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </li>
          </ol>
        </section>
      </motion.div>
    </section>
  )
}
