import { styled } from 'goober'

const Wrapper = styled('footer')`
  align-items: center;
  display: flex;
  justify-content: center;
`

const FooterLink = styled('a')`
  margin: 0 6px;
`

const Footer = () => (
  <Wrapper>
    <FooterLink
      rel="nofollow"
      target="blank"
      href="https://bsky.app/profile/jovidecroock.com"
    >
      BlueSky @jovidecroock.com
    </FooterLink>
    -
    <FooterLink
      rel="nofollow"
      target="blank"
      href="https://www.github.com/jovidecroock"
    >
      Github
    </FooterLink>
    -<FooterLink href="mailto:decroockjovi@gmail.com">Contact</FooterLink>-
    <FooterLink
      rel="nofollow"
      target="blank"
      href="https://jovidecroock.com/blog"
    >
      Blog
    </FooterLink>
  </Wrapper>
)

export default Footer
