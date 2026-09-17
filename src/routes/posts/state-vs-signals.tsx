import Content from '../../content/posts/state-vs-signals/index.mdx'
import { documentProps } from '../../content/posts/state-vs-signals/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
