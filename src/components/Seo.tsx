import { useLang, useTitle, useMeta } from 'hoofd/preact'

type SEOProps = {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
}

const author = 'Jovi De Croock'
const baseUrl = 'https://jovidecroock.com'

const SEO = (props: SEOProps) => {
  useLang('en')
  useTitle(props.title)
  useMeta({ name: 'author', content: author })
  useMeta({
    name: 'description',
    content: props.description,
  })
  useMeta({
    name: 'keywords',
    content: props.keywords ? props.keywords.join(', ') : '',
  })
  // Canonical URL
  useMeta({
    property: 'canonical',
    content: props.url ? `${baseUrl}${props.url}` : baseUrl,
  })
  // Robots
  useMeta({
    name: 'robots',
    content: 'index,follow',
  })

  // Twitter
  useMeta({
    name: 'twitter:card',
    content: props.image ? 'summary_large_image' : 'summary',
  })
  useMeta({ name: 'twitter:creator', content: '@jovidec' })
  useMeta({ name: 'twitter:site', content: '@jovidec' })
  useMeta({ name: 'twitter:title', content: props.title })
  useMeta({
    name: 'twitter:image',
    content: props.image || `${baseUrl}/me.jpg`,
  })
  useMeta({
    name: 'twitter:description',
    content: props.description,
  })

  // OpenGraph
  useMeta({ property: 'og:title', content: props.title })
  useMeta({
    property: 'og:image',
    content: props.image || `${baseUrl}/me.jpg`,
  })
  useMeta({ property: 'og:type', content: 'website' })
  useMeta({
    property: 'og:description',
    content: props.description,
  })
  useMeta({
    property: 'og:url',
    content: props.url ? `${baseUrl}${props.url}` : baseUrl,
  })
  useMeta({
    property: 'og:site_name',
    content: 'Jovi De Croock',
  })

  return null
}

export default SEO
