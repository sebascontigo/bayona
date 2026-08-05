const PLAN_DETAILS = Object.freeze({
  raiz: Object.freeze({
    id: 'raiz',
    plan: 'RAÍZ',
    planHref: '/plan/raiz',
    note: 'Una entrada progresiva para construir base, claridad y constancia sin depender de la improvisación.',
    nextStep: 'Conoce RAÍZ y decide si este nivel de guía encaja con tu momento.',
  }),
  fuerza: Object.freeze({
    id: 'fuerza',
    plan: 'FUERZA',
    planHref: '/plan/fuerza',
    note: 'Una ruta para convertir intención en práctica sostenida con más guía y trabajo de fuerza general.',
    nextStep: 'Explora FUERZA y revisa cómo se integra el acompañamiento en tu semana.',
  }),
  rendimiento: Object.freeze({
    id: 'rendimiento',
    plan: 'RENDIMIENTO',
    planHref: '/plan/rendimiento',
    note: 'Una ruta para una práctica constante que busca estructura, seguimiento y un nivel mayor de exigencia.',
    nextStep: 'Descubre RENDIMIENTO y contrasta su estructura con tu disponibilidad real.',
  }),
  elite: Object.freeze({
    id: 'elite',
    plan: 'ELITE',
    planHref: '/plan/elite',
    note: 'Una ruta para explorar el nivel de acompañamiento más cercano y personalizado de BAYONA.',
    nextStep: 'Conoce ELITE y conversa con una persona antes de tomar cualquier decisión.',
  }),
})

// Matriz explícita: 4 objetivos × 3 niveles de experiencia × 3 ritmos = 36 combinaciones.
export const ROUTE_MATRIX = Object.freeze({
  constancia: Object.freeze({
    inicio: Object.freeze({ 'uno-dos': 'raiz', tres: 'raiz', 'cuatro-mas': 'raiz' }),
    retomo: Object.freeze({ 'uno-dos': 'raiz', tres: 'raiz', 'cuatro-mas': 'fuerza' }),
    constante: Object.freeze({ 'uno-dos': 'raiz', tres: 'fuerza', 'cuatro-mas': 'rendimiento' }),
  }),
  'fuerza-general': Object.freeze({
    inicio: Object.freeze({ 'uno-dos': 'raiz', tres: 'fuerza', 'cuatro-mas': 'fuerza' }),
    retomo: Object.freeze({ 'uno-dos': 'fuerza', tres: 'fuerza', 'cuatro-mas': 'rendimiento' }),
    constante: Object.freeze({ 'uno-dos': 'fuerza', tres: 'rendimiento', 'cuatro-mas': 'rendimiento' }),
  }),
  'movilidad-general': Object.freeze({
    inicio: Object.freeze({ 'uno-dos': 'raiz', tres: 'raiz', 'cuatro-mas': 'raiz' }),
    retomo: Object.freeze({ 'uno-dos': 'raiz', tres: 'raiz', 'cuatro-mas': 'fuerza' }),
    constante: Object.freeze({ 'uno-dos': 'raiz', tres: 'fuerza', 'cuatro-mas': 'rendimiento' }),
  }),
  'comparar-planes': Object.freeze({
    inicio: Object.freeze({ 'uno-dos': 'raiz', tres: 'fuerza', 'cuatro-mas': 'elite' }),
    retomo: Object.freeze({ 'uno-dos': 'raiz', tres: 'fuerza', 'cuatro-mas': 'elite' }),
    constante: Object.freeze({ 'uno-dos': 'fuerza', tres: 'elite', 'cuatro-mas': 'elite' }),
  }),
})

const PROTOCOL_RESOURCE = Object.freeze({
  resource: 'PROTOCOLO 7 DÍAS',
  resourceHref: '/resources',
  resourceNote: 'Una forma breve de probar el método y convertir una intención general en una primera acción.',
})

const CHALLENGE_RESOURCE = Object.freeze({
  resource: 'RETO 30 DÍAS',
  resourceHref: '/resources',
  resourceNote: 'Un recorrido gratuito para poner a prueba tu constancia y observar cómo respondes a una estructura.',
})

const COMMUNITY_BY_EXPERIENCE = Object.freeze({
  inicio: 'Un espacio para preguntar, observar y empezar acompañado.',
  retomo: 'Un espacio para recuperar ritmo junto a personas que también están avanzando.',
  constante: 'Un espacio para sostener el progreso, compartir aprendizajes y seguir elevando la práctica.',
})

export const VISITOR_ROUTE = Object.freeze({
  kind: 'visitor',
  id: 'ecosistema',
  plan: 'ECOSISTEMA BAYONA',
  planHref: '/programs',
  note: 'Recorre el método, los programas, los recursos y la comunidad sin crear una cuenta ni compartir datos.',
  resource: 'RECURSOS GRATUITOS',
  resourceHref: '/resources',
  resourceNote: 'Explora herramientas abiertas antes de decidir si quieres una orientación personal.',
  community: 'COMUNIDAD BAYONA',
  communityHref: '/community',
  communityNote: 'Conoce el espacio humano que acompaña el recorrido.',
  nextStep: 'Explora una zona del ecosistema o personaliza tu camino en menos de 60 segundos.',
})

export function hasCompleteAnswers(answers = {}) {
  return Boolean(
    ROUTE_MATRIX[answers.goal]?.[answers.experience]?.[answers.availability],
  )
}

export function mapAnswersToRoute(answers = {}) {
  const planId = ROUTE_MATRIX[answers.goal]?.[answers.experience]?.[answers.availability]
  if (!planId) return null

  const plan = PLAN_DETAILS[planId]
  const resource = answers.experience === 'inicio' || answers.availability === 'uno-dos'
    ? PROTOCOL_RESOURCE
    : CHALLENGE_RESOURCE

  return {
    kind: 'personalized',
    ...plan,
    ...resource,
    community: 'COMUNIDAD BAYONA',
    communityHref: '/community',
    communityNote: COMMUNITY_BY_EXPERIENCE[answers.experience],
  }
}
