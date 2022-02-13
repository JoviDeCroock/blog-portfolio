import Layout from '../../components/Layout'
import Ramblings, { documentProps as ramblingDocumentProps } from './rambs.mdx'

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
