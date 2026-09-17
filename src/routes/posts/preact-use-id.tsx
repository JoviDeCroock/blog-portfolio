import Content from '../../content/posts/preact-use-id/index.mdx'
import { documentProps } from '../../content/posts/preact-use-id/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps, { code: false })
}

export default Content
