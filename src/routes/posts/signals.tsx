import Content from '../../content/posts/signals/index.mdx'
import { documentProps } from '../../content/posts/signals/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
