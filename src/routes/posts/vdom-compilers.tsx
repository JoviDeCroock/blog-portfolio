import Content from '../../content/posts/vdom-compilers/index.mdx'
import { documentProps } from '../../content/posts/vdom-compilers/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
