import { styled } from 'goober'
import SEO from '../components/Seo'

import { documentProps as VDomDocumentProps } from './posts/vdom-compilers/documentProps'
import { documentProps as inputsDocumentProps } from './posts/controlled-inputs/documentProps'
import { documentProps as ssrDocumentProps } from './posts/suspense-data-ssr/documentProps'
import { documentProps as stateDocumentProps } from './posts/state-in-vdom/documentProps'
import { documentProps as hydrationDocumentProps } from './posts/hydration/documentProps'
import { documentProps as timingsDocumentProps } from './posts/browser-timings/documentProps'
import { documentProps as useIdDocumentProps } from './posts/preact-use-id/documentProps'
import { documentProps as persistedOperationDocumentProps } from './posts/persisted-operations/documentProps'
import { documentProps as graphqlWorkflowDocumentProps } from './posts/graphql-development-workflow/documentProps'
import { documentProps as abstractTypesDocumentProps } from './posts/graphql-abstract-types/documentProps'
import { documentProps as unreliableVendorsDocumentProps } from './posts/unreliable-vendors/documentProps'

interface Post {
  title: string,
  description: string,
  image: string,
  path: string,
  tags: Array<keyof typeof tagBgs>,
  external?: boolean,
}

const posts: Array<Post> = [
  {
    title: 'Preact X, a story of stability',
    description: `Preact X has been released for five years, let's go over all the exciting things that have happened.`,
    image: 'https://www.jovidecroock.com/preact-x.png',
    path: 'https://preactjs.com/blog/preact-x',
    tags: ['external', 'thinking'],
    external: true
  },
  unreliableVendorsDocumentProps,
  abstractTypesDocumentProps,
  graphqlWorkflowDocumentProps,
  persistedOperationDocumentProps,
  useIdDocumentProps,
  timingsDocumentProps,
  hydrationDocumentProps,
  stateDocumentProps,
  ssrDocumentProps,
  inputsDocumentProps,
  VDomDocumentProps,
]

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

const TitleLink = styled('a')`
  font-size: 2.5rem;
  text-decoration: underline;
  font-weight: 500;
`

const Tag = styled<{ background: string }>('span')`
  border-radius: 10px;
  background: ${(x) => x.background};
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 8px;
`

const SubjectSummary = styled('div')`
  display: flex;
  & > span:not(:last-child) {
    margin-right: 8px;
  }
`

const tagBgs: Record<string, string> = {
  security: '#d6e1c2',
  performance: '#0080bb',
  graphql: '#E10098',
  'engineering': '#302221',
  'front-end': '#7842f5',
  vdom: '#6ff542',
  state: '#f5427e',
  suspense: '#f54242',
  thinking: '#f59c42',
  external: '#4c01fe',
  'server-side-rendering': "#07a8f8",
} as const

export default () => (
  <main>
    <SEO title="Blog" description="Posts about my work and thoughts." />
    <h1>Blog</h1>
    <p>
      My thoughts in a semi-raw form, a lot of these posts contain what goes
      around in my mind throughout a day.
    </p>
    <Block>
      {posts.map((post) => (
        <Summary>
          <TitleLink target={post.external ? "blank" : undefined} href={post.path}>{post.title}</TitleLink>
          <p>{post.description}</p>
          <SubjectSummary>
            {post.tags.map((tag) => (
              <Tag background={tagBgs[tag]} key={tag}>
                {tag}
              </Tag>
            ))}
          </SubjectSummary>
        </Summary>
      ))}
    </Block>
  </main>
)
