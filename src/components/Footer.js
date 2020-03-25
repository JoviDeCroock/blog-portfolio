import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Link = styled.a`
  color: #4286f4;
  margin-left: 6px;
  margin-right: 6px;
`

const Footer = () => (
  <Wrapper>
    <Link target="blank" href="https://www.twitter.com/jovidec">
      Twitter
    </Link>
    {' '}-{' '}
    <Link target="blank" href="https://www.github.com/jovidecroock">
      Github
    </Link>
    {' '}-{' '}
    <Link href="mailto:decroockjovi@gmail.com">Contact</Link>
    {' '}-{' '}
    <Link target="blank" href="https://dev.to/jovidecroock">
      Blog
    </Link>
  </Wrapper>
)

export default Footer
