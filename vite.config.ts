import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import mdx from '@mdx-js/rollup'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { rssPlugin } from './plugins/rssPlugin'

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
    rssPlugin(),
  ],
})
