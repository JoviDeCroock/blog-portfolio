import { styled } from 'goober'
import { useState } from 'preact/hooks'

import SEO from '../components/Seo'

import { posts, tagBgs, type Post } from '../data/posts'

export { posts, tagBgs }
export type { Post }

const Block = styled('main')`
  margin-bottom: 1rem;
  margin-top: 1rem;
`

const PostGrid = styled('ul')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const PostCard = styled('li')`
  border: 1px solid #2d2c2c;
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #eb29a9, #6366f1);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    border-color: #eb29a9;
    transform: translateY(-2px);
  }

  &:hover::before {
    opacity: 1;
  }
`

const PostDate = styled('span')`
  font-size: 0.75rem;
  color: #71717a;
  letter-spacing: 0.05em;
`

const TitleLink = styled('a')`
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  color: #fcfcfd;
  line-height: 1.35;

  &:hover {
    text-decoration: underline;
  }
`

const PostDescription = styled('p')`
  font-size: 0.875rem;
  color: #a1a1aa;
  margin: 0;
  line-height: 1.5;
  flex: 1;
`

const Tag = styled<{ background: string }>('span')`
  border-radius: 10px;
  background: ${(x) => x.background};
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 8px;
`

const SubjectSummary = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
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

const RssLink = styled('a')`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: #f59c42;
  text-decoration: none;
  border: 1px solid #f59c42;
  border-radius: 6px;
  padding: 4px 10px;

  &:hover {
    background: rgba(245, 156, 66, 0.1);
  }
`

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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <h1>Blog</h1>
        <RssLink href="/rss.xml" target="_blank" rel="noopener noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
          </svg>
          RSS
        </RssLink>
      </div>
      <p>
        My thoughts in a semi-raw form, a lot of these posts contain what goes
        around in my mind throughout a day.
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
        <PostGrid>
          {filteredPosts.map((post, index) => (
            <PostCard key={index}>
              {post.createdAt && <PostDate>{post.createdAt}</PostDate>}
              <TitleLink
                target={post.external ? '_blank' : undefined}
                href={post.path}
              >
                {post.title}
              </TitleLink>
              <PostDescription>{post.description}</PostDescription>
              <SubjectSummary>
                {post.tags.map((tag) => (
                  <Tag background={tagBgs[tag]} key={tag}>
                    {tag}
                  </Tag>
                ))}
              </SubjectSummary>
            </PostCard>
          ))}
        </PostGrid>

        {selectedTag && filteredPosts.length === 0 && (
          <p>No posts found with the selected tag.</p>
        )}
      </Block>
    </main>
  )
}
