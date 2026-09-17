import Content from '../../content/posts/mind-graphql/index.mdx'
import { documentProps } from '../../content/posts/mind-graphql/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps, { code: false })
}

export default Content
