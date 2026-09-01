import Content from '../../content/posts/persisted-operations/index.mdx'
import { documentProps } from '../../content/posts/persisted-operations/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
