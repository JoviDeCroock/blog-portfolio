#!/usr/bin/env node
// Inlines each prerendered page's own stylesheets into its HTML, and makes sure
// no page ships markup whose styles were left behind.
//
// pracht emits a page's CSS as <link rel="stylesheet">, which is right for an
// app where visitors move between pages: the file is fetched once and cached.
// A blog is the other shape — most visits are a single page arrived at from
// search or social — and there the link costs a render-blocking round trip
// before anything paints.
//
// The stylesheets here are 3-5 kB per page, so inlining them is cheaper than
// the extra trip. The files stay on disk for client-side navigation.
//
// Which stylesheets a page needs is pracht's job: it resolves the route, the
// shell, and the islands the page rendered. That was not always true — a route
// outside the client bundle emitted no CSS at all, and island CSS arrived only
// once its chunk was imported, after hydration — so this script used to collect
// both itself. @pracht/vite-plugin 0.13.0 covers them, and the check at the end
// is what keeps that honest: a page rendering class names that no stylesheet
// defines fails the build instead of shipping dangling markup.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const ROOT = resolve(process.argv[2] ?? 'dist/client')

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) await walk(p, out)
    else if (entry.name.endsWith('.html')) out.push(p)
  }
  return out
}

const LINK = /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi
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

let pages = 0
let inlined = 0
let bytes = 0
const unstyled = []

for (const file of await walk(ROOT)) {
  const html = readFileSync(file, 'utf8')
  const used = usedIn(html)
  // Class names this page ends up with rules for.
  const covered = new Set()
  let changed = false

  const next = html.replace(LINK, (tag) => {
    const href = tag.match(/\bhref=["']([^"']+)["']/)?.[1]
    // Leave third-party stylesheets (fonts, the highlight.js theme) alone.
    if (!href || !href.startsWith('/')) return tag

    const asset = join(ROOT, href)
    if (!existsSync(asset)) return tag

    const css = readFileSync(asset, 'utf8')
    for (const name of definedIn(css)) covered.add(name)
    changed = true
    inlined++
    bytes += css.length
    return `<style>${css}</style>`
  })

  const missing = [...used].filter((name) => !covered.has(name))
  if (missing.length > 0) {
    unstyled.push(`${file.slice(ROOT.length)}: ${missing.join(', ')}`)
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
  `inlined ${inlined} stylesheet(s) into ${pages} page(s) ` +
    `(${(bytes / 1024).toFixed(1)} kB)`
)
