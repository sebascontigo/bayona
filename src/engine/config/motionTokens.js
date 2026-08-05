// Motion_Tokens - fuente UNICA de duraciones y curvas del Motion_System
// (Requirement 10.3).
//
// Todo el Experience_Engine (variantes de Framer Motion, springs, transiciones
// de pagina, magnetic/tilt) deriva sus valores de este objeto. No debe existir
// ninguna duracion ni curva de easing/resorte duplicada fuera de aqui (R10.4);
// la Property 7 del diseno verifica esa invariante.

export const motionTokens = {
  // Duraciones en segundos.
  duration: {
    fast: 0.2, // micro-interacciones (hover, tap)
    base: 0.4, // reveals y transiciones estandar
    slow: 0.8, // movimientos amplios / enfasis
    curtain: 0.82, // cortina de Page_Transition
  },

  // Curvas de easing cubic-bezier (R10.1): [x1, y1, x2, y2].
  ease: {
    standard: [0.4, 0, 0.2, 1], // easing general
    entrance: [0.16, 1, 0.3, 1], // entradas con overshoot suave
    curtain: [0.76, 0, 0.24, 1], // cortina de transicion de pagina
  },

  // Animacion basada en resortes (R10.2): rigidez y amortiguacion.
  spring: {
    soft: { stiffness: 120, damping: 18 }, // reveals / respuesta suave
    magnetic: { stiffness: 220, damping: 22 }, // CTAs magneticas / tilt
  },
}
