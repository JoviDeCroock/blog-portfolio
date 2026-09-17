import { defineFont } from '@pracht/core'

/**
 * Self-hosted fonts, replacing the Google Fonts stylesheet.
 *
 * Every page used to block first paint on `fonts.googleapis.com` and then
 * again on `fonts.gstatic.com` for the files themselves — two extra origins,
 * two extra connections, on pages that otherwise ship no JavaScript. Serving
 * the woff2 from this origin removes both. `defineFont` writes the preload
 * links and `@font-face` rules into the prerendered HTML, so routes with
 * `hydration: "none"` get them without any client runtime.
 *
 * The files in `public/fonts` are latin subsets taken verbatim from fontsource:
 * Inter from `@fontsource/inter` (already a dependency, for the OG image
 * generator) and Fira Code from `@fontsource/fira-code` 5.3.0. Only the weights
 * the site uses are included, matching the `wght@400;500` the old stylesheet
 * asked for.
 *
 * `display: "optional"` matches the `&display=optional` the old URL carried.
 * The browser either has the font in time for first paint or renders the
 * fallback for that page load — it never swaps mid-paint, so a slow font
 * cannot shift the layout. Self-hosting makes winning that window much more
 * likely than it was across two third-party origins.
 */

const SANS_FALLBACKS = ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif']

/** Body copy. Preloaded — every page renders text in it. */
export const interRegular = defineFont({
  family: 'Inter',
  src: '/fonts/inter-latin-400-normal.woff2',
  weight: 400,
  display: 'optional',
  fallbacks: SANS_FALLBACKS,
})

/**
 * Headings and the active nav link. Same family, so the browser selects it by
 * weight; not preloaded, because far less of any given page is set in it.
 */
export const interMedium = defineFont({
  family: 'Inter',
  src: '/fonts/inter-latin-500-normal.woff2',
  weight: 500,
  display: 'optional',
  preload: false,
  fallbacks: SANS_FALLBACKS,
})

/**
 * Code blocks. Registered by `postHead()` only for posts that contain code,
 * so the 6 posts without any never mention it.
 */
export const firaCode = defineFont({
  family: 'Fira Code',
  src: '/fonts/fira-code-latin-400-normal.woff2',
  weight: 400,
  display: 'optional',
  preload: false,
  fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
})
