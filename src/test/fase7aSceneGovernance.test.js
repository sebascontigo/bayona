// Guard de gobernanza de escenas 3D — Fase 7A.
//
// Impide que una escena 3D llegue a una ruta pública sin pasar por el gate de
// admisión. No mide rendimiento: protege una DECISIÓN de arquitectura.
//
// Si este test se pone rojo, la pregunta correcta NO es "cómo lo arreglo",
// es "¿quién admitió esa escena y dónde está su 3D-ADMISSION-RECORD?".
//
// Nota 7A: el hallazgo 7A-01 (fuga vendor-three por import estático del entry
// vía ExperienceProvider→Loader→drei) NO lo vigila este guard: es un problema
// de chunking del shell, reportado en FASE7A-FORENSIC.md y pendiente de
// decisión del arquitecto. Este guard vigila escenas MONTADAS en rutas.

import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const PAGES_DIR = 'src/pages'

// Lista blanca de rutas autorizadas a montar una escena 3D.
// VACÍA a fecha de Fase 7A. Añadir una entrada aquí requiere un registro de
// admisión APPROVED en 3D-ADMISSION-RECORD.md, citado en el comentario.
const SCENE_ALLOWLIST = Object.freeze([
  // ejemplo del formato, comentado a propósito:
  // { file: 'ParkourAcademy.jsx', admission: '3D-ADMISSION-RECORD.md#candidato-01', state: 'APPROVED' },
])

function pageFiles() {
  return readdirSync(PAGES_DIR).filter(
    (f) => f.endsWith('.jsx') && !f.includes('.test.'),
  )
}

describe('gobernanza de escenas 3D (Fase 7A)', () => {
  it('ninguna página pasa la prop `scene` a PageHero sin estar en la lista blanca', () => {
    const offenders = []
    for (const file of pageFiles()) {
      const src = readFileSync(join(PAGES_DIR, file), 'utf8')
      // Detecta `scene={...}` y `scene="..."` en JSX.
      if (/\bscene\s*=\s*[{"']/.test(src)) {
        const allowed = SCENE_ALLOWLIST.some((e) => e.file === file)
        if (!allowed) offenders.push(file)
      }
    }
    expect(
      offenders,
      `Estas páginas montan una escena sin admisión aprobada: ${offenders.join(', ')}. ` +
        'Busca su 3D-ADMISSION-RECORD.md o quita la prop scene.',
    ).toEqual([])
  })

  it('ninguna página importa Three.js, R3F, drei o postprocessing directamente', () => {
    const offenders = []
    const banned = /from\s+['"](three|@react-three\/fiber|@react-three\/drei|@react-three\/postprocessing)['"]/
    for (const file of pageFiles()) {
      const src = readFileSync(join(PAGES_DIR, file), 'utf8')
      if (banned.test(src)) offenders.push(file)
    }
    expect(
      offenders,
      `Las páginas deben pasar por SceneMount, nunca importar 3D directo: ${offenders.join(', ')}`,
    ).toEqual([])
  })

  it('el registro de escenas contiene exactamente las variantes documentadas', async () => {
    const { sceneRegistry } = await import('../engine/config/sceneRegistry.js')
    // Fase 7A no amplía el registro. Si este número cambia, alguien añadió una
    // variante y debe justificarlo con un registro de admisión.
    expect(Object.keys(sceneRegistry).sort()).toEqual(['signature'])
  })

  it('los techos de degradación móvil no se han relajado', async () => {
    const mod = await import('../engine/config/sceneConfig.js')
    expect(mod.MOBILE_MAX_PARTICLES).toBe(400)
    expect(mod.MOBILE_MAX_INSTANCES).toBe(8)
  })

  it('resolveSceneConfig sigue siendo fail-safe con variante desconocida', async () => {
    const { resolveSceneConfig } = await import('../engine/config/sceneConfig.js')
    expect(resolveSceneConfig({ variant: 'no-existe-esta-variante' }, { mode: 'desktop' })).toBeNull()
    expect(resolveSceneConfig(null, { mode: 'desktop' })).toBeNull()
    expect(resolveSceneConfig({ variant: 'signature', enabled: false }, { mode: 'desktop' })).toBeNull()
  })

  it('no hay librerías de motion/3D prohibidas importadas en src', () => {
    // gsap está en package.json como deuda muerta declarada: 0 imports.
    const offenders = []
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, entry.name)
        if (entry.isDirectory()) walk(p)
        else if (/\.(js|jsx)$/.test(entry.name)) {
          const src = readFileSync(p, 'utf8')
          if (/from\s+['"](gsap|animejs|@motionone|motion-one)['"]/.test(src)) offenders.push(p)
        }
      }
    }
    walk('src')
    expect(offenders, `Librerías prohibidas importadas: ${offenders.join(', ')}`).toEqual([])
  })

  it('7A-01: el Loader del shell sigue siendo el ÚNICO import estático de @react-three en la ruta de entrada', async () => {
    // Vigila la frontera de la fuga conocida (FASE7A-FORENSIC.md 7A-01):
    // ExperienceProvider → Loader.jsx importa useProgress de drei de forma
    // estática, lo que arrastra vendor-three al entry. Mientras el arquitecto
    // no decida el fix, este test fija el estado actual (exactamente 1 archivo
    // de engine/effects con import estático de drei) para que NADIE añada
    // más imports estáticos de 3D sin que la suite se ponga roja.
    const offenders = []
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, entry.name)
        if (entry.isDirectory()) walk(p)
        else if (/\.(js|jsx)$/.test(entry.name)) {
          const src = readFileSync(p, 'utf8')
          if (/from\s+['"]@react-three\/(fiber|drei|postprocessing)['"]/.test(src) && !p.includes('.test.')) offenders.push(p)
        }
      }
    }
    walk('src/engine')
    // Los módulos de escena (Scene3D, SignatureScene, ParticleField,
    // InstancedCluster, SignatureGeometry, PostProcessing) cargan por lazy()
    // y son legítimos. El problema es SOLO el que el shell alcanza.
    // Fijamos el inventario exacto actual: si aparece uno nuevo, detéctalo.
    const expected = [
      join('src', 'engine', 'scene', 'Scene3D.jsx'),
      join('src', 'engine', 'scene', 'PostProcessing.jsx'),
      join('src', 'engine', 'scene', 'InstancedCluster.jsx'),
      join('src', 'engine', 'scene', 'ParticleField.jsx'),
      join('src', 'engine', 'scene', 'SignatureGeometry.jsx'),
      join('src', 'engine', 'effects', 'Loader.jsx'),
    ]
    const norm = (p) => p.replace(/\\/g, '/').replace('src/', 'src/')
    const offendersNorm = offenders.map(norm).sort()
    const expectedNorm = expected.map(norm).sort()
    expect(
      offendersNorm,
      'Inventario de archivos engine con import estático de @react-three cambió. ' +
        'Si añadiste uno nuevo en la ruta del shell (providers/effects/motion), ' +
        'estás arrastrando vendor-three a TODAS las rutas: reporta y decide primero ' +
        '(FASE7A-FORENSIC.md 7A-01). Los de scene/ solo son legítimos porque cargan lazy.',
    ).toEqual(expectedNorm)
  })
})
