import Content from '../../content/posts/gittifacts/index.mdx'
import { documentProps } from '../../content/posts/gittifacts/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
