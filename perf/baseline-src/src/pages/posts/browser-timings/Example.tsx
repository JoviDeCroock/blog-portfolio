const defer = Promise.prototype.then.bind(Promise.resolve())

export default function Example() {
  return (
    <div style="width:100%;border:1px solid black;padding:8px;">
      <input
        id="example"
        type="checkbox"
        checked={true}
        onChange={() => {
          console.log('onChange')
          defer(() => {
            console.log('onChange - microtick delay')
          })
        }}
        onClick={() => {
          console.log('onClick')
          defer(() => {
            console.log('onClick - microtick delay')
          })
        }}
      />
      <label htmlFor="example">Click me</label>
    </div>
  )
}
