import { styled } from 'goober'
import Layout from '../components/Layout'
import { Link, Prelude, Title } from '../components/Text'
import posts from './posts'

const Block = styled('main')`
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`

const Summary = styled('div')`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

const TitleLink = styled(Link)`
  font-size: 2rem;
  text-decoration: underline;
  margin-bottom: 0.5rem;
`

export default () => (
  <Layout>
    <Title>Blog</Title>
    <Block>
      {posts.map(post => (
        <Summary>
          <TitleLink href={post.path}>{post.title}</TitleLink>
          <Prelude>{post.description}</Prelude>
        </Summary>
      ))}
    </Block>
  </Layout>
)
