import { useLink } from 'hoofd/preact'
import SEO from '../../components/Seo'
import VdomOptimizations, {
  // @ts-ignore
  documentProps as vdomDocumentProps,
} from './vdom-compilers/index.mdx'
import ControlledInputs, {
  // @ts-ignore
  documentProps as inputsDocumentProps,
} from './controlled-inputs/index.mdx'
import SSR, {
  // @ts-ignore
  documentProps as ssrsDocumentProps,
} from './ssr-and-data/index.mdx'

export default [
  // {
  //   ...ssrsDocumentProps,
  //   Component: () => {
  //     useLink({
  //       rel: 'stylesheet',
  //       href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'
  //     })

  //     return (
  //       <>
  //         <SEO
  //           title={ssrsDocumentProps.title}
  //           description={ssrsDocumentProps.description}
  //         />
  //         <SSR />
  //       </>
  //     )
  //   },
  //   path: '/blog' + ssrsDocumentProps.path,
  // },
  {
    ...inputsDocumentProps,
    Component: () => {
      useLink({
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'
      })

      return (
        <>
          <SEO
            title={inputsDocumentProps.title}
            description={inputsDocumentProps.description}
          />
          <ControlledInputs />
        </>
      )
    },
    path: '/blog' + inputsDocumentProps.path,
  },
  {
    ...vdomDocumentProps,
    Component: () => {
      useLink({
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'
      })

      return (
        <>
          <SEO
            title={vdomDocumentProps.title}
            description={vdomDocumentProps.description}
          />
          <VdomOptimizations />
        </>
      )
    },
    path: '/blog' + vdomDocumentProps.path,
  },
]
