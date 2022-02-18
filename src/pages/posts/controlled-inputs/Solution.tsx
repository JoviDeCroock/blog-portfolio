// @ts-ignore
import { Highlighter } from 'highlight-updates/preact'
import { useRef, useState } from "preact/hooks";
import { RerenderTracker } from './common'

const Issue = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>();

  const onInput = (e) => {
    if (e.currentTarget.value.length <= 3) {
      setValue(e.currentTarget.value)
    }
    inputRef.current.value = value;
  }

  return (
    <div style="border: 1px solid black; padding: 4px 8px">
      <Highlighter>
        <RerenderTracker name='input' />
        <input ref={inputRef} value={value} onInput={onInput} />
      </Highlighter>
    </div>
  )
}

export default Issue
