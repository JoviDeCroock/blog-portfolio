import Content from '../../content/posts/fed-up-with-belgium/index.mdx'
import { documentProps } from '../../content/posts/fed-up-with-belgium/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps, { code: false })
}

export default Content
