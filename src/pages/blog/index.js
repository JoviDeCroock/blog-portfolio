import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'

import Bio from '../../components/Bio'
import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import Tag from '../../components/Tag';

const linkStyles = {
  boxShadow: `none`,
  color: '#4286F4',
};

const PostTitle = styled.h3`
  margin-bottom: 0.4375rem;
  > a:hover {
    text-decoration: underline;
  }
`

const Small = styled.small`
  align-items: center;
  display: flex;
  > * {
    margin-right: 12px;

  }
`;

const CurrentFilters = styled.p`
  margin: 0;
  margin-bottom: 12px;
`

const ResetFilterText = styled.p`
  cursor: pointer;
  margin: 0;
  :hover {
    text-decoration: underline;
  }
`;

class BlogIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: 'ALL' }
    this.setSubject = this.setSubject.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  resetFilter() {
    this.setState({ filter: 'ALL' })
  }

  setSubject(subject) {
    const currentFilter = this.state.filter === 'ALL' ? [] : this.state.filter;
    if (!currentFilter.includes(subject)) {
      this.setState({ filter: [...currentFilter, subject] })
    }
  }

  render() {
    const { data } = this.props
    const { filter } = this.state;
    const siteTitle = data.site.siteMetadata.title
    let posts;
    if (filter === 'ALL') {
      posts = data.allMarkdownRemark.edges
    } else {
      posts = data.allMarkdownRemark.edges.filter((
        { node: { frontmatter: { subject } } }
      ) => filter.includes(subject));
    }
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `jovidecroock`, `jovidec`, `react`, `node`]}
        />
        <Bio />
        {filter !== 'ALL'&&
          <div>
            <CurrentFilters>Current filter: {filter.map((f) => f)}</CurrentFilters>
            <ResetFilterText onClick={this.resetFilter}>Reset Filters</ResetFilterText>
          </div>}
        {posts.map(({ node }) => {
          const { slug } = node.fields
          const { date, subject, title } = node.frontmatter
          return (
            <div key={node.fields.slug}>
              <PostTitle>
                <Link style={linkStyles} to={node.fields.slug}>
                  {title || slug}
                </Link>
              </PostTitle>
              <Small>
                <Tag subject={subject} onClick={this.setSubject} /> {date}
              </Small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

// filter: { frontmatter: { subject: { in: ["React"] } } }

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            subject
          }
        }
      }
    }
  }
`
