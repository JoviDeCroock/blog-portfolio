import { defineConfig, type Plugin } from 'vite'
import { pracht } from '@pracht/vite-plugin'
import { staticAdapter } from '@pracht/adapter-static'
import mdx from '@mdx-js/rollup'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import { rssPlugin } from './plugins/rssPlugin'
import { sitemapPlugin } from './plugins/sitemapPlugin'

/**
 * Reports Preact hydration mismatches from a production build.
 *
 * Preact calls `options._hydrationMismatch(vnode, excessDomChildren)` whenever
 * hydration gives up on a server-rendered node and creates a fresh one. The
 * published bundle mangles that property, so rather than hardcode the mangled
 * name we read it back off its own call site and fail the build if it has moved
 * — a probe that silently stopped matching would report a clean site.
 *
 * Only installed when HYDRATION_PROBE is set, which `pnpm check-hydration`
 * does. The shipped bundle never carries it.
 */
function hydrationProbe(): Plugin {
  return {
    name: 'hydration-probe',
    apply: 'build',
    transform(code, id) {
      if (!/[/\\]preact[/\\]dist[/\\]preact\.mjs$/.test(id)) return
      // `t=doc.createElementNS(ns,type,…),hydrating&&(o.__m&&o.__m(vnode,excess),…`
      const call = code.match(
        /createElementNS\([\s\S]{0,120}?(\w+)\.(__\w+)\s*&&\s*\1\.\2\(/
      )
      if (!call) {
        throw new Error(
          'hydration-probe: could not find the _hydrationMismatch call site in ' +
            `${id} — Preact's internals moved and this probe is no longer valid.`
        )
      }
      const [, options, prop] = call
      return `${code}\n;${options}.${prop}=${options}._hydrationMismatch=(v,e)=>{console.error('HYDRATION_MISMATCH '+JSON.stringify({type:typeof v.type=='function'?v.type.displayName||v.type.name||'Component':String(v.type),found:(e||[]).map(c=>c&&c.localName).filter(Boolean)}))};`
    },
  }
}

export default defineConfig({
  build: {
    // Routes never enter the client bundle — `hydration: 'none'` ships no
    // JavaScript and `hydration: 'islands'` pulls in the islands instead — so
    // the CSS modules they import are compiled for their class names during
    // SSR and then emitted nowhere. Letting the server build write its assets
    // out is what gives scripts/inline-css.mjs a stylesheet to inline; nothing
    // in dist/server is deployed.
    ssrEmitAssets: true,
  },
  plugins: [
    // Posts are MDX modules imported by their route wrapper in src/routes/posts.
    {
      enforce: 'pre',
      ...mdx({
        jsxImportSource: 'preact',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      }),
    },
    // Every route is SSG, so the whole site builds to static files in
    // dist/client with no server bundle to deploy.
    pracht({ adapter: staticAdapter() }),
    ...(process.env.HYDRATION_PROBE ? [hydrationProbe()] : []),
    rssPlugin(),
    sitemapPlugin(),
  ],
})
