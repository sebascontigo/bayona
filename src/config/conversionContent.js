import { membershipPlans } from './offerings.js'

/**
 * @typedef {'problem'|'vision'|'mechanism'|'proof'|'offer'|'action'} NarrativeStage
 */

/**
 * @typedef {'editorial'|'aspiration'|'commercial'|'evidence'|'concept'} ClaimType
 */

/**
 * @typedef {'verified'|'aspirational'|'concept'|'unavailable'} ContentState
 */

/**
 * @typedef {Object} ContentBlock
 * @property {string} id Identificador editorial estable y único dentro de la página.
 * @property {NarrativeStage} stage Etapa que determina la posición del bloque en Narrative_Flow.
 * @property {ClaimType} claimType Naturaleza declarada del claim; no se infiere desde el copy.
 * @property {ContentState} state Estado verificable que limita cómo puede publicarse el bloque.
 * @property {string} heading Encabezado visible del bloque.
 * @property {string} body Cuerpo visible del bloque.
 * @property {ReadonlyArray<{id:string, marker:string, title:string, body:string}>=} items Detalles visibles ordenados del bloque cuando existen.
 * @property {string=} boundary Límite profesional visible asociado al bloque cuando aplica.
 * @property {string=} sourceRef Referencia a una fuente aprobada cuando resulte aplicable.
 */

/**
 * @typedef {Object} ContentAction
 * @property {string} label Texto específico de la acción.
 * @property {string} destination Destino real de la acción.
 * @property {string} consequence Consecuencia comprensible antes de continuar.
 */

/**
 * @typedef {Object} PageContentModel
 * @property {string} route Pathname público existente.
 * @property {string} h1 Encabezado principal único.
 * @property {ReadonlyArray<ContentBlock>} blocks Bloques en orden narrativo.
 * @property {string=} evidenceContext Clave opcional para consultar evidencia; no contiene evidencia ni placeholders.
 * @property {ContentAction} primaryAction Acción principal de la página.
 * @property {string} metadataKey Clave de metadatos asociada al pathname.
 */

/**
 * Capa exclusivamente editorial asociada a un plan mediante su id fuente.
 * Los datos comerciales permanecen en `offerings.js` y no forman parte del overlay.
 *
 * @typedef {Object} PlanEditorialOverlay
 * @property {string} descriptor Subtítulo editorial; nunca sustituye el nombre canónico.
 * @property {string} jtbdSummary Progreso que la persona intenta conseguir.
 * @property {string} valueSummary Síntesis del valor antes del precio y el detalle.
 */

/**
 * Mensajes de conversión que reaccionan al plan sin contaminar su contrato comercial.
 *
 * @typedef {Object} PlanConversionMessage
 * @property {string} proofAnchor Prueba o identificación breve bajo la tarjeta del plan.
 * @property {string} calculatorMessage Refuerzo emocional mostrado al elegir el plan.
 */

/**
 * @typedef {Object} PlanEditorialProjection
 * @property {Object} plan Objeto fuente de Commercial_Config, conservado por referencia.
 * @property {PlanEditorialOverlay} overlay Capa editorial asociada al id del plan.
 */

/** @type {ReadonlyArray<NarrativeStage>} */
export const NARRATIVE_STAGES = Object.freeze([
  'problem',
  'vision',
  'mechanism',
  'proof',
  'offer',
  'action',
])

/** @type {ReadonlyArray<ClaimType>} */
export const CLAIM_TYPES = Object.freeze([
  'editorial',
  'aspiration',
  'commercial',
  'evidence',
  'concept',
])

/** @type {ReadonlyArray<ContentState>} */
export const CONTENT_STATES = Object.freeze([
  'verified',
  'aspirational',
  'concept',
  'unavailable',
])

/**
 * Vocabulario único del Content_Model. Las páginas y el dominio comparten estas
 * referencias sin redefinir etapas, tipos de claim o estados.
 */
export const CONTENT_MODEL_VOCABULARY = Object.freeze({
  stages: NARRATIVE_STAGES,
  claimTypes: CLAIM_TYPES,
  states: CONTENT_STATES,
})

/** @type {ReadonlyArray<keyof PlanEditorialOverlay>} */
export const PLAN_EDITORIAL_OVERLAY_FIELDS = Object.freeze([
  'descriptor',
  'jtbdSummary',
  'valueSummary',
])

/** @type {Readonly<Record<string, PlanEditorialOverlay>>} */
export const planEditorialOverlays = Object.freeze({
  RAIZ: Object.freeze({
    descriptor: 'Base guiada',
    jtbdSummary: 'Quiero retomar el entrenamiento con una estructura clara.',
    valueSummary: 'Plan mensual personalizado, una sesión virtual y seguimiento quincenal.',
  }),
  FUERZA: Object.freeze({
    descriptor: 'Entrenamiento acompañado',
    jtbdSummary: 'Quiero más sesiones y una revisión semanal de mi proceso.',
    valueSummary: 'Dos sesiones virtuales al mes, seguimiento semanal y respuestas prioritarias.',
  }),
  RENDIMIENTO: Object.freeze({
    descriptor: 'Seguimiento avanzado',
    jtbdSummary: 'Quiero medir el proceso y ajustar con mayor frecuencia.',
    valueSummary: 'Cuatro sesiones virtuales al mes, evaluación inicial y ajustes semanales.',
  }),
  ELITE: Object.freeze({
    descriptor: 'Acompañamiento privado',
    jtbdSummary: 'Quiero la mayor frecuencia de sesiones y contacto directo con Sebastián.',
    valueSummary: 'Ocho sesiones privadas al mes y contacto directo, sujeto a disponibilidad.',
  }),
})

/** @type {Readonly<Record<string, PlanConversionMessage>>} */
export const planConversionMessages = Object.freeze({
  RAIZ: Object.freeze({
    proofAnchor: 'Plan mensual, una sesión virtual y seguimiento quincenal.',
    calculatorMessage: 'Una base guiada para retomar el entrenamiento.',
  }),
  FUERZA: Object.freeze({
    proofAnchor: 'Dos sesiones virtuales al mes y seguimiento semanal.',
    calculatorMessage: 'Más frecuencia de sesiones y revisión cada semana.',
  }),
  RENDIMIENTO: Object.freeze({
    proofAnchor: 'Cuatro sesiones virtuales, evaluación inicial y ajustes semanales.',
    calculatorMessage: 'Seguimiento avanzado para revisar el proceso con más detalle.',
  }),
  ELITE: Object.freeze({
    proofAnchor: 'Ocho sesiones privadas y contacto directo, con máximo de 10 cupos.',
    calculatorMessage: 'La mayor frecuencia de sesiones y acompañamiento privado.',
  }),
})

/**
 * Comprueba que planes y overlays formen una relación uno a uno y que la capa
 * editorial no incorpore ningún campo perteneciente al contrato comercial.
 *
 * @param {ReadonlyArray<Object>} plans Planes procedentes de Commercial_Config.
 * @param {Readonly<Record<string, PlanEditorialOverlay>>} overlays Overlays indexados por plan.id.
 * @returns {true}
 */
export function validatePlanEditorialOverlays(
  plans = membershipPlans,
  overlays = planEditorialOverlays,
) {
  if (!Array.isArray(plans)) {
    throw new TypeError('Los planes fuente deben proporcionarse como una lista.')
  }
  if (!overlays || typeof overlays !== 'object' || Array.isArray(overlays)) {
    throw new TypeError('Los overlays editoriales deben proporcionarse como un objeto por id.')
  }

  const sourcePlanIds = plans.map((plan, index) => {
    if (!plan || typeof plan !== 'object' || typeof plan.id !== 'string' || !plan.id.trim()) {
      throw new TypeError(`El plan fuente en la posición ${index} no tiene un id válido.`)
    }
    return plan.id
  })
  const duplicatePlanIds = [...new Set(
    sourcePlanIds.filter((planId, index) => sourcePlanIds.indexOf(planId) !== index),
  )]

  if (duplicatePlanIds.length) {
    throw new Error(`Ids de plan fuente duplicados: ${duplicatePlanIds.join(', ')}.`)
  }

  const overlayIds = Object.keys(overlays)
  const missingOverlayIds = sourcePlanIds.filter((planId) => !Object.hasOwn(overlays, planId))
  const orphanOverlayIds = overlayIds.filter((planId) => !sourcePlanIds.includes(planId))
  const coverageErrors = []

  if (missingOverlayIds.length) {
    coverageErrors.push(`Planes fuente sin overlay: ${missingOverlayIds.join(', ')}.`)
  }
  if (orphanOverlayIds.length) {
    coverageErrors.push(`Overlays huérfanos: ${orphanOverlayIds.join(', ')}.`)
  }
  if (coverageErrors.length) {
    throw new Error(`Cobertura editorial inválida. ${coverageErrors.join(' ')}`)
  }

  for (const planId of sourcePlanIds) {
    const overlay = overlays[planId]
    if (!overlay || typeof overlay !== 'object' || Array.isArray(overlay)) {
      throw new TypeError(`El overlay de ${planId} debe ser un objeto.`)
    }

    const overlayFields = Object.keys(overlay)
    const missingFields = PLAN_EDITORIAL_OVERLAY_FIELDS.filter(
      (field) => !Object.hasOwn(overlay, field),
    )
    const unexpectedFields = overlayFields.filter(
      (field) => !PLAN_EDITORIAL_OVERLAY_FIELDS.includes(field),
    )

    if (missingFields.length) {
      throw new Error(`Campos editoriales ausentes en ${planId}: ${missingFields.join(', ')}.`)
    }
    if (unexpectedFields.length) {
      throw new Error(`Campos editoriales no permitidos en ${planId}: ${unexpectedFields.join(', ')}.`)
    }

    for (const field of PLAN_EDITORIAL_OVERLAY_FIELDS) {
      if (typeof overlay[field] !== 'string' || !overlay[field].trim()) {
        throw new TypeError(`El campo editorial ${field} de ${planId} debe ser texto no vacío.`)
      }
    }
  }

  return true
}

/**
 * Adapta los planes para consumo editorial sin extender ni clonar sus campos
 * comerciales. Cada proyección conserva el objeto fuente y su overlay separados.
 *
 * @param {ReadonlyArray<Object>} plans Planes procedentes de Commercial_Config.
 * @param {Readonly<Record<string, PlanEditorialOverlay>>} overlays Overlays indexados por plan.id.
 * @returns {ReadonlyArray<PlanEditorialProjection>}
 */
export function createPlanEditorialProjection(
  plans = membershipPlans,
  overlays = planEditorialOverlays,
) {
  validatePlanEditorialOverlays(plans, overlays)

  return Object.freeze(plans.map((plan) => Object.freeze({
    plan,
    overlay: overlays[plan.id],
  })))
}

/**
 * Proyección canónica validada al importar el módulo. Un cambio de ids en
 * Commercial_Config sin su overlay correspondiente falla de forma explícita.
 */
export const membershipPlanEditorialProjection = createPlanEditorialProjection()

/** Contexto fail-closed usado por Home para consultar Evidence_Gate. */
export const HOME_EVIDENCE_CONTEXT = 'home'

/**
 * Contrato editorial de Home para Narrative_Flow.
 *
 * Centraliza el copy visible de problema, aspiración, mecanismo, beneficios y
 * fallback público de proceso aprobado para Home. No contiene nombres, precios,
 * prestaciones, cantidades ni condiciones de los planes: el bloque de oferta
 * referencia Commercial_Config en lugar de copiarlo.
 *
 * @type {PageContentModel}
 */
export const homeContentModel = Object.freeze({
  route: '/',
  h1: 'CONSTRUYE LA VERSIÓN MÁS FUERTE DE TI.',
  blocks: Object.freeze([
    Object.freeze({
      id: 'home-problem',
      stage: 'problem',
      claimType: 'editorial',
      state: 'verified',
      heading: 'SÉ EXACTAMENTE POR QUÉ NO AVANZAS',
      body: 'No necesitas otra promesa rápida. Necesitas identificar qué está bloqueando tu continuidad y convertirlo en una decisión.',
      items: Object.freeze([
        Object.freeze({
          id: 'daily-energy',
          marker: '01',
          title: 'DESPIERTAS CANSADO',
          body: 'Aunque duermas, tu cuerpo te pide más.',
        }),
        Object.freeze({
          id: 'effort-without-reference',
          marker: '02',
          title: 'ENTRENAS SIN RESULTADOS',
          body: 'Pones esfuerzo, comes bien, pero nada cambia.',
        }),
        Object.freeze({
          id: 'discomfort-with-context',
          marker: '03',
          title: 'TU CUERPO TE HABLA',
          body: 'Espalda, rodillas, cuello. Y nadie te enseñó a escucharlo.',
        }),
        Object.freeze({
          id: 'real-life-method',
          marker: '04',
          title: 'NO TIENES TIEMPO',
          body: 'Necesitas algo que encaje en tu vida real, no en la de Instagram.',
        }),
      ]),
      sourceRef: 'src/config/conversionContent.js#home-problem',
    }),
    Object.freeze({
      id: 'home-vision',
      stage: 'vision',
      claimType: 'aspiration',
      state: 'aspirational',
      heading: 'IMAGÍNATE DENTRO DE 90 DÍAS',
      body: 'Esto no es una promesa. Es lo que construye un método con dirección. El resultado depende de tu constancia — pero nunca entrenas a ciegas.',
      items: Object.freeze([
        Object.freeze({ id: 'energy', marker: '01', title: 'Despiertas con más energía.', body: 'Despiertas con más energía.' }),
        Object.freeze({ id: 'response', marker: '02', title: 'Tu cuerpo responde mejor.', body: 'Tu cuerpo responde mejor.' }),
        Object.freeze({ id: 'confidence', marker: '03', title: 'Te mueves sin dudar.', body: 'Te mueves sin dudar.' }),
        Object.freeze({ id: 'direction', marker: '04', title: 'Sabes exactamente qué hacer cada día.', body: 'Sabes exactamente qué hacer cada día.' }),
        Object.freeze({ id: 'continuity', marker: '05', title: 'Dejas de empezar de cero cada lunes.', body: 'Dejas de empezar de cero cada lunes.' }),
      ]),
      sourceRef: 'src/config/conversionContent.js#home-vision',
    }),
    Object.freeze({
      id: 'home-mechanism',
      stage: 'mechanism',
      claimType: 'editorial',
      state: 'verified',
      heading: 'NO ES MAGIA. ES MÉTODO.',
      body: 'Tres decisiones en orden: observamos, construimos y ajustamos con información real.',
      boundary: 'BAYONA trabaja en un marco no médico: no diagnostica, trata ni sustituye la atención de profesionales sanitarios.',
      items: Object.freeze([
        Object.freeze({
          id: 'understand',
          marker: '01',
          title: 'TE LEEMOS',
          body: 'Tu punto de partida, tu objetivo y el tiempo que de verdad tienes.',
        }),
        Object.freeze({
          id: 'build',
          marker: '02',
          title: 'CONSTRUIMOS',
          body: 'Convertimos eso en una estructura clara que cabe en tu vida.',
        }),
        Object.freeze({
          id: 'support',
          marker: '03',
          title: 'TE ACOMPAÑAMOS',
          body: 'Revisamos lo que funciona y ajustamos para que sigas avanzando.',
        }),
      ]),
      sourceRef: 'src/config/conversionContent.js#home-mechanism',
    }),
    Object.freeze({
      id: 'home-process-benefits',
      stage: 'mechanism',
      claimType: 'editorial',
      state: 'verified',
      heading: 'LO QUE CAMBIA CUANDO HAY DIRECCIÓN',
      body: 'El resultado no es acumular ejercicios. Es entrenar con criterio, medir el avance y sostener el proceso.',
      items: Object.freeze([
        Object.freeze({
          id: 'understand-your-body',
          marker: '01',
          title: 'DEJAS DE IMPROVISAR',
          body: 'Sabes qué hacer, por qué lo haces y cómo responde tu cuerpo.',
        }),
        Object.freeze({
          id: 'purposeful-movement',
          marker: '02',
          title: 'CADA SESIÓN TIENE UN OBJETIVO',
          body: 'No acumulas repeticiones. Construyes progreso medible.',
        }),
        Object.freeze({
          id: 'supported-practice',
          marker: '03',
          title: 'NO DEPENDES DE TU MOTIVACIÓN',
          body: 'Alguien revisa, ajusta y te da la siguiente acción clara.',
        }),
      ]),
      sourceRef: 'src/config/conversionContent.js#home-process-benefits',
    }),
    Object.freeze({
      id: 'home-evidence-unavailable',
      stage: 'proof',
      claimType: 'evidence',
      state: 'unavailable',
      heading: 'AQUÍ NO HAY HUMO',
      body: 'No inventamos cifras ni prometemos milagros. Te mostramos el método y su alcance real. Lo demás lo construyes tú.',
      sourceRef: 'src/config/evidenceRegistry.js#home',
    }),
    Object.freeze({
      id: 'home-process-fallback',
      stage: 'proof',
      claimType: 'editorial',
      state: 'verified',
      heading: 'AQUÍ NO HAY HUMO',
      body: 'No inventamos números ni prometemos milagros. Te mostramos el método y el alcance real. Lo demás lo construyes tú.',
      items: Object.freeze([
        Object.freeze({
          id: 'context-before-diagnosis',
          marker: '01',
          title: 'CONTEXTO ANTES QUE DIAGNÓSTICO',
          body: 'Partimos de tu situación y tus objetivos sin atribuir causas médicas.',
        }),
        Object.freeze({
          id: 'reviewable-planning',
          marker: '02',
          title: 'PLANIFICACIÓN REVISABLE',
          body: 'La estructura se puede entender, conversar y revisar durante el proceso.',
        }),
        Object.freeze({
          id: 'adjustments-without-guarantees',
          marker: '03',
          title: 'AJUSTES SIN RESULTADO GARANTIZADO',
          body: 'Ajustamos con información real sin prometer un resultado concreto.',
        }),
      ]),
      sourceRef: 'src/config/conversionContent.js#home-experience',
    }),
    Object.freeze({
      id: 'home-offer',
      stage: 'offer',
      claimType: 'commercial',
      state: 'verified',
      heading: 'CUATRO PLANES. DISTINTO NIVEL DE ACOMPAÑAMIENTO.',
      body: 'Compara RAÍZ, FUERZA, RENDIMIENTO y ELITE por sesiones, frecuencia de seguimiento, prestaciones y precio mensual.',
      sourceRef: 'src/pages/Home.jsx#offer-section + src/config/offerings.js#membershipPlans',
    }),
    Object.freeze({
      id: 'home-action',
      stage: 'action',
      claimType: 'editorial',
      state: 'verified',
      heading: 'ANTES DE ELEGIR UN PLAN, CONOCE POR QUÉ EXISTE BAYONA.',
      body: 'El siguiente paso no es comprar. Es comprender de dónde nace el método, qué principios lo sostienen y quién estará detrás de tu proceso.',
      sourceRef: 'src/pages/Home.jsx#closing',
    }),
  ]),
  evidenceContext: HOME_EVIDENCE_CONTEXT,
  primaryAction: Object.freeze({
    label: 'QUIERO EMPEZAR MI TRANSFORMACIÓN',
    destination: '/programs',
    consequence: 'Abre Programas para elegir cómo quieres empezar tu transformación.',
  }),
  metadataKey: '/',
})

/**
 * Registro editorial por pathname. Solo incorpora una página cuando comienza su
 * Page_Milestone; las demás rutas permanecen fuera hasta su turno serial.
 *
 * @type {Readonly<Record<string, PageContentModel>>}
 */
export const conversionContent = Object.freeze({
  '/': homeContentModel,
})
