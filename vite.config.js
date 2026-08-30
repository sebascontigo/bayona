/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { emitRouteHtml } from './vite/emitRouteHtml.js'

export default defineConfig({
  plugins: [
    react(),
    // Genera un HTML por ruta + sitemap.xml + robots.txt. Ver vite/emitRouteHtml.js.
    emitRouteHtml(),
  ],
  build: {
    /**
     * El aviso por defecto salta a 500 kB y vendor-three siempre lo supera:
     * three.js pesa lo que pesa. Se sube el umbral para que el aviso vuelva a
     * significar algo y no se ignore por costumbre.
     */
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        /**
         * Fase 7B (hallazgo 7A-01): manualChunks pasó de forma objeto a forma
         * FUNCIÓN. La forma objeto asigna paquetes a chunks por nombre, pero
         * deja que Rollup coloque los MÓDULOS COMPARTIDOS que esos paquetes
         * reexportan (el helper de preload de Vite, un createRoot que fiber
         * incluye) donde le convenga — y acababan dentro de vendor-three, con
         * lo que el chunk de entrada de TODAS las rutas lo importaba de forma
         * estática (216,48 kB gzip pagados en cada visita). La forma función
         * clasifica cada módulo por su id real: los paquetes 3D van a su chunk
         * y TODO lo demás (incluidos los runtime helpers que comparten) cae en
         * los chunks normales del grafo. Se mantiene la misma separación por
         * ciclo de vida de caché que justificaba el original: three y framer
         * cambian con sus releases, react cambia poco.
         */
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/[\\/](three|@react-three)[\\/]/.test(id)) return 'vendor-three'
            if (/[\\/](react|react-dom|react-router|react-router-dom)[\\/]/.test(id)) return 'vendor-react'
            if (id.includes('framer-motion')) return 'vendor-motion'
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
  },
})
