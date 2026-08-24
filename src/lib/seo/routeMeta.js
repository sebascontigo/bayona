/**
 * BAYONA · METADATOS POR RUTA
 * ---------------------------------------------------------------------------
 * Cada ruta de la SPA declara su propio title, description y política de
 * indexación. Antes, las 17 rutas compartían el <head> estático de
 * index.html, así que Google veía 17 páginas con el mismo título.
 *
 * Reglas:
 * · Copia en español, sin promesas de resultado, sin lenguaje médico.
 * · `title` ≤ 60 caracteres útiles (se le añade el sufijo de marca).
 * · `description` entre 110 y 160 caracteres.
 * · Los pasos de embudo (checkout, confirmación) van `noindex`.
 * · Un alias nunca es canónico de sí mismo: apunta a su ruta real.
 */

import { membershipPlans } from '../../config/offerings.js'
import { BRAND } from '../../config/site.config.js'

export const TITLE_SUFFIX = `${BRAND.name}`

/** Título de la home: se usa tal cual, sin sufijo, porque ya contiene la marca. */
const HOME_TITLE = 'BAYONA — Entrenamiento con método y acompañamiento real'

const HOME_DESCRIPTION =
  'Método de movimiento con dirección: plan mensual personalizado, seguimiento humano y cuatro niveles de acompañamiento. Sin humo ni promesas de resultado.'

/**
 * Rutas con contenido propio. La clave es el pathname exacto.
 * `bare: true` indica que el título ya incluye la marca y no lleva sufijo.
 */
const STATIC_ROUTES = {
  '/': {
    title: HOME_TITLE,
    bare: true,
    description: HOME_DESCRIPTION,
    ogType: 'website',
    breadcrumb: [],
  },
  '/about': {
    title: 'Nosotros — Por qué existe BAYONA',
    description:
      'Quién está detrás de BAYONA y por qué el método pone el acompañamiento humano por delante de la promesa rápida. Movimiento, ciencia y propósito.',
    breadcrumb: [['Nosotros', '/about']],
  },
  '/programs': {
    title: 'Programas y planes de entrenamiento',
    description:
      'Cuatro niveles de membresía —RAÍZ, FUERZA, RENDIMIENTO y ELITE— más clases, recuperación y rendimiento por sesión. Precios publicados en COP.',
    breadcrumb: [['Programas', '/programs']],
  },
  '/parkour-academy': {
    title: 'Academia de Parkour',
    description:
      'Formación en parkour con progresiones técnicas y fuerza aplicada. Para quien quiere aprender a moverse con control, desde iniciación hasta nivel avanzado.',
    breadcrumb: [['Academia Parkour', '/parkour-academy']],
  },
  '/shop': {
    title: 'Tienda — Clases, recuperación y evaluaciones',
    description:
      'Catálogo BAYONA por sesión: clases 1:1, masaje deportivo, movilidad, pilates, evaluación biomecánica y más. Precios en COP, se confirma por WhatsApp.',
    breadcrumb: [['Tienda', '/shop']],
  },
  '/app': {
    title: 'BAYONA+ — La app en desarrollo',
    description:
      'BAYONA+ está en desarrollo y todavía no hay app operativa para descargar. Aquí ves el concepto y las funciones en exploración, sin fechas comprometidas.',
    breadcrumb: [['BAYONA+', '/app']],
  },
  '/community': {
    title: 'Comunidad',
    description:
      'La comunidad BAYONA tiene acceso abierto y gratuito por WhatsApp: no necesitas contratar un plan. Entrena acompañado y sostén el hábito con otros.',
    breadcrumb: [['Comunidad', '/community']],
  },
  '/resources': {
    title: 'Recursos gratuitos de movimiento y fuerza',
    description:
      'Guías y material sobre movimiento, fuerza y hábitos sostenibles. Contenido gratuito para entender el método BAYONA antes de contratar nada.',
    breadcrumb: [['Recursos', '/resources']],
  },
  '/faq': {
    title: 'Preguntas frecuentes',
    description:
      'Programas, precios, métodos de pago, lesiones, sesiones presenciales y BAYONA+. Respuestas directas para comparar antes de decidir.',
    breadcrumb: [['Preguntas frecuentes', '/faq']],
  },
  '/onboarding': {
    title: 'Entrar a BAYONA',
    description:
      'Un recorrido corto para orientarte: cuéntanos tu punto de partida y te sugerimos por dónde empezar. Sin crear cuenta y sin compromiso.',
    breadcrumb: [['Entrar', '/onboarding']],
  },
  '/checkout': {
    title: 'Configura tu experiencia',
    description:
      'Arma tu plan base, tus clases y tus extras y revisa el total antes de enviarlo. Esta página prepara una solicitud: aquí no se procesa ningún pago.',
    noindex: true,
    breadcrumb: [['Configurar', '/checkout']],
  },
  '/order-confirmation': {
    title: 'Solicitud recibida',
    description: 'Hemos preparado tu solicitud. Te confirmamos los siguientes pasos por WhatsApp.',
    noindex: true,
    breadcrumb: [['Solicitud recibida', '/order-confirmation']],
  },
}

/**
 * Alias: rutas que renderizan el mismo componente que otra ruta.
 * Se indexa solo la canónica para no generar contenido duplicado.
 */
export const ROUTE_ALIASES = {
  '/entrar': '/onboarding',
}

/** Metadatos de la página 404. Nunca se indexa. */
export const NOT_FOUND_META = {
  path: '/404',
  title: 'Página no encontrada',
  description: 'La ruta que buscas no existe o cambió de sitio. Te dejamos los accesos principales de BAYONA.',
  noindex: true,
  breadcrumb: [],
}

/** Normaliza un pathname: sin barra final, sin query, sin hash, sin duplicados. */
export function normalizePath(pathname) {
  const raw = typeof pathname === 'string' && pathname.trim() !== '' ? pathname.trim() : '/'
  const pathOnly = raw.split('#')[0].split('?')[0]
  const normalized = `/${pathOnly}`.replace(/\/{2,}/g, '/')
  return normalized.length > 1 ? normalized.replace(/\/+$/, '') : '/'
}

/** Recorta una descripción a un largo seguro para SERP sin cortar palabras. */
function clampDescription(text, max = 158) {
  const clean = String(text).replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '')}…`
}

/** Construye los metadatos de una ruta /plan/:id a partir de la oferta real. */
function buildPlanRoutes() {
  const entries = {}

  membershipPlans.forEach((plan) => {
    const slug = String(plan.id).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const path = `/plan/${slug}`

    entries[path] = {
      title: `Plan ${plan.name} — ${plan.journey}`,
      /**
       * Descripción y precio publicado, en ese orden. Se evita `plan.audience`
       * a propósito: sumado a lo demás pasaba de 158 caracteres y la frase se
       * cortaba a mitad en la SERP.
       */
      description: clampDescription(
        `${plan.shortDescription} Plan ${plan.name}: ${plan.priceDisplay} COP al mes.`,
      ),
      ogType: 'product',
      planId: plan.id,
      breadcrumb: [
        ['Programas', '/programs'],
        [`Plan ${plan.name}`, path],
      ],
    }
  })

  return entries
}

const PLAN_ROUTES = buildPlanRoutes()

/** Registro completo: rutas estáticas + rutas de plan derivadas de la oferta. */
export const ROUTE_META = { ...STATIC_ROUTES, ...PLAN_ROUTES }

/** Todas las rutas indexables, para generar el sitemap. */
export function indexableRoutes() {
  return Object.entries(ROUTE_META)
    .filter(([, meta]) => meta.noindex !== true)
    .map(([path]) => path)
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b, 'es')))
}

/**
 * Resuelve los metadatos de un pathname.
 * Devuelve siempre un objeto utilizable: si la ruta no existe, devuelve 404.
 */
export function resolveRouteMeta(pathname) {
  const path = normalizePath(pathname)
  const canonicalPath = ROUTE_ALIASES[path] ?? path
  const meta = ROUTE_META[canonicalPath]

  if (!meta) {
    return { ...NOT_FOUND_META, path, canonicalPath: NOT_FOUND_META.path, isNotFound: true }
  }

  return {
    ...meta,
    path,
    canonicalPath,
    isAlias: canonicalPath !== path,
    isNotFound: false,
    ogType: meta.ogType ?? 'website',
    noindex: meta.noindex === true,
    description: clampDescription(meta.description),
    /** Título completo tal como debe aparecer en la pestaña y en la SERP. */
    fullTitle: meta.bare === true ? meta.title : `${meta.title} · ${TITLE_SUFFIX}`,
  }
}
