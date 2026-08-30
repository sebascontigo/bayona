// Config aditiva SOLO para Fase 7A — NO modifica playwright.config.js global.
// Diferencias documentadas (necesarias para la auditoría de red de la fase):
//   1. webServer sirve el BUILD de producción (vite preview), no el dev server:
//      medir la red contra vite dev es medir módulos sin empaquetar.
//   2. Tres proyectos: desktop / mobile (Pixel 7) / reduced-motion.
// El resto de opciones replican la config global para no divergir.

import { defineConfig, devices } from '@playwright/test'

const baseURL = 'http://127.0.0.1:4174'

export default defineConfig({
  testDir: './e2e',
  // Solo los specs de Fase 7A corren bajo esta config.
  testMatch: '**/*{three-network-audit,webvitals-lab}.spec.js',
  outputDir: 'test-results/playwright-f7a',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['list']],
  use: {
    baseURL,
    browserName: 'chromium',
    screenshot: 'off',
    trace: 'off',
    video: 'off',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'chromium-reduced',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        contextOptions: { reducedMotion: 'reduce' },
      },
    },
  ],
  webServer: {
    command: 'npx vite preview --host 127.0.0.1 --port 4174 --strictPort',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
})
