import { Component } from 'preact';

const getData = () => new Promise(res => {
  setTimeout(() => {
    res([{ id: 1, name: 'Jovi De Croock' }])
  }, 500);
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    }
  }

  componentDidMount() {
    getData().then(data => {
      this.setState({ isLoading: false, data })
    })
  }

  render(props, { isLoading, data }) {
    if (isLoading) {
      return <p>loading...</p>
    }

    return (
      <div>
        {data.map(person => <span key={person.id}>{person.name}</span>)}
      </div>
    )
  }
}


import { useEffect, useState } from 'preact/hooks';


const Stringified = () => {
  const [html, setHtml] = useState('')

  useEffect(() => {
    // @ts-ignore
    import('https://unpkg.com/preact-render-to-string@5.1.20/dist/index.module.js?module').then(renderToString => {
      setHtml(renderToString.default(<App />))
    })
  })

  return (
    <div style="background:grey;">
      The above stringified HTML
      <code>
        <pre>
          {html}
        </pre>
      </code>
    </div>
  )
}

export default Stringified
