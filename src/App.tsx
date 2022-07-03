import { h } from 'preact'
import { setup } from 'goober'
import { createGlobalStyles } from 'goober/global'
import { Router } from 'preact-iso'
import Home from './pages/Home'
import Blog from './pages/Blog'
import posts from './pages/posts'
import NotFound from './pages/404'
import Layout from './components/Layout'

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
          <Home path="/" />
          <Blog path="/blog" />
          {posts.map((post) => (
            <post.Component path={post.path} />
          ))}
          <NotFound default />
        </Router>
      </Layout>
    </>
  )
}
