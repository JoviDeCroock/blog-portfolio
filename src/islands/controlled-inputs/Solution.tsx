import type { TargetedInputEvent } from 'preact'
import { useRef, useState } from 'preact/hooks'
import { RerenderTracker } from '../../content/posts/controlled-inputs/common'

const Issue = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onInput = (e: TargetedInputEvent<HTMLInputElement>) => {
    const input = inputRef.current
    if (e.currentTarget.value.length <= 3) {
      setValue(e.currentTarget.value)
    } else if (input) {
      const start = input.selectionStart ?? 0
      const end = input.selectionEnd ?? 0
      const diffLength = Math.abs(e.currentTarget.value.length - value.length)
      input.value = value
      // Restore selection
      input.setSelectionRange(start - diffLength, end - diffLength)
    }
  }

  return (
    <div style="border: 1px solid black; padding: 4px 8px">
      <RerenderTracker name="input" />
      <input ref={inputRef} value={value} onInput={onInput} />
    </div>
  )
}

export default Issue
