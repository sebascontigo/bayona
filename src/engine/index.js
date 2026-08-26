// Experience_Engine - barrel publico del motor visual (Requirement 24.1).
//
// Punto unico de entrada para consumir el motor desde la app existente:
//   import { ExperienceProvider, useCapabilities } from './engine'
//
// Los exports se habilitan de forma incremental conforme se implementan los
// modulos en las tareas del plan (.kiro/specs/premium-3d-experience/tasks.md):
// se descomenta cada linea al crear su modulo.

// --- Provider raiz (Tarea 16) ---
export { ExperienceProvider, useEngineScroll } from './providers/ExperienceProvider.jsx'

// --- Capability_Manager (Tarea 3) ---
export {
  CapabilityProvider,
  CapabilityContext,
  resolveMode,
  pointerEffectsEnabled,
} from './providers/CapabilityProvider.jsx'
export { useCapabilities } from './hooks/useCapabilities.js'

// --- Configuracion / tokens (Tareas 2 y 4) ---
export { theme } from './config/theme.js'
export { motionTokens, tierDuration, tierEase } from './config/motionTokens.js'
export { sceneRegistry } from './config/sceneRegistry.js'
export { resolveSceneConfig, clampDpr } from './config/sceneConfig.js'
export { resolveMotionProfile } from './config/motionProfile.js'

// --- Design System 2.0 (Fase 3): tokens responsivos y presets 3D ---
export { BREAKPOINTS, minWidth, maxWidth } from './config/breakpoints.js'
export {
  cameraPresets,
  materialPresets,
  depthLayers,
  sceneMotion,
  resolveCameraPreset,
  resolveMaterialPreset,
} from './config/scenePresets.js'

// --- Scroll y ciclo de vida de recursos (Tarea 5) ---
export { useLenis } from './hooks/useLenis.js'
export { useScrollProgress } from './hooks/useScrollProgress.js'
export { useSticky } from './hooks/useSticky.js'
export { useDisposable, createDisposableRegistry } from './hooks/useDisposable.js'

// --- Escena 3D (Tareas 7-12) ---
export { Scene3D } from './scene/Scene3D.jsx'
export { SceneMount } from './scene/SceneMount.jsx'

// --- Motion_System (Tarea 14) ---
export { Reveal } from './motion/Reveal.jsx'
export { TextReveal } from './motion/TextReveal.jsx'
export { useReveal, useScrollLinked } from './hooks/useReveal.js'
export { PageTransition } from './motion/PageTransition.jsx'
export { MagneticButton } from './motion/MagneticButton.jsx'
export { useMagnetic, magneticOffset } from './hooks/useMagnetic.js'
export { RippleButton } from './motion/RippleButton.jsx'
export { useTilt, tiltAngles } from './hooks/useTilt.js'

// --- Efectos globales (Tarea 15) ---
export { CustomCursor } from './effects/CustomCursor.jsx'
export { GrainOverlay } from './effects/GrainOverlay.jsx'
export { GlowTreatment } from './effects/GlowTreatment.jsx'
export { Parallax } from './effects/Parallax.jsx'

// --- Loader de marca (Tarea 16) ---
export { Loader } from './effects/Loader.jsx'
