# FASE 3 — VEREDICTO DE AUDITORÍA (ChatGPT, 2026-08-27)

Auditoría del resultado de la Fase 3 devuelto por el agente. Este documento registra la aprobación formal y las directrices para la Fase 4.

## ✅ Fase 3 está bien cerrada

No se limitó a añadir CSS bonito. Construyó una infraestructura real:

- Design System con `--ds-*`.
- Grid de 12 columnas.
- Sistema tipográfico.
- Spacing.
- Superficies.
- Componentes reutilizables.
- Sistema de motion.
- useSticky.
- Presets 3D.
- Cursor unificado.
- Playground /design-system.
- Contratos automáticos del Design System.
- 273 tests.
- 41 E2E.
- Build limpio.
- Sin tocar todavía las páginas públicas.

Eso es exactamente lo que queríamos en esta fase. Y especialmente vale esta decisión: **no modificó visualmente las 17 páginas todavía.** Eso significa que ahora podemos empezar a transformar la web de verdad sin haber mezclado la infraestructura con el rediseño.

## Decisiones del Design System — APROBADAS

1. **Escala tipográfica v2** — Aprobada. Está basada en el sistema existente y ya tiene tests; no tiene sentido reabrirla.
2. **Radios** — Aprobados. 0px como identidad + 10px/16px para controles/superficies. BAYONA puede tener una identidad bastante arquitectónica y afilada, mientras que algunos elementos interactivos necesitan un pequeño radio.
3. **Cursor** — Aprobado. Anillo vivo. No es necesario volver a tocarlo.

**Design System = aprobado.**

## 🚨 Ahora cambia completamente el juego

Hasta aquí: FASE 1 estabilizar → FASE 2 integridad comercial → FASE 3 sistema visual.

Ahora: **FASE 4 = ARQUITECTURA DE EXPERIENCIA.** Aquí decidimos cómo debe funcionar la web como producto.

Esto es MUY importante porque el propietario quiere que "cada página tenga cosas 3D, que cambie constantemente al bajar, que todo esté más dinámico y que las páginas internas no sean solamente negras." No debemos meter eso directamente. Primero tenemos que decidir: **qué historia cuenta cada ruta.**

## Recomendador (RecommendationGuide)

El informe del agente dice que "RecommendationGuide no está montada en ninguna ruta". Eso no es necesariamente malo; puede ser una oportunidad de UX. En la Fase 4 podemos decidir que el recomendador sea:

- **Opción A** — Parte de /programs.
- **Opción B** — Parte de /onboarding.
- **Opción C** — Una experiencia propia: /elige-tu-plan.
- **Opción D** — Una sección interactiva dentro de la arquitectura de planes.

No meterlo en Home simplemente porque existe. La Home tiene que vender la visión de BAYONA. El recomendador tiene que ayudar a tomar una decisión. Son dos funciones diferentes.

## Checkout

Ahora existe /checkout, pero la experiencia actual es WhatsApp-first. Eso es interesante. No necesariamente debemos convertirlo en un checkout de ecommerce tradicional. Podríamos transformarlo en un **Configurador BAYONA**:

```
ELIGE TU PLAN → PERSONALIZA TU EXPERIENCIA → AÑADE SERVICIOS →
REVISA TU PROPUESTA → HABLAMOS POR WHATSAPP
```

Eso podría ser muchísimo más coherente con la marca. Pero eso lo decidimos en Fase 4.

## PDFs

Los PDFs actualmente están correctos comercialmente, pero no contienen enlaces. No tocarlos todavía. Primero decidir: **¿son documentos de venta o simplemente fichas descargables?**

- Si son fichas de venta → deberían tener CTA.
- Si son documentos de referencia → pueden permanecer así.

Eso pertenece a la arquitectura de contenido.

## FASE 4 — alcance esperado

Debe ser MUY seria. No es otra fase estética. Es: **UX Architecture + Information Architecture + Navigation + Content Journey.**

Vamos a diseñar el mapa de las 17 rutas. Propuesta inicial (NO definitiva; primero hay que analizar las 17 rutas reales):

```
BAYONA
│
├── Inicio
│
├── Entrenamiento
│   ├── Programas
│   ├── Raíz
│   ├── Fuerza
│   ├── Rendimiento
│   └── Élite
│
├── Experiencias
│   └── Parkour
│
├── La marca
│   ├── Nosotros
│   ├── Comunidad
│   └── App
│
├── Recursos
│   ├── Recursos
│   └── FAQ
│
└── Entrar
    ├── Onboarding
    ├── Checkout
    └── Confirmación
```

Cuando el agente ejecute la Fase 4, debe:

1. hacer el mapa de las 17 rutas;
2. decidir la jerarquía;
3. diseñar el journey;
4. resolver recomendador;
5. resolver checkout;
6. resolver PDFs;
7. simplificar navegación;
8. diseñar los estados de página;
9. definir qué páginas necesitan 3D;
10. definir qué páginas necesitan scroll cinematográfico;
11. definir cuáles deben ser más editoriales;
12. definir el papel exacto de cada ruta.

**Sin todavía implementar el gran rediseño visual.**

## Roadmap posterior (tras aprobar Fase 4)

- **Fase 5** — Motion Engine + Scroll Storytelling.
- **Fase 6** — World Building por página (qué representa visualmente cada ruta).
- **Fase 7** — 3D (objetos; escenas; cámaras; profundidad; iluminación; interacción).
- **Fase 8** — REBUILD DE LAS 17 PÁGINAS (cada página deja de ser una pantalla negra estática; será una experiencia propia).

## Veredicto final

- Fase 1 ✅
- Fase 2 ✅
- Fase 3 ✅

No cambiaría nada importante de las tres. Ahora toca Fase 4. Y esta vez debe ser incluso más precisa que las anteriores, porque aquí vamos a decidir **qué debe ser BAYONA antes de empezar a vestirlo**.

**Instrucción clave: NO decirle todavía al agente "empieza Fase 4".** Primero se preparará una Fase 4 extremadamente completa, basada en lo que acabamos de aprender de la Fase 3.
