import React from 'react'
import styled from 'styled-components'
import { Spring } from 'react-spring'

const BarWrapper = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  height: 12px;
  width: 100%;
`

const Indicator = styled.div`
  background-color: #4286F4;
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
  margin-bottom: 2px;
`

export default ({ title, level: finalLevel }) => (
  <Wrapper>
    <Text>{title}</Text>
    <BarWrapper>
      <Spring
        delay={300}
        from={{ level: 0 }}
        to={{ level: finalLevel }}
      >
        {({ level}) => <Indicator level={level} />}
      </Spring>
    </BarWrapper>
  </Wrapper>
)