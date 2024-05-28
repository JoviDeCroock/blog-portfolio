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
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const H3 = styled('h3')`
  margin-top: 0;
  margin-bottom: 0;
`

const P = styled('p')`
  margin-top: 0;
`

export default () => (
  <>
    <SEO
      title="Portfolio"
      description="About my career up to now and my skills."
    />
    <Hero>
      <p>
        Hey, I am Jovi De Croock, a software engineer and technology enthusiast from Belgium.
        A <b>React</b>, <b>GraphQL</b>, and <b>TypeScript</b> specialist, currently
        Staff Engineer at X, previously worked at Stellate, Formidable and Codifly.
      </p>
      <p>
        I love working in the open, collaborating, being a force multiplier with others and
        finding elegant solutions to complex problems. I'm passionate about open-source and maintain
        several projects, core team of <b>Preact</b>, <b>urql</b>, and <b>GQL.tada</b>
      </p>
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
              <H3>Preact</H3>
              <P>A fast and tiny alternative to React with a modern API.</P>
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
              <H3>urql</H3>
              <P>The highly customizable and versatile GraphQL client for React, Svelte, Vue, or plain JavaScript, with which you add on features like normalized caching as you grow.</P>
            </div>
            <Link
              rel="nofollow"
              target="blank"
              href="https://urql.dev"
            >
              https://urql.dev
            </Link>
          </Box>
          <Box>
            <div>
              <H3>GQL.tada</H3>
              <P>The magical GraphQL parser written in TS types, this tool automatically types your GraphQL Documents without codegen.</P>
            </div>
            <Link
              rel="nofollow"
              target="blank"
              href="https://gql-tada.0no.co/"
            >
              https://gql-tada.0no.co/
            </Link>
          </Box>
          <Box>
            <div>
              <H3>Prefresh</H3>
              <P>React Fast Refresh for PreactJS.</P>
            </div>
            <Link
              rel="nofollow"
              target="blank"
              href="https://github.com/preactjs/prefresh"
            >
              https://github.com/preactjs/prefresh
            </Link>
          </Box>
          <Box>
            <div>
              <H3>GraphQLSP</H3>
              <P>A TypeScript LSP Plugin to properly support inline-hints/diagnostics/... while developing front-end GraphQL applications.</P>
            </div>
            <Link
              rel="nofollow"
              target="blank"
              href="https://github.com/0no-co/graphqlsp"
            >
              https://github.com/0no-co/graphqlsp
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
            The modernisation of the tech-stack of Puma.com
          </QuoteLink>
        </QuoteListItem>
        <QuoteListItem>
          <QuoteLink
            rel="nofollow"
            target="blank"
            href="https://github.com/FredKSchott/esm-hmr"
          >
            Collaboration on the ESM HMR Spec
          </QuoteLink>
        </QuoteListItem>
        <QuoteListItem>
          <QuoteLink
            rel="nofollow"
            target="blank"
            href="https://opensource.googleblog.com/2020/01/announcing-2019-second-cycle-google.html"
          >
            The Google Open Source Peer Bonus 2019 Cycle 2
          </QuoteLink>
        </QuoteListItem>
      </QuoteList>
    </Block>
  </>
)
