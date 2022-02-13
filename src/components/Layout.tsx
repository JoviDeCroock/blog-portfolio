import { styled } from 'goober'
import { VNode } from 'preact'
import Footer from './Footer'
import { Link } from './Text'

const Wrapper = styled('div')`
  margin-left: auto;
  margin-right: auto;
  max-width: 42rem;
  padding: 2.625rem 1.3125rem;
`

const Nav = styled('nav')`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  max-width: 10rem;
  border-bottom: 1px solid black;
`

const Header = () => (
  <Nav>
    <Link href="/">
      Home
    </Link>
    <Link href="/blog">
      Blog
    </Link>
  </Nav>
)

export type LayoutProps = {
  children?: VNode;
}

const Layout = (props: LayoutProps) => (
  <Wrapper>
    <Header />
    {props.children}
    <Footer />
  </Wrapper>
)

export default Layout
