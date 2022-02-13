import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import mdx from '@mdx-js/rollup'

export default defineConfig({
  plugins: [preact(), mdx()],
});
