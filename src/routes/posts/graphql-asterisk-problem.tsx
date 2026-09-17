import Content from '../../content/posts/graphql-asterisk-problem/index.mdx'
import { documentProps } from '../../content/posts/graphql-asterisk-problem/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps, { code: false })
}

export default Content
