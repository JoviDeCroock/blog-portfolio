#!/usr/bin/env node
// Inlines each prerendered page's own stylesheets into its HTML.
//
// pracht emits per-route CSS as <link rel="stylesheet">, which is right for an
// app where visitors move between pages: the file is fetched once and cached.
// A blog is the other shape — most visits are a single page arrived at from
// search or social — and there the link costs a render-blocking round trip
// before anything paints.
//
// The stylesheets here are 3-5 kB per page, so inlining them is cheaper than
// the extra trip. The files stay on disk for client-side navigation.

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

let pages = 0
let inlined = 0
let bytes = 0

for (const file of await walk(ROOT)) {
  const html = readFileSync(file, 'utf8')
  let changed = false

  const next = html.replace(LINK, (tag) => {
    const href = tag.match(/\bhref=["']([^"']+)["']/)?.[1]
    // Leave third-party stylesheets (fonts, the highlight.js theme) alone.
    if (!href || !href.startsWith('/')) return tag

    const asset = join(ROOT, href)
    if (!existsSync(asset)) return tag

    const css = readFileSync(asset, 'utf8')
    changed = true
    inlined++
    bytes += css.length
    return `<style>${css}</style>`
  })

  if (changed) {
    writeFileSync(file, next)
    pages++
  }
}

console.log(
  `inlined ${inlined} stylesheet reference(s) into ${pages} page(s) (${(bytes / 1024).toFixed(1)} kB)`
)
