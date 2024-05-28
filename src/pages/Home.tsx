import { styled } from 'goober'
import { Link, Prelude, SubTitle, Title } from '../components/Text'
import SEO from '../components/Seo'

const Hero = styled('div')`
  width: 100%;
`

const QuoteList = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
`

const QuoteListItem = styled('li')`
  margin-bottom: 12px;
  margin-top: 12px;
  border-left: 1px solid #2D2C2C;
  list-style-type: none;
  padding-left: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`

const QuoteLink = styled(Link)`
  color: #FCFCFD;
  font-weight: bold;
`;

const Block = styled('div')`
  margin-bottom: 32px;
`

const Grid = styled('ul')`
  display: grid;
  list-style: none;
  margin: 0;
  gap: 24px;
  padding: 0;
  grid-template-columns: 1fr 1fr;
`;

const Box = styled('li')`
  border: 1px solid #2D2C2C;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default () => (
  <>
    <SEO
      title="Portfolio"
      description="About my career up to now and my skills."
    />
    <Hero>
      <Title>Jovi De Croock</Title>
      <SubTitle>Full-stack Software Engineer</SubTitle>
      <Prelude>
        TODO: reword highlighting
      </Prelude>
    </Hero>
    <Block>
      <SubTitle>Work experience</SubTitle>
      <QuoteList>
        <QuoteListItem>
          <QuoteLink rel="nofollow" target="blank" href="https://stellate.co/">
            Stellate
          </QuoteLink> Staff Software Engineer - Director of R&D (2021-2024)
        </QuoteListItem>
        <QuoteListItem>
          <QuoteLink rel="nofollow" target="blank" href="https://formidable.com/">
            Formidable
          </QuoteLink> Senior software engineer - Tech lead (2019-2021)
        </QuoteListItem>
        <QuoteListItem>
          <QuoteLink rel="nofollow" target="blank" href="https://codifly.be">
            Codifly
          </QuoteLink> Web and Mobile engineer (2017-2019)
        </QuoteListItem>
      </QuoteList>
      <Block>
        <SubTitle>Open source work</SubTitle>
        <Grid>
          <Box>
            <div>
              <h3>Preact</h3>
              <p>A fast and tiny alternative to React with a modern API.</p>
            </div>
            <Link
              rel="nofollow"
              target="blank"
              href="https://preactjs.com"
            >
              https://preactjs.com
            </Link>
          </Box>
          <Box>
            <div>
              <h3>urql</h3>
              <p>The highly customizable and versatile GraphQL client for React, Svelte, Vue, or plain JavaScript, with which you add on features like normalized caching as you grow.</p>
            </div>
            <Link
              rel="nofollow"
              target="blank"
              href="https://urql.dev"
            >
              https://urql.dev
            </Link>
          </Box>
        </Grid>
      </Block>
    </Block>
    <Block>
      <SubTitle>Achievements</SubTitle>
      <QuoteList>
        <QuoteListItem>
          <QuoteLink rel="nofollow" target="blank" href="https://us.puma.com">
            During my time at Formidable, I functioned as a technical lead on
            modernising the tech-stack of Puma
          </QuoteLink>
        </QuoteListItem>
        <QuoteListItem>
          <QuoteLink
            rel="nofollow"
            target="blank"
            href="https://github.com/FredKSchott/esm-hmr"
          >
            I've Helped develop the ESM HMR Spec
          </QuoteLink>
        </QuoteListItem>
        <QuoteListItem>
          <QuoteLink
            rel="nofollow"
            target="blank"
            href="https://opensource.googleblog.com/2020/01/announcing-2019-second-cycle-google.html"
          >
            I've received the Google Open Source Peer Bonus 2019 Cycle 2
          </QuoteLink>
        </QuoteListItem>
      </QuoteList>
    </Block>
  </>
)
