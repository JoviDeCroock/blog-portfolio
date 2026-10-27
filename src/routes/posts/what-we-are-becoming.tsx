import Content from '../../content/posts/what-we-are-becoming/index.mdx'
import { documentProps } from '../../content/posts/what-we-are-becoming/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
