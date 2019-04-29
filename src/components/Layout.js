import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import Header from './Header'
import Footer from './Footer'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 42rem;
  padding: 2.625rem 1.3125rem;
`;

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <StaticQuery
        query={pageQuery}
        render={({ site: { siteMetadata } }) => (
          <Wrapper>
            <Header {...siteMetadata} />
            {children}
            <Footer />
          </Wrapper>
        )}
      />
    )
  }
}

export default Layout

const pageQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
      }
    }
  }
`;
