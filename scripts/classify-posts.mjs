#!/usr/bin/env node
// Classifies each post by whether its rendered tree can contain interactivity.
//
// A post is "static" when its MDX imports nothing but known-inert modules. Such
// a route can be built with hydration: "none" and ship no framework JavaScript
// at all. Anything importing a local component is treated as interactive — the
// demos in those posts use hooks, events and context.

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const POSTS_DIR = 'src/content/posts'

// Modules that render markup or hold data, but never attach behaviour.
const INERT = [/components\/Dates$/, /\.\/documentProps$/]

export function classifyPosts() {
  const slugs = readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()

  return slugs.map(classify)
}

function classify(slug) {
  const src = readFileSync(join(POSTS_DIR, slug, 'index.mdx'), 'utf8')

  // Imports only count in the preamble; code fences contain example imports.
  const bodyStart = src.search(/^(#|```)/m)
  const preamble = src.slice(0, bodyStart === -1 ? src.length : bodyStart)

  const specifiers = [
    ...preamble.matchAll(/^import\s[^\n]*?from\s+['"]([^'"]+)['"]/gm),
  ].map((m) => m[1])
  const dynamic = specifiers.filter((s) => !INERT.some((re) => re.test(s)))

  // A stray hook or handler written directly in the MDX body would also need
  // hydration. Fenced code blocks are prose, not program, so strip them first —
  // nearly every post here quotes `useState(` in an example.
  const prose = src
    .slice(bodyStart === -1 ? src.length : bodyStart)
    // Fenced blocks, then indented blocks, then inline spans. Every post here
    // quotes hook calls in examples; none of that is executed.
    .replace(/^```[\s\S]*?^```/gm, '')
    .replace(/^(?: {4}|\t).*$/gm, '')
    .replace(/`[^`\n]*`/g, '')
  const inlineBehaviour = /\bon[A-Z][A-Za-z]+=\{|\buse[A-Z][A-Za-z]*\(/.test(
    prose
  )

  return {
    slug,
    static: dynamic.length === 0 && !inlineBehaviour,
    imports: dynamic,
    inlineBehaviour,
  }
}

// Report when run directly.
if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = classifyPosts()
  const statics = rows.filter((r) => r.static)
  console.log(`static posts (${statics.length}/${rows.length}):`)
  for (const r of statics) console.log(`  ${r.slug}`)
  console.log(`\ninteractive posts (${rows.length - statics.length}):`)
  for (const r of rows.filter((r) => !r.static))
    console.log(
      `  ${r.slug}  ${r.imports.join(', ')}${r.inlineBehaviour ? ' [inline]' : ''}`
    )
}
