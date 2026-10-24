import Content from '../../content/posts/typescript-7-content-mappers/index.mdx'
import { documentProps } from '../../content/posts/typescript-7-content-mappers/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
