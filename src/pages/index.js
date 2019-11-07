import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import SkillIndicator from '../components/SkillIndicator'

const Hero = styled.div`
  background: white;
  width: 100%;
`

const Block = styled.div``

const Title = styled.h1`
  margin-top: 28px;
  text-decoration: underline;
`

const SubTitle = styled.h2``

const Prelude = styled.p`
  margin: 0;
  text-align: justify;
`

export default () => (
  <Layout>
    <SEO title="Portfolio" />
    <Hero>
      <Title>Jovi De Croock</Title>
      <SubTitle>Passionate Web and Mobile engineer</SubTitle>
      <Prelude>
        When growing up I soon found a passion for IT, this grew into me
        working at a hardware store and eventually into finding my passion for
        programming. This passion turnmed me to study software engineering, freelancer
        assignments and my job.
        <br />
        <br />
        Nowadays my passion mainly goes to the architectural side of
        programming. Finding elegant solutions to complex behavior is my
        favorite challenge.
        <br />
        At this point I am 24 years old and trying to learn the best practices
        from my awesome co-workers, in the hope of being able to one day share
        my knowledge with new hires.
      </Prelude>
    </Hero>
    <Block>
      <SubTitle>Experience</SubTitle>
      <ul>
        <li>VHTI Dendermonde - IT</li>
        <li>HoGent - Applied IT</li>
        <li>
          <a target="blank" href="https://codifly.be">
            Codifly
          </a>{' '}
          - Web and Mobile engineer
        </li>
        <li>
          <a target="blank" href="https://formidable.com/">
            Formidable
          </a>{' '}
          - Software engineer
        </li>
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
        <li>
          <a target="blank" href="https://github.com/developit/preact">
            Preact
          </a>{' '}
          maintainer (core team)
        </li>
        <li>
          <a target="blank" href="https://github.com/formidablelabs/urql">
            Urql
          </a>{' '}
          maintainer (core team)
        </li>
      </ul>
    </Block>
    <Block>
      <SubTitle>Projects by me</SubTitle>
      <ul>
        <li>
          <a target="blank" href="https://github.com/JoviDeCroock/hooked-form">
            Hooked-form
          </a>{' '}
          - Lightweight React form library
        </li>
        <li>
          <a target="blank" href="https://github.com/worldpins">
            Worldpins
          </a>{' '}
          - GraphQL Apollo Koa React application
        </li>
        <li>
          <a
            target="blank"
            href="https://github.com/JoviDeCroock/webpack-module-nomodule-plugin"
          >
            module-nomodule webpack plugin
          </a>
        </li>
        <li>
          <a
            target="blank"
            href="https://github.com/JoviDeCroock/webpack-syntax-resolver-plugin"
          >
            syntax resolver webpack plugin
          </a>
        </li>
      </ul>
    </Block>
    <Block>
      <SubTitle>Achievements</SubTitle>
      <ul>
        <li>First prize at Hack The Future 2016 - Android</li>
        <li>Helped implement a complex authorisation system</li>
        <li>
          Tennis handicap prediction algorithm, focussed on beating bookmakers
        </li>
      </ul>
    </Block>
    <Block>
      <SubTitle>Interests</SubTitle>
      <ul>
        <li>Non-fiction books (programming, self-improvement,...)</li>
        <li>Psychology</li>
        <li>Music</li>
      </ul>
    </Block>
  </Layout>
)
