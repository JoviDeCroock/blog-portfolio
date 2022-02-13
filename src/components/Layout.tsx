import { styled } from 'goober'
import { VNode } from 'preact'
import Footer from './Footer'
import { Link } from './Text'

const Wrapper = styled('div')`
  margin-left: auto;
  margin-right: auto;
  max-width: 42rem;
  padding: 2rem 1.3125rem;

  /* Sticky footer */
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Main = styled('main')`
  /* Sticky footer */
  flex: 1;
`

const Nav = styled('nav')`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 0.5rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Header = () => (
  <header>
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
    </Nav>
  </header>
)

export type LayoutProps = {
  children?: VNode
}

const Layout = (props: LayoutProps) => (
  <Wrapper>
    <Header />
    <Main>{props.children}</Main>
    <Footer />
  </Wrapper>
)

export default Layout
