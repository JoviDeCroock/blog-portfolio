import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import mdx from '@mdx-js/rollup'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  // @ts-ignore
  ssr: {
    noExternal: /./,
  },
  build: {
    ssrManifest: true,
  },
  plugins: [
    preact({ prerender: { enabled: true, renderTarget: '#main' } }),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    }),
  ],
})
