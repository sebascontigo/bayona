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

  it('7B: el shell del engine (providers/effects/motion/hooks) tiene CERO imports estáticos de @react-three', () => {
    // Post-fix 7A-01 (Fase 7B): el Loader ya no importa drei y el barrel ya no
    // reexporta las escenas. El shell debe estar 100% limpio: cualquier import
    // estático de @react-three en providers/effects/motion/hooks volvería a
    // arrastrar vendor-three al chunk de entrada de TODAS las rutas.
    // Los módulos de scene/ son los ÚNICOS legítimos (cargan vía lazy()).
    const offenders = []
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, entry.name)
        if (entry.isDirectory()) walk(p)
        else if (/\.(js|jsx)$/.test(entry.name) && !p.includes('.test.')) {
          const src = readFileSync(p, 'utf8')
          if (/from\s+['"]@react-three\/(fiber|drei|postprocessing)['"]/.test(src)) offenders.push(p)
        }
      }
    }
    for (const shellDir of ['src/engine/providers', 'src/engine/effects', 'src/engine/motion', 'src/engine/hooks']) {
      walk(shellDir)
    }
    expect(
      offenders,
      'Import estático de @react-three en el SHELL (providers/effects/motion/hooks): ' +
        `${offenders.join(', ')}. Eso arrastra vendor-three (233 kB gzip) al chunk de entrada ` +
        'de TODAS las rutas — exactamente la fuga 7A-01 que Fase 7B erradicó. ' +
        'Las escenas 3D viven en engine/scene/ y se cargan vía lazy().',
    ).toEqual([])
  })

  it('8B/H-01a: el barrel del engine NO reexporta módulos de escena (scene/* ni SceneMount)', () => {
    // Escenario E3 de la auditoría suprema: reexportar `SceneMount` (o cualquier
    // módulo de engine/scene/) desde el barrel deja el grafo de escenas
    // alcanzable desde main.jsx/App.jsx, que importan del barrel — exactamente
    // la 2ª cadena de la fuga 7A-01, que el guard original no veía porque
    // SceneMount.jsx no importa @react-three directamente (el 3D está en su
    // lazy hacia Scene3D).
    const barrel = readFileSync('src/engine/index.js', 'utf8')
    const offenders = barrel
      .split('\n')
      .map((line, i) => ({ line, i }))
      .filter(({ line }) => /^\s*export\b/.test(line) && /['"]\.{1,2}\/scene\//.test(line))
    expect(
      offenders.map(({ line, i }) => `línea ${i + 1}: ${line.trim()}`),
      'El barrel de engine reexporta módulos de escena. Eso hace el grafo 3D ' +
        'alcanzable desde el shell (main.jsx/App.jsx importan del barrel) y puede ' +
        'reintroducir la fuga 7A-01. Los módulos de escena se consumen por ruta ' +
        'directa (import ... from "../engine/scene/SceneMount.jsx").',
    ).toEqual([])
  })

  it('8B/H-01b: ninguna página importa infraestructura de escena (engine/scene/* ni SceneMount) sin allowlist', () => {
    // Escenario E4: una página que importa SceneMount directamente arrastra el
    // chunk de escena (y su lazy hacia vendor-three) a la ruta, aunque no pase
    // `scene=`. La allowlist está VACÍA: llenarla exige un registro de admisión
    // APPROVED en 3D-ADMISSION-RECORD.md, citado aquí.
    const SCENE_IMPORT_ALLOWLIST = Object.freeze([
      // { file: 'About.jsx', admission: '3D-ADMISSION-RECORD.md#candidato-02', state: 'APPROVED' },
    ])
    const offenders = []
    const bannedPath = /['"]\.{1,2}(\/\.\.)*\/engine\/scene\/|['"]\.{1,2}\/scene\//
    for (const file of pageFiles()) {
      const src = readFileSync(join(PAGES_DIR, file), 'utf8')
      // import ... from ".../engine/scene/..." o ".../scene/SceneMount..."
      const importRe = /import\s[^;]*?from\s+['"]([^'"]+)['"]/g
      let m
      while ((m = importRe.exec(src)) !== null) {
        if (bannedPath.test(m[1]) || /SceneMount|Scene3D/.test(m[1])) {
          if (!SCENE_IMPORT_ALLOWLIST.some((e) => e.file === file)) offenders.push(`${file} <- ${m[1]}`)
        }
      }
    }
    expect(
      offenders,
      'Estas páginas importan infraestructura de escena 3D directamente: ' +
        `${offenders.join(', ')}. Montar una escena exige pasar por PageHero ` +
        '(prop scene=, vigila otro test) con registro de admisión APPROVED, ' +
        'no importar el módulo de escena a mano. Ver FASE7B-EXECUTION-REPORT.md H-01.',
    ).toEqual([])
  })

  it('7B: los ÚNICOS archivos de producción con import de @react-three son los módulos de escena (lazy)', () => {
    // Inventario cerrado post-7B: exactamente estos 5 archivos (todos dentro
    // de engine/scene/, todos alcanzables SOLO vía lazy()). Si aparece uno
    // nuevo en cualquier otra carpeta, este test se pone rojo.
    const found = []
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, entry.name)
        if (entry.isDirectory()) walk(p)
        else if (/\.(js|jsx)$/.test(entry.name) && !p.includes('.test.')) {
          const src = readFileSync(p, 'utf8')
          if (/from\s+['"]@react-three\/(fiber|drei|postprocessing)['"]/.test(src)) found.push(p)
        }
      }
    }
    walk('src')
    const norm = (p) => p.replace(/\\/g, '/')
    const foundNorm = found.map(norm).sort()
    const expected = [
      // Globe3D.jsx: globo WebGL DORMANTE (sin importadores de producción, verificado
      // en FASE7A-FORENSIC.md C.2) — patrón de referencia de fallback accesible.
      'src/components/Globe3D.jsx',
      // Los 5 módulos de escena del engine: alcanzables SOLO vía lazy().
      'src/engine/scene/InstancedCluster.jsx',
      'src/engine/scene/ParticleField.jsx',
      'src/engine/scene/PostProcessing.jsx',
      'src/engine/scene/Scene3D.jsx',
      'src/engine/scene/SignatureGeometry.jsx',
    ].sort()
    expect(
      foundNorm,
      'Inventario de archivos con import de @react-three cambió. Los únicos ' +
        'legítimos son los 5 módulos de engine/scene/ (cargan lazy). Si añadiste ' +
        'uno, debe vivir ahí y ser alcanzable SOLO vía lazy() — o registrar la ' +
        'excepción con el arquitecto (FASE7B-EXECUTION-REPORT.md).',
    ).toEqual(expected)
  })
})
