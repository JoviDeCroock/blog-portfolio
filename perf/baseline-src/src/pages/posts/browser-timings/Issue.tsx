const defer = Promise.prototype.then.bind(Promise.resolve())

export default function App() {
  function bubbled() {
    console.log('bubbled')
  }

  function original() {
    console.log('original')
    defer(() => {
      console.log('microtick after original')
    })
  }

  return (
    <div
      style="width:100%;border:1px solid black;padding:8px;cursor:pointer;"
      onClick={bubbled}
    >
      <div style="width:100%;" onClick={original}>
        Click me!
      </div>
    </div>
  )
}
