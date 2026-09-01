#!/usr/bin/env node
// Moves each post's interactive demo components into src/islands/<slug>/ and
// repoints the MDX imports at them.
//
// Every demo is used as a bare <Demo /> with no props, so there is nothing to
// serialize — the move is mechanical. Modules the demos import but that render
// nothing themselves (common.tsx) stay with the post.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'

// slug -> component files to promote (as spelled in the MDX import).
const DEMOS = {
  'controlled-inputs': ['Uncontrolled.tsx', 'Issue.tsx', 'Solution.tsx'],
  platform: ['WaterfallDiagram.tsx'],
  'state-in-vdom': ['ContextForm.tsx', 'ExternalForm.tsx'],
  'state-vs-signals': ['StateBasedDiagram.tsx', 'SignalBasedDiagram.tsx'],
  'suspense-data-ssr': ['RenderToString.tsx', 'Suspense.tsx'],
  'vdom-compilers': ['State-Equality.tsx', 'Strict-Equality.tsx'],
}

for (const [slug, files] of Object.entries(DEMOS)) {
  const from = join('src/content/posts', slug)
  const to = join('src/islands', slug)
  mkdirSync(to, { recursive: true })

  for (const file of files) {
    const src = join(from, file)
    if (!existsSync(src)) throw new Error(`missing ${src}`)
    execFileSync('git', ['mv', src, join(to, file)])

    // The demo now sits two directories deeper relative to the post, so any
    // sibling module it still imports moves from './x' to the post directory.
    const moved = join(to, file)
    const body = readFileSync(moved, 'utf8').replace(
      /from '\.\/([^']+)'/g,
      `from '../../content/posts/${slug}/$1'`
    )
    writeFileSync(moved, body)
  }

  // Repoint the MDX imports.
  const mdxPath = join(from, 'index.mdx')
  let mdx = readFileSync(mdxPath, 'utf8')
  for (const file of files) {
    const base = file.replace(/\.tsx$/, '')
    mdx = mdx.replace(
      new RegExp(
        `from '\\./${base.replace(/[.*+?^$()|[\\]\\\\]/g, '\\\\$&')}(\\.tsx)?'`,
        'g'
      ),
      `from '../../../islands/${slug}/${base}'`
    )
  }
  writeFileSync(mdxPath, mdx)
  console.log(`${slug}: ${files.length} demo(s) → src/islands/${slug}/`)
}

// --- flip the seven routes to islands hydration ---------------------------
const SLUGS = ['browser-timings', ...Object.keys(DEMOS)]
let routes = readFileSync('src/routes.ts', 'utf8')
for (const slug of SLUGS) {
  const routeId = routes.match(
    new RegExp(
      `'./routes/posts/${slug}\\.tsx',\\s*\\{\\s*id: '([^']+)',?\\s*\\}`
    )
  )
  if (!routeId) throw new Error(`no plain route entry for ${slug}`)
  routes = routes.replace(
    routeId[0],
    `'./routes/posts/${slug}.tsx', { id: '${routeId[1]}', hydration: 'islands' }`
  )
}
writeFileSync('src/routes.ts', routes)
console.log(`\nflipped ${SLUGS.length} routes to hydration: 'islands'`)
