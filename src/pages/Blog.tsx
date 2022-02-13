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
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
`

const TitleLink = styled(Link)`
  font-size: 2.5rem;
  text-decoration: underline;
  font-weight: bold;
`

export default () => (
  <Layout>
    <Title>Blog</Title>
    <Prelude>
      My thoughts in a semi-raw form, a lot of these posts contain what goes around
      in my mind throughout a day.
    </Prelude>
    <Block>
      {posts.map((post) => (
        <Summary>
          <TitleLink href={post.path}>{post.title}</TitleLink>
          <Prelude>{post.description}</Prelude>
        </Summary>
      ))}
    </Block>
  </Layout>
)
