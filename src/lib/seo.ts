import type { HeadMetadata } from '@pracht/core'

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

/**
 * Syntax highlighting theme for pages that contain code blocks. Previously the
 * `<CodeTheme>` component; kept on the same CDN so the migration does not
 * quietly change what the browser fetches.
 */
const HIGHLIGHT_CSS =
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'

export const codeThemeLinks: HeadMetadata['link'] = [
  {
    rel: 'preconnect',
    href: 'https://cdnjs.cloudflare.com/',
    crossorigin: 'anonymous',
  },
  { rel: 'preload', as: 'style', href: HIGHLIGHT_CSS },
  { rel: 'stylesheet', href: HIGHLIGHT_CSS },
]

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

  if (options.code === false) return base
  return { ...base, link: [...(base.link ?? []), ...(codeThemeLinks ?? [])] }
}
