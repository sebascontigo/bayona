// Scene_Registry - catalogo de variantes de escena 3D (Requirement 25.1).
//
// Fuente unica que declara, por cada variante de escena, su componente React,
// sus parametros base (`SceneParams`) y los assets que necesita cargar. La
// escena 3D (Tareas 7-12) consume estas variantes a traves del provider.
//
// IMPORTANTE: los `defaults` son los valores de referencia para DESKTOP
// (calidad completa). La degradacion progresiva por dispositivo/capacidad
// (mobile, low-power, reduced-motion) NO se aplica aqui: la calcula la funcion
// pura `resolveSceneConfig` (Tarea 4.2) a partir de estos valores base.

import { lazy } from 'react'

/**
 * Parametros ajustables de una escena 3D. Los valores declarados en el
 * registro corresponden al perfil Desktop de calidad completa.
 *
 * @typedef {Object} SceneParams
 * @property {number} particleCount   Numero de particulas del sistema.
 * @property {number} instanceCount   Numero de instancias de malla renderizadas.
 * @property {number} bloomIntensity  Intensidad del post-proceso de bloom.
 * @property {number} dissolve        Progreso de disolucion, normalizado 0..1.
 * @property {number} glowIntensity   Intensidad del glow/emisivo.
 * @property {[number, number, number]} cameraPosition  Posicion de camara [x, y, z].
 */

/**
 * Definicion de una variante de escena en el registro.
 *
 * @typedef {Object} SceneVariant
 * @property {React.ComponentType|null} component  Componente R3F de la escena
 *   (null como placeholder hasta que se cablee en las Tareas 7-12).
 * @property {SceneParams} defaults  Parametros base (perfil Desktop).
 * @property {string[]} assets       Rutas de assets a precargar para la variante.
 */

/**
 * Catalogo de variantes de escena disponibles.
 *
 * @type {Record<string, SceneVariant>}
 */
export const sceneRegistry = {
  signature: {
    // Componente R3F de la variante, cargado de forma PEREZOSA (`React.lazy`)
    // para preservar el code-splitting: el bundle 3D solo se descarga al
    // renderizar la escena. Scene3D ya envuelve la variante en <Suspense>.
    component: lazy(() => import('../scene/SignatureScene.jsx')),
    // Valores de referencia Desktop; el ajuste por dispositivo lo hace
    // resolveSceneConfig (Tarea 4.2).
    defaults: {
      particleCount: 1200,
      instanceCount: 24,
      bloomIntensity: 0.5,
      dissolve: 0,
      glowIntensity: 0.35,
      cameraPosition: [0, 0, 5],
    },
    assets: [],
  },
}
