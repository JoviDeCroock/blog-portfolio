import Content from '../../content/posts/state-models/index.mdx'
import { documentProps } from '../../content/posts/state-models/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
