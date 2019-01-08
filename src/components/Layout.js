import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

import Header from './Header';
import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    console.log(this.props);
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    return (
      <StaticQuery
        query={pageQuery}
        render={({ site: { siteMetadata } }) => (
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <Header {...siteMetadata} />
            {children}
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </div>
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
