// @ts-ignore
import { Highlighter } from 'highlight-updates/preact'
import { useRef } from 'preact/hooks';
import { RerenderTracker } from './common'

const Uncontrolled = () => {
  const inputRef = useRef<HTMLInputElement>();

  const printValue = () => {
    if (inputRef.current) {
      console.log('the <input> value is', inputRef.current.value)
    }
  }

  return (
    <div style="border: 1px solid black; padding: 4px 8px">
      <Highlighter>
        <RerenderTracker name='input' />
        <input ref={inputRef} value="I am uncontrolled" />
        <button onClick={printValue}>
          Console log value of input
        </button>
      </Highlighter>
    </div>
  );
}

export default Uncontrolled;
