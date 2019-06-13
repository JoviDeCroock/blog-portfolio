import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

const NotFoundPage = ({ data: { site: { siteMetadata: { title: siteTitle } } }, location }) => (
  <Layout location={location} title={siteTitle}>
    <SEO title="404: Not Found" />
    <h1>Not Found</h1>
    <p>Ah you were sniffing around to see if I had hidden any easter eggs, did you now?</p>
  </Layout>
)

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
