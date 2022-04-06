import { useRef, useEffect } from 'preact/hooks'

const scriptContent = `
import React from 'https://cdn.skypack.dev/pin/react@v17.0.1-yH0aYV1FOvoIPeKBbHxg/mode=imports,min/optimized/react.js';
import { render } from 'https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/mode=imports,min/optimized/react-dom.js';

let globData;
const getData = () => {
  if (globData) {
    return globData;
  };

  return new Promise(res => {
    setTimeout(() => {
      res(globData = [{ id: 1, name: 'Jovi De Croock' }]);
    }, 2000);
  });
};

const App = () => {
  let [data] = React.useState(getData);

  if (data.then) {
    throw data;
  };

  let output = React.createElement('div', {}, 'hi');
  return output;
};

let root = document.getElementById('root');
let suspense = React.createElement(React.Suspense, { fallback: React.createElement('p', {}, 'Loading...') }, React.createElement(App, {}));

render(suspense, root);
`;

const App = () => {
  const iframe = useRef()

  useEffect(() => {
    if (!iframe.current) return;

    const iframeDoc = iframe.current.contentDocument;
    // Root
    const root = document.createElement('div')
    root.setAttribute('id', 'root')
    iframeDoc.body.appendChild(root);

    // Script
    const script = document.createElement('script');
    script.setAttribute('type', 'module');
    script.innerText = scriptContent;
    iframeDoc.body.appendChild(script);
  }, [])

  return (
    <iframe title='suspense-example' style={{ width: '100%', height: 36 }} ref={iframe} />
  )
}

export default App
