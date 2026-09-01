#!/usr/bin/env node
// Measures a built site's static delivery cost.
//
// For each sample page it resolves the JS/CSS the browser is told to fetch for
// the *initial* load (entry scripts + modulepreload links, transitively closed
// over the import graph of those chunks) and reports raw/gzip/brotli bytes.
//
// Usage: node perf/measure.mjs <clientDir> <label> [outJson]

import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, resolve, dirname, posix } from 'node:path'
import { gzipSync, brotliCompressSync, constants } from 'node:zlib'

const [, , clientDirArg, label, outJson] = process.argv
if (!clientDirArg) {
  console.error('usage: measure.mjs <clientDir> <label> [outJson]')
  process.exit(1)
}
const CLIENT = resolve(clientDirArg)

const SAMPLES = [
  { name: 'home', url: '/' },
  { name: 'blog-index', url: '/blog' },
  { name: 'blog-post', url: '/blog/hydration-and-preact' },
]

const gz = (b) => gzipSync(b, { level: 9 }).length
const br = (b) =>
  brotliCompressSync(b, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  }).length

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) await walk(p, out)
    else out.push(p)
  }
  return out
}

/** Resolve a site-absolute or relative asset URL to a file on disk. */
function assetPath(url) {
  const clean = url.split('?')[0].split('#')[0]
  if (!clean.startsWith('/')) return null
  const p = join(CLIENT, clean)
  return existsSync(p) && statSync(p).isFile() ? p : null
}

/**
 * Static import specifiers inside an already-built ES module chunk.
 * Vite emits bare `from"/assets/x.js"` / `import"/assets/x.js"` forms; we only
 * follow static ones, because dynamic imports are not part of initial load.
 */
function staticImports(file) {
  const src = readFileSync(file, 'utf8')
  const out = new Set()
  const re = /(?:from|import)\s*["']([^"']+\.(?:js|mjs))["']/g
  let m
  while ((m = re.exec(src))) out.add(m[1])
  return [...out]
}

function closure(entries) {
  const seen = new Set()
  const queue = [...entries]
  while (queue.length) {
    const url = queue.shift()
    const file = assetPath(url)
    if (!file || seen.has(file)) continue
    seen.add(file)
    if (!file.endsWith('.js') && !file.endsWith('.mjs')) continue
    for (const spec of staticImports(file)) {
      // Built chunks reference siblings either absolutely or relatively.
      const abs = spec.startsWith('/')
        ? spec
        : posix.join(posix.dirname('/' + file.slice(CLIENT.length + 1)), spec)
      queue.push(abs)
    }
  }
  return [...seen]
}

function findHtml(url) {
  const candidates =
    url === '/'
      ? ['index.html']
      : [`${url.slice(1)}/index.html`, `${url.slice(1)}.html`]
  for (const c of candidates) {
    const p = join(CLIENT, c)
    if (existsSync(p)) return p
  }
  return null
}

function measurePage(sample) {
  const htmlPath = findHtml(sample.url)
  if (!htmlPath) return { ...sample, missing: true }
  const html = readFileSync(htmlPath, 'utf8')

  // Scripts the document loads, plus anything it preloads for this navigation.
  const entries = new Set()
  for (const m of html.matchAll(/<script[^>]+src=["']([^"']+)["'][^>]*>/g))
    entries.add(m[1])
  for (const m of html.matchAll(/<link[^>]+>/g)) {
    const tag = m[0]
    if (!/rel=["'](modulepreload|preload)["']/.test(tag)) continue
    if (/as=["']style["']/.test(tag)) continue
    const href = tag.match(/href=["']([^"']+)["']/)
    if (href) entries.add(href[1])
  }

  const jsFiles = closure([...entries]).filter((f) => /\.m?js$/.test(f))

  // Stylesheets the document links, plus inline <style> bytes.
  const cssFiles = []
  for (const m of html.matchAll(/<link[^>]+>/g)) {
    const tag = m[0]
    if (!/rel=["']stylesheet["']/.test(tag)) continue
    const href = tag.match(/href=["']([^"']+)["']/)
    const p = href && assetPath(href[1])
    if (p) cssFiles.push(p)
  }
  let inlineCss = 0
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g))
    inlineCss += Buffer.byteLength(m[1])

  const jsBuf = Buffer.concat(jsFiles.map((f) => readFileSync(f)))
  const cssBuf = Buffer.concat(cssFiles.map((f) => readFileSync(f)))
  const htmlBuf = Buffer.from(html)

  return {
    ...sample,
    htmlFile: htmlPath.slice(CLIENT.length + 1),
    jsChunks: jsFiles.length,
    js: { raw: jsBuf.length, gzip: gz(jsBuf), brotli: br(jsBuf) },
    css: {
      raw: cssBuf.length + inlineCss,
      gzip: cssBuf.length ? gz(cssBuf) : 0,
      external: cssBuf.length,
      inline: inlineCss,
    },
    html: { raw: htmlBuf.length, gzip: gz(htmlBuf), brotli: br(htmlBuf) },
  }
}

const allFiles = await walk(CLIENT)
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'))
const jsAll = allFiles.filter((f) => /\.m?js$/.test(f))
const cssAll = allFiles.filter((f) => f.endsWith('.css'))
const sum = (files) => files.reduce((n, f) => n + statSync(f).size, 0)
const sumGz = (files) => files.reduce((n, f) => n + gz(readFileSync(f)), 0)

const report = {
  label,
  clientDir: CLIENT,
  totals: {
    htmlPages: htmlFiles.length,
    jsFiles: jsAll.length,
    jsRaw: sum(jsAll),
    jsGzip: sumGz(jsAll),
    cssFiles: cssAll.length,
    cssRaw: sum(cssAll),
    htmlRaw: sum(htmlFiles),
    htmlGzip: sumGz(htmlFiles),
    htmlAvgRaw: Math.round(sum(htmlFiles) / (htmlFiles.length || 1)),
  },
  pages: SAMPLES.map(measurePage),
}

const kb = (n) => (n / 1024).toFixed(1) + ' kB'
console.log(`\n=== ${label} ===`)
console.log(
  `build totals: ${report.totals.htmlPages} html, ` +
    `${report.totals.jsFiles} js (${kb(report.totals.jsRaw)} raw / ${kb(report.totals.jsGzip)} gz), ` +
    `${report.totals.cssFiles} css (${kb(report.totals.cssRaw)})`
)
console.log(
  `html bytes: total ${kb(report.totals.htmlRaw)} raw / ${kb(report.totals.htmlGzip)} gz, avg ${kb(report.totals.htmlAvgRaw)}/page`
)
for (const p of report.pages) {
  if (p.missing) {
    console.log(`  ${p.name.padEnd(11)} MISSING (${p.url})`)
    continue
  }
  console.log(
    `  ${p.name.padEnd(11)} initial JS ${String(p.jsChunks).padStart(2)} chunks ` +
      `${kb(p.js.raw).padStart(9)} raw / ${kb(p.js.gzip).padStart(9)} gz / ${kb(p.js.brotli).padStart(9)} br` +
      ` | css ${kb(p.css.raw).padStart(8)} (inline ${kb(p.css.inline)})` +
      ` | html ${kb(p.html.raw).padStart(8)} / ${kb(p.html.gzip)} gz`
  )
}

if (outJson) {
  writeFileSync(outJson, JSON.stringify(report, null, 2))
  console.log(`\nwrote ${outJson}`)
}
