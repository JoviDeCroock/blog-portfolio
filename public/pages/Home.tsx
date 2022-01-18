import { styled } from 'goober'
import Layout from '../components/Layout'
import SkillIndicator from '../components/SkillIndicator'
import { Link } from '../components/Link'
import SEO from '../components/Seo'

const Hero = styled('div')`
  background: white;
  width: 100%;
`

const ListItem = styled('li')`
  font-size: 18px;
  margin-bottom: 12px;
  margin-top: 12px;
`

const Block = styled('div')`
  margin-bottom: 32px;
`

const Title = styled('h1')`
  margin-top: 28px;
  text-decoration: underline;
`

const SubTitle = styled('h2')``

const Prelude = styled('p')`
  font-size: 18px;
  margin: 0;
  text-align: justify;
`

export default () => (
  <Layout>
    <SEO />
    <Hero>
      <Title>Jovi De Croock</Title>
      <SubTitle>Passionate Software Engineer</SubTitle>
      <Prelude>
        When growing up I discovered a passion for IT, this grew into me working{' '}
        at a hardware store and eventually into finding my passion for{' '}
        programming. This passion turnmed me to study software engineering,{' '}
        freelancer assignments and my job.
        <br />
        <br />
        Nowadays my passion mainly goes to the architectural side of{' '}
        programming. Finding elegant solutions to complex behavior is my{' '}
        favorite challenge. Another thing I find a deep interest in is{' '}
        optimising performance.
        <br />
        <br />
        At this point I am 26 years old and trying to learn the best practices{' '}
        from my awesome co-workers, in the hope of being able to one day share{' '}
        my knowledge with everyone.
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
      <SkillIndicator title="Node.js" level={9} />
      <SkillIndicator title="JavaScript/TypeScript" level={9} />
      <SkillIndicator title="(P)React" level={9.5} />
      <SkillIndicator title="GraphQL" level={9} />
      <SkillIndicator title="Terraform" level={8} />
      <SkillIndicator title="React-Native" level={7.5} />
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
          <Link
            target="blank"
            href="https://github.com/JoviDeCroock/hooked-form"
          >
            Hooked-form
          </Link>{' '}
          - Lightweight React form library
        </ListItem>
        <ListItem>
          <Link target="blank" href="https://github.com/JoviDeCroock/use-web-animation">
            use-web-animation
          </Link>{' '}
          - Lightweight library leveraging web-animations
        </ListItem>
        <ListItem>
          <Link target="blank" href="https://github.com/JoviDeCroock/hoofd">
            Hoofd
          </Link>{' '}
          - Lightweight (P)React head library
        </ListItem>
        <ListItem>
          <Link target="blank" href="https://github.com/worldpins">
            Worldpins
          </Link>{' '}
          - GraphQL Apollo Koa React application
        </ListItem>
        <ListItem>
          <Link
            target="blank"
            href="https://github.com/JoviDeCroock/webpack-module-nomodule-plugin"
          >
            module-nomodule webpack plugin
          </Link>
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
        <ListItem>
          Non-fiction books (programming, self-improvement,...)
        </ListItem>
        <ListItem>Psychology</ListItem>
        <ListItem>Music</ListItem>
      </ul>
    </Block>
  </Layout>
)
