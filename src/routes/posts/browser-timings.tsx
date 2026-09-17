import Content from '../../content/posts/browser-timings/index.mdx'
import { documentProps } from '../../content/posts/browser-timings/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
