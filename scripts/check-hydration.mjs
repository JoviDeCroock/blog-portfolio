#!/usr/bin/env node
// Loads every built page in a browser and reports Preact hydration mismatches.
//
// Preact calls options._hydrationMismatch whenever hydration gives up on a
// server-rendered node and creates a new one instead — the deopt that makes a
// page re-render work the server already did. The hydrationProbe plugin in
// vite.config.ts turns that into a console message; this script collects it.
//
// Run it with `pnpm check-hydration`, which builds with the probe first. The
// probe is build-only and gated behind HYDRATION_PROBE, so it never ships.

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { readdir } from 'node:fs/promises'
import { join, extname, resolve, relative, sep } from 'node:path'
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

/** Every emitted page, as the URL a visitor would request. */
async function pages(dir = ROOT, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) await pages(p, out)
    else if (e.name.endsWith('.html')) {
      const rel = relative(ROOT, p).split(sep).join('/')
      out.push(
        rel === 'index.html'
          ? '/'
          : rel.endsWith('/index.html')
            ? '/' + rel.slice(0, -'/index.html'.length)
            : '/' + rel
      )
    }
  }
  return out
}

const urls = (await pages()).sort()

// A probe that failed to install would report a spotlessly clean site, so
// confirm it is actually in the bundle before trusting anything below.
{
  const assets = join(ROOT, 'assets')
  const names = await readdir(assets).catch(() => [])
  let probed = false
  for (const n of names) {
    if (!n.endsWith('.js')) continue
    if (
      (await readFile(join(assets, n), 'utf8')).includes('HYDRATION_MISMATCH')
    )
      probed = true
  }
  if (!probed) {
    console.error(
      'No hydration probe in the build. Rebuild with:\n' +
        '  HYDRATION_PROBE=1 pnpm build'
    )
    process.exit(2)
  }
}

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const context = await browser.newContext()
// Block third-party origins so a CDN hiccup cannot look like a page error.
// unpkg is the exception: the suspense-data-ssr demo imports its renderer from
// there at runtime, so blocking it would stop the island we want to observe.
await context.route('**/*', (r) => {
  const url = r.request().url()
  return url.startsWith(origin) || url.startsWith('https://unpkg.com/')
    ? r.continue()
    : r.abort()
})

let mismatches = 0
let errors = 0
let scripted = 0

for (const url of urls) {
  const page = await context.newPage()
  const found = []
  const pageErrors = []
  page.on('pageerror', (e) => pageErrors.push(String(e)))
  page.on('console', (m) => {
    const t = m.text()
    if (t.startsWith('HYDRATION_MISMATCH')) {
      found.push(JSON.parse(t.slice('HYDRATION_MISMATCH'.length)))
    } else if (m.type() === 'error' && !/Failed to load resource/.test(t)) {
      pageErrors.push(t)
    }
  })

  await page.goto(origin + url, { waitUntil: 'networkidle' })
  // Islands hydrate on idle; give the scheduler a turn before judging.
  await page.waitForTimeout(400)

  const hasJs = await page.evaluate(
    () => document.querySelectorAll('script[src], script[type="module"]').length
  )
  if (hasJs) scripted++

  if (found.length || pageErrors.length) {
    console.log(`  FAIL  ${url}`)
    for (const m of found)
      console.log(
        `          mismatch: expected <${m.type}>, found [${m.found.join(', ') || 'nothing'}]`
      )
    for (const e of pageErrors) console.log(`          error: ${e}`)
    mismatches += found.length
    errors += pageErrors.length
  } else {
    console.log(`  ok    ${url}${hasJs ? '' : '  (no JS)'}`)
  }
  await page.close()
}

await browser.close()
server.close()

console.log(
  `\n${urls.length} pages, ${scripted} with JavaScript — ` +
    `${mismatches} hydration mismatch(es), ${errors} page error(s)`
)
process.exit(mismatches || errors ? 1 : 0)
