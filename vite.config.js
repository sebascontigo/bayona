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
        manualChunks: {
          /**
           * Se separan por ciclo de vida de caché: three y framer cambian con
           * sus releases, react cambia poco, y así una actualización de la web
           * no invalida el chunk de vendor completo en el navegador.
           */
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion'],
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
