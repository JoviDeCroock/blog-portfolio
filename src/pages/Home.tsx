import { styled } from 'goober'
import SEO from '../components/Seo'
import { useRef } from 'preact/hooks'

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

const QuoteLink = styled('a')`
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
  position: relative;
  overflow: hidden;

  &:hover::before {
    opacity: 1;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    filter: blur(60px);
    transition: all 0.25s ease-in-out;
    opacity: 0;
    background: transparent;
    background-repeat: no-repeat;
    background-image: radial-gradient(
      circle at calc(var(--mouse-x, 0) * 100%) calc(var(--mouse-y, 0) * 100%),
      #EB29A9,
      #0b0b0c 20%,
      transparent 100%
    );
  }
`;

const H3 = styled('h3')`
  margin-top: 0;
  margin-bottom: 0;
`

const P = styled('p')`
  margin-top: 0;
`

const Home = () => (
  <main>
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
        several projects, core team of <b>Preact</b>, <b>urql</b>, and <b>GQL.tada</b>.
      </p>
    </Hero>
    <Block>
      <h2>Work experience</h2>
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
        <h2>Open source work</h2>
        <Grid>
          <OSSBox name="Preact" description='A fast and tiny alternative to React with a modern API.' link='https://preactjs.com' />
          <OSSBox name="urql" description='The highly customizable and versatile GraphQL client for React, Svelte, Vue, or plain JavaScript, with which you add on features like normalized caching as you grow.' link='https://urql.dev' />
          <OSSBox name="GQL.tada" description='The magical GraphQL parser written in TS types, this tool automatically types your GraphQL Documents without codegen.' link='https://gql-tada.0no.co/' />
          <OSSBox name="Prefresh" description='React Fast Refresh for PreactJS.' link='https://github.com/preactjs/prefresh' />
          <OSSBox name="GraphQLSP" description='A TypeScript LSP Plugin to properly support inline-hints/diagnostics/... while developing front-end GraphQL applications.' link='https://github.com/0no-co/graphqlsp' />
        </Grid>
      </Block>
    </Block>
    <Block>
      <h2>Achievements</h2>
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
  </main>
)

const RelativeDiv = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position:relative;
  height: 100%;
`

const OSSBox = (props: { name: string; description: string; link: string }) => {
  const box = useRef<HTMLLIElement>(null);

  const onMouseMove = (evt: any) => {
    if (!box.current) return;

    // The styled thing gives us a VNode rather than
    // forwarding the ref
    const b = (box.current as any).base as any;
    const rect = b.getBoundingClientRect()
    const x = (evt.clientX - rect.left) / rect.width;
    const y = (evt.clientY - rect.top) / rect.height;
    b.style.setProperty("--mouse-x", `${x}`);
    b.style.setProperty("--mouse-y", `${y}`);
    console.log(b.style.getPropertyValue("--mouse-x"));
  }

  return (
    <Box ref={box} onMouseMove={onMouseMove}>
      <RelativeDiv>
        <div>
          <H3>{props.name}</H3>
          <P>{props.description}</P>
        </div>
        <a
          rel="nofollow"
          target="blank"
          href={props.link}
        >
          {props.link}
        </a>
      </RelativeDiv>
    </Box>
  )
}


export default Home;
