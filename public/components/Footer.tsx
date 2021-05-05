import { styled } from 'goober'
import { Link } from './Link'

const Wrapper = styled('footer')`
  align-items: center;
  display: flex;
  justify-content: center;
`

const FooterLink = styled(Link)`
  margin: 0 6px;
`;

const Footer = () => (
  <Wrapper>
    <FooterLink target="blank" href="https://www.twitter.com/jovidec">
      Twitter
    </FooterLink>
    -
    <FooterLink target="blank" href="https://www.github.com/jovidecroock">
      Github
    </FooterLink>
    -
    <FooterLink href="mailto:decroockjovi@gmail.com">Contact</FooterLink>
    -
    <FooterLink target="blank" href="https://dev.to/jovidecroock">
      Blog
    </FooterLink>
  </Wrapper>
)

export default Footer
