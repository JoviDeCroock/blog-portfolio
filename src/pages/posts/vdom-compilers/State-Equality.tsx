import { useState } from 'preact/hooks'
import { RerenderTracker, DOMMutationTracker } from './common'

const Counter = () => {
  const [count, setCount] = useState(0)

  const color = count === 0 || count === 10 ? 'red' : 'unset';

  return (
    <div>
      <p style={`color:${color}`}>Count: {count}</p>
      <div style='display:flex;'>
        <button onClick={() => setCount(c => c > 0 ? c - 1 : c)}>-1</button>
        <button onClick={() => setCount(c => c < 10 ? c + 1 : c)}>+1</button>
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
