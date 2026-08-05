// CustomCursor - cursor dorado personalizado para Desktop (Requirements 14.1,
// 14.2, 14.3, 14.4).
//
// Se compone de dos piezas:
//   1. `CustomCursor` (export): PUERTA de capacidades. Lee el CapabilityContext
//      y, si los efectos de puntero NO estan habilitados (Mobile o
//      `prefers-reduced-motion`), devuelve `null` -> el cursor no se monta y no
//      registra ningun listener ni oculta el cursor nativo (R14.3, R14.4).
//   2. `CursorDot` (interno): capa visual real. Solo se monta en Desktop sin
//      movimiento reducido, por lo que puede llamar a sus hooks de forma
//      incondicional (respeta las reglas de hooks de React).
//
// La regla de activacion vive en `pointerEffectsEnabled` (modulo puro de
// capacidades), verificada de forma aislada por la Property 4 del diseno
// ("Cursor/hover solo Desktop"); aqui solo se consume.

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { theme } from '../config/theme.js'
import { motionTokens } from '../config/motionTokens.js'
import { useCapabilities } from '../hooks/useCapabilities.js'
import { pointerEffectsEnabled } from '../providers/capabilities.js'

// Diametro (px) del punto del cursor en reposo.
const CURSOR_SIZE = 16

// Escala del punto en reposo y al sobrevolar un elemento interactivo (R14.2).
const SCALE_REST = 1
const SCALE_HOVER = 2.6

// z-index muy alto: el cursor debe dibujarse por encima de todo, incluida la
// capa de grano (`GrainOverlay`, z-index inferior).
const CURSOR_Z_INDEX = 10000

// Elementos considerados "interactivos" ante los que el cursor crece (R14.2).
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'

/**
 * Indica si el objetivo de un evento (o alguno de sus ancestros) es un elemento
 * interactivo segun `INTERACTIVE_SELECTOR`.
 *
 * @param {EventTarget|null} target Objetivo del evento de puntero.
 * @returns {boolean} `true` si el objetivo esta dentro de un elemento interactivo.
 */
function isInteractiveTarget(target) {
  return target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null
}

/**
 * Capa visual del cursor. Se asume SIEMPRE montada en Desktop sin movimiento
 * reducido (la puerta `CustomCursor` garantiza esa condicion), de modo que sus
 * hooks se ejecutan de forma incondicional.
 *
 * - Sigue el puntero suavizando su posicion con springs (`useMotionValue` +
 *   `useSpring`) alimentados por `pointermove` en `window` (R14.1).
 * - Crece (escala por spring) mientras el puntero esta sobre un elemento
 *   interactivo, detectado con `pointerover`/`pointerout` en `window` (R14.2).
 * - Oculta el cursor nativo (`document.body.style.cursor = 'none'`) mientras
 *   esta montado y lo restaura al desmontar, junto con todos los listeners.
 *
 * @returns {JSX.Element} Punto dorado en `position: fixed`.
 */
function CursorDot() {
  // Posicion cruda del puntero (fuera de pantalla al inicio para evitar un
  // parpadeo en la esquina superior izquierda antes del primer movimiento).
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const rawScale = useMotionValue(SCALE_REST)

  // Suavizado por resorte de posicion (suave) y escala (magnetico), tomando las
  // curvas de `motionTokens` (fuente unica, sin literales locales, R10.4).
  const x = useSpring(rawX, motionTokens.spring.soft)
  const y = useSpring(rawY, motionTokens.spring.soft)
  const scale = useSpring(rawScale, motionTokens.spring.magnetic)

  useEffect(() => {
    // Ocultar el cursor nativo mientras el cursor personalizado esta montado,
    // preservando el valor previo para restaurarlo en el cleanup.
    const previousBodyCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    const handleMove = (event) => {
      rawX.set(event.clientX)
      rawY.set(event.clientY)
    }

    const handleOver = (event) => {
      if (isInteractiveTarget(event.target)) {
        rawScale.set(SCALE_HOVER)
      }
    }

    const handleOut = (event) => {
      if (isInteractiveTarget(event.target)) {
        rawScale.set(SCALE_REST)
      }
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerover', handleOver)
    window.addEventListener('pointerout', handleOut)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerover', handleOver)
      window.removeEventListener('pointerout', handleOut)
      document.body.style.cursor = previousBodyCursor
    }
  }, [rawX, rawY, rawScale])

  return (
    <motion.div
      aria-hidden="true"
      className="bayona-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        // Centrar el punto sobre la posicion del puntero (los springs x/y
        // aplican translate desde la esquina superior izquierda).
        marginLeft: -CURSOR_SIZE / 2,
        marginTop: -CURSOR_SIZE / 2,
        // Excepcion visual del propio cursor: es un circulo, unico uso de
        // borderRadius en el motor (la UI mantiene bordes afilados, R9.5).
        borderRadius: '50%',
        backgroundColor: theme.color.gold,
        // No captura eventos: el puntero interactua con la UI subyacente.
        pointerEvents: 'none',
        zIndex: CURSOR_Z_INDEX,
        // Mezcla opcional para legibilidad sobre fondos claros u oscuros.
        mixBlendMode: 'difference',
        x,
        y,
        scale,
      }}
    />
  )
}

/**
 * Cursor dorado personalizado del Experience_Engine.
 *
 * Puerta de capacidades: monta la capa visual `CursorDot` SOLO cuando
 * `pointerEffectsEnabled` es verdadero, es decir en Desktop y sin
 * `prefers-reduced-motion`. En Mobile (R14.3) o con movimiento reducido (R14.4)
 * devuelve `null`, por lo que el cursor no se monta, no registra listeners y no
 * altera el cursor nativo del sistema.
 *
 * @returns {JSX.Element|null} `CursorDot` en Desktop; `null` en el resto.
 */
export function CustomCursor() {
  const caps = useCapabilities()
  if (!pointerEffectsEnabled(caps)) {
    return null
  }
  return <CursorDot />
}
