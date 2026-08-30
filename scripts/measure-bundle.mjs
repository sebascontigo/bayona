// Medición reproducible del bundle de producción — Fase 7A, Bloque D.
// Sin dependencias externas: solo Node core (fs, path, zlib).
// Uso: node scripts/measure-bundle.mjs   (requiere `npm run build` previo)
// Nota metodológica: gzip nivel 9 y brotli calidad 11 (zlib). Los números son
// comparables entre sí (antes/después dentro de esta fase), no al byte con lo
// que sirva el CDN de producción (otros parámetros de compresión).

import { readdirSync, readFileSync } from 'node:fs'
import { join, extname } from 'node:path'
import { gzipSync, brotliCompressSync, constants } from 'node:zlib'

const DIST = 'dist'
const rows = []

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else rows.push(p)
  }
}
walk(DIST)

const kb = (n) => (n / 1024).toFixed(2)
const say = (s) => process.stdout.write(`${s}
`)
const out = []

for (const file of rows) {
  const ext = extname(file)
  if (!['.js', '.css', '.html'].includes(ext)) continue
  const buf = readFileSync(file)
  const raw = buf.length
  const gz = gzipSync(buf, { level: 9 }).length
  const br = brotliCompressSync(buf, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  }).length
  out.push({ file: file.replace(DIST + '/', '').replace(/\\/g, '/'), ext, raw, gz, br })
}

out.sort((a, b) => b.raw - a.raw)

say('| archivo | tipo | min (kB) | gzip (kB) | brotli (kB) |')
say('|---|---|---|---|---|')
for (const r of out) {
  say(`| \`${r.file}\` | ${r.ext.slice(1)} | ${kb(r.raw)} | ${kb(r.gz)} | ${kb(r.br)} |`)
}

const tot = (k) => out.reduce((s, r) => s + r[k], 0)
const totBy = (e, k) => out.filter((r) => r.ext === e).reduce((s, r) => s + r[k], 0)

say('')
say('| total | min (kB) | gzip (kB) | brotli (kB) | nº ficheros |')
say('|---|---|---|---|---|')
say(`| JS | ${kb(totBy('.js', 'raw'))} | ${kb(totBy('.js', 'gz'))} | ${kb(totBy('.js', 'br'))} | ${out.filter((r) => r.ext === '.js').length} |`)
say(`| CSS | ${kb(totBy('.css', 'raw'))} | ${kb(totBy('.css', 'gz'))} | ${kb(totBy('.css', 'br'))} | ${out.filter((r) => r.ext === '.css').length} |`)
say(`| HTML | ${kb(totBy('.html', 'raw'))} | ${kb(totBy('.html', 'gz'))} | ${kb(totBy('.html', 'br'))} | ${out.filter((r) => r.ext === '.html').length} |`)
say(`| TODO | ${kb(tot('raw'))} | ${kb(tot('gz'))} | ${kb(tot('br'))} | ${out.length} |`)
