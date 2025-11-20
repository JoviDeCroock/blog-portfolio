import { styled } from 'goober'
import { useState } from 'preact/hooks'

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
import { documentProps as graphqlsMissingFeatureDocumentProps } from './posts/document-authoring-missing-feature/documentProps'
import { documentProps as fragmentVdomDocumentProps } from './posts/fragments-in-vdom/documentProps'
import { documentProps as signalsDocumentProps } from './posts/signals/documentProps'
import { documentProps as skewDocumentProps } from './posts/skew-based-diff/documentProps'
import { documentProps as trackingContextDocumentProps } from './posts/tracking-context/documentProps'
import { documentProps as graphqlAsteriskProblemDocumentProps } from './posts/graphql-asterisk-problem/documentProps'
import { documentProps as stateModelsDocumentProps } from './posts/state-models/documentProps'
import { documentProps as surgicalRenderingDocumentProps } from './posts/signals-fetch/documentProps'
import { documentProps as graphqlMythsDocumentProps } from './posts/graphql-myths/documentProps'
import { documentProps as stateVsSignalsDocumentProps } from './posts/state-vs-signals/documentProps'
import { documentProps as platformDocumentProps } from './posts/platform/documentProps'

export interface Post {
  title: string
  description: string
  image: string
  path: string
  tags: Array<keyof typeof tagBgs>
  external?: boolean
  createdAt?: string
}

export const posts: Array<Post> = [
  platformDocumentProps,
  stateVsSignalsDocumentProps,
  graphqlMythsDocumentProps,
  surgicalRenderingDocumentProps,
  stateModelsDocumentProps,
  graphqlAsteriskProblemDocumentProps,
  trackingContextDocumentProps,
  skewDocumentProps,
  signalsDocumentProps,
  fragmentVdomDocumentProps,
  graphqlsMissingFeatureDocumentProps,
  {
    title: 'Preact X, a story of stability',
    description: `Preact X has been released for five years, let's go over all the exciting things that have happened.`,
    image: 'https://www.jovidecroock.com/preact-x.png',
    path: 'https://preactjs.com/blog/preact-x',
    tags: ['external', 'thinking'],
    external: true,
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

const TagFilterContainer = styled('div')`
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const FilterTag = styled<{ background: string; isSelected: boolean }>('button')`
  border-radius: 10px;
  background: ${(x) => x.background};
  opacity: ${(x) => (x.isSelected ? 1 : 0.6)};
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 12px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

const ClearFilter = styled('button')`
  border-radius: 10px;
  background: #666;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 12px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #888;
  }
`

const tagBgs: Record<string, string> = {
  performance: '#0080bb',
  graphql: '#E10098',
  engineering: '#302221',
  'front-end': '#7842f5',
  vdom: '#6ff542',
  state: '#f5427e',
  suspense: '#f54242',
  thinking: '#f59c42',
  external: '#4c01fe',
  'server-side-rendering': '#07a8f8',
  'open-source': '#f5a142',
} as const

const ALL_TAGS = posts
  .flatMap((post) => post.tags)
  .filter((tag, index, self) => self.indexOf(tag) === index)

export default () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = selectedTag
    ? posts.filter((post) =>
        post.tags.includes(selectedTag as keyof typeof tagBgs)
      )
    : posts

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const clearFilter = () => {
    setSelectedTag(null)
  }

  return (
    <main>
      <SEO title="Blog" description="Posts about my work and thoughts." />
      <h1>Blog</h1>
      <p>
        My thoughts in a semi-raw form, a lot of these posts contain what goes
        around in my mind throughout a day.
      </p>
      <p>
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
          Subscribe via RSS
        </a>
      </p>

      <h2>Filter by tag</h2>
      <TagFilterContainer>
        {ALL_TAGS.map((tag) => (
          <FilterTag
            background={tagBgs[tag]}
            key={`filter-${tag}`}
            isSelected={selectedTag === tag}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </FilterTag>
        ))}
        {selectedTag && (
          <ClearFilter onClick={clearFilter}>Clear filter</ClearFilter>
        )}
      </TagFilterContainer>

      <Block>
        {filteredPosts.map((post, index) => (
          <Summary key={index}>
            <TitleLink
              target={post.external ? 'blank' : undefined}
              href={post.path}
            >
              {post.title}
            </TitleLink>
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

        {selectedTag && filteredPosts.length === 0 && (
          <p>No posts found with the selected tag.</p>
        )}
      </Block>
    </main>
  )
}
