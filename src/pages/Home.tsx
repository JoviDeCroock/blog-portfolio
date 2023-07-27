import { styled } from 'goober'
import { Link, Prelude, SubTitle, Title } from '../components/Text'
import SEO from '../components/Seo'

const Hero = styled('div')`
  background: white;
  width: 100%;
`

const ListItem = styled('li')`
  margin-bottom: 12px;
  margin-top: 12px;
`

const Block = styled('div')`
  margin-bottom: 32px;
`

export default () => (
  <>
    <SEO
      title='Portfolio'
      description='About my career up to now and my skills.'
    />
    <Hero>
      <Title>Jovi De Croock</Title>
      <SubTitle>Full-stack Software Engineer</SubTitle>
      <Prelude>
        When growing up I discovered a passion for IT, this grew into me working{' '}
        at a hardware store and eventually into finding my passion for{' '}
        programming. This passion turned me to study computer science, find{' '}
        freelancer assignments and eventually my first job.
        <br />
        <br />
        Nowadays I find myself enjoying work on both front-end as well as{' '}
        back-end systems. Finding elegant solutions to complex behavior is my{' '}
        favorite challenge. In companies I like to empower people to deliver their{' '}
        best work, a force multiplier for others, be that by working on DX or discovering{' '}
        solutions to problems together.
        <br />
        <br />
        A second passion that has grown over the years is open-source, I{' '}
        love working in the open and I love collaborating with others to solve{' '}
        common development problems.
      </Prelude>
    </Hero>
    <Block>
      <SubTitle>Experience</SubTitle>
      <ul>
        <ListItem>
          <Link rel="nofollow" target="blank" href="https://codifly.be">
            Codifly
          </Link>{' '}
          - Web and Mobile engineer (2017-2019)
        </ListItem>
        <ListItem>
          <Link rel="nofollow" target="blank" href="https://formidable.com/">
            Formidable
          </Link>{' '}
          - Senior software engineer - Tech lead (2019-2021)
        </ListItem>
        <ListItem>
          <Link rel="nofollow" target="blank" href="https://stellate.co/">
            Stellate
          </Link>{' '}
          - Staff Software Engineer (2021-Now)
        </ListItem>
      </ul>
      <Block>
      <SubTitle>Open source projects</SubTitle>
      <ul>
      <ListItem>
          I have been maintaining{' '}
          <Link rel="nofollow" target="blank" href="https://github.com/preactjs/preact">
            Preact
          </Link>{' '}
          since we started on the X release in the start of 2019
        </ListItem>
        <ListItem>
          I created{' '}
          <Link rel="nofollow" target="blank" href="https://github.com/preactjs/prefresh">
            Prefresh
          </Link>{' '}
          which is like React Fast Refresh but for Preact specifically
        </ListItem>
        <ListItem>
          In June 2019 I started helping out on the{' '}
          <Link rel="nofollow" target="blank" href="https://github.com/urql-graphql/urql">
            Urql
          </Link>{' '}
          project, a lightweight extensible GraphQL Client
        </ListItem>
        <ListItem>
          I created{' '}
          <Link rel="nofollow" target="blank" href="https://github.com/0no-co/hoofd">
            Hoofd
          </Link>{' '}
          as I wanted to properly manage my HTML-head through hooks
        </ListItem>
         <ListItem>
          I developed{' '}
          <Link rel="nofollow" target="blank" href="https://github.com/0no-co/graphqlsp">
            GraphQLSP
          </Link>{' '}
          a TypeScript LSP Plugin to properly support inline-hints/... while developing front-end GraphQL applications
        </ListItem>
      </ul>
    </Block>
    </Block>
    <Block>
      <SubTitle>Skills</SubTitle>
      <SkillIndicator title="(P)React" level={9.5} />
      <SkillIndicator title="GraphQL" level={9.5} />
      <SkillIndicator title="Node.js" level={9} />
      <SkillIndicator title="TypeScript" level={9} />
      <SkillIndicator title="Terraform" level={8} />
      <SkillIndicator title="AWS" level={7} />
      <SkillIndicator title="SQL" level={7} />
      <SkillIndicator title="Rust" level={5} />
    </Block>
    <Block>
      <SubTitle>Achievements</SubTitle>
      <ul>
        <ListItem>
          <Link rel="nofollow" target="blank" href="https://us.puma.com">
            During my time at Formidable, I functioned as a technical lead on modernising the tech-stack of Puma
          </Link>
        </ListItem>
        <ListItem>
          <Link rel="nofollow" target="blank" href="https://github.com/FredKSchott/esm-hmr">
            Helped develop the ESM HMR Spec
          </Link>
        </ListItem>
        <ListItem>
          <Link rel="nofollow" target="blank" href="https://opensource.googleblog.com/2020/01/announcing-2019-second-cycle-google.html">
            Google Open Source Peer Bonus 2019 Cycle 2
          </Link>
        </ListItem>
      </ul>
      <SubTitle>Education</SubTitle>
      <ul>
        <ListItem>VHTI Dendermonde - Hardware</ListItem>
        <ListItem>HoGent - Bachelor Computer Science</ListItem>
      </ul>
    </Block>
  </>
)

const BarWrapper = styled('div')`
  border: 1px solid black;
  border-radius: 10px;
  height: 12px;
  width: 100%;
`

const Indicator = styled('div')`
  background-color: #4286f4;
  border: 1px solid transparent;
  border-radius: 10px;
  height: 100%;
  width: ${({ level }: { level: number }) => level * 10}%;
`

const Text = styled('p')`
  margin: 0;
  margin-bottom: 4px;
  margin-left: 6px;
`

const Wrapper = styled('div')`
  margin-bottom: 8px;
  margin-top: 8px;
`

const SkillIndicator = ({ title, level }: { title: string; level: number }) => (
  <Wrapper>
    <Text>{title}</Text>
    <BarWrapper>
      <Indicator level={level} />
    </BarWrapper>
  </Wrapper>
)
