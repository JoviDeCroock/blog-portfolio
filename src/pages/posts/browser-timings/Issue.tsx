const defer = Promise.prototype.then.bind(Promise.resolve());

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
    <div onClick={bubbled}>
      <div onClick={original}>Click me!</div>
    </div>
  );
}
