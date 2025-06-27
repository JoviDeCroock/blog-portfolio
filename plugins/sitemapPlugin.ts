import type { Plugin } from 'vite'
import { generateSitemap } from '../src/utils/generateSitemap'

export function sitemapPlugin(): Plugin {
  return {
    name: 'sitemap-generator',
    generateBundle(options, bundle) {
      // Generate sitemap
      const sitemapContent = generateSitemap()

      // Emit the sitemap file to the bundle
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemapContent,
      })
    },
  }
}
