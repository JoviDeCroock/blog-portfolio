import React from 'react'
import styled from 'styled-components'
import { Spring } from 'react-spring'
import { useInView } from 'react-intersection-observer'

const BarWrapper = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  height: 12px;
  width: 100%;
`

const Indicator = styled.div`
  background-color: #4286f4;
  border: 1px solid transparent;
  border-radius: 10px;
  height: 100%;
  width: ${({ level }) => level * 10}%;
`

const Text = styled.p`
  margin: 0;
  margin-left: 6px;
`

const Wrapper = styled.div`
  margin-bottom: 4px;
`

const SkillIndicator = ({ title, level: finalLevel }) => {
  const [ref, inView] = useInView({ triggerOnce: true })
  return (
    <Wrapper ref={ref}>
      <Text>{title}</Text>
      <BarWrapper>
        <Spring
          delay={300}
          from={{ level: 0 }}
          to={{ level: inView ? finalLevel : 0 }}
        >
          {({ level }) => <Indicator level={level} />}
        </Spring>
      </BarWrapper>
    </Wrapper>
  )
}

export default React.memo(SkillIndicator)
