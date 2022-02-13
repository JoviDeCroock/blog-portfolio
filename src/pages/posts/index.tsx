import Layout from '../../components/Layout'
import Ramblings, { documentProps as ramblingDocumentProps } from './vdom-compilers/index.mdx'

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
