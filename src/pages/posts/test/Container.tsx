import { WebContainer } from '@webcontainer/api';
import { useEffect, useRef } from 'preact/hooks'

export const files = {
  'index.js': {
    file: {
      contents: `import { createServer } from 'node:http'
import { createSchema, createYoga } from 'graphql-yoga'

const yoga = createYoga({
  cors: true,
  landingPage: false,
  graphqlEndpoint: '/',
  schema: createSchema({
    typeDefs: /* GraphQL */ \`
      type Query {
        hello: String
      }
    \`,
    resolvers: {
      Query: {
        hello: () => 'Hello from Yoga!'
      }
    }
  })
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})`,
    },
  },
  'package.json': {
    file: {
      contents: `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "graphql-yoga": "latest",
    "graphql": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' index.js"
  }
}`,
    },
  },
};

export const ServerContainer = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    let ins: WebContainer;
    WebContainer.boot({
      coep: 'credentialless'
    }).then(async instance => {
      ins = instance
      await instance.mount(files)
      const installProcess = await instance.spawn('npm', ['install']);
      if (await installProcess.exit !== 0) {

      };

      await instance.spawn('npm', ['run', 'start']);

      instance.on('server-ready', (port, url) => {
        if (iframeRef.current) {
          iframeRef.current.src = url;
        }
      });
    })

    return () => {
      if (ins) {
        ins.teardown()
      }
    }
  }, [])

  return (
    <div>
      <textarea ref={textAreaRef} value={files['index.js']['file']['contents']} />
      <iframe style="width:1000px;height:1000px;" ref={iframeRef} />
    </div>
  );
}
