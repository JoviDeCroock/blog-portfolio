import { useRef, useState, useEffect } from 'preact/hooks'

const DOMMutationTracker = (props) => {
  useEffect(() => {
    // observe child dom mutations
  }, [])
}

const RerenderTracker = (props) => {
  const rerenders = useRef(-1);
  rerenders.current++;
  return <p>{props.name} rerenders: {rerenders.current}</p>
}

const Counter = () => {
  const [count, setCount] = useState(0)
}
