import Content from '../../content/posts/tracking-context/index.mdx'
import { documentProps } from '../../content/posts/tracking-context/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
