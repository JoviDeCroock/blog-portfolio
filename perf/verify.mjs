#!/usr/bin/env node
// Functional check of a built site: does every page render its content, does
// the interactive bit on the blog index still work, and is the head metadata
// actually in the HTML?
//
// Usage: node perf/verify.mjs <clientDir>

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, resolve } from 'node:path'
import { chromium } from 'playwright-core'

const ROOT = resolve(process.argv[2] ?? 'dist/client')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
}

const server = createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  for (const p of [join(ROOT, url), join(ROOT, url, 'index.html')]) {
    try {
      if (!(await stat(p)).isFile()) continue
      res.writeHead(200, {
        'content-type': MIME[extname(p)] ?? 'application/octet-stream',
      })
      res.end(await readFile(p))
      return
    } catch {}
  }
  res.writeHead(404)
  res.end('not found')
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const origin = `http://127.0.0.1:${server.address().port}`

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const context = await browser.newContext()
await context.route('**/*', (r) =>
  r.request().url().startsWith(origin) ? r.continue() : r.abort()
)
const page = await context.newPage()

const failures = []
const consoleErrors = []
page.on('pageerror', (e) => consoleErrors.push(String(e)))
page.on('console', (m) => {
  // The external font and highlight.js stylesheets are deliberately blocked
  // above; their load failures are the harness, not the app.
  if (m.type() === 'error' && !/Failed to load resource/.test(m.text()))
    consoleErrors.push(m.text())
})

const check = (name, ok, detail = '') => {
  if (ok) console.log(`  ok    ${name}`)
  else {
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`)
    failures.push(name)
  }
}

async function head(path, attr, value) {
  return page.evaluate(
    ([a, v]) => {
      const el = document.querySelector(`meta[${a}="${v}"]`)
      return el?.getAttribute('content') ?? null
    },
    [attr, value]
  )
}

console.log('\nstructure')
for (const path of ['/', '/blog', '/blueprint', '/blog/hydration-and-preact']) {
  await page.goto(origin + path, { waitUntil: 'networkidle' })
  const nav = await page.locator('nav a').count()
  const footer = await page.locator('footer a').count()
  check(
    `${path} shell (nav ${nav}, footer ${footer})`,
    nav === 3 && footer >= 5
  )
}

console.log('\ncontent')
await page.goto(origin + '/', { waitUntil: 'networkidle' })
check(
  'home lists open source projects',
  (await page.locator('h3').count()) >= 6
)
check(
  'home title',
  (await page.title()) === 'Portfolio',
  `got "${await page.title()}"`
)

await page.goto(origin + '/blog', { waitUntil: 'networkidle' })
const cards = await page.locator('ul li a').count()
check(`blog index lists posts (${cards})`, cards >= 30)

await page.goto(origin + '/blog/hydration-and-preact', {
  waitUntil: 'networkidle',
})
const h1 = await page.locator('h1').first().textContent()
check(`post renders body (h1 "${h1?.trim()}")`, /hydration/i.test(h1 ?? ''))
check(
  'post has highlighted code',
  (await page.locator('pre code .hljs-keyword, pre code span').count()) > 0
)
check(
  'post canonical url',
  (await page.locator('link[rel=canonical]').getAttribute('href')) ===
    'https://jovidecroock.com/blog/hydration-and-preact'
)
check(
  'post og:description present',
  !!(await head('/blog/hydration-and-preact', 'property', 'og:description'))
)

console.log('\ninteractivity')
await page.goto(origin + '/blog', { waitUntil: 'networkidle' })
const before = await page.locator('ul li').count()
await page.locator('button', { hasText: 'graphql' }).first().click()
await page.waitForTimeout(200)
const after = await page.locator('ul li').count()
check(
  `blog tag filter narrows list (${before} → ${after})`,
  after > 0 && after < before
)
await page.locator('button', { hasText: 'Clear filter' }).click()
await page.waitForTimeout(200)
check(
  'blog clear filter restores list',
  (await page.locator('ul li').count()) === before
)

// The in-post demos are islands: the page ships no router, but those specific
// components still have to attach their handlers.
await page.goto(origin + '/blog/browser-timings', { waitUntil: 'networkidle' })
const logs = []
page.on('console', (m) => logs.push(m.text()))
await page.locator('#example').click()
await page.waitForTimeout(300)
check(
  `browser-timings demo island hydrated (${logs.length} console events)`,
  logs.some((l) => l.includes('onClick')),
  logs.join(' | ')
)

await page.goto(origin + '/blog/controlled-inputs', {
  waitUntil: 'networkidle',
})
const input = page.locator('input:not([type=checkbox])').first()
await input.fill('abc')
check(
  'controlled-inputs demo island accepts input',
  (await input.inputValue()) === 'abc'
)

console.log('\nnavigation')
await page.goto(origin + '/', { waitUntil: 'networkidle' })
await page.locator('nav a', { hasText: 'Blog' }).click()
await page.waitForURL('**/blog', { timeout: 10_000 })
check('nav home → blog', page.url().endsWith('/blog'))

// A post with hydration: "none" has no client router, so this is a plain
// document navigation — it still has to work.
await page.goto(origin + '/blog/hydration-and-preact', {
  waitUntil: 'networkidle',
})
await page.locator('nav a', { hasText: 'Home' }).click()
await page.waitForURL(origin + '/', { timeout: 10_000 })
check('nav post → home', new URL(page.url()).pathname === '/')

console.log('\nstatic assets')
for (const path of ['/rss.xml', '/sitemap.xml', '/404.html']) {
  const res = await page.goto(origin + path)
  check(`${path} served (${res?.status()})`, res?.status() === 200)
}

console.log('\nconsole')
check(
  `no page errors (${consoleErrors.length})`,
  consoleErrors.length === 0,
  consoleErrors.slice(0, 3).join(' | ')
)

await browser.close()
server.close()

console.log(
  failures.length
    ? `\n${failures.length} check(s) failed\n`
    : '\nall checks passed\n'
)
process.exit(failures.length ? 1 : 0)
