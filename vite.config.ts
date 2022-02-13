import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import mdx from '@mdx-js/rollup'
import rehypeHighlight from 'rehype-highlight'

export default defineConfig({
  plugins: [
    preact(),
    mdx({
      rehypePlugins: [rehypeHighlight]
    })
  ],
});
