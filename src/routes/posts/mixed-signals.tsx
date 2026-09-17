import Content from '../../content/posts/mixed-signals/index.mdx'
import { documentProps } from '../../content/posts/mixed-signals/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
