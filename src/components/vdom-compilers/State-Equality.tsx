import { useRef, useState, useEffect } from 'preact/hooks'

const DOMMutationTracker = (props) => {
  const wrapper = useRef()

  const [attributes, setAttributes] = useState([])

  useEffect(() => {
    const config = { attributes: true, subtree: true };
    console.log('dom mutation observer1', wrapper.current)

    const onMutate = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          setAttributes(a => [
            ...a, {
              name: mutation.attributeName,
              on: mutation.target.nodeName
            }
          ])
        }
      }
      console.log('dom mutation', mutationsList)
    }

    const observer = new MutationObserver(onMutate);
    observer.observe(wrapper.current, config);

    return () => {
      observer.disconnect();
    }
  }, [])

  return (
    <div ref={wrapper}>
      {props.children}
      Attribute updates:
      <ul>
        {attributes.slice(0, 10).map((update, i) => (
          <li key={i}>
            Updated attribute {update.name} on {update.on}
          </li>
        ))}
      </ul>
    </div>
  )
}

const RerenderTracker = (props) => {
  const rerenders = useRef(-1);
  rerenders.current++;
  return <p>{props.name} rerenders: {rerenders.current}</p>
}

const Counter = () => {
  const [count, setCount] = useState(0)

  const color = count === 0 || count === 10 ? 'red' : 'unset';

  return (
    <div>
      <p style={`color:${color}`}>Count: {count}</p>
      <div style='display:flex;'>
        {count > 0 && <button onClick={() => setCount(c => c - 1)}>-1</button>}
        <button onClick={() => setCount(c => c)}>Update to {count}</button>
        {count < 10 && <button onClick={() => setCount(c => c + 1)}>+1</button>}
      </div>
      <RerenderTracker name='Counter' />
    </div>
  )
}

const App = () => {
  return (
    <div style='border: 1px solid black; padding: 4px 8px'>
      <DOMMutationTracker>
        <Counter />
      </DOMMutationTracker>
    </div>
  )
}

export default App;
