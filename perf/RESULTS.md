# preact-iso → pracht: measured difference

Both sides are the same site, same content, same Vite 8, same dependency tree,
built and measured on one machine back to back.

- **baseline** — commit `645e5c2`: preact-iso router, `@preact/preset-vite`
  prerendering, goober CSS-in-JS, hoofd for `<head>`.
- **pracht** — `@pracht/core` manifest router, `@pracht/adapter-static`,
  CSS Modules, route `head()` exports, islands hydration.

Reproduce with:

```sh
bash perf/build-baseline.sh          # rebuilds the old site from its commit
pnpm build
node perf/measure.mjs perf/baseline-src/dist baseline
node perf/measure.mjs dist/client pracht
node perf/bench.mjs   perf/baseline-src/dist baseline
node perf/bench.mjs   dist/client pracht
node perf/verify.mjs  dist/client   # functional parity checks
node scripts/check-links.mjs dist/client
```

---

## What ships

|                   | baseline | pracht   | change   |
| ----------------- | -------- | -------- | -------- |
| JS files in build | 76       | 27       | −64%     |
| JS total, raw     | 575.4 kB | 81.3 kB  | −86%     |
| JS total, gzip    | 164.5 kB | 30.5 kB  | **−81%** |
| HTML total, raw   | 727.9 kB | 674.7 kB | −7%      |
| Production build  | 1086 ms  | 1582 ms  | +46%     |

## What a visitor loads

Headless Chromium, cold cache, throttled to ~1.6 Mbps / 150 ms RTT, median of
5 runs. Third-party requests (Google Fonts, the highlight.js theme) are blocked
so the numbers describe the app rather than the CDN — both sides request the
same ones.

| page                      | metric           | baseline              | pracht               | change   |
| ------------------------- | ---------------- | --------------------- | -------------------- | -------- |
| **home**                  | JS               | 45.0 kB / 4 reqs      | 20.5 kB / 4 reqs     | −54%     |
|                           | last JS byte     | 887 ms                | 531 ms               | −40%     |
|                           | DOMContentLoaded | 667 ms                | 536 ms               | −20%     |
|                           | FCP              | 224 ms                | 204 ms               | −9%      |
| **blog index**            | JS               | 56.7 kB / **37 reqs** | 21.2 kB / **4 reqs** | −63%     |
|                           | last JS byte     | 1688 ms               | 665 ms               | **−61%** |
|                           | FCP              | 244 ms                | 208 ms               | −15%     |
|                           | load             | 738 ms                | 840 ms               | +14%     |
| **blog post** (prose)     | JS               | 47.9 kB / 6 reqs      | **0 kB / 0 reqs**    | −100%    |
|                           | DOMContentLoaded | 669 ms                | 223 ms               | **−67%** |
|                           | total bytes      | 108.3 kB              | 58.9 kB              | −46%     |
| **blog post** (with demo) | JS               | 54.9 kB / 6 reqs      | 20.6 kB / 5 reqs     | −62%     |
|                           | last JS byte     | 946 ms                | 537 ms               | −43%     |

The blog index's `load` is the one regression: island props serialize the post
registry into the HTML, so the document grows from 32.5 kB to 42.6 kB raw. It
gzips to 7.2 kB either way, and the page still transfers 24 kB less overall.

---

## How the client got small

The first working migration was **worse** than the baseline on the hydrated
routes: 64.8 kB of JS on home against 45.0 kB, because pracht's client runtime
(`client` 37.8 kB + `route-matching` 3.5 kB + `runtime-hooks` 0.8 kB) is larger
than preact-iso's single 34 kB entry that already contained Preact.

Three things closed that gap, in ascending order of how much they mattered.

### 1. `client: { prefetch: false }` — not the lever (~1 kB)

The only client feature pracht exposes as a config flag. Measured: 62.2 → 61.1 kB
raw on home, and 3.8 kB raw / 1.9 kB gzip off the whole build. Speculation
rules, view transitions, scroll restoration and the capability hooks are all
still compiled in with no flag to remove them (`perf/probe-client.sh`).

**Not applied.** Once every real route stopped loading the router the flag only
affected `404.html`, while silently disabling `<Link prefetch>` for any route
later returned to full hydration.

### 2. `hydration: "none"` on prose routes

26 posts plus `/blueprint` contain no interactive component, so they render as
HTML with no `<script>` tag at all. `scripts/classify-posts.mjs` derives the
split from each post's imports rather than a hand-kept list.

### 3. `hydration: "islands"` everywhere else — the actual lever

Once the prose routes were static, the client router existed to serve exactly
one transition: home ↔ blog. Everything else was already a document navigation,
because pracht falls back to `window.location` when a full-hydration route
links to a static one. The router was most of the bundle and bought almost
nothing.

Moving the interactive parts into `src/islands/` removed it from every real
page:

- `OssGrid` — the hover glow on the home page's project cards
- `PostFilter` — the blog index's tag filter and the list it drives
- 14 in-post demo components, one directory per post

Home went from 62.2 kB to 20.5 kB raw. What remains is Preact (13.9 kB), the
islands bootstrap (4.4 kB) and the islands themselves — under 1.5 kB each.

`client-*.js`, the 38.5 kB router, is now loaded by exactly one document:
`404.html`. The static adapter requires the not-found page to hydrate fully so
it can adopt the URL the visitor actually asked for.

---

## Two things worth knowing about the numbers

**Inlined CSS is doing work here.** pracht emits per-route CSS as
`<link rel="stylesheet">`, which is right for an app whose visitors move
between pages. For a blog entered cold from search it cost a render-blocking
round trip that the old inline `<style>` did not — FCP measured 436 ms before
`scripts/inline-css.mjs` and 216 ms after. Without that post-build step the
migration is an FCP regression, not an improvement.

**The absolute numbers are optimistic.** The benchmark blocks third-party
requests, but in production every post still blocks first paint on a
render-blocking stylesheet from `cdnjs.cloudflare.com`, plus Google Fonts. Both
builds carry that cost identically, so the comparison holds — but a post that
ships 0 kB of JavaScript and then waits on two third-party origins is leaving
most of the win on the table.

---

## Follow-ups

1. **Self-host the highlight.js theme and the fonts.** Now clearly the largest
   remaining cost: two render-blocking third-party origins on pages that
   otherwise ship nothing. pracht's `defineFont()` covers the font half with
   preload links and layout-shift-free fallbacks.
2. **The blog index's island props.** The whole post registry is serialized
   into the document to feed the filter. Filtering server-side with per-tag
   routes, or with a CSS-only control, would drop both the props and the
   island.
3. **`pracht typegen`.** Not run, so `RouteId` is `string` and `<Link route>`
   is unchecked. Only the shell uses `<Link>` now, so this is cheap to adopt.
4. **Build time.** 1086 ms → 1582 ms. Not worth attention at this size, noted
   so a future regression has a reference point.

## Caveats

One machine, localhost origin, emulated network. LCP tracks FCP closely because
every page here is text-first. Medians of 5 runs; run-to-run spread on the
throttled timings is roughly ±30 ms.
