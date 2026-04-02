import { styled } from 'goober'
import { VNode } from 'preact'
import { useLocation } from 'preact-iso'
import Footer from './Footer'

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
  font-weight: 500;
  margin-bottom: 1rem;
  @media(max-width: 768px) {
    margin-right: unset;
    margin-left: unset;
    margin-top: 1rem;
  }
`

const NavLink = styled('a')`
  position: relative;
  text-decoration: none;
  color: #A1A1AA;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #EB29A9, #6366f1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #FCFCFD;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`

const ActiveNavLink = styled(NavLink)`
  color: #FCFCFD;
  &::after {
    transform: scaleX(1);
  }
`

const FloatingDiv = styled('div')`
  position: absolute;
  left: 16px;
  top: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  @media(max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
  }
`

const Avatar = styled('img')`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2D2C2C;
  flex-shrink: 0;
`

const FloatingTitle = styled('h3')`
  margin: 0;
`

const FloatingUnderline = styled('p')`
  margin: 0;
  color: #A1A1AA;
  font-size: 0.875rem;
`

const DomHeader = styled('header')`
  display: flex;

  @media(max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const Header = () => {
  const { path } = useLocation()

  return (
    <DomHeader>
      <FloatingDiv>
        <Avatar src="/me.jpg" alt="Jovi De Croock" />
        <div>
          <FloatingTitle>Jovi De Croock</FloatingTitle>
          <FloatingUnderline>Software Engineer</FloatingUnderline>
        </div>
      </FloatingDiv>
      <Nav>
        {path === '/' ? (
          <ActiveNavLink href="/">Home</ActiveNavLink>
        ) : (
          <NavLink href="/">Home</NavLink>
        )}
        {path.startsWith('/blog') ? (
          <ActiveNavLink href="/blog">Blog</ActiveNavLink>
        ) : (
          <NavLink href="/blog">Blog</NavLink>
        )}
        {path === '/blueprint' ? (
          <ActiveNavLink href="/blueprint">Blueprint</ActiveNavLink>
        ) : (
          <NavLink href="/blueprint">Blueprint</NavLink>
        )}
      </Nav>
    </DomHeader>
  )
}

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
