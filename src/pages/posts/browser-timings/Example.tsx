const defer = Promise.prototype.then.bind(Promise.resolve());

export default function Example() {
  return (
    <div>
      <input
        id='example'
        type="checkbox"
        checked={true}
        onChange={() => {
          console.log("onChange");
          defer(() => {
            console.log("onChange - microtick delay");
          });
        }}
        onClick={() => {
          console.log("onClick");
          defer(() => {
            console.log("onClick - microtick delay");
          });
        }}
      />
      <label htmlFor='example'>Click me</label>
    </div>
  );
}
