export const WHATSAPP_NUMBER = '34614988006'

const COP_PER_EUR_REFERENCE = 4300
const COP_PER_USD_REFERENCE = 4000

export function formatCop(valueCop) {
  return `$${Math.round(Number(valueCop)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

function formatEurApprox(valueCop) {
  return `≈ €${Math.round(Number(valueCop) / COP_PER_EUR_REFERENCE)}`
}

export function formatUsdApprox(valueCop) {
  return `≈ $${Math.round(Number(valueCop) / COP_PER_USD_REFERENCE)} USD`
}

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function buildPlanWhatsAppUrl(plan) {
  return buildWhatsAppUrl([
    `Hola BAYONA, quiero empezar mi transformación con ${plan.name}.`,
    `Inversión publicada: ${plan.priceDisplay} ${plan.currency} · ${plan.eur} · ${plan.usdDisplay}.`,
    'Quiero conocer el siguiente paso.',
  ].join('\n'))
}

function createMembershipPlan(plan) {
  const normalizedPlan = {
    ...plan,
    priceDisplay: formatCop(plan.priceCop),
    price: formatCop(plan.priceCop),
    currency: 'COP/mes',
    unit: 'COP/mes',
    description: plan.shortDescription,
    eur: plan.eurDisplay ?? formatEurApprox(plan.priceCop),
    usdDisplay: plan.usdDisplay ?? `≈ $${plan.usd} USD`,
  }

  return {
    ...normalizedPlan,
    cta: buildPlanWhatsAppUrl(normalizedPlan),
  }
}

export const membershipPlans = [
  createMembershipPlan({
    id: 'RAIZ',
    name: 'RAÍZ',
    journey: 'RECONSTRUCCIÓN',
    priceCop: 149000,
    eurDisplay: '≈ €35',
    usd: 38,
    tag: 'PARA EMPEZAR BIEN',
    presentationUrl: '/docs/plan-raiz.pdf',
    shortDescription: 'Cada día sabes qué hacer y alguien te ayuda a sostenerlo.',
    audience: 'Llevas tiempo sin entrenar y quieres empezar bien.',
    problem: 'Dejas de improvisar. Cada día sabes qué hacer.',
    feeling: 'Sales de cada sesión sabiendo que hiciste lo correcto.',
    closing: 'Tu primer paso. El más importante.',
    included: [
      'Plan de entrenamiento mensual personalizado',
      '1 sesión virtual 1:1 al mes con tu entrenador',
      'Plan de alimentación simple que puedes seguir (con lista de mercado)',
      'Seguimiento quincenal con ajustes',
      'Cada ejercicio explicado en video',
      'Soporte por WhatsApp cuando lo necesites',
      'Comunidad BAYONA',
    ],
    excluded: [
      'Videollamadas privadas',
    ],
  }),
  createMembershipPlan({
    id: 'FUERZA',
    name: 'FUERZA',
    journey: 'PROGRESO REAL',
    priceCop: 299000,
    eurDisplay: '≈ €70',
    usd: 76,
    tag: 'ENTRENA CON ALGUIEN',
    featured: true,
    presentationUrl: '/docs/plan-fuerza.pdf',
    shortDescription: 'Entrenas en vivo con alguien que te guía y te empuja a avanzar.',
    audience: 'Ya entrenas, pero quieres que alguien revise y corrija.',
    problem: 'Tienes un entrenador guiándote en vivo dos veces al mes.',
    feeling: 'Dejas de dudar si lo estás haciendo bien.',
    socialProof: 'El equilibrio ideal entre guía, sesiones y seguimiento.',
    includedLead: 'Todo RAÍZ más:',
    included: [
      '2 sesiones virtuales 1:1 al mes con tu entrenador',
      'Plan de alimentación personalizado según tu objetivo',
      'Seguimiento semanal con ajustes',
      '1 videollamada mensual con Sebastián (30 min)',
      'Respuestas prioritarias por WhatsApp',
    ],
  }),
  createMembershipPlan({
    id: 'RENDIMIENTO',
    name: 'RENDIMIENTO',
    journey: 'TRANSFORMACIÓN TOTAL',
    priceCop: 499000,
    eurDisplay: '≈ €116',
    usd: 125,
    tag: 'RESULTADOS VISIBLES',
    presentationUrl: '/docs/plan-rendimiento.pdf',
    shortDescription: 'Guía directa, cuatro sesiones en vivo y ajustes para transformar tu esfuerzo en resultados.',
    audience: 'Vas en serio. Quieres resultados y quieres acompañamiento real.',
    problem: 'Dejas de improvisar. Tu cuerpo cambia semana a semana.',
    feeling: 'Resultados. Te ves y te sientes diferente.',
    includedLead: 'Todo FUERZA más:',
    included: [
      '4 sesiones virtuales 1:1 al mes con tu entrenador',
      'Evaluación biomecánica inicial completa',
      'Protocolos de biohacking personalizados',
      'Plan de alimentación avanzado con ajustes semanales',
      'WhatsApp prioritario 24/7',
      'Acceso anticipado a la app BAYONA+',
    ],
  }),
  createMembershipPlan({
    id: 'ELITE',
    name: 'ELITE',
    journey: 'DOMINIO TOTAL',
    priceCop: 899000,
    eurDisplay: '≈ €209',
    usd: 226,
    tag: 'ACOMPAÑAMIENTO PRIVADO · MÁXIMO 10 CUPOS',
    badge: 'ACOMPAÑAMIENTO PRIVADO · MÁXIMO 10 CUPOS',
    presentationUrl: '/docs/plan-elite.pdf',
    shortDescription: 'Sebastián, ocho sesiones privadas y cada detalle diseñado alrededor de ti.',
    audience: 'Quieres lo máximo. Acompañamiento privado y resultados extraordinarios.',
    problem: 'Dejas de improvisar. Tienes a Sebastián para ti. Cada detalle personalizado.',
    feeling: 'Transformación completa. Cuerpo, mente y método.',
    scarcity: 'SOLO 10 CUPOS DISPONIBLES',
    urgency: 'Quedan 3 cupos de 10',
    includedLead: 'Todo RENDIMIENTO más:',
    included: [
      '8 sesiones privadas al mes (virtuales o presenciales en España)',
      'WhatsApp DIRECTO con Sebastián (chat privado)',
      'Plan 100% personalizado con biohacking avanzado',
      'Eventos privados VIP',
      'Acceso de por vida al contenido',
      'SOLO 10 CUPOS DISPONIBLES',
    ],
  }),
]

function findMembershipPlan(planId) {
  const normalizedId = String(planId ?? '').toUpperCase()
  return membershipPlans.find((plan) => plan.id === normalizedId || plan.name === planId)
}

export const programAudiences = [
  {
    id: 'ninos',
    icon: 'baby',
    title: 'NIÑOS',
    detail: '5 — 11',
    copy: 'Juego, confianza y disciplina desde pequeño.',
  },
  {
    id: 'jovenes',
    icon: 'sparkles',
    title: 'JÓVENES',
    detail: '12 — 17',
    copy: 'Energía, identidad y desafío en cada sesión.',
  },
  {
    id: 'adultos',
    icon: 'dumbbell',
    title: 'ADULTOS',
    detail: '18 — 59',
    copy: 'Fuerza, energía y hábitos para tu vida real.',
  },
  {
    id: 'deportistas',
    icon: 'trophy',
    title: 'DEPORTISTAS',
    detail: 'OBJETIVO / RENDIMIENTO',
    copy: 'Rendimiento y técnica para tu disciplina.',
  },
  {
    id: 'senior',
    icon: 'accessibility',
    title: 'SENIOR',
    detail: '60+',
    copy: 'Movilidad, autonomía y calidad de vida.',
  },
]

export const membershipComparisonRows = [
  {
    feature: 'Sesiones con entrenador',
    values: ['1 virtual/mes', '2 virtuales/mes', '4 virtuales/mes', '8 privadas/mes'],
  },
  {
    feature: 'Plan de alimentación',
    values: ['Simple', 'Personalizado', 'Avanzado', 'Elite semanal'],
  },
  {
    feature: 'Alguien revisa tu progreso',
    values: ['Quincenal', 'Semanal', 'Semanal', 'Directo'],
  },
  {
    feature: 'Videollamada con Sebastián',
    values: ['—', '1/mes', '—', 'Semanal'],
  },
  {
    feature: 'WhatsApp',
    values: ['Soporte', 'Prioritario', '24/7', 'Directo privado'],
  },
  {
    feature: 'Evaluación biomecánica',
    values: ['—', '—', 'Incluida', 'Incluida'],
  },
  {
    feature: 'Biohacking',
    values: ['—', '—', 'Incluido', 'Avanzado'],
  },
  {
    feature: 'Cupos',
    values: ['Sin límite', 'Sin límite', 'Sin límite', 'Máximo 10'],
  },
]

export const COMMERCIAL_SCOPE_NOTICE = 'BAYONA ofrece acompañamiento de entrenamiento dentro de un marco no médico. No diagnostica, trata ni sustituye atención sanitaria. Servicios presenciales sujetos a ubicación y disponibilidad.'

function buildServiceWhatsAppUrl(service) {
  return buildWhatsAppUrl([
    `Hola BAYONA, quiero añadir ${service.label} a mi transformación.`,
    `Precio publicado: ${formatCop(service.priceCop)} COP.`,
    '¿Cuál es el siguiente paso?',
  ].join('\n'))
}

function createService(service) {
  const normalizedService = {
    ...service,
    priceDisplay: formatCop(service.priceCop),
  }

  return {
    ...normalizedService,
    cta: buildServiceWhatsAppUrl(normalizedService),
  }
}

export const serviceCategoryDefinitions = Object.freeze([
  Object.freeze({ id: 'CLASES', title: 'CLASES', promise: 'Entrena con alguien' }),
  Object.freeze({ id: 'RECUPERACIÓN', title: 'RECUPERACIÓN', promise: 'Cuida tu cuerpo' }),
  Object.freeze({ id: 'RENDIMIENTO', title: 'RENDIMIENTO', promise: 'Lleva tu cuerpo al siguiente nivel' }),
])

export const sessionServices = [
  createService({
    id: 'virtual-1to1',
    label: 'Clase virtual 1:1 extra',
    category: 'CLASES',
    description: 'Una sesión privada para corregir, avanzar y salir con claridad.',
    priceCop: 35000,
    quantities: [0, 1, 2, 4, 8, 12],
  }),
  createService({
    id: 'presencial-espana-1to1',
    label: 'Clase presencial',
    category: 'CLASES',
    description: 'Entrenamiento cuerpo a cuerpo con atención total en cada movimiento.',
    priceCop: 60000,
    quantities: [0, 1, 2, 4, 8],
    presencial: true,
  }),
  createService({
    id: 'grupal-virtual',
    label: 'Clase grupal virtual',
    category: 'CLASES',
    description: 'Energía de grupo, guía en vivo y una comunidad que avanza contigo.',
    priceCop: 25000,
    quantities: [0, 1, 2, 4, 8, 12],
  }),
]

export const extraServices = [
  createService({
    id: 'masaje-deportivo',
    label: 'Masaje deportivo',
    category: 'RECUPERACIÓN',
    description: 'Tu cuerpo trabaja duro. Dale una recuperación a la misma altura.',
    priceCop: 80000,
    presencial: true,
    healthScope: true,
  }),
  createService({
    id: 'protocolo-recuperacion',
    label: 'Protocolo de recuperación',
    category: 'RECUPERACIÓN',
    description: 'Una ruta clara para recuperar mejor entre sesiones.',
    priceCop: 30000,
    healthScope: true,
  }),
  createService({
    id: 'movilidad-asistida',
    label: 'Movilidad asistida',
    category: 'RECUPERACIÓN',
    description: 'Recupera libertad de movimiento con guía personalizada.',
    priceCop: 40000,
    presencial: true,
  }),
  createService({
    id: 'pilates-1to1',
    label: 'Pilates 1:1',
    category: 'RECUPERACIÓN',
    description: 'Control corporal que se nota en cada movimiento de tu día.',
    priceCop: 40000,
  }),
  createService({
    id: 'yoga-terapeutico',
    label: 'Yoga terapéutico',
    category: 'RECUPERACIÓN',
    description: 'Muévete mejor, respira mejor y vuelve a sentir tu cuerpo.',
    priceCop: 40000,
    healthScope: true,
  }),
  createService({
    id: 'parkour-tecnico',
    label: 'Parkour técnico',
    category: 'RENDIMIENTO',
    description: 'Supera cualquier obstáculo, físico y mental.',
    priceCop: 50000,
    presencial: true,
  }),
  createService({
    id: 'boxeo-funcional',
    label: 'Boxeo funcional',
    category: 'RENDIMIENTO',
    description: 'Potencia, coordinación y confianza en una sesión intensa.',
    priceCop: 50000,
  }),
  createService({
    id: 'calistenia-avanzada',
    label: 'Calistenia avanzada',
    category: 'RENDIMIENTO',
    description: 'Domina tu propio peso y construye fuerza que se siente.',
    priceCop: 50000,
  }),
  createService({
    id: 'preparacion-fisica',
    label: 'Preparación física',
    category: 'RENDIMIENTO',
    description: 'Más fuerte, más rápido y más resistente para tu disciplina.',
    priceCop: 50000,
  }),
  createService({
    id: 'biohacking',
    label: 'Biohacking',
    category: 'RENDIMIENTO',
    description: 'Optimiza tu cuerpo con ciencia más allá del entrenamiento.',
    priceCop: 50000,
    healthScope: true,
  }),
  createService({
    id: 'evaluacion-biomecanica',
    label: 'Evaluación biomecánica',
    category: 'RENDIMIENTO',
    description: 'Entendemos cómo se mueve tu cuerpo para decidir mejor.',
    priceCop: 100000,
    healthScope: true,
  }),
  createService({
    id: 'composicion-corporal',
    label: 'Análisis corporal',
    category: 'RENDIMIENTO',
    description: 'Una referencia clara para comprender tu punto de partida.',
    priceCop: 70000,
    healthScope: true,
  }),
  createService({
    id: 'alimentacion-avanzada',
    label: 'Plan alimentación avanzado',
    category: 'RENDIMIENTO',
    description: 'Una estrategia de alimentación que puedes seguir y ajustar.',
    priceCop: 80000,
    healthScope: true,
  }),
]

export const editorialServices = [...sessionServices, ...extraServices]

function validateSelection(selection) {
  const {
    planId,
    serviceQuantities = {},
    extraIds = [],
  } = selection ?? {}
  const plan = findMembershipPlan(planId)

  if (!plan) throw new Error(`Plan desconocido: ${String(planId)}`)
  if (!serviceQuantities || typeof serviceQuantities !== 'object' || Array.isArray(serviceQuantities)) {
    throw new TypeError('Las cantidades de servicios deben proporcionarse como un objeto.')
  }
  if (!Array.isArray(extraIds)) {
    throw new TypeError('Los servicios extra deben proporcionarse como una lista de identificadores.')
  }

  const sessionById = new Map(sessionServices.map((service) => [service.id, service]))
  const extraById = new Map(extraServices.map((service) => [service.id, service]))

  for (const serviceId of Object.keys(serviceQuantities)) {
    if (!sessionById.has(serviceId)) {
      throw new Error(`Servicio por cantidad desconocido: ${serviceId}`)
    }
  }

  const quantitiesById = new Map()
  for (const service of sessionServices) {
    const rawQuantity = serviceQuantities[service.id] ?? 0
    let quantity

    try {
      quantity = Number(rawQuantity)
    } catch {
      throw new RangeError(`Cantidad no permitida para ${service.id}: ${String(rawQuantity)}`)
    }

    if (!service.quantities.includes(quantity)) {
      throw new RangeError(`Cantidad no permitida para ${service.id}: ${String(rawQuantity)}`)
    }
    quantitiesById.set(service.id, quantity)
  }

  for (const extraId of extraIds) {
    if (!extraById.has(extraId)) throw new Error(`Servicio extra desconocido: ${String(extraId)}`)
  }

  return {
    plan,
    quantitiesById,
    selectedExtraIds: new Set(extraIds),
  }
}

export function calculateExperience(selection) {
  const { plan, quantitiesById, selectedExtraIds } = validateSelection(selection)
  const sessions = sessionServices.map((service) => {
    const quantity = quantitiesById.get(service.id)
    return {
      ...service,
      quantity,
      subtotalCop: service.priceCop * quantity,
    }
  })
  const extras = extraServices
    .filter((service) => selectedExtraIds.has(service.id))
    .map((service) => ({ ...service, subtotalCop: service.priceCop }))
  const totalCop = sessions.reduce((total, service) => total + service.subtotalCop, plan.priceCop)
    + extras.reduce((total, service) => total + service.subtotalCop, 0)

  return {
    plan,
    sessions,
    extras,
    totalCop,
    totalDisplay: formatCop(totalCop),
    eurApprox: formatEurApprox(totalCop),
    usdApprox: totalCop === plan.priceCop ? plan.usdDisplay : formatUsdApprox(totalCop),
  }
}

export function buildExperienceWhatsAppUrl(selection) {
  const calculation = calculateExperience(selection)
  const sessionLines = calculation.sessions
    .filter((service) => service.quantity > 0)
    .map((service) => `- ${service.label}: ${service.quantity} × ${formatCop(service.priceCop)}`)
  const extraLines = calculation.extras
    .map((service) => `- ${service.label}: ${formatCop(service.priceCop)}`)
  const selectedLines = [...sessionLines, ...extraLines]
  const contact = selection?.contact ?? {}
  const contactFields = [
    ['Nombre', contact.nombre ?? contact.name],
    ['Email', contact.email],
    ['WhatsApp', contact.whatsapp],
  ]
    .map(([label, value]) => [label, String(value ?? '').replace(/\s+/g, ' ').trim()])
    .filter(([, value]) => value)
  const contactLines = contactFields.length
    ? ['Datos para la solicitud:', ...contactFields.map(([label, value]) => `- ${label}: ${value}`)]
    : []
  const message = [
    'Hola BAYONA, quiero construir mi transformación.',
    ...contactLines,
    `Plan base: ${calculation.plan.name} — ${calculation.plan.priceDisplay} ${calculation.plan.currency}`,
    'Lo que quiero añadir:',
    ...(selectedLines.length ? selectedLines : ['- Sin extras por ahora']),
    `Mi camino: ${calculation.totalDisplay} COP (${calculation.eurApprox} · ${calculation.usdApprox}).`,
    'Siguiente paso: confirmar disponibilidad, ubicación cuando aplique y precio vigente.',
    'Esta solicitud no constituye pago, pedido, inscripción, disponibilidad ni acceso confirmados.',
    'Quiero revisar mi camino y dar el siguiente paso.',
  ].join('\n')

  return buildWhatsAppUrl(message)
}
