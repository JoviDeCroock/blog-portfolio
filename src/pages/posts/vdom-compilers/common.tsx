import { useRef, useState, useEffect } from 'preact/hooks'

export const DOMMutationTracker = (props) => {
  const wrapper = useRef()

  const [attributes, setAttributes] = useState([])

  useEffect(() => {
    const config = { attributes: true, subtree: true }

    const onMutate = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          setAttributes((a) => [
            ...a,
            {
              name: mutation.attributeName,
              on: mutation.target.nodeName,
            },
          ])
        }
      }
    }

    const observer = new MutationObserver(onMutate)
    observer.observe(wrapper.current, config)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={wrapper}>
      {props.children}
      {attributes.length ? (
        <>
          Attribute updates:
          <ul>
            {attributes.slice(0, 10).map((update, i) => (
              <li key={i}>
                Updated attribute {update.name} on {update.on}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}

export const RerenderTracker = (props) => {
  const rerenders = useRef(-1)
  rerenders.current++
  return (
    <p style={{ fontWeight: 600, textDecoration: 'underline' }}>
      {props.name} rerenders: {rerenders.current}
    </p>
  )
}
