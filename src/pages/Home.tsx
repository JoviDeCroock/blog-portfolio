import { styled } from 'goober'
import Layout from '../components/Layout'
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
  <Layout>
    <SEO
      title='Portfolio'
      description='About my career up to now and my skills.'
    />
    <Hero>
      <Title>Jovi De Croock</Title>
      <SubTitle>Software Engineer</SubTitle>
      <Prelude>
        When growing up I discovered a passion for IT, this grew into me working{' '}
        at a hardware store and eventually into finding my passion for{' '}
        programming. This passion turned me to study software engineering, find
        freelancer assignments and eventually my first job.
        <br />
        <br />
        Nowadays I find myself enjoying work on both front-end as well as
        back-end systems. Finding elegant solutions to complex behavior is my{' '}
        favorite challenge. Another thing I find a deep interest in is{' '}
        optimising performance.
        <br />
        <br />A second passion that has grown over the years is open-source, I
        love working in the open and I love collaborating with others to solve
        problems.
      </Prelude>
    </Hero>
    <Block>
      <SubTitle>Experience</SubTitle>
      <ul>
        <ListItem>VHTI Dendermonde - Hardware</ListItem>
        <ListItem>HoGent - Applied IT</ListItem>
        <ListItem>
          <Link target="blank" href="https://codifly.be">
            Codifly
          </Link>{' '}
          - Web and Mobile engineer
        </ListItem>
        <ListItem>
          <Link target="blank" href="https://formidable.com/">
            Formidable
          </Link>{' '}
          - Senior software engineer - Tech lead
        </ListItem>
        <ListItem>
          <Link target="blank" href="https://graphcdn.io/">
            GraphCDN
          </Link>{' '}
          - Staff Software Engineer
        </ListItem>
      </ul>
    </Block>
    <Block>
      <SubTitle>Skills</SubTitle>
      <SkillIndicator title="(P)React" level={9.5} />
      <SkillIndicator title="GraphQL" level={9.5} />
      <SkillIndicator title="Node.js" level={9} />
      <SkillIndicator title="TypeScript" level={9} />
      <SkillIndicator title="React-Native" level={7.5} />
      <SkillIndicator title="Terraform" level={7} />
      <SkillIndicator title="AWS" level={7} />
      <SkillIndicator title="SQL" level={7} />
    </Block>
    <Block>
      <SubTitle>Open source projects I help maintain</SubTitle>
      <ul>
        <ListItem>
          <Link target="blank" href="https://github.com/preactjs/preact">
            Preact
          </Link>{' '}
          maintainer (core team)
        </ListItem>
        <ListItem>
          <Link target="blank" href="https://github.com/formidablelabs/urql">
            Urql
          </Link>{' '}
          maintainer (core team)
        </ListItem>
      </ul>
    </Block>
    <Block>
      <SubTitle>Projects by me</SubTitle>
      <ul>
        <ListItem>
          <Link target="blank" href="https://github.com/preactjs/prefresh">
            Prefresh
          </Link>{' '}
          - Fast-refresh for Preact
        </ListItem>
        <ListItem>
          <Link target="blank" href="https://github.com/JoviDeCroock/hoofd">
            Hoofd
          </Link>{' '}
          - Lightweight (P)React head library
        </ListItem>
      </ul>
    </Block>
    <Block>
      <SubTitle>Achievements</SubTitle>
      <ul>
        <ListItem>Google Open Source Peer Bonus - Q4 2019</ListItem>
        <ListItem>
          Helped implement a complex entity-level authorisation system
        </ListItem>
        <ListItem>
          Tennis handicap prediction algorithm, focussed on beating bookmakers
        </ListItem>
        <ListItem>First prize at Hack The Future 2016 - Android</ListItem>
      </ul>
    </Block>
    <Block>
      <SubTitle>Interests</SubTitle>
      <ul>
        <ListItem>Psychology</ListItem>
        <ListItem>Philosophy</ListItem>
        <ListItem>Music</ListItem>
      </ul>
    </Block>
  </Layout>
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
