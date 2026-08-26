# FASE 2 — Cierre de integridad comercial (REMANENTE)

**Fecha:** 2026-08-26 · **Commit:** ver `git log` (sobre el baseline `626d98b` de Fase 1)

La Fase 2 original quedó casi absorbida por commits anteriores (`2781999` integridad
comercial + lotes de contratos C). Este documento cierra solo el remanente acordado:
2A PDFs · 2B Recomendador · 2C Checkout · 2D Cadena de fuente única · 2E aria-invalid.

**Regla de parada respetada:** no se ha tocado CSS, navegación, tipografías, 3D ni
nada de Fase 3. Ningún precio ni contenido comercial modificado. Cero `test.skip`.

---

## 2A — Auditoría real de los 4 PDFs

Método: extracción de texto (`pdftotext`) + inspección de metadatos y enlaces
(`pypdf`) de `public/docs/plan-{raiz,fuerza,rendimiento,elite}.pdf`, comparado
contra el catálogo canónico `src/config/offerings.js`.

| Check | RAÍZ | FUERZA | RENDIMIENTO | ELITE |
|---|---|---|---|---|
| Nombre del plan | ✅ | ✅ | ✅ | ✅ |
| Journey (RECONSTRUCCIÓN / PROGRESO REAL / TRANSFORMACIÓN TOTAL / DOMINIO TOTAL) | ✅ | ✅ | ✅ | ✅ |
| Precio COP ($149.000 / $299.000 / $499.000 / $899.000) | ✅ | ✅ | ✅ | ✅ |
| Referencia EUR (≈35 / ≈70 / ≈116 / ≈209) | ✅ | ✅ | ✅ | ✅ |
| Descripción corta = `shortDescription` del catálogo | ✅ | ✅ | ✅ | ✅ |
| Audiencia = `audience` del catálogo | ✅ | ✅ | ✅ | ✅ |
| Lista de incluidos = `included[]` literal (7 / 5 / 6 / 6 ítems) | ✅ | ✅ | ✅ | ✅ |
| Cadena "Todo X más:" = `includedLead` | — | ✅ | ✅ | ✅ |
| Aviso marco no médico | ✅ | ✅ | ✅ | ✅ |
| Branding BAYONA (cabecera + pie + metadata `BAYONA · {PLAN}`) | ✅ | ✅ | ✅ | ✅ |
| Información desactualizada o dominio viejo | ninguna | ninguna | ninguna | ninguna |

**Conclusión: 4/4 alineados con el catálogo canónico. Ninguna discrepancia de datos.**

Hallazgos (no son errores de datos; requieren decisión):
1. **Los PDFs no contienen ningún enlace**: ni CTA, ni WhatsApp, ni URL de la web,
   ni datos de contacto. Son one-pagers estáticos (Chromium/Skia, 2026-07-25).
2. **No muestran la referencia USD** que el catálogo sí publica (38/76/125/226).
   El PDF es material en clave EUR; se registra como observación.
3. **`presentationUrl` es dato muerto**: el catálogo declara `/docs/plan-*.pdf`
   para los 4 planes, pero ninguna página enlaza a los PDFs. El botón "VER
   PRESENTACIÓN" de Home/Programs lleva a la página `/plan/{slug}`, no al PDF.
   Los PDFs solo son alcanzables por URL directa.

## 2B — Recomendador

**Motor (`src/lib/conversion/recommendation.js`, v1.1.0)** — verificado:
- Al importar, valida que `CONSERVATIVE_PLAN_ORDER` (RAIZ→ELITE) cubre exactamente
  el catálogo publicado; si un plan falta o sobra, el módulo lanza error.
- Las 13 reglas referencian características verificadas literalmente contra
  `included[]` del catálogo (`publishedIncludedFeature` lanza si el texto diverge).
- `recommendPlan` es determinista, sin DOM/red/URLs; empates → desempate
  conservador (menor alcance comercial), documentado en el resultado.
- Validación estricta: rechaza claves ajenas, dimensiones sensibles (salud,
  género, biometría…), respuestas fuera de enum y dimensiones en conflicto.
- **No puede producir un ID fantasma, slug ambiguo ni undefined**: toda respuesta
  válida tiene regla; toda regla apunta a un plan canónico verificado.

**Flujo demostrado (nuevo `src/test/commercialSync.test.jsx`):**
respuestas → `recommendPlan` → `planId` canónico → el ancla `#plan-{slug}` existe
en el showroom `PlanExplorer` (DOM real) → la ruta `/plan/{slug}` existe en
`ROUTE_META` y en `App.jsx` → la presentación del plan existe.

**Hallazgo — la guía no está montada en ninguna ruta:**
`RecommendationGuide` existe, está probada (5 tests) pero ningún componente de
producción la importa. Además `Home.contract.test.jsx` **prohíbe explícitamente**
`RecommendationGuide` en Home, y Programs monta `PlanCalculator` en su lugar.
Es un estado deliberado por contrato, no un olvido → **decisión pendiente** (§DP-4).

**Inicio Guiado (`/onboarding`):** usa su propio `routeMap.js` (matriz explícita
4×3×3 = 36 combinaciones), no el motor. El nuevo test recorre las 36 combinaciones
y verifica: ninguna produce slug fantasma, todos los nombres/hrefs coinciden con
el catálogo y todas las rutas existen. Los 4 planes quedan alcanzables desde el
embudo. `routeMap` mantiene copia propia de nombres/hrefs (coherente hoy; el test
la fija para que no pueda divergir en silencio).

## 2C — Checkout (4 planes de principio a fin)

Nuevo test `Checkout > resuelve los cuatro planes canónicos de principio a fin`:
para cada plan RAÍZ/FUERZA/RENDIMIENTO/ELITE — seleccionar el radio → el resumen
muestra el precio real → enviar → se abre `https://wa.me/34614988006` con
`Plan base: {NOMBRE} — {precio} COP/mes`, total correcto y descargo de
responsabilidad ("no constituye pago…"). **CONFIRMADO por ejecución.**

- El checkout deriva 100 % del catálogo (`membershipPlans`, `sessionServices`,
  `extraServices`, `calculateExperience`): cero datos de plan hardcodeados.
- `whatsappBridge` cubre el caso de pestaña bloqueada (respaldo local con TTL 7 días).

**Hallazgo — `/checkout` no tiene entrada en la UI:** la ruta existe y funciona,
pero ninguna página enlaza a ella. Los CTAs de plan (Home/Programs//plan/*) van
directamente a WhatsApp (`plan.cta`), y el "checkout" del carrito abre WhatsApp
directamente (`buildCartWhatsAppUrl`). → **decisión pendiente** (§DP-3).

## 2D — Cadena de fuente única de verdad

| Eslabón | Mecanismo | Estado |
|---|---|---|
| Catálogo (`offerings.js#membershipPlans`) | única declaración de ids/nombres/precios/incluidos | ✅ fuente |
| Números/formatos | `createMembershipPlan` deriva priceDisplay/cta de `priceCop` | ✅ derivado |
| WhatsApp | `whatsAppLink()` de `site.config.js` (Fase 1); `plan.cta` y `buildExperienceWhatsAppUrl` delegan | ✅ SSoT |
| Capa editorial | `conversionContent.js` valida 1:1 plan↔overlay al importar | ✅ validado |
| Páginas /plan/* | `PlanPresentation` resuelve por id desde el catálogo; `InvalidPlan` si falta | ✅ fail-closed |
| PDFs | `presentationUrl` → ficheros reales en `public/docs` (nuevo test fs) | ✅ existen; ⚠️ sin enlace UI |
| Recomendador | verificado contra catálogo al importar (2B) | ✅ |
| Onboarding | matriz propia, fijada por test de sincronización | ✅ coherente |
| Checkout | deriva todo del catálogo (2C) | ✅ |
| Rutas/SEO | `routeMeta` construye `/plan/*` desde `membershipPlans` | ✅ derivado |

## 2E — Accesibilidad: aria-invalid corregido

`RecommendationGuide.jsx`: `aria-invalid` estaba en cada `<input type="radio">`,
rol que no soporta ese estado en ARIA (warning `jsx-a11y/role-supports-aria-props`).
Corrección semántica: el estado inválido vive ahora en el **grupo** —
`<fieldset role="radiogroup" aria-labelledby={legendId} aria-invalid={…}>` —
y cada radio conserva `aria-describedby` hacia su mensaje de error (`role="alert"`).
Tests actualizados (rol `radiogroup`, estado por grupo, limpieza al responder).
**Warning eliminado: lint pasa de 18 a 17 warnings; 0 errores.**

---

## Tests finales (gate completo, ejecutado)

| Puerta | Antes (Fase 1) | Ahora |
|---|---|---|
| `npm test` | 212/212 (48 ficheros) | **217/217 (49 ficheros)** |
| `npm run lint` | 0 errores / 18 warnings | **0 errores / 17 warnings** |
| `npm run build` | OK | **OK** |
| `npm run test:visual` (Playwright) | 39/39 | **39/39** |

Tests nuevos: `commercialSync.test.jsx` (4) y checkout 4 planes (1). Cero skips.

## Decisiones pendientes para Sebastián

- **DP-1 · PDFs sin CTA/contacto**: ¿regenerar los 4 PDFs con enlace WhatsApp/web?
  (decisión comercial y de diseño; los datos actuales son correctos).
- **DP-2 · `presentationUrl` muerto**: ¿añadir acceso visible a los PDFs (dónde)
  o eliminar el campo del catálogo?
- **DP-3 · `/checkout` huérfano**: ¿se mantiene como configurador solo alcanzable
  por URL (estado actual) o se le añade entrada desde alguna página?
- **DP-4 · `RecommendationGuide` sin montar**: el contrato de Home la veta;
  ¿dónde debe vivir (Programs, otra ruta, o se retira)? Pertenece al terreno de
  la Fase 3 (UI).
- **DP-5 · ELITE "acceso de por vida"** (ya abierta desde la fase anterior):
  sigue pendiente su llamada legal/comercial.

## Estado exacto de Fase 2

**FASE 2 = CERRADA.** Integridad comercial verificada de extremo a extremo con
tests ejecutables; sin discrepancias de datos comerciales; 4 decisiones de
producto/diseño reportadas (DP-1…DP-4) y 1 heredada (DP-5). La Fase 3 no se ha
iniciado.
