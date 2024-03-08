import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import mdx from '@mdx-js/rollup'
import rehypeHighlight from 'rehype-highlight'

export default defineConfig({
  // @ts-ignore
  ssr: {
    noExternal: /./,
  },
  build: {
    ssrManifest: true,
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'X-Frame-Options': 'ALLOW-FROM https://unpkg.com/'
    }
  },
  plugins: [
    preact({ prerender: { enabled: true, renderTarget: '#main' } }),
    mdx({
      rehypePlugins: [rehypeHighlight],
    }),
  ],
})
