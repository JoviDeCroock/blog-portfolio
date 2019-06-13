import React from 'react'
import styled from 'styled-components'
import { Spring } from 'react-spring'
import { InView } from 'react-intersection-observer'

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

const Wrapper = styled(InView)`
  margin-bottom: 4px;
`

const SkillIndicator = ({ title, level: finalLevel }) => {
  const [show, setShow] = React.useState(false);

  const onChange = React.useCallback(inView => {
    if (inView) {
      setShow(() => inView);
    }
  }, [])

  return (
    <Wrapper onChange={onChange}>
      <Text>{title}</Text>
      <BarWrapper>
        <Spring
          delay={300}
          from={{ level: 0 }}
          to={{ level: show ? finalLevel : 0 }}
        >
          {({ level}) => <Indicator level={level} />}
        </Spring>
      </BarWrapper>
    </Wrapper>
  )
}

export default React.memo(SkillIndicator);
