export const PUBLIC_ROUTES = Object.freeze([
  '/',
  '/about',
  '/programs',
  '/parkour-academy',
  '/plan/raiz',
  '/plan/fuerza',
  '/plan/rendimiento',
  '/plan/elite',
  '/shop',
  '/app',
  '/community',
  '/resources',
  '/faq',
  '/checkout',
  '/order-confirmation',
  '/onboarding',
  '/entrar',
])

export const VISUAL_QA_VIEWPORTS = Object.freeze([
  Object.freeze({ name: 'móvil-375', width: 375, height: 812 }),
  Object.freeze({ name: 'tableta-768', width: 768, height: 1024 }),
  Object.freeze({ name: 'escritorio-1440', width: 1440, height: 900 }),
])

export const VISUAL_QA_MOTION_MODES = Object.freeze([
  Object.freeze({ name: 'movimiento-normal', reducedMotion: 'no-preference', expected: false }),
  Object.freeze({ name: 'movimiento-reducido', reducedMotion: 'reduce', expected: true }),
])
