const BURST_CDN = 'https://burst.shopifycdn.com/photos'
const BURST_PAGE = 'https://www.shopify.com/stock-photos/photos'
const FOODIES_PAGE = 'https://foodiesfeed.com/free-food-photo'

const BURST_FILE_OVERRIDES = Object.freeze({
  'close-up-of-mother-board': 'close-up-of-motherboard',
  'female-athlete-tying-her-shoes': 'woman-athlete-tying-shoes',
  'running-on-a-cloudy-day': 'running-cloudy-day',
  'woman-wearing-athletic-leggings': 'womens-athletic-leggings',
  'working-out-with-chalk': 'Working-Out-With-Chalk',
  'massage-therapy-on-upper-back': 'massage-therapy-upper-back',
  'laptop-in-an-empty-room': 'laptop-in-empty-room',
  'business-team-meeting-in-boardroom': 'business-team-meeting-boardroom',
})

// Keep public media keys stable while replacing imagery that does not belong to BAYONA's
// physical world. Every replacement points to a Burst asset already used and verified in
// this registry; the original slug is retained as a cache variant so URLs remain unique.
const CURATED_BURST_MEDIA = Object.freeze({
  'home-transformation-tire': ['man-lifts-tire-exercise', 'Atleta construyendo fuerza funcional en una escena de alto impacto'],
  'home-ninety-days-runner': ['runner-stretching-arms-in-sun', 'Atleta recuperando energía y dirección bajo la luz del amanecer'],
  'rock-stack-on-log-by-water': ['person-stretching-in-fitness-clothing', 'Atleta recuperando movilidad después de entrenar'],
  'frustrated-man-on-computer': ['woman-strong-band-exercise', 'Mujer entrenando fuerza con una banda de resistencia'],
  'working-at-night': ['runner-stretching-arms-in-sun', 'Corredor recuperando energía bajo la luz del amanecer'],
  'beach-at-sunset-in-teal-and-orange': ['woman-athlete-tying-shoes', 'Atleta preparando sus zapatillas antes de comenzar'],
  'close-up-of-mother-board': ['working-out-with-chalk', 'Manos con magnesio antes de un trabajo de fuerza'],
  'students-working-on-project': ['strong-ladies', 'Mujeres fuertes aprendiendo y progresando juntas'],
  'kids-fashion-boy': ['woman-and-boy-muscle', 'Adulto y niño celebrando un cuerpo activo'],
  'designer-working-on-laptop': ['fitness-workout', 'Atleta practicando una progresión física con control'],
  'beautiful-beach-in-portugal': ['a-person-mid-jump-on-a-country-road', 'Atleta suspendido en pleno salto durante su evolución'],
  'tech-meeting-flatlay': ['gym-weights', 'Material de fuerza dispuesto para una sesión precisa'],
  'fistbump-over-desk': ['strong-women-planking', 'Compañeras sosteniendo juntas una progresión exigente'],
  'dancing-with-temples-in-the-orange-mist': ['woman-jumping-workout', 'Atleta en movimiento bajo una luz cálida y cinematográfica'],
  'prairie-woman-at-sunset': ['young-woman-doing-yoga-outside', 'Mujer iniciando su camino de movimiento al aire libre'],
  'mens-fashion-loose-cotton-shirt': ['person-stretching-in-fitness-clothing', 'Prenda técnica acompañando una sesión de movilidad'],
  'young-man-in-bright-fashion': ['fitness-man-chin-ups', 'Sudadera de entrenamiento en una progresión de tracción'],
  'young-man-leans-on-wall': ['weight-lifting-man', 'Prenda premium durante una sesión de fuerza'],
  'mens-fashion-stonewash-jeans-and-boots': ['man-running-at-the-track', 'Pantalón de movimiento durante una carrera en pista'],
  'young-woman-in-hat': ['female-athlete-tying-her-shoes', 'Accesorio deportivo junto a una atleta preparando su sesión'],
  'woman-in-jean-jacket': ['running-on-a-cloudy-day', 'Capa exterior ligera durante un entrenamiento al aire libre'],
  'person-sits-cross-legged-in-summer-fashion': ['restorative-yoga', 'Conjunto cómodo durante una sesión de recuperación'],
  'getting-business-finances-in-order': ['fitness-tracker', 'Dispositivo de seguimiento corporal y rendimiento'],
  'portrait-of-illuminated-laptop': ['rooftopper-looking-down', 'Atleta urbano leyendo una ruta desde las alturas'],
  'startup-desktop': ['jogger-laces-up', 'Atleta preparando el primer movimiento del día'],
  'man-pointing-at-laptop-screen-analytics': ['weighted-squat-exercise', 'Atleta ejecutando una progresión medible de fuerza'],
  'man-in-video-meeting': ['woman-lifts-free-weights', 'Mujer siguiendo una sesión guiada con pesos libres'],
  'women-work-office': ['strong-women-planking', 'Comunidad de mujeres avanzando bajo una misma estructura'],
  'mobile-phone-and-gimbal-in-hand': ['man-running-at-the-track', 'Movimiento atlético registrado durante una carrera'],
  'laptop-in-an-empty-room': ['resting-on-basketball-court', 'Deportista detenido antes de recuperar dirección'],
  'finger-pointing-at-javascript-code': ['intense-exercise', 'Atleta saturado por entrenar sin una progresión clara'],
  'office-computer-screen': ['exercise-stretching', 'Persona recuperando conexión corporal mediante movilidad'],
  'iphone-photography-landscape': ['cross-fit-rope-workout', 'Sesión guiada de acondicionamiento con cuerdas'],
  'organized-workspace': ['core-strength-fitness', 'Progresión ordenada de estabilidad y fuerza central'],
  'black-coffee-and-phone-flatlay': ['restorative-yoga', 'Pausa de recuperación integrada en una rutina real'],
  'tattood-man-using-creative-technology': ['one-arm-push-up', 'Atleta dominando una habilidad de fuerza corporal'],
  'tidy-desk-in-window-light': ['young-woman-doing-yoga-outside', 'Rutina de movilidad bajo luz natural'],
  'drawing-in-notebook': ['ladies-stretch-circle', 'Grupo aprendiendo mediante una práctica de movilidad'],
  'woman-in-fur-under-neon': ['woman-lifts-free-weights', 'Mujer entrenando fuerza en un entorno de alto rendimiento'],
  'fog-on-dark-waters-edge': ['sunset-hike-to-the-summit', 'Comunidad alcanzando una nueva cota al atardecer'],
  'sports-stadium-crowds': ['strong-ladies', 'Grupo de atletas celebrando su progreso compartido'],
  'leather-bound-journal-and-mobile-phone': ['jogger-laces-up', 'Primer paso práctico para activar una semana de movimiento'],
  'office-work-tools-on-the-white-desk': ['weighted-squat-exercise', 'Respuesta práctica convertida en una progresión de fuerza'],
  'carved-stone-buddhas-adorn-ornate-wooden-doorway': ['seated-meditation', 'Atleta entrenando atención y respiración'],
  'loft-chic-living-with-puppy': ['massage-therapy-on-upper-back', 'Recuperación muscular aplicada después del esfuerzo'],
  'business-team-meeting-in-boardroom': ['strong-women-planking', 'Equipo sosteniendo una sesión de fuerza conjunta'],
  'making-a-budget-tracking-finances': ['exercise-free-weights', 'Pesos preparados para planificar una progresión real'],
  'couple-on-coffee-date': ['three-laughing-women', 'Personas reforzando vínculos después de entrenar'],
  'computer-security-lock-and-payment': ['fitness-tracker', 'Datos corporales convertidos en decisiones de entrenamiento'],
  'colorful-work-space': ['workout-fitness-center', 'Entorno completo dedicado a entrenar y evolucionar'],
  'motivation-near-window': ['one-arm-push-up', 'Atleta entrenando fuerza corporal con control'],
  'cave-of-wonder-and-lights': ['rooftopper-looking-down', 'Atleta urbano observando el siguiente obstáculo'],
})

function burst(slug, description, { width = 1600, height = 1000 } = {}) {
  const curated = CURATED_BURST_MEDIA[slug]
  const mediaSlug = curated?.[0] ?? slug
  const mediaDescription = curated?.[1] ?? description
  const fileSlug = BURST_FILE_OVERRIDES[mediaSlug] ?? mediaSlug
  const cacheVariant = curated ? `&v=${encodeURIComponent(slug)}` : ''

  return Object.freeze({
    key: `burst:${slug}`,
    // Las fotos se sirven desde el propio sitio (public/images/burst/):
    // el CDN externo de Shopify se cuelga para algunos visitantes y
    // dejaba media tienda sin imágenes. Sin query de ancho, StockImage
    // usa un único src (sin srcset), suficiente a estos tamaños.
    src: `/images/burst/${fileSlug}.jpg?v=${encodeURIComponent(slug)}&w=${width}`,
    description: mediaDescription,
    source: 'Burst by Shopify',
    sourceUrl: `${BURST_PAGE}/${mediaSlug}`,
    width,
    height,
  })
}

function burstProduct(slug, description) {
  return burst(slug, description, { width: 1000, height: 1250 })
}

/** Escalera de anchos por defecto. Cubre móvil, tablet, escritorio y retina. */
export const MEDIA_WIDTH_LADDER = Object.freeze([320, 480, 640, 960, 1280, 1600])

/**
 * Anchos de los fondos de escena a 1x y 2x.
 *
 * Los comparten `image-set()` en SceneBackground y el `<link rel="preload">`
 * que genera vite/emitRouteHtml.js. Deben ser los mismos dos valores en los
 * dos sitios: si difieren, el navegador precarga un ancho y luego pinta otro,
 * descargando la imagen del héroe dos veces.
 */
export const SCENE_WIDTH_1X = 960
export const SCENE_WIDTH_2X = 1600

/**
 * Construye el `srcset` de una imagen del registro.
 *
 * El CDN de Burst redimensiona con `?width=`, pero hasta ahora todas las
 * imágenes se pedían a su ancho máximo (1600 px, o 1000 px en producto) y se
 * mostraban en tarjetas de 300–400 px. `StockImage` incluso declaraba `sizes`
 * sin `srcset`, así que ese `sizes` no servía para nada: el navegador no tenía
 * alternativas entre las que elegir.
 *
 * Con esto, cada hueco recibe el ancho que le toca: menos bytes en móvil y
 * más nitidez en pantallas retina, donde antes se escalaba hacia arriba.
 *
 * Devuelve `null` si la fuente no admite redimensionado (FoodiesFeed sirve
 * archivos fijos), para no anunciar anchos que el CDN no va a respetar.
 */
export function mediaSrcSet(media, widths = MEDIA_WIDTH_LADDER) {
  if (!media?.src || typeof media.src !== 'string') return null
  if (!media.src.includes('width=')) return null

  const maxWidth = Number(media.width) || Math.max(...widths)
  const usable = widths.filter((width) => width <= maxWidth)
  if (usable.length === 0) return null

  /** Se incluye siempre el ancho nativo para no perder el tope de calidad. */
  const ladder = [...new Set([...usable, maxWidth])].sort((a, b) => a - b)

  return ladder
    .map((width) => `${media.src.replace(/width=\d+/, `width=${width}`)} ${width}w`)
    .join(', ')
}

/** Variante de una imagen a un ancho concreto (para preload del LCP). */
export function mediaAtWidth(media, width) {
  if (!media?.src || typeof media.src !== 'string') return media?.src ?? ''
  if (!media.src.includes('width=')) return media.src
  return media.src.replace(/width=\d+/, `width=${Math.round(width)}`)
}

function foodies(slug, src, description) {
  return Object.freeze({
    key: `foodiesfeed:${slug}`,
    src,
    description,
    source: 'FoodiesFeed',
    sourceUrl: `${FOODIES_PAGE}/${slug}`,
    width: 1600,
    height: 1000,
  })
}

const food = Object.freeze({
  salmonBowl: foodies(
    'grilled-salmon-bowl-with-quinoa-and-colorful-veggies',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/masters/grilled-salmon-bowl-with-quinoa-and-colorful-veggies-e_nRLrswt6JcYBEXE_jqC.jpg',
    'Bol de salmón, quinoa y vegetales de colores',
  ),
  falafelBowl: foodies(
    'mediterranean-falafel-bowl-with-fresh-vegetables',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/masters/mediterranean-falafel-bowl-with-fresh-vegetables-vey-ycYrwgbFrFa2DHCMO.jpg',
    'Bol mediterráneo de falafel y vegetales frescos',
  ),
  breakfast: foodies(
    'colorful-breakfast-spread-on-a-rustic-plate',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/masters/colorful-breakfast-spread-on-a-rustic-plate-VGbHfppD0Pq-q4gtkxTDo.jpg',
    'Desayuno colorido servido sobre un plato rústico',
  ),
  yogurtBowl: foodies(
    'delicious-yogurt-bowl-with-fresh-berries',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/uploads/masters/delicious-yogurt-bowl-with-fresh-berries-zMGsjHioPiCV2tboR91Bt.jpg',
    'Bol de yogur con frutos rojos frescos',
  ),
  greens: foodies(
    'fresh-greens-tossed-in-a-vibrant-bowl',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/masters/fresh-greens-tossed-in-a-vibrant-bowl-nh70oonG1idibN9ps5yQe.jpg',
    'Ensalada de hojas verdes en un bol vibrante',
  ),
  berrySmoothie: foodies(
    'fresh-smoothie-with-berries',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/masters/fresh-smoothie-with-berries-oVzwlyxZn6V9J_WgdEdZV.jpg',
    'Batido fresco acompañado de frutos rojos',
  ),
  proteinBrunch: foodies(
    'high-protein-brunch-with-poached-eggs-beans-and-bacon',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/masters/high-protein-brunch-with-poached-eggs-beans-and-bacon-DKRP6A53Y9evKXYOaTwIu.jpg',
    'Brunch alto en proteína con huevos y legumbres',
  ),
  blueberrySmoothie: foodies(
    'blueberry-smoothie',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/masters/blueberry-smoothie-h9j79L9hWbMWBLTR6-zXX.jpg',
    'Batido cremoso de arándanos',
  ),
  chickpeaSalad: foodies(
    'mediterranean-chickpea-salad',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/masters/mediterranean-chickpea-salad-FQXZ4JsOxxfAd1cbn7-CE.jpg',
    'Ensalada mediterránea de garbanzos',
  ),
  vegetables: foodies(
    'fresh-vegetables-in-midair',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/generated/masters/fresh-vegetables-in-midair-AbIlPiCnkYVL-XB8EQm18.jpg',
    'Vegetales frescos suspendidos sobre un fondo limpio',
  ),
  yogurtParfait: foodies(
    'delicious-yogurt-parfait-with-fresh-berries',
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/masters/delicious-yogurt-parfait-with-fresh-berries-cJtBJzkV30_dBilB8RL6B.jpg',
    'Parfait de yogur con frutos rojos frescos',
  ),
})

export const siteMedia = Object.freeze({
  home: Object.freeze({
    hero: burst(
      'home-transformation-tire',
      'Atleta construyendo fuerza funcional en una escena de alto impacto',
      { width: 2000, height: 1250 },
    ),
    ninetyDays: burst('home-ninety-days-runner', 'Atleta recuperando energía y dirección bajo la luz del amanecer'),
    method: burst('rock-stack-on-log-by-water', 'Piedras equilibradas junto al agua'),
    community: burst('three-laughing-women', 'Grupo de mujeres compartiendo un momento después de entrenar'),
    proof: burst('sunset-hike-to-the-summit', 'Persona alcanzando una cima al atardecer'),
    problems: Object.freeze([
      burst('resting-on-basketball-court', 'Deportista descansando en una cancha'),
      burst('frustrated-man-on-computer', 'Persona frustrada frente a un ordenador'),
      burst('stretching-on-tire', 'Atleta estirando junto a un neumático'),
      burst('working-at-night', 'Persona trabajando de noche con poco tiempo disponible'),
    ]),
    pillars: Object.freeze([
      burst('lighting-a-weight', 'Peso de entrenamiento bajo luz dramática'),
      burst('find-balance', 'Persona practicando equilibrio corporal'),
      burst('man-running-at-the-track', 'Corredor avanzando sobre una pista'),
    ]),
  }),
  about: Object.freeze({
    hero: burst('beach-at-sunset-in-teal-and-orange', 'Costa mediterránea bajo luz cálida de atardecer'),
    story: burst('rooftopper-looking-down', 'Atleta urbano observando una ruta desde las alturas'),
    values: Object.freeze([
      burst('close-up-of-mother-board', 'Detalle de circuitos y precisión tecnológica'),
      burst('ladies-stretch-circle', 'Grupo practicando movilidad en círculo'),
      burst('students-working-on-project', 'Personas aprendiendo y colaborando en un proyecto'),
      burst('heavy-lifting-man', 'Atleta concentrado durante un levantamiento exigente'),
    ]),
    timeline: Object.freeze([
      burst('kids-fashion-boy', 'Niño mirando hacia adelante en un entorno exterior'),
      burst('a-person-mid-jump-on-a-country-road', 'Persona capturada en pleno salto sobre un camino'),
      burst('designer-working-on-laptop', 'Profesional investigando y trabajando con tecnología'),
      burst('beautiful-beach-in-portugal', 'Costa ibérica luminosa frente al océano'),
    ]),
  }),
  programs: Object.freeze({
    hero: burst('man-lifts-tire-exercise', 'Atleta entrenando fuerza funcional con un neumático'),
    audiences: Object.freeze([
      burst('woman-and-boy-muscle', 'Adulto y niño celebrando el movimiento juntos'),
      burst('female-athlete-tying-her-shoes', 'Joven atleta preparando sus zapatillas'),
      burst('core-strength-fitness', 'Persona adulta entrenando estabilidad y fuerza'),
      burst('cross-fit-rope-workout', 'Deportista trabajando con cuerdas de entrenamiento'),
      burst('person-sits-in-a-calm-meditation-pose', 'Persona practicando movilidad consciente y calma'),
    ]),
    pillars: Object.freeze([
      burst('tech-meeting-flatlay', 'Mesa de trabajo con tecnología y notas de análisis'),
      burst('weighted-squat-exercise', 'Atleta progresando en un ejercicio de fuerza'),
      burst('fistbump-over-desk', 'Dos personas mostrando apoyo y colaboración'),
    ]),
    ninetyDays: food.falafelBowl,
    services: Object.freeze([
      burst('boxing-gym-workout', 'Sesión guiada de entrenamiento en gimnasio'),
      burst('restorative-yoga', 'Práctica suave orientada a la recuperación'),
      burst('gym-weight-lifting', 'Trabajo de rendimiento con pesos en gimnasio'),
    ]),
    community: burst('strong-women-planking', 'Grupo entrenando y avanzando unido'),
  }),
  plans: Object.freeze({
    RAIZ: Object.freeze({
      hero: burst('young-woman-doing-yoga-outside', 'Persona reconstruyendo su base de movimiento al aire libre'),
      poster: burst('woman-does-bridge-pose-yoga-on-path', 'Práctica progresiva de movilidad en un sendero'),
    }),
    FUERZA: Object.freeze({
      hero: burst('weight-lifting-man', 'Atleta desarrollando fuerza con una barra'),
      poster: burst('woman-lifts-free-weights', 'Entrenamiento acompañado con pesos libres'),
    }),
    RENDIMIENTO: Object.freeze({
      hero: burst('intense-exercise', 'Atleta en una sesión intensa de rendimiento'),
      poster: burst('fitness-man-chin-ups', 'Deportista realizando dominadas con control'),
    }),
    ELITE: Object.freeze({
      hero: burst('arm-back-muscles', 'Atleta mostrando control y dominio físico'),
      poster: burst('fitness-workout', 'Sesión de entrenamiento de alto nivel'),
    }),
  }),
  shop: Object.freeze({
    hero: burst('dancing-with-temples-in-the-orange-mist', 'Figura en movimiento entre luz naranja y arquitectura'),
    collections: Object.freeze({
      origins: burst('prairie-woman-at-sunset', 'Silueta comenzando un camino al atardecer'),
      movement: burst('running-on-a-cloudy-day', 'Persona corriendo con libertad bajo un cielo dramático'),
      strength: burst('gym-weights', 'Pesos ordenados en un espacio de entrenamiento'),
      recovery: burst('meditation-flow', 'Práctica de recuperación y respiración consciente'),
    }),
    products: Object.freeze({
      'tank-top-performance': burstProduct('womens-tshirts', 'Camisetas deportivas sin mangas en exposición'),
      'short-tecnico-bayona': burstProduct('ladies-leggings-legs', 'Prenda técnica deportiva para entrenamiento'),
      'legging-pro-mujer': burstProduct('woman-wearing-athletic-leggings', 'Leggings deportivos de ajuste técnico'),
      'camiseta-manga-larga': burstProduct('mens-fashion-loose-cotton-shirt', 'Camiseta de manga larga de estilo deportivo'),
      'top-deportivo-mujer': burstProduct('color-matched-workout-clothes', 'Conjunto deportivo coordinado para entrenamiento'),
      'camiseta-compresion': burstProduct('person-stretching-in-fitness-clothing', 'Camiseta técnica ajustada durante una sesión de movilidad'),
      'hoodie-origins': burstProduct('young-man-in-bright-fashion', 'Sudadera urbana de silueta contemporánea'),
      'hoodie-premium': burstProduct('young-man-leans-on-wall', 'Sudadera premium de estilo urbano'),
      'camiseta-origins': burstProduct('tshirts', 'Camisetas básicas de estilo minimalista'),
      'pantalon-jogger-premium': burstProduct('mens-fashion-stonewash-jeans-and-boots', 'Pantalón casual de corte urbano'),
      'gorra-bayona': burstProduct('young-woman-in-hat', 'Gorra casual de estilo contemporáneo'),
      'chaqueta-windstopper': burstProduct('woman-in-jean-jacket', 'Chaqueta ligera para uso exterior'),
      'sudadero-recovery': burstProduct('person-sits-cross-legged-in-summer-fashion', 'Conjunto cómodo para recuperación y descanso'),
      'calcetines-compresion-pack-3': burstProduct('geometric-socks', 'Calcetines deportivos con diseño geométrico'),
      'zapatillas-move': burstProduct('beige-trainers-in-front-of-yellow-beam', 'Zapatillas de entrenamiento de perfil ligero'),
      'zapatillas-trainer-pro': burstProduct('close-up-of-some-running-shoes', 'Zapatillas técnicas vistas en primer plano'),
      'zapatillas-parkour-free': burstProduct('black-and-white-sneakers-against-purple-and-white', 'Zapatillas urbanas con suela de agarre'),
      'chanclas-recovery': burstProduct('sandals-in-sand', 'Sandalias ligeras para descanso'),
      'bandas-resistencia-set-5': burstProduct('woman-strong-band-exercise', 'Bandas elásticas durante un ejercicio de resistencia'),
      'mancuernas-ajustables': burstProduct('exercise-free-weights', 'Pesos libres preparados para entrenamiento'),
      'kit-reboot': burstProduct('core-strength-workout', 'Equipo esencial dispuesto para una sesión funcional'),
      'foam-roller-pro': burstProduct('spinal-twist-yoga-wheel', 'Accesorio cilíndrico usado en movilidad y recuperación'),
      'pelota-suiza': burstProduct('fitness-ball', 'Pelota de ejercicio para estabilidad y movilidad'),
      'kettlebell-pro': burstProduct('working-out-with-chalk', 'Peso funcional durante un entrenamiento de fuerza'),
      'barra-dominadas-portatil': burstProduct('man-reaching-for-bar', 'Barra elevada utilizada para ejercicios de tracción'),
      'esterilla-premium': burstProduct('purple-yoga-mat-partially-rolled-on-a-wooden-floor', 'Esterilla de entrenamiento parcialmente enrollada'),
      'guantes-parkour': burstProduct('hands-tightly-grip-a-purple-rope', 'Manos protegidas durante un ejercicio de agarre'),
      'mochila-bayona': burstProduct('black-gold-fashion-backpack', 'Mochila deportiva negra de diseño limpio'),
      'botella-smart-bayona': burstProduct('a-person-smiles-holding-a-water-bottle-and-a-yoga-mat', 'Botella reutilizable junto a una esterilla deportiva'),
      'pistola-masaje-pro': burstProduct('massage-therapy-on-upper-back', 'Herramienta de recuperación aplicada sobre la espalda'),
      'reloj-inteligente-bayona': burstProduct('fitness-tracker', 'Reloj de actividad para seguimiento del entrenamiento'),
      'banda-resistencia-inteligente': burstProduct('stationary-bike-workout', 'Tecnología de seguimiento integrada en una sesión deportiva'),
      'bascula-inteligente': burstProduct('getting-business-finances-in-order', 'Superficie digital con lectura y seguimiento de datos'),
      'whey-protein-bayona': Object.freeze({ ...food.berrySmoothie, width: 1000, height: 1250 }),
      'creatina-monohidrato': Object.freeze({ ...food.proteinBrunch, width: 1000, height: 1250 }),
      'pre-workout-elite': Object.freeze({ ...food.blueberrySmoothie, width: 1000, height: 1250 }),
      'omega-3-premium': Object.freeze({ ...food.chickpeaSalad, width: 1000, height: 1250 }),
      'multivitaminico-elite': Object.freeze({ ...food.vegetables, width: 1000, height: 1250 }),
      'colageno-hidrolizado': Object.freeze({ ...food.yogurtParfait, width: 1000, height: 1250 }),
      'parkour-mastery': burstProduct('one-arm-push-up', 'Atleta dominando una habilidad de fuerza corporal'),
      'elite-fitness': burstProduct('cross-fit-tire-lift', 'Programa visualizado como entrenamiento funcional avanzado'),
      'mindful-warrior': burstProduct('seated-meditation', 'Práctica de concentración y atención corporal'),
      'pack-transformacion-total': burstProduct('workout-fitness-center', 'Espacio completo de entrenamiento y transformación'),
    }),
  }),
  app: Object.freeze({
    hero: burst('portrait-of-illuminated-laptop', 'Tecnología iluminada en un entorno oscuro'),
    vision: Object.freeze([
      burst('startup-desktop', 'Panel digital preparado para organizar el día'),
      burst('man-pointing-at-laptop-screen-analytics', 'Persona interpretando progreso en una pantalla'),
      burst('man-in-video-meeting', 'Conversación humana mediante una videollamada'),
      burst('women-work-office', 'Personas colaborando como una comunidad activa'),
      burst('mobile-phone-and-gimbal-in-hand', 'Tecnología móvil siguiendo el movimiento'),
    ]),
    pain: Object.freeze([
      burst('laptop-in-an-empty-room', 'Pantalla aislada en una habitación vacía'),
      burst('finger-pointing-at-javascript-code', 'Información técnica compleja sobre una pantalla'),
      burst('office-computer-screen', 'Interfaz digital sin interacción humana visible'),
    ]),
    features: Object.freeze([
      burst('iphone-photography-landscape', 'Teléfono mostrando una experiencia visual inmersiva'),
      burst('organized-workspace', 'Espacio ordenado para tomar decisiones claras'),
      burst('black-coffee-and-phone-flatlay', 'Teléfono integrado en una rutina cotidiana'),
      burst('tattood-man-using-creative-technology', 'Persona interactuando con tecnología creativa'),
      burst('tidy-desk-in-window-light', 'Tecnología discreta en un entorno luminoso y sereno'),
    ]),
  }),
  community: Object.freeze({
    hero: burst('beach-sunset-silhouettes', 'Grupo reunido frente al mar al atardecer'),
    feelings: Object.freeze([
      burst('friends-backpacking-together', 'Amigos avanzando juntos por un sendero'),
      burst('drawing-in-notebook', 'Persona aprendiendo y tomando notas'),
      burst('woman-with-arms-up', 'Persona celebrando un avance con los brazos en alto'),
      burst('hiking-though-giants', 'Persona creciendo entre un paisaje de gran escala'),
    ]),
    tiers: Object.freeze([
      burst('ladies-yoga-stretch', 'Grupo abierto practicando movilidad'),
      burst('strong-ladies', 'Equipo entrenando con apoyo cercano'),
      burst('woman-in-fur-under-neon', 'Ambiente privado con iluminación exclusiva'),
    ]),
    stories: burst('fog-on-dark-waters-edge', 'Atmósfera serena sobre agua oscura'),
    group: burst('sports-stadium-crowds', 'Energía colectiva en un espacio deportivo'),
  }),
  resources: Object.freeze({
    hero: food.breakfast,
    challenge: burst('woman-workout-jumping', 'Atleta iniciando un reto mediante un salto dinámico'),
    steps: Object.freeze([
      burst('jogger-laces-up', 'Persona preparando sus zapatillas para comenzar'),
      burst('squatting-exercise', 'Persona construyendo una base mediante una sentadilla'),
      burst('upward-dog-pose', 'Movilidad de columna durante una práctica guiada'),
      burst('arm-workout', 'Ejercicio de fuerza enfocado en el tren superior'),
      burst('runner-stretching-arms-in-sun', 'Corredor recuperando al aire libre'),
      burst('exercise-stretching', 'Sesión final de estiramiento y respiración'),
    ]),
    fresh: Object.freeze([
      burst('leather-bound-journal-and-mobile-phone', 'Cuaderno y teléfono para una idea de inicio de semana'),
      burst('office-work-tools-on-the-white-desk', 'Herramientas para resolver una pregunta con claridad'),
      burst('fresh-thyme-and-kitchen-scissors', 'Recurso práctico preparado para aplicar'),
    ]),
    magazine: food.yogurtBowl,
    topics: Object.freeze([
      burst('kicking-workout', 'Entrenamiento dinámico de cuerpo completo'),
      food.greens,
      burst('carved-stone-buddhas-adorn-ornate-wooden-doorway', 'Escena contemplativa asociada a la mentalidad'),
      burst('loft-chic-living-with-puppy', 'Ambiente sereno dedicado al descanso'),
      burst('business-team-meeting-in-boardroom', 'Equipo analizando decisiones de negocio'),
      burst('making-a-budget-tracking-finances', 'Planificación financiera sobre una mesa de trabajo'),
      burst('couple-on-coffee-date', 'Personas cuidando una relación mediante conversación'),
      burst('woman-meditates-cross-legged-under-a-tree', 'Persona meditando bajo un árbol'),
      burst('taking-care-and-practicing-yoga', 'Práctica orientada al cuidado de la salud'),
      burst('motivation-near-window', 'Recordatorio de metas junto a una ventana'),
      burst('computer-security-lock-and-payment', 'Tecnología y datos aplicados a decisiones personales'),
      burst('colorful-work-space', 'Espacio de trabajo dedicado a la creatividad'),
    ]),
  }),
  parkourAcademy: Object.freeze({
    hero: burst('a-person-mid-jump-on-a-country-road', 'Atleta suspendido durante un salto de parkour', { width: 1800, height: 1125 }),
    levels: burst('rooftopper-looking-down', 'Atleta leyendo un recorrido urbano desde las alturas', { width: 1801, height: 1126 }),
    safety: burst('stretching-on-tire', 'Atleta preparando movilidad antes de practicar', { width: 1802, height: 1127 }),
    closing: burst('sunset-hike-to-the-summit', 'Atleta avanzando hacia una nueva altura al atardecer', { width: 1803, height: 1128 }),
  }),
  faq: Object.freeze({
    hero: burst('cave-of-wonder-and-lights', 'Luz atravesando una cueva de formas abstractas'),
  }),
  onboarding: Object.freeze({
    threshold: burst('hot-sunset-over-water', 'Horizonte mediterráneo bajo un atardecer naranja'),
  }),
})

function collectMedia(value, result = []) {
  if (!value || typeof value !== 'object') return result
  if (typeof value.src === 'string' && typeof value.key === 'string') {
    result.push(value)
    return result
  }
  Object.values(value).forEach((item) => collectMedia(item, result))
  return result
}

export const siteMediaInventory = Object.freeze(collectMedia(siteMedia))

const uniqueSources = new Set(siteMediaInventory.map(({ src }) => src))
if (uniqueSources.size !== siteMediaInventory.length) {
  throw new Error(`El registro multimedia contiene ${siteMediaInventory.length - uniqueSources.size} URL duplicadas.`)
}
