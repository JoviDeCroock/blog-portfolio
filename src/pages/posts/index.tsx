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
  documentProps as suspenseDataDocumentProps,
} from './suspense-data-ssr/index.mdx'
import State, {
  // @ts-ignore
  documentProps as stateDocumentProps,
} from './state-outside-vdom/index.mdx'
import Hydration, {
  // @ts-ignore
  documentProps as hydrationDocumentProps,
} from './hydration/index.mdx'

export default [
  {
    ...hydrationDocumentProps,
    Component: () => {
      useLink({
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'
      })

      return (
        <>
          <SEO
            title={hydrationDocumentProps.title}
            description={hydrationDocumentProps.description}
          />
          <Hydration />
        </>
      )
    },
    path: '/blog' + hydrationDocumentProps.path,
  },
  {
    ...stateDocumentProps,
    Component: () => {
      useLink({
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'
      })

      return (
        <>
          <SEO
            title={stateDocumentProps.title}
            description={stateDocumentProps.description}
          />
          <State />
        </>
      )
    },
    path: '/blog' + stateDocumentProps.path,
  },
  {
    ...suspenseDataDocumentProps,
    Component: () => {
      useLink({
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'
      })

      return (
        <>
          <SEO
            title={suspenseDataDocumentProps.title}
            description={suspenseDataDocumentProps.description}
          />
          <SSR />
        </>
      )
    },
    path: '/blog' + suspenseDataDocumentProps.path,
  },
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
