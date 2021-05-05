import { styled } from 'goober'

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
  ma;rgin-top: 8px;
`

const SkillIndicator = ({ title, level }: { title: string; level: number }) => (
  <Wrapper>
    <Text>{title}</Text>
    <BarWrapper>
      <Indicator level={level} />
    </BarWrapper>
  </Wrapper>
)

export default SkillIndicator
