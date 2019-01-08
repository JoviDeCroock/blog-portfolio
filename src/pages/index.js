import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
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
`;

export default () => (
  <Layout>
    <Hero>
      <Title>Jovi De Croock</Title>
      <SubTitle>Passionate Web and Mobile developer</SubTitle>
      <Prelude>
        DISCLAIMER: this is still a work in progress.
        When growing up I soon found a passion for IT, this growed into me working{' '}
        at a hardware store and eventually into finding my passion for programming.{' '}
        This passion evolved into doing IT-studies, freelancer assignments and my job.
      </Prelude>
    </Hero>
    <Block>
      <Title>Experience</Title>
      <ul>
        <li>VHTI Dendermonde - IT</li>
        <li>HoGent - Applied IT</li>
        <li>Codifly - JavaScript intern</li>
        <li>Codifly - Web and Mobile developer</li>
      </ul>
    </Block>
    <Block>
      <Title>Projects</Title>
      <ul>
        <li>Hooked-Form</li>
        <li>React-Angler</li>
        <li>Worldpins</li>
      </ul>
    </Block>
    <Block>
      <Title>Skills</Title> 
      <SkillIndicator title="Node.js" level={9} />
      <SkillIndicator title="JavaScript/TypeScript" level={8.5} />
      <SkillIndicator title="React.js" level={8.5} />
      <SkillIndicator title="Apollo" level={8} />
      <SkillIndicator title="GraphQL" level={8} />
      <SkillIndicator title="React-Native" level={7.5} />
      <SkillIndicator title="SQL" level={7} />
      <SkillIndicator title="Unity" level={5.5} />
    </Block>
    <Block>
      <Title>Interests</Title>
      <ul>
        <li>Non-fiction books (science, self-improvement,...)</li>
        <li>Psychology</li>
        <li>Music</li>
      </ul>
    </Block>
    <Block>
      <Title>Links</Title>
    </Block>
  </Layout>
)
