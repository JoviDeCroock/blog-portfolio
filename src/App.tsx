import { h } from 'preact'
import { setup } from 'goober'
import { Router, Route, lazy, ErrorBoundary } from 'preact-iso'
import Layout from './components/Layout'

const NotFound = lazy(() => import('./pages/404'))
const Blog = lazy(() => import('./pages/Blog'))
const Home = lazy(() => import('./pages/Home'))

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
const OperationalGraphQL = lazy(
  () => import('./pages/posts/operational-graphql/index.mdx')
)
const GraphQLAbstractTypes = lazy(
  () => import('./pages/posts/graphql-abstract-types/index.mdx')
)
const UnreliableVendors = lazy(
  () => import('./pages/posts/unreliable-vendors/index.mdx')
)

setup(h)

export function App() {
  return (
    <>
      <Layout>
        <ErrorBoundary>
          <div>
            <Router>
              <Route component={Home} path="/" />
              <Route component={Blog} path="/blog" />
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
                component={OperationalGraphQL}
                path="/blog/operational-graphql"
              />
              <Route
                component={GraphQLAbstractTypes}
                path="/blog/graphql-abstract-types"
              />
              <Route
                component={UnreliableVendors}
                path="/blog/unreliable-vendors"
              />
              <Route component={NotFound} default />
            </Router>
          </div>
        </ErrorBoundary>
      </Layout>
    </>
  )
}
