import { styled } from 'goober'
import { Fragment } from 'preact'
import SEO from '../components/Seo'
import { Link, Prelude, Title } from '../components/Text'

import { documentProps as VDomDocumentProps } from './posts/vdom-compilers/documentProps'
import { documentProps as inputsDocumentProps } from './posts/controlled-inputs/documentProps'
import { documentProps as ssrDocumentProps } from './posts/suspense-data-ssr/documentProps'
import { documentProps as stateDocumentProps } from './posts/state-in-vdom/documentProps'
import { documentProps as hydrationDocumentProps } from './posts/hydration/documentProps'
import { documentProps as timingsDocumentProps } from './posts/browser-timings/documentProps'
import { documentProps as useIdDocumentProps } from './posts/preact-use-id/documentProps'
import { documentProps as persistedOperationDocumentProps } from './posts/persisted-operations/documentProps'
import { documentProps as graphqlWorkflowDocumentProps } from './posts/graphql-development-workflow/documentProps'
import { documentProps as operationalGraphQL } from './posts/operational-graphql/documentProps'

const posts = [
  operationalGraphQL,
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

const TitleLink = styled(Link)`
  font-size: 2.5rem;
  text-decoration: underline;
  font-weight: 500;
`

const Tag = styled<{ background: string }>('span')`
  border-radius: 10px;
  background: ${(x) => x.background};
  color: white;
  font-size: 14px;
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
  'front-end': '#7842f5',
  vdom: '#6ff542',
  state: '#f5427e',
  suspense: '#f54242',
  thinking: '#f59c42',
}

export default () => (
  <Fragment>
    <SEO title="Blog" description="Posts about my work and thoughts." />
    <Title>Blog</Title>
    <Prelude>
      My thoughts in a semi-raw form, a lot of these posts contain what goes
      around in my mind throughout a day.
    </Prelude>
    <Block>
      {posts.map((post) => (
        <Summary>
          <TitleLink href={post.path}>{post.title}</TitleLink>
          <Prelude>{post.description}</Prelude>
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
  </Fragment>
)
