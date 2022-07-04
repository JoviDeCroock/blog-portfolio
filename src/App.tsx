import { h } from 'preact'
import { setup } from 'goober'
import { createGlobalStyles } from 'goober/global'
import { Router, Route } from 'preact-iso'
import Layout from './components/Layout'

import Home from './pages/Home'
import Blog from './pages/Blog'
import NotFound from './pages/404'

// Posts
import VDom from './pages/posts/vdom-compilers/index.mdx'
import Inputs from './pages/posts/controlled-inputs/index.mdx'
import Suspense from './pages/posts/suspense-data-ssr/index.mdx'
import State from './pages/posts/state-outside-vdom/index.mdx'
import Hydration from './pages/posts/hydration/index.mdx'

const GlobalStyles = createGlobalStyles`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  blockquote {
    display: flex;
    text-align: center;
    border-left: 1px solid grey;
    margin-left: 24px;
    padding-left: 12px;
  }

  html, body {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Inter', sans-serif, system-ui;
    line-height: 1.5;
  }

  pre, code {
    font-family: 'Fira Code', monospace;
  }

  h1 {
    font-weight: 500;
    font-size: 3rem;
    margin-bottom: 0.5em;
    line-height: 1;
  }

  h2 {
    font-weight: 500;
    font-size: 2.5rem;
    margin-bottom: 0.5em;
  }

  p, a, li {
    font-size: 1rem;
  }
`

setup(h)

export function App() {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Router>
          <Route component={Home} path="/" />
          <Route component={Blog} path="/blog" />
          <Route component={VDom} path="/blog/vdom-compilers" />
          <Route component={Inputs} path="/blog/controlled-inputs" />
          <Route component={Suspense} path="/blog/suspense-data-ssr" />
          <Route component={State} path="/blog/state-in-vdom" />
          <Route component={Hydration} path="/blog/hydration-and-preact" />
          <Route component={NotFound} default />
        </Router>
      </Layout>
    </>
  )
}
