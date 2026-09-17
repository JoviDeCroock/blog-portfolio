import Content from '../../content/posts/controlled-inputs/index.mdx'
import { documentProps } from '../../content/posts/controlled-inputs/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
