import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import SkillIndicator from '../components/SkillIndicator'

const Hero = styled.div`
  background: white;
  width: 100%
`;

const Block = styled.div``

const Title = styled.h1`
  margin-top: 28px;
  text-decoration: underline;
`

const SubTitle = styled.h2``

const Prelude = styled.p`
  margin: 0;
  text-align: justify;
`;

export default () => (
  <Layout>
    <SEO title="Portfolio" />
    <Hero>
      <Title>Jovi De Croock</Title>
        <SubTitle>
          Passionate Web- and Mobile developer @{' '}
          <a target="blank" href="https://codifly.be">Codifly</a>
        </SubTitle>
      <Prelude>
        When growing up I soon found a passion for IT, this growed into me working{' '}
        at a hardware store and eventually into finding my passion for programming.{' '}
        This passion evolved into doing IT-studies, freelancer assignments and my job.
        <br />
        <br />
        Nowadays my passion greatly goes to the architecture side of programming,{' '}
        finding elegant solutions to complex behavior is my favorite challenge.
        <br />
        At this point I am 23 years old and trying to learn the best practices from my{' '}
        awesome co-workers, in the hope of being able to one day share my knowledge with{' '}
        new juniors.
      </Prelude>
    </Hero>
    <Block>
      <SubTitle>Experience</SubTitle>
      <ul>
        <li>
          VHTI Dendermonde - IT
        </li>
        <li>
          HoGent - Applied IT
        </li>
        <li>
          Codifly - JavaScript intern
        </li>
        <li>
          Codifly - Web and Mobile developer
        </li>
      </ul>
    </Block>
    <Block>
      <SubTitle>Skills</SubTitle> 
      <SkillIndicator title="Node.js" level={9} />
      <SkillIndicator title="JavaScript/TypeScript" level={8.5} />
      <SkillIndicator title="React.js" level={8.5} />
      <SkillIndicator title="Apollo" level={8} />
      <SkillIndicator title="GraphQL" level={8} />
      <SkillIndicator title="React-Native" level={7.5} />
      <SkillIndicator title="SQL" level={7} />
      <SkillIndicator title="Kotlin" level={6} />
      <SkillIndicator title="Unity" level={5.5} />
    </Block>
    <Block>
      <SubTitle>Projects</SubTitle>
      <ul>
        <li>Hooked-Form - Lightweight React form library</li>
        <li>React-Angler - React hooks toolbelt</li>
        <li>Worldpins - GraphQL Apollo Koa React application</li>
      </ul>
    </Block>
    <Block>
      <SubTitle>Achievements</SubTitle>
      <ul>
        <li>First prize at Hack The Future 2016 - Android</li>
        <li>Helped implement a complex authorisation system</li>
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
