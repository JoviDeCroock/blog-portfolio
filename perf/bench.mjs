#!/usr/bin/env node
// Loads a built site in headless Chromium on a cold cache and records what the
// browser actually does: every request it makes, when the page first paints,
// and when the JS needed to hydrate has finished arriving.
//
// Static byte counts alone are misleading here — a route whose component is
// lazily imported after hydration starts looks cheap on paper but costs an
// extra round trip in practice. This measures the round trips.
//
// Usage: node perf/bench.mjs <clientDir> <label> [outJson]

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import { chromium } from 'playwright-core'

const [, , clientDirArg, label, outJson] = process.argv
if (!clientDirArg) {
  console.error('usage: bench.mjs <clientDir> <label> [outJson]')
  process.exit(1)
}
const ROOT = resolve(clientDirArg)

const PAGES = [
  { name: 'home', url: '/' },
  { name: 'blog-index', url: '/blog' },
  { name: 'blog-post', url: '/blog/hydration-and-preact' },
]

const RUNS = 5

// Roughly "Slow 4G": enough latency that an extra round trip is visible,
// which is the whole point of the comparison.
const NETWORK = {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
}

async function serve() {
  const server = createServer(async (req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0])
    const candidates = [join(ROOT, url), join(ROOT, url, 'index.html')]
    for (const p of candidates) {
      try {
        if (!(await stat(p)).isFile()) continue
        const body = await readFile(p)
        res.writeHead(200, {
          'content-type': MIME[extname(p)] ?? 'application/octet-stream',
          'cache-control': 'no-store',
        })
        res.end(body)
        return
      } catch {}
    }
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('not found')
  })
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  return { server, port: server.address().port }
}

const { server, port } = await serve()
const origin = `http://127.0.0.1:${port}`

const browser = await chromium.launch({ args: ['--no-sandbox'] })

async function measure(page) {
  const context = await browser.newContext()

  // Both builds request the same external stylesheets (Google Fonts, the
  // highlight.js theme). Blocking them keeps the measurement about the app
  // instead of about the CDN's mood.
  await context.route('**/*', (routeReq) => {
    if (routeReq.request().url().startsWith(origin)) return routeReq.continue()
    return routeReq.abort()
  })

  const cdpPage = await context.newPage()

  // LCP is only reported to a buffered observer, so install one before any
  // document script runs.
  await cdpPage.addInitScript(() => {
    window.__lcp = 0
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__lcp = entry.startTime
    }).observe({ type: 'largest-contentful-paint', buffered: true })
  })

  const client = await context.newCDPSession(cdpPage)
  await client.send('Network.enable')
  await client.send('Network.emulateNetworkConditions', NETWORK)

  const requests = []
  cdpPage.on('response', async (res) => {
    const url = res.url()
    if (!url.startsWith(origin)) return
    let size = 0
    try {
      size = (await res.body()).length
    } catch {}
    requests.push({
      url: url.slice(origin.length),
      type: res.request().resourceType(),
      size,
    })
  })

  const start = Date.now()
  await cdpPage.goto(origin + page.url, {
    waitUntil: 'load',
    timeout: 60_000,
  })

  // Wait until the app has actually hydrated: Preact attaches listeners, so
  // poll for network quiet as a proxy for "all route code has arrived".
  await cdpPage
    .waitForLoadState('networkidle', { timeout: 60_000 })
    .catch(() => {})
  const settled = Date.now() - start

  const metrics = await cdpPage.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0]
    const paints = Object.fromEntries(
      performance.getEntriesByType('paint').map((e) => [e.name, e.startTime])
    )
    const lcp = window.__lcp || null
    const lastJs = performance
      .getEntriesByType('resource')
      .filter(
        (e) => e.initiatorType === 'script' || /\.m?js($|\?)/.test(e.name)
      )
      .map((e) => e.responseEnd)
      .reduce((a, b) => Math.max(a, b), 0)

    return {
      fcp: paints['first-contentful-paint'] ?? null,
      lcp: lcp ?? null,
      domContentLoaded: nav?.domContentLoadedEventEnd ?? null,
      load: nav?.loadEventEnd ?? null,
      // When the last script finished downloading — hydration cannot complete
      // before this.
      lastScriptResponseEnd: lastJs || null,
      scriptRequests: performance
        .getEntriesByType('resource')
        .filter(
          (e) => e.initiatorType === 'script' || /\.m?js($|\?)/.test(e.name)
        ).length,
    }
  })

  await context.close()

  const js = requests.filter((r) => /\.m?js($|\?)/.test(r.url))
  const css = requests.filter((r) => r.url.endsWith('.css'))
  return {
    ...metrics,
    settled,
    requestCount: requests.length,
    jsRequests: js.length,
    jsBytes: js.reduce((n, r) => n + r.size, 0),
    cssRequests: css.length,
    cssBytes: css.reduce((n, r) => n + r.size, 0),
    totalBytes: requests.reduce((n, r) => n + r.size, 0),
  }
}

const median = (xs) => {
  const s = [...xs].filter((x) => typeof x === 'number').sort((a, b) => a - b)
  if (!s.length) return null
  const m = s.length >> 1
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

const results = []
for (const page of PAGES) {
  const runs = []
  for (let i = 0; i < RUNS; i++) runs.push(await measure(page))
  const keys = Object.keys(runs[0])
  const agg = Object.fromEntries(
    keys.map((k) => [k, median(runs.map((r) => r[k]))])
  )
  results.push({ ...page, ...agg, runs })
}

await browser.close()
server.close()

const ms = (n) => (n == null ? '   n/a' : `${Math.round(n)}ms`.padStart(7))
const kb = (n) => `${(n / 1024).toFixed(1)}kB`.padStart(8)

console.log(`\n=== ${label} === (median of ${RUNS}, ~1.6Mbps / 150ms RTT)`)
console.log(
  '  page        FCP      LCP      DCL      load   lastJS   jsReqs    jsBytes   allBytes'
)
for (const r of results) {
  console.log(
    `  ${r.name.padEnd(11)}${ms(r.fcp)} ${ms(r.lcp)} ${ms(r.domContentLoaded)} ${ms(r.load)} ${ms(
      r.lastScriptResponseEnd
    )} ${String(r.jsRequests).padStart(6)} ${kb(r.jsBytes)} ${kb(r.totalBytes)}`
  )
}

if (outJson) {
  writeFileSync(
    outJson,
    JSON.stringify({ label, network: NETWORK, results }, null, 2)
  )
  console.log(`\nwrote ${outJson}`)
}
