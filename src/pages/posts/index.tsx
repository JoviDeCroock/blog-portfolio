import { useLink } from 'hoofd/preact'
import Layout from '../../components/Layout'
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
        <Layout>
          <SEO
            title={vdomDocumentProps.title}
            description={vdomDocumentProps.description}
          />
          <VdomOptimizations />
        </Layout>
      )
    },
    path: '/blog' + vdomDocumentProps.path,
  },
]
