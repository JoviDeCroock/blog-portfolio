import Content from '../../content/posts/resumed-hydration-preact/index.mdx'
import { documentProps } from '../../content/posts/resumed-hydration-preact/documentProps'
import { postHead } from '../../lib/seo'

export function head() {
  return postHead(documentProps, { code: false })
}

export default Content
