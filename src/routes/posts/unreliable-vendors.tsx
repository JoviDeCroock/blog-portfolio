import Content from '../../content/posts/unreliable-vendors/index.mdx'
import { documentProps } from '../../content/posts/unreliable-vendors/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps, { code: false })
}

export default Content
