// @ts-ignore
import { Highlighter } from 'highlight-updates/preact'
import { useRef, useState } from "preact/hooks";
import { RerenderTracker } from './common'

const Issue = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>();

  const onInput = (e) => {
    if (e.currentTarget.value.length > 3) return;
    setValue(e.currentTarget.value)
  }

  const printValue = () => {
    if (inputRef.current) {
      console.log('the <input> value is', inputRef.current.value)
      console.log('the state value is', value)
    }
  }

  return (
    <div style="border: 1px solid black; padding: 4px 8px">
      <Highlighter>
        <RerenderTracker name='input' />
        <input ref={inputRef} value={value} onInput={onInput} />
        <button onClick={printValue}>
          Console log value of input
        </button>
      </Highlighter>
    </div>
  )
}

export default Issue
