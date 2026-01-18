import { h } from 'preact'
import { setup } from 'goober'
import { Router, Route, lazy, ErrorBoundary } from 'preact-iso'
import Layout from './components/Layout'

setup(h)

// Pages
const NotFound = lazy(() => import('./pages/404'))
const Blog = lazy(() => import('./pages/Blog'))
const Home = lazy(() => import('./pages/Home'))
const Blueprint = lazy(() => import('./pages/Blueprint'))

// Posts
const VDom = lazy(() => import('./pages/posts/vdom-compilers/index.mdx'))
const Inputs = lazy(() => import('./pages/posts/controlled-inputs/index.mdx'))
const Suspense = lazy(() => import('./pages/posts/suspense-data-ssr/index.mdx'))
const State = lazy(() => import('./pages/posts/state-in-vdom/index.mdx'))
const Hydration = lazy(() => import('./pages/posts/hydration/index.mdx'))
const Timings = lazy(() => import('./pages/posts/browser-timings/index.mdx'))
const UseId = lazy(() => import('./pages/posts/preact-use-id/index.mdx'))
const PersistedOperations = lazy(
  () => import('./pages/posts/persisted-operations/index.mdx')
)
const GraphQLDevelopmentWorkflow = lazy(
  () => import('./pages/posts/graphql-development-workflow/index.mdx')
)
const GraphQLAbstractTypes = lazy(
  () => import('./pages/posts/graphql-abstract-types/index.mdx')
)
const UnreliableVendors = lazy(
  () => import('./pages/posts/unreliable-vendors/index.mdx')
)
const GraphQLMissingFeature = lazy(
  () => import('./pages/posts/document-authoring-missing-feature/index.mdx')
)
const FragmentsInVDOM = lazy(
  () => import('./pages/posts/fragments-in-vdom/index.mdx')
)
const Signals = lazy(() => import('./pages/posts/signals/index.mdx'))
const SignalsDebugging = lazy(
  () => import('./pages/posts/signals-debugging/index.mdx')
)
const SkewBasedDiff = lazy(
  () => import('./pages/posts/skew-based-diff/index.mdx')
)
const TrackingContext = lazy(
  () => import('./pages/posts/tracking-context/index.mdx')
)
const GraphQLAsteriskProblem = lazy(
  () => import('./pages/posts/graphql-asterisk-problem/index.mdx')
)
const StateModels = lazy(() => import('./pages/posts/state-models/index.mdx'))
const SurgicalRendering = lazy(
  () => import('./pages/posts/signals-fetch/index.mdx')
)
const GraphQLMyths = lazy(() => import('./pages/posts/graphql-myths/index.mdx'))
const StateVsSignals = lazy(
  () => import('./pages/posts/state-vs-signals/index.mdx')
)
const Platform = lazy(() => import('./pages/posts/platform/index.mdx'))

export function App() {
  return (
    <Layout>
      <ErrorBoundary>
        <div>
          <Router>
            <Route component={Home} path="/" />
            <Route component={Blog} path="/blog" />
            <Route component={Blueprint} path="/blueprint" />
            <Route component={VDom} path="/blog/vdom-compilers" />
            <Route component={Inputs} path="/blog/controlled-inputs" />
            <Route component={Suspense} path="/blog/suspense-data-ssr" />
            <Route component={State} path="/blog/state-in-vdom" />
            <Route component={Hydration} path="/blog/hydration-and-preact" />
            <Route component={Timings} path="/blog/browser-timings" />
            <Route component={UseId} path="/blog/preact-use-id" />
            <Route
              component={PersistedOperations}
              path="/blog/persisted-operations"
            />
            <Route
              component={GraphQLDevelopmentWorkflow}
              path="/blog/graphql-development-workflow"
            />
            <Route
              component={GraphQLAbstractTypes}
              path="/blog/graphql-abstract-types"
            />
            <Route
              component={UnreliableVendors}
              path="/blog/unreliable-vendors"
            />
            <Route
              component={GraphQLMissingFeature}
              path="/blog/graphqls-missing-feature"
            />
            <Route component={FragmentsInVDOM} path="/blog/fragments-in-vdom" />
            <Route component={Signals} path="/blog/signals" />
            <Route
              component={SignalsDebugging}
              path="/blog/signals-debugging"
            />
            <Route component={SkewBasedDiff} path="/blog/skew-based-diffing" />
            <Route component={TrackingContext} path="/blog/tracking-context" />
            <Route
              component={GraphQLAsteriskProblem}
              path="/blog/graphql-asterisk-problem"
            />
            <Route component={StateModels} path="/blog/state-models" />
            <Route
              component={SurgicalRendering}
              path="/blog/surgical-rendering"
            />
            <Route component={GraphQLMyths} path="/blog/graphql-myths" />
            <Route component={StateVsSignals} path="/blog/state-vs-signals" />
            <Route component={Platform} path="/blog/platform" />
            <Route component={NotFound} default />
          </Router>
        </div>
      </ErrorBoundary>
    </Layout>
  )
}
