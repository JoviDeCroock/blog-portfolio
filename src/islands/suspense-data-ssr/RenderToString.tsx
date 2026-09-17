import { Component } from 'preact'

type Person = { id: number; name: string }
type AppState = { data: Person[]; isLoading: boolean }

const getData = (): Promise<Person[]> =>
  new Promise((res) => {
    setTimeout(() => {
      res([{ id: 1, name: 'Jovi De Croock' }])
    }, 500)
  })

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props)
    this.state = {
      data: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    getData().then((data) => {
      this.setState({ isLoading: false, data })
    })
  }

  render(_props: Record<string, never>, { isLoading, data }: AppState) {
    if (isLoading) {
      return <p>loading...</p>
    }

    return (
      <div>
        {data.map((person) => (
          <span key={person.id}>{person.name}</span>
        ))}
      </div>
    )
  }
}

import { useEffect, useState } from 'preact/hooks'

const Stringified = () => {
  const [html, setHtml] = useState('')

  useEffect(() => {
    // @ts-ignore
    import('https://unpkg.com/preact-render-to-string@5.1.20/dist/index.module.js?module').then(
      (renderToString) => {
        setHtml(renderToString.default(<App />))
      }
    )
  })

  return (
    <div style="background:grey;">
      The above stringified HTML
      <code>
        <pre>{html}</pre>
      </code>
    </div>
  )
}

export default Stringified
