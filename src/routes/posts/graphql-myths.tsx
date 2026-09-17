import Content from '../../content/posts/graphql-myths/index.mdx'
import { documentProps } from '../../content/posts/graphql-myths/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
