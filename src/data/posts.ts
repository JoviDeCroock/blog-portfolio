// Post registry. Kept free of JSX so build-time consumers (RSS, sitemap,
// the route manifest) can import it from the Vite config without pulling
// a component graph in.

import { documentProps as referentialStabilityTypesDocumentProps } from '../content/posts/referential-stability-types/documentProps'
import { documentProps as llmSignalsDebuggingDocumentProps } from '../content/posts/llm-signals-debugging/documentProps'
import { documentProps as VDomDocumentProps } from '../content/posts/vdom-compilers/documentProps'
import { documentProps as inputsDocumentProps } from '../content/posts/controlled-inputs/documentProps'
import { documentProps as ssrDocumentProps } from '../content/posts/suspense-data-ssr/documentProps'
import { documentProps as stateDocumentProps } from '../content/posts/state-in-vdom/documentProps'
import { documentProps as hydrationDocumentProps } from '../content/posts/hydration/documentProps'
import { documentProps as resumedHydrationPreactDocumentProps } from '../content/posts/resumed-hydration-preact/documentProps'
import { documentProps as timingsDocumentProps } from '../content/posts/browser-timings/documentProps'
import { documentProps as useIdDocumentProps } from '../content/posts/preact-use-id/documentProps'
import { documentProps as persistedOperationDocumentProps } from '../content/posts/persisted-operations/documentProps'
import { documentProps as graphqlWorkflowDocumentProps } from '../content/posts/graphql-development-workflow/documentProps'
import { documentProps as abstractTypesDocumentProps } from '../content/posts/graphql-abstract-types/documentProps'
import { documentProps as unreliableVendorsDocumentProps } from '../content/posts/unreliable-vendors/documentProps'
import { documentProps as graphqlsMissingFeatureDocumentProps } from '../content/posts/document-authoring-missing-feature/documentProps'
import { documentProps as fragmentVdomDocumentProps } from '../content/posts/fragments-in-vdom/documentProps'
import { documentProps as signalsDocumentProps } from '../content/posts/signals/documentProps'
import { documentProps as signalsDebuggingDocumentProps } from '../content/posts/signals-debugging/documentProps'
import { documentProps as skewDocumentProps } from '../content/posts/skew-based-diff/documentProps'
import { documentProps as trackingContextDocumentProps } from '../content/posts/tracking-context/documentProps'
import { documentProps as graphqlAsteriskProblemDocumentProps } from '../content/posts/graphql-asterisk-problem/documentProps'
import { documentProps as stateModelsDocumentProps } from '../content/posts/state-models/documentProps'
import { documentProps as surgicalRenderingDocumentProps } from '../content/posts/signals-fetch/documentProps'
import { documentProps as graphqlMythsDocumentProps } from '../content/posts/graphql-myths/documentProps'
import { documentProps as stateVsSignalsDocumentProps } from '../content/posts/state-vs-signals/documentProps'
import { documentProps as platformDocumentProps } from '../content/posts/platform/documentProps'
import { documentProps as whyComputedsMatterDocumentProps } from '../content/posts/why-computeds-matter/documentProps'
import { documentProps as effectSubscriptionsDocumentProps } from '../content/posts/effect-subscriptions/documentProps'
import { documentProps as graphqlRestTRPCLLMsDocumentProps } from '../content/posts/mind-graphql/documentProps'
import { documentProps as mixedSignalsDocumentProps } from '../content/posts/mixed-signals/documentProps'
import { documentProps as secureNpmPublishingDocumentProps } from '../content/posts/secure-npm-publishing/documentProps'
import { documentProps as drydockReleaseDefensesDocumentProps } from '../content/posts/drydock-release-defenses/documentProps'
import { documentProps as fedUpWithBelgiumDocumentProps } from '../content/posts/fed-up-with-belgium/documentProps'

export interface Post {
  title: string
  description: string
  image: string
  path: string
  tags: Array<keyof typeof tagBgs>
  external?: boolean
  createdAt?: string
}

export const posts: Array<Post> = [
  referentialStabilityTypesDocumentProps,
  resumedHydrationPreactDocumentProps,
  fedUpWithBelgiumDocumentProps,
  drydockReleaseDefensesDocumentProps,
  secureNpmPublishingDocumentProps,
  mixedSignalsDocumentProps,
  graphqlRestTRPCLLMsDocumentProps,
  llmSignalsDebuggingDocumentProps,
  effectSubscriptionsDocumentProps,
  whyComputedsMatterDocumentProps,
  signalsDebuggingDocumentProps,
  platformDocumentProps,
  stateVsSignalsDocumentProps,
  graphqlMythsDocumentProps,
  surgicalRenderingDocumentProps,
  stateModelsDocumentProps,
  graphqlAsteriskProblemDocumentProps,
  trackingContextDocumentProps,
  skewDocumentProps,
  signalsDocumentProps,
  fragmentVdomDocumentProps,
  graphqlsMissingFeatureDocumentProps,
  {
    title: 'Preact X, a story of stability',
    description: `Preact X has been released for five years, let's go over all the exciting things that have happened.`,
    image: 'https://www.jovidecroock.com/preact-x.png',
    path: 'https://preactjs.com/blog/preact-x',
    tags: ['external', 'thinking'],
    external: true,
  },
  unreliableVendorsDocumentProps,
  abstractTypesDocumentProps,
  graphqlWorkflowDocumentProps,
  persistedOperationDocumentProps,
  useIdDocumentProps,
  timingsDocumentProps,
  hydrationDocumentProps,
  stateDocumentProps,
  ssrDocumentProps,
  inputsDocumentProps,
  VDomDocumentProps,
]

export const tagBgs: Record<string, string> = {
  performance: '#0284c7', // sky blue
  graphql: '#e10098', // GraphQL pink (brand)
  engineering: '#16a34a', // green (was near-black, now legible)
  'front-end': '#7c3aed', // violet
  vdom: '#0d9488', // teal (was harsh lime)
  state: '#db2777', // pink
  suspense: '#dc2626', // red
  thinking: '#d97706', // amber
  external: '#4f46e5', // indigo
  'server-side-rendering': '#0891b2', // cyan
  'open-source': '#ea580c', // orange
  rest: '#059669', // emerald
  trpc: '#7e22ce', // purple
  llm: '#be185d', // rose
  signals: '#c2410c', // burnt orange
  web: '#1d4ed8', // blue
  security: '#334155',
  personal: '#a21caf', // fuchsia
} as const

/** Route id for a post, derived from its public path. */
export const postRouteId = (path: string) => path.replace(/^\/blog\//, '')
