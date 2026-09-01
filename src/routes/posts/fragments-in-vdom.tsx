import Content from '../../content/posts/fragments-in-vdom/index.mdx'
import { documentProps } from '../../content/posts/fragments-in-vdom/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
