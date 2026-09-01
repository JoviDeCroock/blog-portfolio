import Content from '../../content/posts/platform/index.mdx'
import { documentProps } from '../../content/posts/platform/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
