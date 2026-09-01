import { defineConfig } from 'vite'
import { pracht } from '@pracht/vite-plugin'
import { staticAdapter } from '@pracht/adapter-static'
import mdx from '@mdx-js/rollup'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import { rssPlugin } from './plugins/rssPlugin'
import { sitemapPlugin } from './plugins/sitemapPlugin'

export default defineConfig({
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
    rssPlugin(),
    sitemapPlugin(),
  ],
})
