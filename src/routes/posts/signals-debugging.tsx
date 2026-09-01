import Content from '../../content/posts/signals-debugging/index.mdx'
import { documentProps } from '../../content/posts/signals-debugging/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
