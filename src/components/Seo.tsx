import { useLang, useTitle, useMeta, useLink } from 'hoofd/preact'

type SEOProps = {
  title: string;
  description: string;
}

const author = 'Jovi De Croock';

// TODO: keywords
const SEO = (props: SEOProps) => {
  useLink({
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css',
    crossorigin: "anonymous"
  })

  useLang('en')

  useTitle(props.title)

  useMeta({ name: 'author', content: author })
  useMeta({
    name: 'description',
    content: props.description,
  })

  useMeta({ name: 'twitter:card', content: 'summary' })
  useMeta({ name: 'twitter:creator', content: author })
  useMeta({ name: 'twitter:title', content: props.title })
  useMeta({
    name: 'twitter:description',
    content: props.description,
  })

  useMeta({ property: 'og:title', content: props.title })
  useMeta({ property: 'og:type', content: 'website' })
  useMeta({
    property: 'og:description',
    content: props.description,
  })

  return null
}

export default SEO
