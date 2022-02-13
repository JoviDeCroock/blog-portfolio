import { useLink } from 'hoofd/preact'
import SEO from '../../components/Seo'
import VdomOptimizations, {
  documentProps as vdomDocumentProps,
} from './vdom-compilers/index.mdx'

export default [
  {
    ...vdomDocumentProps,
    Component: () => {
      useLink({
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'
      })

      return (
        <>
          <SEO
            title={vdomDocumentProps.title}
            description={vdomDocumentProps.description}
          />
          <VdomOptimizations />
        </>
      )
    },
    path: '/blog' + vdomDocumentProps.path,
  },
]
