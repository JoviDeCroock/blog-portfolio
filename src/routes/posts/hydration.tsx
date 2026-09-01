import Content from '../../content/posts/hydration/index.mdx'
import { documentProps } from '../../content/posts/hydration/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
