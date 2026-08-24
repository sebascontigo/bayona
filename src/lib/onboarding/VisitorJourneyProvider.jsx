/**
 * BAYONA · RECORRIDO DEL VISITANTE
 * ---------------------------------------------------------------------------
 * La recepción de BAYONA ya existía: /onboarding hace tres preguntas y
 * lib/onboarding/routeMap.js las convierte en un plan recomendado, un recurso
 * gratuito acorde al nivel y una puerta a la comunidad. 36 combinaciones
 * explícitas, sin cuenta y sin ceder datos.
 *
 * El problema era que la web olvidaba la respuesta en cuanto cambiabas de
 * página: quien acababa de contar su objetivo volvía a ser un desconocido en
 * Programas. Este contexto es la memoria de esa conversación.
 *
 * ============================================================================
 * POR QUÉ NO SE GUARDA NADA, EN NINGÚN SITIO
 * ============================================================================
 * El onboarding promete cuatro veces, de forma visible, que no guarda datos:
 *
 *   Onboarding.jsx  "Sin cuenta, sin datos guardados."
 *                   "SIN CUENTA · SIN COOKIES · SIN DATOS GUARDADOS"
 *                   "Pase anónimo y temporal. Sin servidor, cookies o
 *                    almacenamiento local."
 *   PaseBayona.jsx  "No guardamos tus datos en servidor, cookies ni
 *                    almacenamiento local."
 *
 * Y el consentimiento que la persona marca está condicionado a esa promesa.
 * Usar localStorage o sessionStorage la convertiría en mentira y excedería el
 * consentimiento otorgado.
 *
 * Así que el recorrido vive EN MEMORIA. Sobrevive a toda la navegación interna,
 * que es exactamente el recorrido de la visita, y desaparece al recargar o
 * cerrar. Es lo que el pase promete: temporal y se borra al salir.
 *
 * Si algún día se quiere que persista, primero hay que cambiar esa copia y
 * volver a pedir consentimiento. No al revés.
 */

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const VisitorJourneyContext = createContext(null)

/** Estado inicial: nadie ha pasado por recepción todavía. */
const EMPTY_JOURNEY = Object.freeze({
  answers: null,
  route: null,
  visitType: null,
})

export function VisitorJourneyProvider({ children }) {
  const [journey, setJourney] = useState(EMPTY_JOURNEY)

  /**
   * Registra el resultado de la recepción.
   * `visitType` distingue a quien respondió las preguntas ('personalized') de
   * quien eligió mirar sin responder ('visitor').
   */
  const completeJourney = useCallback(({ answers, route, visitType }) => {
    setJourney({
      answers: answers ?? null,
      route: route ?? null,
      visitType: visitType ?? 'personalized',
    })
  }, [])

  /** Vuelve al punto de partida. La persona siempre puede rehacer su ruta. */
  const resetJourney = useCallback(() => setJourney(EMPTY_JOURNEY), [])

  const value = useMemo(
    () => ({
      ...journey,
      /** true solo si hay una ruta personalizada utilizable. */
      hasRoute: Boolean(journey.route?.plan),
      /** true si respondió las tres preguntas. */
      isPersonalized: journey.visitType === 'personalized' && Boolean(journey.route),
      completeJourney,
      resetJourney,
    }),
    [journey, completeJourney, resetJourney],
  )

  return <VisitorJourneyContext.Provider value={value}>{children}</VisitorJourneyContext.Provider>
}

/**
 * Lee el recorrido del visitante.
 *
 * Devuelve un objeto seguro incluso sin proveedor, para que cualquier
 * componente o test pueda renderizarse aislado sin envolverlo.
 */
export function useVisitorJourney() {
  const context = useContext(VisitorJourneyContext)

  if (!context) {
    return {
      ...EMPTY_JOURNEY,
      hasRoute: false,
      isPersonalized: false,
      completeJourney: () => {},
      resetJourney: () => {},
    }
  }

  return context
}

/**
 * Identificador del plan recomendado ('RAIZ', 'FUERZA'…), o null.
 * `routeMap.js` usa ids en minúscula y sin tilde; la oferta los usa en
 * mayúscula, así que la traducción se hace aquí una sola vez.
 */
export function useRecommendedPlanId() {
  const { route } = useVisitorJourney()
  if (!route?.id) return null
  if (route.kind === 'visitor') return null
  return String(route.id).toUpperCase()
}
