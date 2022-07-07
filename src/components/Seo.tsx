import { useLang, useTitle, useMeta } from 'hoofd/preact'

type SEOProps = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}

const author = 'Jovi De Croock';

// TODO: keywords and image if provided
const SEO = (props: SEOProps) => {
  useLang('en')
  useTitle(props.title)
  useMeta({ name: 'author', content: author })
  useMeta({
    name: 'description',
    content: props.description,
  })
  useMeta({ name: 'keywords', content: props.keywords ? props.keywords.join(', ') : undefined })

  // Twitta
  useMeta({ name: 'twitter:card', content: props.image ? 'summary_large_image' : 'summary' })
  useMeta({ name: 'twitter:creator', content: 'jovidec' })
  useMeta({ name: 'twitter:title', content: props.title })
  useMeta({ name: 'twitter:image', content: props.image || 'https://jovidecroock.com/me.jpg' })
  useMeta({
    name: 'twitter:description',
    content: props.description,
  })

  // OpenGraph
  useMeta({ property: 'og:title', content: props.title })
  useMeta({ property: 'og:image', content: props.image || 'https://jovidecroock.com/me.jpg' })
  useMeta({ property: 'og:type', content: 'website' })
  useMeta({
    property: 'og:description',
    content: props.description,
  })


  return null
}

export default SEO
