import Content from '../../content/posts/suspense-data-ssr/index.mdx'
import { documentProps } from '../../content/posts/suspense-data-ssr/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
