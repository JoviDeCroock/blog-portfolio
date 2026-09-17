#!/usr/bin/env node
// Checks that every internal link in the built site resolves to a page that
// was actually emitted.
//
// The old prerenderer crawled discovered links and wrote a page for whatever
// the router rendered, so a link to the wrong path produced a 200 response
// containing the not-found body. A static export answers those with a real
// 404, which is more honest but means broken links need catching in CI.
//
// Usage: node scripts/check-links.mjs [clientDir]

import { readFileSync, existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, resolve, dirname, posix } from 'node:path'

const ROOT = resolve(process.argv[2] ?? 'dist/client')

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) await walk(p, out)
    else if (entry.name.endsWith('.html')) out.push(p)
  }
  return out
}

const pages = await walk(ROOT)
const broken = []

for (const file of pages) {
  const pageUrl = '/' + file.slice(ROOT.length + 1).replace(/index\.html$/, '')
  const html = readFileSync(file, 'utf8')

  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/g)) {
    const href = match[1]
    if (/^(https?:|mailto:|#|tel:)/.test(href)) continue

    const path = href.split('#')[0].split('?')[0]
    if (!path) continue

    const abs = path.startsWith('/') ? path : posix.join(pageUrl, path)
    const targets = [
      join(ROOT, abs),
      join(ROOT, abs, 'index.html'),
      join(ROOT, `${abs}.html`),
    ]
    if (!targets.some(existsSync))
      broken.push({ page: pageUrl, href, resolved: abs })
  }
}

if (broken.length === 0) {
  console.log(`checked ${pages.length} pages — no broken internal links`)
  process.exit(0)
}

console.log(`${broken.length} broken internal link(s):`)
for (const b of broken)
  console.log(`  ${b.page}  →  ${b.href}  (${b.resolved})`)
process.exit(1)
