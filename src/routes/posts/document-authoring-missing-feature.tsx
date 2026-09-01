import Content from '../../content/posts/document-authoring-missing-feature/index.mdx'
import { documentProps } from '../../content/posts/document-authoring-missing-feature/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps)
}

export default Content
