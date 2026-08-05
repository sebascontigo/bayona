// useLenis - hook de smooth scroll con Lenis (Requirements 19.1, 19.3, 19.4).
//
// Encapsula el ciclo de vida de una instancia UNICA de Lenis:
//   - Con `reducedMotion` NO se instancia Lenis: se respeta el scroll nativo del
//     navegador (R19.3) y el hook devuelve un ref cuyo `current` es `null`.
//   - En caso contrario crea `new Lenis(...)` y sincroniza su reloj interno con
//     un bucle `requestAnimationFrame` -> `lenis.raf(time)` (R19.1).
//   - Al desmontar (o al cambiar `reducedMotion`) detiene el bucle con
//     `cancelAnimationFrame` y libera listeners con `destroy()`, EXACTAMENTE una
//     vez, evitando fugas de recursos y listeners (R19.4).

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Monta una instancia de Lenis para smooth scroll y expone la instancia viva.
 *
 * @param {{ reducedMotion?: boolean }} [options]
 * @param {boolean} [options.reducedMotion=false] Si es `true` no se instancia
 *   Lenis y se usa el scroll nativo del navegador (R19.3).
 * @returns {import('react').MutableRefObject<import('lenis').default|null>}
 *   Ref cuyo `current` es la instancia de Lenis, o `null` con `reducedMotion`.
 */
export function useLenis({ reducedMotion = false } = {}) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Movimiento reducido: se respeta el scroll nativo, no se instancia Lenis.
    if (reducedMotion) {
      lenisRef.current = null
      return undefined
    }

    const lenis = new Lenis()
    lenisRef.current = lenis

    // Bucle raf unico: alimenta el reloj interno de Lenis en cada fotograma.
    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    })

    // Cleanup: detiene el bucle y libera listeners EXACTAMENTE una vez (R19.4).
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  return lenisRef
}
