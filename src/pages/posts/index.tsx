import { useLink } from 'hoofd/preact'
import Layout from '../../components/Layout'
import Ramblings, {
  documentProps as ramblingDocumentProps,
} from './vdom-compilers/index.mdx'

export default [
  {
    ...ramblingDocumentProps,
    Component: () => {
      useLink({
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'
      })
      return (
        <Layout>
          <Ramblings />
        </Layout>
      )
    },
    path: '/blog' + ramblingDocumentProps.path,
  },
]
