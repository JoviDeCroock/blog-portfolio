import type { HeadMetadata } from '@pracht/core'

import { firaCode } from '../fonts'

const author = 'Jovi De Croock'
const baseUrl = 'https://jovidecroock.com'

export type SeoInput = {
  title: string
  description: string
  keywords?: readonly string[]
  image?: string
  url?: string
  ogType?: 'website' | 'article'
}

/**
 * Builds the per-route `head()` payload. This replaces the old `<SEO>`
 * component: the tags are now part of the prerendered document instead of
 * being written into the DOM by a hook during hydration.
 */
export function seo(props: SeoInput): HeadMetadata {
  const image = props.image || `${baseUrl}/me.jpg`
  const url = props.url ? `${baseUrl}${props.url}` : baseUrl

  return {
    lang: 'en',
    title: props.title,
    meta: [
      { name: 'author', content: author },
      { name: 'description', content: props.description },
      { name: 'keywords', content: props.keywords?.join(', ') ?? '' },
      { name: 'robots', content: 'index,follow' },

      // Twitter
      {
        name: 'twitter:card',
        content: props.image ? 'summary_large_image' : 'summary',
      },
      { name: 'twitter:creator', content: '@jovidec' },
      { name: 'twitter:site', content: '@jovidec' },
      { name: 'twitter:title', content: props.title },
      { name: 'twitter:image', content: image },
      { name: 'twitter:description', content: props.description },

      // OpenGraph
      { property: 'og:title', content: props.title },
      { property: 'og:image', content: image },
      { property: 'og:type', content: props.ogType ?? 'website' },
      { property: 'og:description', content: props.description },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: author },
    ],
    link: [{ rel: 'canonical', href: url }],
  }
}

/** `head()` for a blog post, derived from its `documentProps`. */
export function postHead(
  documentProps: SeoInput & { tags?: readonly string[]; path?: string },
  options: { code?: boolean } = {}
): HeadMetadata {
  const base = seo({
    title: documentProps.title,
    description: documentProps.description,
    keywords: documentProps.tags,
    image: documentProps.image,
    url: documentProps.path,
    ogType: 'article',
  })

  // The highlight.js theme itself is imported by the shell and inlined into
  // every page; a post with code only needs the monospace face on top.
  if (options.code === false) return base
  return { ...base, fonts: [firaCode] }
}
