import { useState } from 'preact/hooks'
import { RerenderTracker, DOMMutationTracker } from './common'

const Counter = (props) => {
  const [count, setCount] = useState(0)

  return (
    <div style='padding: 0px 16px'>
      <RerenderTracker name={`Counter #${props.i}`} />
      <p>Count: {count}</p>
      <div style="display:flex;">
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
        <button onClick={() => setCount((c) => c + 1)}>
          +1
        </button>
      </div>
    </div>
  )
}

const Layout = (props) => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <main style='padding: 0px 16px'>
      <RerenderTracker name='Layout' />
      <button onClick={() => setDarkMode((dark) => !dark)}>set {darkMode ? "Light" : "Dark"} Mode</button>
      {props.children}
    </main>
  )
}

const App = () => {
  const [, setRerender] = useState({})
  return (
    <div style="border: 1px solid black; padding: 4px 8px">
      <RerenderTracker name='App' />
      <button onClick={() => setRerender({})}>Rerender App</button>
      <Layout>
        <Counter i='1' />
        <Counter i='2' />
      </Layout>
    </div>
  )
}

export default App;
