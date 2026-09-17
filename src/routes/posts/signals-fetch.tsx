import Content from '../../content/posts/signals-fetch/index.mdx'
import { documentProps } from '../../content/posts/signals-fetch/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
