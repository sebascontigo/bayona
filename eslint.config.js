/**
 * BAYONA · ESLINT (flat config)
 * ---------------------------------------------------------------------------
 * El proyecto no tenía linter. Con ~180 archivos y un motor 3D que gestiona
 * recursos a mano (dispose, listeners, rAF), no tener quien avise de un hook
 * mal usado o de una dependencia olvidada es caro.
 *
 * Criterio: se avisa, no se bloquea. Las reglas que exigirían refactor masivo
 * quedan en 'warn' para poder adoptarlas por partes, y solo lo que rompe en
 * tiempo de ejecución es 'error'.
 */

import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'playwright-report/**', 'test-results/**', 'artifacts/**'],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2023,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: '18.3' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      /** Errores que sí rompen en ejecución. */
      'react-hooks/rules-of-hooks': 'error',
      'no-undef': 'error',

      /** Señales útiles que no deben cortar el build mientras se adoptan. */
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

      /**
       * El proyecto no usa PropTypes ni TypeScript: valida con tests de
       * contrato. Exigir PropTypes ahora sería ruido sin valor.
       */
      'react/prop-types': 'off',
      /** Los textos en español llevan comillas y apóstrofos con normalidad. */
      'react/no-unescaped-entities': 'off',

      /**
       * El proyecto anida el control dentro del <label> y pone el texto en
       * <span><strong>…</strong></span>. Con la profundidad por defecto (2) la
       * regla no llega a ver ese texto y lo reporta como label sin nombre.
       */
      'jsx-a11y/label-has-associated-control': ['error', { assert: 'either', depth: 5 }],

      /**
       * Se permite tabIndex en `region` además de `tabpanel`:
       * · La tabla comparativa de Programs es un contenedor con scroll y las
       *   WCAG piden que un área desplazable sea alcanzable con teclado.
       * · PersistentSummary es una live region que el usuario debe poder
       *   visitar para leer su selección.
       * En ambos casos el tabIndex es la decisión accesible, no el fallo.
       */
      'jsx-a11y/no-noninteractive-tabindex': [
        'error',
        { tags: [], roles: ['tabpanel', 'region'], allowExpressionValues: true },
      ],

      /**
       * Estos dos sí son hallazgos reales, pero resolverlos es una decisión de
       * producto, no un arreglo mecánico:
       * · media-has-caption exige subtítulos reales, que hay que producir.
       * · aria-invalid sobre un radio hay que moverlo al grupo, y esa validación
       *   tiene tests propios que definen su UX actual.
       * Se dejan como aviso para que estén a la vista sin bloquear el build.
       */
      'jsx-a11y/media-has-caption': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
  },

  /**
   * Tests: las factorías de mocks devuelven componentes anónimos a propósito.
   * Exigirles displayName no aporta nada.
   */
  {
    files: ['**/*.{test,spec}.{js,jsx}'],
    rules: {
      'react/display-name': 'off',
    },
  },

  /**
   * React Three Fiber declara elementos propios (<mesh>, <ambientLight>,
   * <bufferGeometry>…) con props de three.js: args, position, intensity,
   * castShadow, object. eslint-plugin-react solo conoce el DOM, así que marca
   * todas como propiedades desconocidas. Son falsos positivos, no deuda.
   */
  {
    files: [
      'src/engine/scene/**/*.jsx',
      'src/engine/effects/**/*.jsx',
      'src/components/Globe3D.jsx',
      'src/components/Experience.jsx',
    ],
    rules: {
      'react/no-unknown-property': 'off',
    },
  },

  /**
   * React 18 pasa `fetchpriority` en minúscula tal cual al DOM; la variante
   * camelCase `fetchPriority` es de React 19. La regla asume React 19, así que
   * aquí propondría un cambio que rompería el atributo.
   */
  {
    files: ['src/components/SceneBackground.jsx'],
    rules: {
      'react/no-unknown-property': ['error', { ignore: ['fetchpriority'] }],
    },
  },

  /** Configuración y scripts de build: corren en Node, no en el navegador. */
  {
    // scripts/** (Fase 7A): medición de bundle con Node core (fs/zlib), sin console del navegador.
    files: [
      'vite.config.js',
      'playwright.config.js',
      'eslint.config.js',
      'vite/**/*.js',
      'playwright.f7a.config.js',
      'scripts/**/*.mjs',
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  /** Tests: globals de Vitest y libertad para usar console. */
  {
    // e2e/** (Fase 7A): specs de Playwright corren en Node con la API del test-runner.
    files: [
      '**/*.{test,spec}.{js,jsx}',
      'src/test/**/*.{js,jsx}',
      'e2e/**/*.spec.js',
    ],
    languageOptions: {
      globals: { ...globals.node, ...globals.vitest },
    },
    rules: {
      'no-console': 'off',
    },
  },
]
