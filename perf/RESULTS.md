# preact-iso → pracht: measured difference

Both sides are the same site, same content, same Vite 8, same dependency tree,
built and measured on one machine back to back.

- **baseline** — commit `645e5c2`: preact-iso router, `@preact/preset-vite`
  prerendering, goober CSS-in-JS, hoofd for `<head>`.
- **pracht** — commit `293d3bd`: `@pracht/core` manifest router,
  `@pracht/adapter-static`, CSS Modules, route `head()` exports.

Reproduce with:

```sh
bash perf/build-baseline.sh          # rebuilds the old site from its commit
pnpm build
node perf/measure.mjs perf/baseline-src/dist baseline
node perf/measure.mjs dist/client pracht
node perf/bench.mjs   perf/baseline-src/dist baseline
node perf/bench.mjs   dist/client pracht
node perf/verify.mjs  dist/client   # functional parity checks
```

---

## What ships

|                       | baseline            | pracht             | change |
| --------------------- | ------------------- | ------------------ | ------ |
| JS files in build     | 76                  | 16                 | −79%   |
| JS total, raw         | 575.4 kB            | 195.0 kB           | −66%   |
| JS total, gzip        | 164.5 kB            | 53.4 kB            | −68%   |
| HTML total, raw       | 727.9 kB            | 660.9 kB           | −9%    |
| Pages emitted         | 39                  | 37                 | see note |
| Production build      | 1107 ms             | 1578 ms            | +43%   |

The page count moves for two reasons that cancel out to a correctness win: the
old prerenderer crawled discovered links and wrote a page for whatever the
router rendered, so four broken post links produced 200 responses containing
the not-found body. pracht emits only declared routes, plus a real `404.html`
that the baseline never had. The broken links are fixed in `293d3bd`;
`scripts/check-links.mjs` keeps them fixed.

## What a visitor loads

Headless Chromium, cold cache, throttled to ~1.6 Mbps / 150 ms RTT, median of
5 runs. Third-party requests (Google Fonts, the highlight.js theme) are blocked
so the numbers describe the app rather than the CDN — both sides request the
same ones.

### Blog post — 27 of the 30 content routes

|            | baseline | pracht  | change |
| ---------- | -------- | ------- | ------ |
| FCP        | 224 ms   | 220 ms  | −2%    |
| DOMContentLoaded | 665 ms | 224 ms | **−66%** |
| load       | 746 ms   | 596 ms  | −20%   |
| JS requests| 6        | **0**   | −100%  |
| JS bytes   | 47.9 kB  | **0 kB**| −100%  |
| total bytes| 108.3 kB | 58.9 kB | −46%   |

Posts are prose. Under `hydration: "none"` they contain no `<script>` tag at
all — the document is the whole page. This is the migration's main result, and
it is not something the preact-iso setup could express.

Seven posts embed live demos (`browser-timings`, `controlled-inputs`,
`platform`, `state-in-vdom`, `state-vs-signals`, `suspense-data-ssr`,
`vdom-compilers`) and keep full hydration. `scripts/classify-posts.mjs` derives
that split from each post's imports.

### Blog index

|            | baseline | pracht  | change |
| ---------- | -------- | ------- | ------ |
| FCP        | 244 ms   | 220 ms  | −10%   |
| JS requests| 37       | **7**   | −81%   |
| last JS byte| 1710 ms | 1380 ms | −19%   |
| JS bytes   | 56.7 kB  | 73.3 kB | +29%   |
| DOMContentLoaded | 633 ms | 849 ms | +34% |
| load       | 740 ms   | 1025 ms | +38%   |

The old index issued 37 JS requests: every post's `documentProps` was its own
lazy chunk, discovered only after the entry bundle ran. Collapsing that
waterfall is why the last byte of JS arrives 330 ms sooner despite pracht
shipping more total bytes.

### Home

|            | baseline | pracht  | change |
| ---------- | -------- | ------- | ------ |
| FCP        | 220 ms   | 208 ms  | −5%    |
| JS bytes   | 45.0 kB  | 64.8 kB | +44%   |
| last JS byte| 887 ms  | 1338 ms | +51%   |
| load       | 746 ms   | 982 ms  | +32%   |

**This is the regression.** pracht's client runtime is bigger than
preact-iso's: `client` (38.7 kB) + `vendor` (14.3 kB) + `route-matching`
(3.5 kB) + `runtime-hooks` (0.8 kB) against preact-iso's single 34 kB entry
that already included Preact. On the two routes that still hydrate, that is
about 20 kB raw / 6 kB gzip of extra framework.

The trade is deliberate: two interactive routes pay for a router that 27 static
routes then opt out of entirely.

---

## Two things worth knowing about the numbers

**Inlined CSS is doing work here.** pracht emits per-route CSS as
`<link rel="stylesheet">`, which is right for an app whose visitors move
between pages. For a blog entered cold from search it cost a render-blocking
round trip that the old inline `<style>` did not — FCP measured 436 ms before
`scripts/inline-css.mjs` and 216 ms after. Without that post-build step the
migration is an FCP regression, not an improvement.

**The absolute post numbers are optimistic.** The benchmark blocks third-party
requests, but in production those posts still block first paint on a
render-blocking stylesheet from `cdnjs.cloudflare.com`, plus Google Fonts. Both
builds carry that cost identically, so the comparison holds — but a post that
ships 0 kB of JavaScript and then waits on two third-party origins is leaving
most of the win on the table. See follow-ups.

---

## Follow-ups, roughly in value order

1. **Self-host the highlight.js theme and the fonts.** Two render-blocking
   third-party origins on every post is now the largest remaining cost on the
   pages that otherwise ship nothing. pracht's `defineFont()` handles the font
   half with preload links and layout-shift-free fallbacks.
2. **Home and the blog index as islands.** Home's only interactivity is the
   hover glow on the open-source cards; the blog index's is the tag filter.
   Moving both into `src/islands/` would take the whole site to near-zero JS.
   The cost is that navigation becomes full document loads sitewide — a product
   call, not a technical one.
3. **`pracht typegen`.** Not run, so `RouteId` is `string` and `<Link route>`
   is unchecked. Running it makes route ids and params type-safe; the blog
   index's computed `route={postRouteId(post.path)}` would need a cast or a
   route id carried on the post record.
4. **Build time.** 1107 ms → 1578 ms. Not worth attention at this size, noted
   so a future regression has a reference point.

## Caveats

One machine, localhost origin, emulated network. LCP tracks FCP closely because
every page here is text-first. Medians of 5 runs; run-to-run spread on the
throttled timings is roughly ±30 ms.
