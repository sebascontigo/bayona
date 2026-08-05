import { membershipPlanEditorialProjection } from '../../config/conversionContent.js'

/** @typedef {'constancia'|'comprension'|'personalizacion'|'acompanamiento-directo'} Motivation */
/** @typedef {'inicio'|'retomo'|'constante'} Experience */
/** @typedef {'estructura'|'seguimiento-semanal'|'sesiones-privadas'} SupportLevel */
/** @typedef {'uno-dos'|'tres'|'cuatro-mas'} Availability */
/** @typedef {'RAIZ'|'PERFORMANCE'|'ELITE'} CanonicalPlanId */
/** @typedef {'motivation'|'experience'|'supportLevel'|'availability'} RecommendationField */

/**
 * @typedef {Object} RecommendationInput
 * @property {Motivation} motivation
 * @property {Experience} experience
 * @property {SupportLevel=} supportLevel Dimensión de Home/Programas; excluyente con availability.
 * @property {Availability=} availability Dimensión de Inicio Guiado; excluyente con supportLevel.
 */

/**
 * @typedef {Object} RecommendationValidationError
 * @property {string} code Código estable para tests y consumidores.
 * @property {string} path Campo asociado al error.
 * @property {string} message Explicación en español que no reproduce datos sensibles.
 */

/**
 * @typedef {Object} RecommendationReason
 * @property {string} ruleId Regla versionada que procesó la respuesta.
 * @property {string} answer Respuesta cerrada considerada.
 * @property {string} reason Razón visible basada en una característica publicada.
 */

/**
 * @typedef {Object} RecommendationResult
 * @property {CanonicalPlanId} planId
 * @property {ReadonlyArray<RecommendationReason>} reasons Una razón por cada respuesta usada.
 * @property {ReadonlyArray<CanonicalPlanId>} alternatives Exactamente los otros planes canónicos.
 * @property {string} ruleVersion
 * @property {string} disclaimer
 * @property {Readonly<Record<CanonicalPlanId, number>>} scores Puntuación reproducible por plan.
 * @property {{type:'highest-score'|'conservative-tie-break', candidates:ReadonlyArray<CanonicalPlanId>, reason:string}} decision
 */

export const MOTIVATIONS = Object.freeze([
  'constancia',
  'comprension',
  'personalizacion',
  'acompanamiento-directo',
])

export const EXPERIENCES = Object.freeze([
  'inicio',
  'retomo',
  'constante',
])

export const SUPPORT_LEVELS = Object.freeze([
  'estructura',
  'seguimiento-semanal',
  'sesiones-privadas',
])

export const AVAILABILITIES = Object.freeze([
  'uno-dos',
  'tres',
  'cuatro-mas',
])

export const RECOMMENDATION_VOCABULARY = Object.freeze({
  motivation: MOTIVATIONS,
  experience: EXPERIENCES,
  supportLevel: SUPPORT_LEVELS,
  availability: AVAILABILITIES,
})

/**
 * La versión cambia cuando cambia una regla, su puntuación o el orden de desempate.
 */
export const RECOMMENDATION_RULE_VERSION = '1.0.0'

/**
 * Orden explícito de menor a mayor alcance comercial. Solo interviene si dos o
 * más planes comparten la puntuación máxima; nunca se usa el precio como señal.
 *
 * @type {ReadonlyArray<CanonicalPlanId>}
 */
export const CONSERVATIVE_PLAN_ORDER = Object.freeze([
  'RAIZ',
  'PERFORMANCE',
  'ELITE',
])

const SOURCE_PLAN_BY_ID = new Map(
  membershipPlanEditorialProjection.map(({ plan }) => [plan.id, plan]),
)

for (const planId of CONSERVATIVE_PLAN_ORDER) {
  if (!SOURCE_PLAN_BY_ID.has(planId)) {
    throw new Error(`Commercial_Config no publica el plan canónico ${planId}.`)
  }
}

if (SOURCE_PLAN_BY_ID.size !== CONSERVATIVE_PLAN_ORDER.length) {
  throw new Error('Las reglas de recomendación no cubren exactamente los planes canónicos publicados.')
}

function publishedIncludedFeature(id, planId, value) {
  const plan = SOURCE_PLAN_BY_ID.get(planId)
  if (!Array.isArray(plan?.included) || !plan.included.includes(value)) {
    throw new Error(`La característica ${id} ya no está publicada para ${planId}.`)
  }

  return Object.freeze({
    id,
    planId,
    sourcePath: `membershipPlans.${planId}.included`,
    value,
  })
}

/**
 * Referencias verificadas al importar contra los objetos fuente conservados por
 * el adapter de 1.6. No incluyen precio, CTA, audiencia inferida ni datos de salud.
 */
export const PUBLISHED_RECOMMENDATION_FEATURES = Object.freeze({
  'RAIZ.adjustable-plan': publishedIncludedFeature(
    'RAIZ.adjustable-plan',
    'RAIZ',
    'Plan mensual personalizado y ajustable',
  ),
  'RAIZ.biweekly-review': publishedIncludedFeature(
    'RAIZ.biweekly-review',
    'RAIZ',
    'Control quincenal',
  ),
  'PERFORMANCE.personalized-plan': publishedIncludedFeature(
    'PERFORMANCE.personalized-plan',
    'PERFORMANCE',
    'Plan 100% personalizado',
  ),
  'PERFORMANCE.weekly-review': publishedIncludedFeature(
    'PERFORMANCE.weekly-review',
    'PERFORMANCE',
    'Control semanal',
  ),
  'ELITE.private-sessions': publishedIncludedFeature(
    'ELITE.private-sessions',
    'ELITE',
    'Hasta 12 sesiones privadas al mes',
  ),
  'ELITE.direct-contact': publishedIncludedFeature(
    'ELITE.direct-contact',
    'ELITE',
    'Contacto directo',
  ),
})

function createRule(
  ruleId,
  field,
  answer,
  planId,
  publishedFeatureIds,
  reason,
) {
  for (const featureId of publishedFeatureIds) {
    const feature = PUBLISHED_RECOMMENDATION_FEATURES[featureId]
    if (!feature || feature.planId !== planId) {
      throw new Error(`La regla ${ruleId} referencia una característica publicada inválida.`)
    }
  }

  return Object.freeze({
    ruleId,
    field,
    answer,
    planId,
    points: 1,
    publishedFeatureIds: Object.freeze([...publishedFeatureIds]),
    reason,
  })
}

/**
 * Cada respuesta cerrada activa exactamente una regla y un punto. Las razones
 * solo citan estructura ajustable/control quincenal, personalización/control
 * semanal o sesiones privadas/contacto directo publicados por Commercial_Config.
 */
export const RECOMMENDATION_RULES = Object.freeze([
  createRule(
    'motivation.constancia.raiz-structure',
    'motivation',
    'constancia',
    'RAIZ',
    ['RAIZ.adjustable-plan', 'RAIZ.biweekly-review'],
    'La motivación de construir constancia se orienta a RAÍZ por su plan ajustable y sus controles quincenales.',
  ),
  createRule(
    'motivation.comprension.performance-personalization',
    'motivation',
    'comprension',
    'PERFORMANCE',
    ['PERFORMANCE.personalized-plan', 'PERFORMANCE.weekly-review'],
    'La motivación de comprender mejor el proceso se orienta a PERFORMANCE por su personalización y su control semanal.',
  ),
  createRule(
    'motivation.personalizacion.performance-plan',
    'motivation',
    'personalizacion',
    'PERFORMANCE',
    ['PERFORMANCE.personalized-plan'],
    'La motivación de personalizar el camino se orienta a PERFORMANCE por su plan completamente personalizado.',
  ),
  createRule(
    'motivation.acompanamiento-directo.elite-contact',
    'motivation',
    'acompanamiento-directo',
    'ELITE',
    ['ELITE.direct-contact', 'ELITE.private-sessions'],
    'La preferencia por acompañamiento directo se orienta a ELITE por su contacto directo y sus sesiones privadas publicadas.',
  ),
  createRule(
    'experience.inicio.raiz-adjustable',
    'experience',
    'inicio',
    'RAIZ',
    ['RAIZ.adjustable-plan'],
    'Una experiencia de inicio se orienta a RAÍZ por su estructura ajustable.',
  ),
  createRule(
    'experience.retomo.raiz-reviews',
    'experience',
    'retomo',
    'RAIZ',
    ['RAIZ.adjustable-plan', 'RAIZ.biweekly-review'],
    'Retomar una práctica se orienta a RAÍZ por su plan ajustable y sus controles quincenales.',
  ),
  createRule(
    'experience.constante.performance-follow-up',
    'experience',
    'constante',
    'PERFORMANCE',
    ['PERFORMANCE.personalized-plan', 'PERFORMANCE.weekly-review'],
    'Una práctica constante se orienta a PERFORMANCE por su personalización y su control semanal.',
  ),
  createRule(
    'supportLevel.estructura.raiz-plan',
    'supportLevel',
    'estructura',
    'RAIZ',
    ['RAIZ.adjustable-plan'],
    'Preferir una estructura se orienta a RAÍZ por su plan mensual ajustable.',
  ),
  createRule(
    'supportLevel.seguimiento-semanal.performance-review',
    'supportLevel',
    'seguimiento-semanal',
    'PERFORMANCE',
    ['PERFORMANCE.weekly-review'],
    'Preferir seguimiento semanal se orienta a PERFORMANCE porque publica control semanal.',
  ),
  createRule(
    'supportLevel.sesiones-privadas.elite-sessions',
    'supportLevel',
    'sesiones-privadas',
    'ELITE',
    ['ELITE.private-sessions'],
    'Preferir sesiones privadas se orienta a ELITE porque publica sesiones privadas sujetas a coordinación y disponibilidad.',
  ),
  createRule(
    'availability.uno-dos.raiz-adjustable',
    'availability',
    'uno-dos',
    'RAIZ',
    ['RAIZ.adjustable-plan'],
    'Una disponibilidad de uno o dos momentos prioriza la estructura ajustable publicada por RAÍZ.',
  ),
  createRule(
    'availability.tres.performance-weekly',
    'availability',
    'tres',
    'PERFORMANCE',
    ['PERFORMANCE.personalized-plan', 'PERFORMANCE.weekly-review'],
    'Una disponibilidad de tres momentos orienta la comparación hacia la personalización y el control semanal de PERFORMANCE.',
  ),
  createRule(
    'availability.cuatro-mas.elite-sessions',
    'availability',
    'cuatro-mas',
    'ELITE',
    ['ELITE.private-sessions'],
    'Una disponibilidad de cuatro o más momentos permite considerar las sesiones privadas publicadas por ELITE, siempre sujetas a coordinación y disponibilidad.',
  ),
])

const RULE_BY_FIELD_AND_ANSWER = new Map()
for (const rule of RECOMMENDATION_RULES) {
  const key = `${rule.field}:${rule.answer}`
  if (RULE_BY_FIELD_AND_ANSWER.has(key)) {
    throw new Error(`Regla de recomendación duplicada para ${key}.`)
  }
  RULE_BY_FIELD_AND_ANSWER.set(key, rule)
}

const ALLOWED_INPUT_FIELDS = new Set(Object.keys(RECOMMENDATION_VOCABULARY))
const OPTION_SET_BY_FIELD = Object.freeze({
  motivation: new Set(MOTIVATIONS),
  experience: new Set(EXPERIENCES),
  supportLevel: new Set(SUPPORT_LEVELS),
  availability: new Set(AVAILABILITIES),
})

const SENSITIVE_NORMALIZED_KEYS = new Set([
  'gender',
  'genero',
  'sex',
  'sexo',
  'diagnosis',
  'diagnostico',
  'injury',
  'lesion',
  'biometric',
  'biometrics',
  'biometria',
  'datosbiometricos',
  'medicalhistory',
  'historiaclinica',
  'health',
  'salud',
  'bodyimage',
  'imagencorporal',
  'bodymeasurements',
  'medidascorporales',
  'radiography',
  'radiografia',
  'analytics',
  'analiticas',
  'identitydocument',
  'documentoidentidad',
])

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function normalizeKey(key) {
  return key
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase()
}

function addError(errors, code, path, message) {
  errors.push(Object.freeze({ code, path, message }))
}

function isMissingAnswer(value) {
  return value === undefined
    || value === null
    || (typeof value === 'string' && value.trim() === '')
}

function validateAnswer(input, field, errors, required) {
  const present = Object.hasOwn(input, field)
  const value = input[field]

  if (!present || isMissingAnswer(value)) {
    if (required || present) {
      addError(
        errors,
        `input.${field}.required`,
        field,
        `Falta una respuesta válida para ${field}.`,
      )
    }
    return
  }

  if (!OPTION_SET_BY_FIELD[field].has(value)) {
    addError(
      errors,
      `input.${field}.invalid`,
      field,
      `La respuesta de ${field} no pertenece a sus opciones cerradas.`,
    )
  }
}

/**
 * Valida el esquema estricto sin normalizar, inferir ni conservar valores. Se
 * requieren motivación, experiencia y exactamente una dimensión adicional:
 * supportLevel para Home/Programas o availability para Inicio Guiado.
 *
 * @param {RecommendationInput | unknown} input
 * @returns {{valid:boolean, errors:ReadonlyArray<RecommendationValidationError>}}
 */
export function validateRecommendationInput(input) {
  const errors = []

  if (!isRecord(input)) {
    addError(errors, 'input.invalid', 'input', 'Las respuestas deben proporcionarse como un objeto.')
    return Object.freeze({ valid: false, errors: Object.freeze(errors) })
  }

  for (const rawKey of Reflect.ownKeys(input)) {
    if (typeof rawKey !== 'string') {
      addError(errors, 'input.key.unknown', String(rawKey), 'La entrada contiene una clave no permitida.')
      continue
    }

    if (ALLOWED_INPUT_FIELDS.has(rawKey)) continue

    const isSensitive = SENSITIVE_NORMALIZED_KEYS.has(normalizeKey(rawKey))
    addError(
      errors,
      isSensitive ? 'input.dimension.sensitive' : 'input.key.unknown',
      rawKey,
      isSensitive
        ? 'La recomendación no admite dimensiones sensibles.'
        : `La clave ${rawKey} no pertenece al esquema de recomendación.`,
    )
  }

  validateAnswer(input, 'motivation', errors, true)
  validateAnswer(input, 'experience', errors, true)

  const hasSupportLevel = Object.hasOwn(input, 'supportLevel')
  const hasAvailability = Object.hasOwn(input, 'availability')

  if (!hasSupportLevel && !hasAvailability) {
    addError(
      errors,
      'input.additional-dimension.required',
      'supportLevel|availability',
      'Falta la tercera respuesta: acompañamiento deseado o disponibilidad, según el flujo.',
    )
  } else if (hasSupportLevel && hasAvailability) {
    addError(
      errors,
      'input.additional-dimension.conflict',
      'supportLevel|availability',
      'Cada flujo debe usar una sola dimensión adicional.',
    )
  }

  validateAnswer(input, 'supportLevel', errors, false)
  validateAnswer(input, 'availability', errors, false)

  return Object.freeze({
    valid: errors.length === 0,
    errors: Object.freeze(errors),
  })
}

export class RecommendationInputError extends TypeError {
  /** @param {ReadonlyArray<RecommendationValidationError>} errors */
  constructor(errors) {
    super('No se puede generar una recomendación con respuestas inválidas o incompletas.')
    this.name = 'RecommendationInputError'
    this.errors = errors
  }
}

export const RECOMMENDATION_DISCLAIMER = 'Orientación informativa basada únicamente en características publicadas. El ajuste y los resultados dependen del contexto de cada persona; puedes revisar todas las alternativas.'

/**
 * Produce una recomendación local, determinista y explicable. No accede a DOM,
 * red, almacenamiento, tiempo ni builders de canales externos.
 *
 * @param {RecommendationInput | unknown} input
 * @returns {RecommendationResult}
 * @throws {RecommendationInputError} Si el esquema estricto no es válido.
 */
export function recommendPlan(input) {
  const validation = validateRecommendationInput(input)
  if (!validation.valid) {
    throw new RecommendationInputError(validation.errors)
  }

  const thirdField = Object.hasOwn(input, 'supportLevel')
    ? 'supportLevel'
    : 'availability'
  const fields = /** @type {ReadonlyArray<RecommendationField>} */ ([
    'motivation',
    'experience',
    thirdField,
  ])
  const scores = Object.fromEntries(
    CONSERVATIVE_PLAN_ORDER.map((planId) => [planId, 0]),
  )

  const reasons = fields.map((field) => {
    const answer = input[field]
    const rule = RULE_BY_FIELD_AND_ANSWER.get(`${field}:${answer}`)

    if (!rule) {
      throw new Error(`No existe una regla versionada para ${field}:${String(answer)}.`)
    }

    scores[rule.planId] += rule.points
    return Object.freeze({
      ruleId: rule.ruleId,
      answer,
      reason: rule.reason,
    })
  })

  const maximumScore = Math.max(...Object.values(scores))
  const tiedPlanIds = CONSERVATIVE_PLAN_ORDER.filter(
    (planId) => scores[planId] === maximumScore,
  )
  const planId = tiedPlanIds[0]
  const alternatives = CONSERVATIVE_PLAN_ORDER.filter(
    (candidatePlanId) => candidatePlanId !== planId,
  )
  const tied = tiedPlanIds.length > 1
  const planName = SOURCE_PLAN_BY_ID.get(planId).name
  const candidateNames = tiedPlanIds
    .map((candidatePlanId) => SOURCE_PLAN_BY_ID.get(candidatePlanId).name)
    .join(', ')

  return Object.freeze({
    planId,
    reasons: Object.freeze(reasons),
    alternatives: Object.freeze(alternatives),
    ruleVersion: RECOMMENDATION_RULE_VERSION,
    disclaimer: RECOMMENDATION_DISCLAIMER,
    scores: Object.freeze(scores),
    decision: Object.freeze({
      type: tied ? 'conservative-tie-break' : 'highest-score',
      candidates: Object.freeze(tiedPlanIds),
      reason: tied
        ? `Empate de puntuación entre ${candidateNames}; la regla conservadora sugiere ${planName}, la opción de menor alcance comercial entre las empatadas.`
        : `${planName} reúne la puntuación más alta según las tres respuestas consideradas.`,
    }),
  })
}
