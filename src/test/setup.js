// Vitest global setup (Requirement 22.8 — runner de tests).
// Extiende `expect` con los matchers de jest-dom (toBeInTheDocument, etc.).
// Requiere `test.globals: true` en vite.config.js para engancharse al expect global.
import '@testing-library/jest-dom'
