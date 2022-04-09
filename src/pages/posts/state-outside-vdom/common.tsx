import { useRef } from 'preact/hooks'

export const RerenderTracker = (props) => {
  const rerenders = useRef(-1)
  rerenders.current++
  return (
    <p style={{ margin: 0, fontWeight: 600, textDecoration: 'underline' }}>
      {props.name} rerenders: {rerenders.current}
    </p>
  )
}
