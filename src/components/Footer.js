import React from 'react'
import styled from 'styled-components'
import { Link } from '../pages';

const Wrapper = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Footer = () => (
  <Wrapper>
    <Link target="blank" href="https://www.twitter.com/jovidec">
      Twitter
    </Link>
    &nbsp;-&nbsp;
    <Link target="blank" href="https://www.github.com/jovidecroock">
      Github
    </Link>
    &nbsp;-&nbsp;
    <Link href="mailto:decroockjovi@gmail.com">Contact</Link>
    &nbsp;-&nbsp;
    <Link target="blank" href="https://dev.to/jovidecroock">
      Blog
    </Link>
  </Wrapper>
)

export default Footer
