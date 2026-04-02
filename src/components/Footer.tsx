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
      target="_blank"
      href="https://bsky.app/profile/jovidecroock.com"
    >
      BlueSky
    </FooterLink>
    -
    <FooterLink rel="nofollow" target="_blank" href="https://x.com/jovidec">
      Twitter
    </FooterLink>
    -
    <FooterLink
      rel="nofollow"
      target="_blank"
      href="https://www.github.com/jovidecroock"
    >
      Github
    </FooterLink>
    -<FooterLink href="mailto:decroockjovi@gmail.com">Contact</FooterLink>-
    <FooterLink href="/blog">Blog</FooterLink>
  </Wrapper>
)

export default Footer
