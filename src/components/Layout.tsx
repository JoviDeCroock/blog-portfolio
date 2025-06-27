import { styled } from 'goober'
import { VNode } from 'preact'
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

const FloatingDiv = styled('div')`
  position: absolute;
  left: 16px;
  top: 40px;
  @media(max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
  }
`

const FloatingTitle = styled('h3')`
  margin: 0;
`

const FloatingUnderline = styled('p')`
  margin: 0;
`

const DomHeader = styled('header')`
  display: flex;

  @media(max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const Header = () => (
  <DomHeader>
    <FloatingDiv>
      <FloatingTitle>Jovi De Croock</FloatingTitle>
      <FloatingUnderline>Software Engineer</FloatingUnderline>
    </FloatingDiv>
    <Nav>
      <a href="/">Home</a>
      <a href="/blog">Blog</a>
      <a href="/blueprint">Blueprint</a>
    </Nav>
  </DomHeader>
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
