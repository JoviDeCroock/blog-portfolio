#!/usr/bin/env node
// One-off migration: strip the <SEO> / <CodeTheme> components out of every post.
//
// Under preact-iso these components wrote <head> tags from a hook during
// hydration. Under pracht the same metadata is produced by the route module's
// head() export and lands in the prerendered HTML, so the components (and the
// hoofd runtime behind them) are dead weight inside the MDX body.
//
// Also emits src/routes/posts/<slug>.tsx wrappers and src/routes.ts.

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'

import { classifyPosts } from './classify-posts.mjs'

const POSTS_DIR = 'src/content/posts'
const WRAPPER_DIR = 'src/routes/posts'
// Where the posts lived before `git mv`, and the last commit that had them
// there. Reading the pristine source from that commit keeps this script
// re-runnable after the migration itself has been committed.
const ORIGINAL_DIR = 'src/pages/posts'
const ORIGINAL_REF = process.env.PRACHT_MIGRATION_BASE ?? '645e5c2'

function pristine(slug) {
  try {
    return execFileSync(
      'git',
      ['show', `${ORIGINAL_REF}:${ORIGINAL_DIR}/${slug}/index.mdx`],
      {
        encoding: 'utf8',
        maxBuffer: 32 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'ignore'],
      }
    )
  } catch {
    throw new Error(
      `cannot read pristine source for "${slug}" from ${ORIGINAL_REF}; ` +
        `set PRACHT_MIGRATION_BASE to the pre-migration commit`
    )
  }
}

/** Remove a self-closing JSX element, scanning to its matching `/>`. */
function stripElement(source, tagName) {
  let out = source
  let found = false
  for (;;) {
    const start = out.indexOf(`<${tagName}`)
    if (start === -1) break
    // The next character must not be an identifier char, so <SEO> does not
    // also match a hypothetical <SEOSomething>.
    const after = out[start + tagName.length + 1]
    if (after && /[A-Za-z0-9_]/.test(after)) break

    let depth = 0
    let end = -1
    let quote = null
    for (let i = start; i < out.length; i++) {
      const ch = out[i]
      if (quote) {
        if (ch === quote) quote = null
        continue
      }
      if (ch === '"' || ch === "'") quote = ch
      else if (ch === '{') depth++
      else if (ch === '}') depth--
      else if (ch === '>' && depth === 0 && out[i - 1] === '/') {
        end = i + 1
        break
      }
    }
    if (end === -1) throw new Error(`unterminated <${tagName}>`)
    out = out.slice(0, start) + out.slice(end)
    found = true
  }
  return { source: out, found }
}

const slugs = readdirSync(POSTS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort()

const manifest = []

for (const slug of slugs) {
  const mdxPath = join(POSTS_DIR, slug, 'index.mdx')
  const original = pristine(slug)

  // Only touch the preamble — the imports and JSX above the first heading or
  // fenced block. Post bodies contain <SEO> inside code examples, which must
  // survive untouched.
  const bodyStart = original.search(/^(#|```)/m)
  const preambleEnd = bodyStart === -1 ? original.length : bodyStart
  let source = original.slice(0, preambleEnd)
  const body = original.slice(preambleEnd)

  const seo = stripElement(source, 'SEO')
  source = seo.source
  const code = stripElement(source, 'CodeTheme')
  source = code.source

  // Drop the now-unused imports.
  source = source
    .split('\n')
    .filter(
      (line) =>
        !/^﻿?import\s+SEO\s+from\s+['"].*components\/Seo['"];?\s*$/.test(line) &&
        !/^﻿?import\s+CodeTheme\s+from\s+['"].*components\/CodeTheme['"];?\s*$/.test(
          line
        )
    )
    .join('\n')

  // `documentProps` is often only referenced by the <SEO> that just went away.
  // Drop the import when nothing else in the post uses it.
  const withoutPropsImport = source.replace(
    /^import\s+\{\s*documentProps\s*\}\s+from\s+['"]\.\/documentProps['"];?\s*$/m,
    ''
  )
  if (!/documentProps/.test(withoutPropsImport + body))
    source = withoutPropsImport

  source = source.replace(/^\s*\n+/, '').replace(/\n{3,}/g, '\n\n')
  if (source.trim() !== '' && !source.endsWith('\n\n')) {
    source = source.replace(/\n*$/, '\n\n')
  }
  writeFileSync(mdxPath, source + body)

  // Read the post's public path out of its documentProps.
  const props = readFileSync(join(POSTS_DIR, slug, 'documentProps.ts'), 'utf8')
  const path = props.match(/path:\s*['"]([^'"]+)['"]/)?.[1]
  if (!path) throw new Error(`no path in ${slug}/documentProps.ts`)

  manifest.push({
    slug,
    path,
    routeId: path.replace(/^\/blog\//, ''),
    code: code.found,
  })
}

// A post whose content is pure prose needs no framework JavaScript at all.
const staticSlugs = new Set(
  classifyPosts()
    .filter((row) => row.static)
    .map((row) => row.slug)
)
for (const entry of manifest) entry.static = staticSlugs.has(entry.slug)

// --- route wrappers -------------------------------------------------------
mkdirSync(WRAPPER_DIR, { recursive: true })
for (const entry of manifest) {
  writeFileSync(
    join(WRAPPER_DIR, `${entry.slug}.tsx`),
    `import Content from '../../content/posts/${entry.slug}/index.mdx'
import { documentProps } from '../../content/posts/${entry.slug}/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps${entry.code ? '' : ', { code: false }'})
}

export default Content
`
  )
}

// --- route manifest -------------------------------------------------------
const routeLines = manifest
  .map((e) => {
    const meta = `{ id: '${e.routeId}'${e.static ? ", hydration: 'none'" : ''} }`
    return `      route('${e.path}', './routes/posts/${e.slug}.tsx', ${meta}),`
  })
  .join('\n')

writeFileSync(
  'src/routes.ts',
  `import { defineApp, group, route } from '@pracht/core'

/**
 * Every route on this site is static: the HTML and its head metadata are
 * produced at build time, so the whole app deploys as plain files.
 */
export const app = defineApp({
  shells: {
    public: './shells/public.tsx',
  },
  notFound: {
    component: './routes/not-found.tsx',
    shell: 'public',
  },
  routes: [
    group({ shell: 'public', render: 'ssg' }, [
      route('/', './routes/home.tsx', { id: 'home' }),
      route('/blog', './routes/blog.tsx', { id: 'blog' }),
      // Prose only — no framework JavaScript.
      route('/blueprint', './routes/blueprint.tsx', {
        id: 'blueprint',
        hydration: 'none',
      }),

      // Blog posts. One route module per post, wrapping its MDX content.
      // Posts that are pure prose declare hydration: 'none' and ship no
      // framework JavaScript; the rest embed interactive demos and hydrate.
${routeLines}
    ]),
  ],
})
`
)

console.log(`migrated ${manifest.length} posts`)
console.log(`  with code theme: ${manifest.filter((e) => e.code).length}`)
console.log(`  wrappers: ${WRAPPER_DIR}/*.tsx`)
console.log(`  manifest: src/routes.ts`)
