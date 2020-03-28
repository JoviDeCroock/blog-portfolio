import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import SkillIndicator from '../components/SkillIndicator'

const Hero = styled.div`
  background: white;
  width: 100%;
`

const ListItem = styled.li`
  font-size: 18px;
  margin-bottom: 12px;
  margin-top: 12px;
`;

const Block = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  margin-top: 28px;
  text-decoration: underline;
`;

const SubTitle = styled.h2``;

const Prelude = styled.p`
  font-size: 18px;
  margin: 0;
  text-align: justify;
`;

export const Link = styled.a`
  color: #0c5bdb;
  &:visited {
    color: #0c5bdb;
  }
`;

export default () => (
  <Layout>
    <SEO title="Portfolio" />
    <Hero>
      <Title>Jovi De Croock</Title>
      <SubTitle>Passionate Web and Mobile engineer</SubTitle>
      <Prelude>
        When growing up I discovered a passion for IT, this grew into me
        working at a hardware store and eventually into finding my passion for
        programming. This passion turnmed me to study software engineering, freelancer
        assignments and my job.
        <br />
        <br />
        Nowadays my passion mainly goes to the architectural side of
        programming. Finding elegant solutions to complex behavior is my
        favorite challenge. Another thing I find a deep interest in is
        optimising performance.
        <br />
        <br />
        At this point I am 24 years old and trying to learn the best practices
        from my awesome co-workers, in the hope of being able to one day share
        my knowledge with everyone.
      </Prelude>
    </Hero>
    <Block>
      <SubTitle>Experience</SubTitle>
      <ul>
        <ListItem>VHTI Dendermonde - IT</ListItem>
        <ListItem>HoGent - Applied IT</ListItem>
        <ListItem>
          <Link target="blank" href="https://codifly.be">
            Codifly
          </Link>
          &nbsp;- Web and Mobile engineer
        </ListItem>
        <ListItem>
          <Link target="blank" href="https://formidable.com/">
            Formidable
          </Link>
          &nbsp;- Software engineer
        </ListItem>
      </ul>
    </Block>
    <Block>
      <SubTitle>Skills</SubTitle>
      <SkillIndicator title="Node.js" level={9} />
      <SkillIndicator title="JavaScript/TypeScript" level={9} />
      <SkillIndicator title="React | Preact" level={8.5} />
      <SkillIndicator title="Apollo | Urql" level={8} />
      <SkillIndicator title="GraphQL" level={8} />
      <SkillIndicator title="React-Native" level={7.5} />
      <SkillIndicator title="SQL" level={7} />
      <SkillIndicator title="Kotlin" level={6} />
    </Block>
    <Block>
      <SubTitle>Open source I contribute to</SubTitle>
      <ul>
        <ListItem>
          <Link target="blank" href="https://github.com/preactjs/preact">
            Preact
          </Link>
          &nbsp;maintainer (core team)
        </ListItem>
        <ListItem>
          <Link target="blank" href="https://github.com/formidablelabs/urql">
            Urql
          </Link>
          &nbsp;maintainer (core team)
        </ListItem>
      </ul>
    </Block>
    <Block>
      <SubTitle>Projects by me</SubTitle>
      <ul>
        <ListItem>
          <Link target="blank" href="https://github.com/JoviDeCroock/hooked-form">
            Hooked-form
          </Link>
          &nbsp;- Lightweight React form library
        </ListItem>
        <ListItem>
          <Link target="blank" href="https://github.com/worldpins">
            Worldpins
          </Link>
          &nbsp;- GraphQL Apollo Koa React application
        </ListItem>
        <ListItem>
          <Link
            target="blank"
            href="https://github.com/JoviDeCroock/webpack-module-nomodule-plugin"
          >
            module-nomodule webpack plugin
          </Link>
        </ListItem>
        <ListItem>
          <Link
            target="blank"
            href="https://github.com/JoviDeCroock/webpack-syntax-resolver-plugin"
          >
            syntax resolver webpack plugin
          </Link>
        </ListItem>
      </ul>
    </Block>
    <Block>
      <SubTitle>Achievements</SubTitle>
      <ul>
        <ListItem>First prize at Hack The Future 2016 - Android</ListItem>
        <ListItem>Helped implement a complex authorisation system</ListItem>
        <ListItem>
          Tennis handicap prediction algorithm, focussed on beating bookmakers
        </ListItem>
      </ul>
    </Block>
    <Block>
      <SubTitle>Interests</SubTitle>
      <ul>
        <ListItem>Non-fiction books (programming, self-improvement,...)</ListItem>
        <ListItem>Psychology</ListItem>
        <ListItem>Music</ListItem>
      </ul>
    </Block>
  </Layout>
)
