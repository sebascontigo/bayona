# FASE 10.1 — INTEGRATION READINESS REPORT (TURNO 003 · CARRIL B)

Preparación de la integración quirúrgica del material humano de Sebastián.
**0 producción tocada** (verificado: el único cambio de código es el test del
contrato). Este documento deja el sistema LISTO para que, cuando lleguen los
archivos reales, la integración sea: pegar IDs → correr gates → subir.

Fecha: 2026-09-05 · Base: `00f4495` (= origin/main, árbol limpio).

**NOTA DE ENTORNO:** el disco fue reorganizado entre sesiones; el repo vive
ahora en `C:\SEVISIONARI\04 Proyectos\01 Grupo Bayona\Empresa
FITNESS\04_Web_App\01_BAYONA-WEB_VERSIONES\PAGINAS_WEBS_BAYONA\01_ACTUAL_EN_INTERNET`
(antes `C:\03_PROYECTOS\01_GRUPO_BAYONA\...`). Git verificado INTACTO tras la
mudanza: HEAD = origin/main = `00f4495`, doc FASE10.0 presente, remoto
correcto. Los `desktop.ini` que aparecieron son basura de Explorer de la
mudanza (no se commitean).

---

## 1. Escala de estados (regla del arquitecto, vinculante)

| Estado | Significado | Se cumple cuando |
|---|---|---|
| **READY** | el punto de integración existe y funciona como placeholder honesto | HOY: los 3 VideoSection renderizan "VIDEO PRÓXIMAMENTE" + botón deshabilitado (test 1 del contrato) |
| **CONFIGURED** | el asset real está cableado (ID/URL válidos) | al pegar el `videoId` real: embed youtube-nocookie carga tras clic (tests 2-6) |
| **RUNNING** | el vídeo/foto se ve en la web deployada | verificación manual + screenshot de Vercel post-deploy |
| **PROVEN** | integración verificada con evidencia reproducible | gates §6 verdes en build real + DOM hidratado |

**Prohibición (Turno 003):** nadie declara 10.1 DONE con placeholders. Los
tests del contrato hacen imposible fingirlo: un ID inválido degrada a
placeholder (fail-closed) y el suite lo detecta.

## 2. Mapa exacto de integración — VÍDEO (la palanca más barata: 3 strings)

| Asset | Archivo | Línea | Cambio EXACTO al llegar el ID |
|---|---|---|---|
| V1 método 2min | `src/pages/Home.jsx` | mount `<VideoSection title="EL MÉTODO BAYONA EN 2 MIN"` | añadir `videoId="<ID>"` |
| V2 elegir camino | `src/pages/Programs.jsx` | mount `<VideoSection title="CÓMO ELEGIR TU CAMINO"` | añadir `videoId="<ID>"` |
| V3 concepto 90s | `src/pages/AppExperience.jsx` | mount `<VideoSection title="BAYONA+: CONCEPTO EN 90 SEGUNDOS"` | añadir `videoId="<ID>"` |

Verificado este turno: los 3 mounts NO pasan `videoId`/`videoUrl` (grep 0
resultados en `src/pages/`). El componente ya implementa: validación
`YOUTUBE_ID_PATTERN`, embed `youtube-nocookie.com` lazy tras clic (0 bytes
hasta interacción), `autoplay=0` bajo reduced-motion, captions `<track es>`,
`referrerPolicy`, fallback `<video>` si algún día se auto-hospeda.

**Pasos YouTube (Sebastián):** subir a su canal → visibility PÚBLICA (o "no
listado" — el embed funciona igual) → copiar el ID (los 11 caracteres tras
`watch?v=`) → entregarlo. NO hace falta API key: el embed es directo.

## 3. Mapa de integración — FOTOGRAFÍA (contrato con `siteMedia.js`)

El registro central es `src/config/siteMedia.js`. Todo asset fundador entra
como objeto congelado con la MISMA forma que `burst()` produce
(`src/config/siteMedia.js:81-93`): `{ key, src, description, source,
sourceUrl, width, height }` + escalera `MEDIA_WIDTH_LADDER`
(320/480/640/960/1280/1600) para `mediaSrcSet`. Fondos de escena usan
`SCENE_WIDTH_1X 960 / 2X 1600`.

| Asset | Entrada en siteMedia | Consumidor | Cambio al llegar la foto |
|---|---|---|---|
| 5 retratos sesión A | `founder: Object.freeze({ portrait: …, portraitSide: …, portraitHands: …, portraitFull: …, portraitDetail: … })` (nuevo bloque, src `/images/founder/<nombre>.jpg`) | Home hero (opción E+H) + About etapa 2026 | sustituir la referencia donde toque el plan 10.1 final |
| Foto parkour C10 | `parkourAcademy.hero` (hoy `a-person-mid-jump…` stock) | `ParkourAcademy.jsx:45` via `sceneBackgroundProps(media.hero)` | cambiar el valor de la key — cero JSX |
| About eras 2014/2019 | `about.timeline[1]`, `about.timeline[2]` | About StickyStage G | cambiar el valor de la key |

Formato de entrega de fotos (mínimo para procesar): máster ≥3000px lado
largo JPG/RAW. El pipeline (10.1): resize a la escalera + AVIF/WebP +
`width/height` declarados (anti-CLS del contrato 9.x). Nombres exactos:

```
public/images/founder/
  sebastian-retrato-frontal.jpg      (A1)
  sebastian-retrato-perfil.jpg       (A2)
  sebastian-retrato-material.jpg     (A3)
  sebastian-retrato-cuerpo.jpg       (A4)
  sebastian-retrato-manos.jpg        (A5)
  sebastian-parkour-salto.jpg        (C10)
  (futuras About: sebastian-era-2014.jpg, sebastian-era-2019.jpg)
```

## 4. Gates preparados (mecanismo probado HOY, pre-assets)

**NUEVO: `src/test/videoSectionContract.test.jsx` (6 tests, todos verdes)**
— contrato permanente de los estados READY/CONFIGURED:
1. READY: sin ID → placeholder honesto, botón deshabilitado, 0 iframe/video.
2. CONFIGURED: ID válido → embed nocookie correcto + autoplay tras clic.
3. Reduced-motion → `autoplay=0` (a11y preservada).
4. Fail-closed: URL entera como ID → degrada a placeholder, no embed roto.
5. Fail-closed: ID con espacios/corto → rechazado.
6. `videoUrl` propio → `<video>` con poster + captions es (si algún día se
   auto-hospeda, el contrato ya lo cubre).

**Chaos drill verificado este turno:** `videoId` real inyectado en Home.jsx →
detectado por el mapa (grep del contrato) → retirado A MANO →
`git diff` limpio (cero residuos).

**Gates al llegar el material real (orden de 10.1):**
1. `npx vitest run src/test/videoSectionContract.test.jsx` (contrato)
2. `npm test` completo (424 + 6 nuevos = 430)
3. `npm run lint` (0 errores / 16 baseline)
4. `npm run build`
5. E2E: el iframe aparece en DOM hidratado SOLO tras clic (patrón
   f8-consolidation) — se añade spec cuando exista un ID real que asir
6. Fotos: `npm run test:visual` (6 breakpoints del QA 9.1-F) + network-audit
   (bytes ≤ presupuesto §7 de FASE10.0: retrato hero ≤120KB AVIF a 768w,
   parkour ≤150KB) + LCP lab antes/después (regla: máquina limpia)
7. Push → verificación en Vercel (producción) = RUNNING
8. Screenshot DOM de la sección funcionando = PROVEN

## 5. Qué cambia y qué NO cambia (definido de antemano)

**CAMBIA (solo al llegar material):** 3 strings de `videoId` + valores de
keys en `siteMedia.js` + archivos en `public/images/founder/`. Nada más.

**NO CAMBIA (ley):** composición del hero 9.1 (opción E+H: la foto entra en
la columna EXISTENTE con la deriva orgánica actual — no se rediseña nada),
footer LA FIRMA, navbar umbral, StickyStage (G intacto: la foto de era entra
como valor de media, no como JSX nuevo), z-escala §16, 2D-first 7B, embudo
DECISIÓN quiet (checkout/plans/order: CERO humanidad nueva — único cambio
futuro posible: firma pequeña junto a garantía, con medición), DP-5.

## 6. Red Team (Turno 003)

1. **¿Este trabajo es necesario o burocracia?** Los 3 tests fail-closed
   existen porque la vía probable de error al pegar IDs ES pegar una URL
   completa o un ID sucio — el contrato lo atrapa al instante. Coste: 1
   archivo de test. Proporcional.
2. **¿Fingimos avance?** No: 0 placeholders nuevos, 0 producción, estados
   definidos y testeados como lo que SON.
3. **¿El componente podría romperse al añadir IDs?** El chaos drill probó el
   cambio literal del futuro (videoId añadido al mount) y el contrato lo
   describe exactamente. No hay JSX nuevo que inventar.
4. **¿Riesgo de migrar la ruta del repo?** El git está intacto y pushed; la
   ruta nueva es solo cosmética para herramientas. Registrada en docs +
   memoria para futuras sesiones.
5. **¿Falta algo que sí se puede hacer sin assets?** Los crops responsive y
   el pipeline AVIF requieren archivos reales para medir; hacerlos con
   stock propio sería fingir. NO hechos — correctamente en el carril A.

## 7. Lista EXACTA para Sebastián (carril A)

**Vídeo (la palanca #1 — con SOLO esto la web gana humanidad):**
- [ ] V1 "El Método Bayona en 2 min" (~120s): punto de partida → plan →
      seguimiento (guion de 6-8 frases ya en FASE10.0 §3)
- [ ] Subir a YouTube (público o no listado) → enviar los 3 IDs
- [ ] V2 "Cómo elegir tu camino" (~120s) y V3 "Concepto 90s" — opcionales
      esta tanda; V1 primero.

**Fotos (tanda única, Specs en FASE10.0 §2):**
- [ ] A1-A5: 5 retratos (frontal / perfil / con material / cuerpo completo /
      manos) — máster ≥3000px
- [ ] C10: 1 foto de parkour propia (salto/precision, aire arriba)
- [ ] Opcionales: foto real de era 2014/2019 para About

**Entrega:** arrastrar los archivos al chat de ZCode o dejarlos en una
carpeta y avisar — el agente los inspecciona (dimensiones, peso, calidad)
ANTES de integrar, como manda el §40 del prompt maestro.

## 8. Estado

**CARRIL B: DONE** (todo lo posible sin assets está hecho y verificado).
**CARRIL A: BLOCKED** en el material de Sebastián (dependencia externa real,
no salvable desde código — como dictaminó el arquitecto).

## 9. Única siguiente acción

**Sebastián entrega V1 (ID de YouTube) + fotos A1-A5 + C10** → se ejecuta
10.1 integración con los gates §4 en orden → RUNNING → PROVEN. Sin material,
no hay siguiente acción técnica posible (prohibido inventar trabajo).
