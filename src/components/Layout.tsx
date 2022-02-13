import { styled } from 'goober'
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
  padding: 2.625rem 1.3125rem;
  max-width: 10rem;
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

const Layout = ({ children }) => (
  <Wrapper>
    <Header />
    {children}
    <Footer />
  </Wrapper>
)

export default Layout
