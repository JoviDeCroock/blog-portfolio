import React from 'react'
import styled from 'styled-components'

import Footer from './Footer'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 42rem;
  padding: 2.625rem 1.3125rem;
`

const Layout = ({ children }) => (
  <Wrapper>
    {children}
    <Footer />
  </Wrapper>
)

export default Layout
