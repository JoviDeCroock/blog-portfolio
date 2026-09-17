#!/usr/bin/env node
// Inlines each prerendered page's own stylesheets into its HTML, and makes sure
// no page ships markup whose styles were left behind.
//
// pracht emits per-route CSS as <link rel="stylesheet">, which is right for an
// app where visitors move between pages: the file is fetched once and cached.
// A blog is the other shape — most visits are a single page arrived at from
// search or social — and there the link costs a render-blocking round trip
// before anything paints.
//
// The stylesheets here are 3-5 kB per page, so inlining them is cheaper than
// the extra trip. The files stay on disk for client-side navigation.
//
// Two of the site's three sources of CSS never reach the HTML on their own:
//
//   Islands. pracht resolves a page's stylesheets from the shell and route
//   entries only (`resolvePageCssUrls`), so an island's CSS is not in the
//   document. It arrives through Vite's preload helper, which appends a <link>
//   when the island's dynamic import runs — after hydration, so the
//   server-rendered island paints unstyled first.
//
//   Routes. Nothing under src/routes reaches the client bundle at all:
//   `hydration: 'none'` ships no JavaScript and `hydration: 'islands'` pulls in
//   the islands rather than the route module. pracht builds its CSS manifest
//   from that bundle, so route stylesheets are compiled for their class names
//   during SSR and then emitted nowhere. `build.ssrEmitAssets` makes the server
//   build write them out instead, and they are picked up from there.
//
// Pages are matched to stylesheets by the hashed class names in their markup,
// which needs no route table and cannot drift out of date. Anything still
// unaccounted for at the end fails the build — the regression this guards
// against is invisible in the output otherwise.

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const ROOT = resolve(process.argv[2] ?? 'dist/client')
const SERVER_ASSETS = resolve(ROOT, '../server/assets')

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) await walk(p, out)
    else if (entry.name.endsWith('.html')) out.push(p)
  }
  return out
}

const LINK = /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi
const ISLAND = /<pracht-island\b[^>]*\bisland=["']([^"']+)["']/gi
const CLASS_ATTR = /\bclass=["']([^"']*)["']/gi
// Vite names CSS module classes `_<local>_<hash>_<line>`. Matching that shape
// keeps prose and third-party class names (`hljs-keyword`, `post-callout`) out
// of the accounting, since those come from stylesheets we do not track here.
const SCOPED = /^_[A-Za-z0-9$]+_[a-z0-9]{5,8}_\d+$/
const SCOPED_RULE = /\.(_[A-Za-z0-9$]+_[a-z0-9]{5,8}_\d+)/g

const definedIn = (css) =>
  new Set([...css.matchAll(SCOPED_RULE)].map((m) => m[1]))

function usedIn(html) {
  const used = new Set()
  for (const [, value] of html.matchAll(CLASS_ATTR)) {
    for (const name of value.split(/\s+/)) if (SCOPED.test(name)) used.add(name)
  }
  return used
}

/**
 * Vite records a chunk's own CSS under `css` and leaves the rest to its
 * imports, so an island that pulls in a styled component only lists that
 * stylesheet transitively. Collect the closure, the way pracht does when it
 * builds its own CSS manifest.
 */
function collectCss(manifest, key, seen = new Set(), css = new Set()) {
  if (seen.has(key)) return css
  seen.add(key)
  const entry = manifest[key]
  if (!entry) return css
  for (const file of entry.css ?? []) css.add(file)
  for (const imported of entry.imports ?? [])
    collectCss(manifest, imported, seen, css)
  return css
}

const manifestPath = join(ROOT, '.vite/manifest.json')
if (!existsSync(manifestPath)) {
  // The manifest is what makes island CSS discoverable. Without it that pass
  // would silently do nothing, which is the bug it exists to fix.
  throw new Error(
    `inline-css: no client manifest at ${manifestPath} — build with ` +
      '`build.manifest` enabled, or island stylesheets will load late.'
  )
}
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

// Server-build stylesheets, read once. These carry the route and component CSS
// modules. The shell's and the islands' stylesheets are in here too, but a
// sheet is only inlined when it covers a class the page has no rules for yet,
// so those are skipped in favour of the copies taken from the client build.
const serverSheets = existsSync(SERVER_ASSETS)
  ? readdirSync(SERVER_ASSETS)
      .filter((name) => name.endsWith('.css'))
      .map((name) => {
        const css = readFileSync(join(SERVER_ASSETS, name), 'utf8')
        return { name, css, defines: definedIn(css) }
      })
  : []

let pages = 0
let inlined = 0
let islandSheets = 0
let routeSheets = 0
let bytes = 0
const unstyled = []

for (const file of await walk(ROOT)) {
  const html = readFileSync(file, 'utf8')
  const used = usedIn(html)
  // Class names this page has rules for, so a stylesheet is never inlined twice.
  const covered = new Set()
  // Assets already inlined, so an island sharing a stylesheet with the shell
  // does not get a second copy.
  const seenAssets = new Set()
  const extra = []
  let changed = false

  let next = html.replace(LINK, (tag) => {
    const href = tag.match(/\bhref=["']([^"']+)["']/)?.[1]
    // Leave third-party stylesheets (fonts, the highlight.js theme) alone.
    if (!href || !href.startsWith('/')) return tag

    const asset = join(ROOT, href)
    if (!existsSync(asset)) return tag

    const css = readFileSync(asset, 'utf8')
    for (const name of definedIn(css)) covered.add(name)
    seenAssets.add(href.slice(1))
    changed = true
    inlined++
    bytes += css.length
    return `<style>${css}</style>`
  })

  // The marker carries the island's module id ("/src/islands/PostFilter.tsx"),
  // which is its manifest key once the leading slash is dropped.
  const islandAssets = new Set()
  for (const [, id] of next.matchAll(ISLAND)) {
    for (const asset of collectCss(manifest, id.replace(/^\//, ''))) {
      if (!seenAssets.has(asset)) islandAssets.add(asset)
    }
  }
  for (const asset of islandAssets) {
    const css = readFileSync(join(ROOT, asset), 'utf8')
    for (const name of definedIn(css)) covered.add(name)
    extra.push(css)
    islandSheets++
    bytes += css.length
  }

  // Whatever the page still renders without rules has to come from the server
  // build: the route's own stylesheet, and any styled component it rendered.
  const missing = () => [...used].filter((name) => !covered.has(name))
  if (missing().length > 0) {
    for (const sheet of serverSheets) {
      if (!missing().some((name) => sheet.defines.has(name))) continue
      for (const name of sheet.defines) covered.add(name)
      extra.push(sheet.css)
      routeSheets++
      bytes += sheet.css.length
    }
  }

  if (extra.length > 0) {
    // Into the head, so the rules are in place by the time the body is parsed.
    next = next.replace('</head>', `<style>${extra.join('')}</style></head>`)
    changed = true
  }

  const stillMissing = missing()
  if (stillMissing.length > 0) {
    unstyled.push(`${file.slice(ROOT.length)}: ${stillMissing.join(', ')}`)
  }

  if (changed) {
    writeFileSync(file, next)
    pages++
  }
}

if (unstyled.length > 0) {
  throw new Error(
    'inline-css: these pages render class names that no stylesheet in the ' +
      'build defines, so they would ship unstyled:\n  ' +
      unstyled.join('\n  ')
  )
}

console.log(
  `inlined ${inlined} shell, ${islandSheets} island and ${routeSheets} route ` +
    `stylesheet(s) into ${pages} page(s) (${(bytes / 1024).toFixed(1)} kB)`
)
