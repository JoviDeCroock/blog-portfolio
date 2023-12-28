import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import mdx from '@mdx-js/rollup'
import rehypeHighlight from 'rehype-highlight'
import { PrerenderPlugin } from './prerender'

export default defineConfig({
  // @ts-ignore
  ssr: {
    noExternal: /./,
  },
  build: {
    ssrManifest: true,
  },
  plugins: [
    preact(),
    mdx({
      rehypePlugins: [rehypeHighlight],
    }),
    PrerenderPlugin({ enabled:true })
  ],
})
