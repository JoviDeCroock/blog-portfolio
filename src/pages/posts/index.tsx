import Layout from '../../components/Layout'
import Ramblings, { documentProps as ramblingDocumentProps } from './vdom-compilers.mdx'

export default [
  {
    ...ramblingDocumentProps,
    Component: () => (
      <Layout>
        <Ramblings />
      </Layout>
    ),
    path: '/blog' + ramblingDocumentProps.path,
  }
]
