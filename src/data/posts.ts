// Post registry. Kept free of JSX so build-time consumers (RSS, sitemap,
// the route manifest) can import it from the Vite config without pulling
// a component graph in.

import { documentProps as referentialStabilityTypesDocumentProps } from '../pages/posts/referential-stability-types/documentProps'
import { documentProps as llmSignalsDebuggingDocumentProps } from '../pages/posts/llm-signals-debugging/documentProps'
import { documentProps as VDomDocumentProps } from '../pages/posts/vdom-compilers/documentProps'
import { documentProps as inputsDocumentProps } from '../pages/posts/controlled-inputs/documentProps'
import { documentProps as ssrDocumentProps } from '../pages/posts/suspense-data-ssr/documentProps'
import { documentProps as stateDocumentProps } from '../pages/posts/state-in-vdom/documentProps'
import { documentProps as hydrationDocumentProps } from '../pages/posts/hydration/documentProps'
import { documentProps as resumedHydrationPreactDocumentProps } from '../pages/posts/resumed-hydration-preact/documentProps'
import { documentProps as timingsDocumentProps } from '../pages/posts/browser-timings/documentProps'
import { documentProps as useIdDocumentProps } from '../pages/posts/preact-use-id/documentProps'
import { documentProps as persistedOperationDocumentProps } from '../pages/posts/persisted-operations/documentProps'
import { documentProps as graphqlWorkflowDocumentProps } from '../pages/posts/graphql-development-workflow/documentProps'
import { documentProps as abstractTypesDocumentProps } from '../pages/posts/graphql-abstract-types/documentProps'
import { documentProps as unreliableVendorsDocumentProps } from '../pages/posts/unreliable-vendors/documentProps'
import { documentProps as graphqlsMissingFeatureDocumentProps } from '../pages/posts/document-authoring-missing-feature/documentProps'
import { documentProps as fragmentVdomDocumentProps } from '../pages/posts/fragments-in-vdom/documentProps'
import { documentProps as signalsDocumentProps } from '../pages/posts/signals/documentProps'
import { documentProps as signalsDebuggingDocumentProps } from '../pages/posts/signals-debugging/documentProps'
import { documentProps as skewDocumentProps } from '../pages/posts/skew-based-diff/documentProps'
import { documentProps as trackingContextDocumentProps } from '../pages/posts/tracking-context/documentProps'
import { documentProps as graphqlAsteriskProblemDocumentProps } from '../pages/posts/graphql-asterisk-problem/documentProps'
import { documentProps as stateModelsDocumentProps } from '../pages/posts/state-models/documentProps'
import { documentProps as surgicalRenderingDocumentProps } from '../pages/posts/signals-fetch/documentProps'
import { documentProps as graphqlMythsDocumentProps } from '../pages/posts/graphql-myths/documentProps'
import { documentProps as stateVsSignalsDocumentProps } from '../pages/posts/state-vs-signals/documentProps'
import { documentProps as platformDocumentProps } from '../pages/posts/platform/documentProps'
import { documentProps as whyComputedsMatterDocumentProps } from '../pages/posts/why-computeds-matter/documentProps'
import { documentProps as effectSubscriptionsDocumentProps } from '../pages/posts/effect-subscriptions/documentProps'
import { documentProps as graphqlRestTRPCLLMsDocumentProps } from '../pages/posts/mind-graphql/documentProps'
import { documentProps as mixedSignalsDocumentProps } from '../pages/posts/mixed-signals/documentProps'
import { documentProps as secureNpmPublishingDocumentProps } from '../pages/posts/secure-npm-publishing/documentProps'
import { documentProps as drydockReleaseDefensesDocumentProps } from '../pages/posts/drydock-release-defenses/documentProps'
import { documentProps as fedUpWithBelgiumDocumentProps } from '../pages/posts/fed-up-with-belgium/documentProps'

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
