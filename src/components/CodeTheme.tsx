import { useLink } from "hoofd/preact"

const CodeTheme = () => {
  useLink({
    rel: 'preconnect',
    href: 'https://cdnjs.cloudflare.com/',
  })

  useLink({
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css',
  })

  return null
}

export default CodeTheme
