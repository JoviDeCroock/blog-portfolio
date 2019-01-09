import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Image from 'gatsby-image'

const Wrapper = styled.div`
  display: flex;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const BioText = styled.p`
  margin: 0;
`;

const TwitterLink = styled.a``

const imageStyles = {
  marginRight: 12,
  marginBottom: 0,
  minWidth: 50,
  borderRadius: `100%`,
};

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={({
        avatar: { childImageSharp: { fixed } },
        site: { siteMetadata: { author, social } } }
      ) => (
        <Wrapper>
          <Image
            fixed={fixed}
            alt={author}
            style={imageStyles}
          />
          <BioText>
            Written by <strong>{author}</strong> who lives and works in Belgium
            building mainly in React(-native) and Node.js.
            {` `}
            <TwitterLink href={`https://twitter.com/${social.twitter}`}>
              You should follow me on Twitter
            </TwitterLink>
          </BioText>
        </Wrapper>
      )}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
