import type { Plugin } from 'vite'
import { generateRSSFeed } from '../src/utils/generateRss'

export function rssPlugin(): Plugin {
  return {
    name: 'rss-generator',
    generateBundle(options, bundle) {
      // Generate RSS feed
      const rssContent = generateRSSFeed()

      // Emit the RSS file to the bundle
      this.emitFile({
        type: 'asset',
        fileName: 'rss.xml',
        source: rssContent,
      })
    },
  }
}
