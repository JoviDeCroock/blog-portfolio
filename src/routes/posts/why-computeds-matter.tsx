import Content from '../../content/posts/why-computeds-matter/index.mdx'
import { documentProps } from '../../content/posts/why-computeds-matter/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
