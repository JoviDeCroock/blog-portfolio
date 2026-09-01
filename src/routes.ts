import { defineApp, group, route } from '@pracht/core'

/**
 * Every route on this site is static: the HTML and its head metadata are
 * produced at build time, so the whole app deploys as plain files.
 */
export const app = defineApp({
  shells: {
    public: './shells/public.tsx',
  },
  notFound: {
    component: './routes/not-found.tsx',
    shell: 'public',
  },
  routes: [
    group({ shell: 'public', render: 'ssg' }, [
      route('/', './routes/home.tsx', { id: 'home' }),
      route('/blog', './routes/blog.tsx', { id: 'blog' }),
      // Prose only — no framework JavaScript.
      route('/blueprint', './routes/blueprint.tsx', {
        id: 'blueprint',
        hydration: 'none',
      }),

      // Blog posts. One route module per post, wrapping its MDX content.
      // Posts that are pure prose declare hydration: 'none' and ship no
      // framework JavaScript; the rest embed interactive demos and hydrate.
      route('/blog/browser-timings', './routes/posts/browser-timings.tsx', {
        id: 'browser-timings',
      }),
      route('/blog/controlled-inputs', './routes/posts/controlled-inputs.tsx', {
        id: 'controlled-inputs',
      }),
      route(
        '/blog/graphqls-missing-feature',
        './routes/posts/document-authoring-missing-feature.tsx',
        { id: 'graphqls-missing-feature', hydration: 'none' }
      ),
      route(
        '/blog/drydock-release-defenses',
        './routes/posts/drydock-release-defenses.tsx',
        { id: 'drydock-release-defenses', hydration: 'none' }
      ),
      route(
        '/blog/effect-subscriptions',
        './routes/posts/effect-subscriptions.tsx',
        { id: 'effect-subscriptions', hydration: 'none' }
      ),
      route(
        '/blog/fed-up-with-belgium',
        './routes/posts/fed-up-with-belgium.tsx',
        { id: 'fed-up-with-belgium', hydration: 'none' }
      ),
      route('/blog/fragments-in-vdom', './routes/posts/fragments-in-vdom.tsx', {
        id: 'fragments-in-vdom',
        hydration: 'none',
      }),
      route(
        '/blog/graphql-abstract-types',
        './routes/posts/graphql-abstract-types.tsx',
        { id: 'graphql-abstract-types', hydration: 'none' }
      ),
      route(
        '/blog/graphql-asterisk-problem',
        './routes/posts/graphql-asterisk-problem.tsx',
        { id: 'graphql-asterisk-problem', hydration: 'none' }
      ),
      route(
        '/blog/graphql-development-workflow',
        './routes/posts/graphql-development-workflow.tsx',
        { id: 'graphql-development-workflow', hydration: 'none' }
      ),
      route('/blog/graphql-myths', './routes/posts/graphql-myths.tsx', {
        id: 'graphql-myths',
        hydration: 'none',
      }),
      route('/blog/hydration-and-preact', './routes/posts/hydration.tsx', {
        id: 'hydration-and-preact',
        hydration: 'none',
      }),
      route(
        '/blog/llm-signals-debugging',
        './routes/posts/llm-signals-debugging.tsx',
        { id: 'llm-signals-debugging', hydration: 'none' }
      ),
      route(
        '/blog/changed-my-mind-about-graphql',
        './routes/posts/mind-graphql.tsx',
        { id: 'changed-my-mind-about-graphql', hydration: 'none' }
      ),
      route('/blog/mixed-signals', './routes/posts/mixed-signals.tsx', {
        id: 'mixed-signals',
        hydration: 'none',
      }),
      route(
        '/blog/persisted-operations',
        './routes/posts/persisted-operations.tsx',
        { id: 'persisted-operations', hydration: 'none' }
      ),
      route('/blog/platform', './routes/posts/platform.tsx', {
        id: 'platform',
      }),
      route('/blog/preact-use-id', './routes/posts/preact-use-id.tsx', {
        id: 'preact-use-id',
        hydration: 'none',
      }),
      route(
        '/blog/referential-stability-types',
        './routes/posts/referential-stability-types.tsx',
        { id: 'referential-stability-types', hydration: 'none' }
      ),
      route(
        '/blog/resumed-hydration-preact',
        './routes/posts/resumed-hydration-preact.tsx',
        { id: 'resumed-hydration-preact', hydration: 'none' }
      ),
      route(
        '/blog/secure-npm-publishing',
        './routes/posts/secure-npm-publishing.tsx',
        { id: 'secure-npm-publishing', hydration: 'none' }
      ),
      route('/blog/signals', './routes/posts/signals.tsx', {
        id: 'signals',
        hydration: 'none',
      }),
      route('/blog/signals-debugging', './routes/posts/signals-debugging.tsx', {
        id: 'signals-debugging',
        hydration: 'none',
      }),
      route('/blog/surgical-rendering', './routes/posts/signals-fetch.tsx', {
        id: 'surgical-rendering',
        hydration: 'none',
      }),
      route('/blog/skew-based-diffing', './routes/posts/skew-based-diff.tsx', {
        id: 'skew-based-diffing',
        hydration: 'none',
      }),
      route('/blog/state-in-vdom', './routes/posts/state-in-vdom.tsx', {
        id: 'state-in-vdom',
      }),
      route('/blog/state-models', './routes/posts/state-models.tsx', {
        id: 'state-models',
        hydration: 'none',
      }),
      route('/blog/state-vs-signals', './routes/posts/state-vs-signals.tsx', {
        id: 'state-vs-signals',
      }),
      route('/blog/suspense-data-ssr', './routes/posts/suspense-data-ssr.tsx', {
        id: 'suspense-data-ssr',
      }),
      route('/blog/tracking-context', './routes/posts/tracking-context.tsx', {
        id: 'tracking-context',
        hydration: 'none',
      }),
      route(
        '/blog/unreliable-vendors',
        './routes/posts/unreliable-vendors.tsx',
        { id: 'unreliable-vendors', hydration: 'none' }
      ),
      route('/blog/vdom-compilers', './routes/posts/vdom-compilers.tsx', {
        id: 'vdom-compilers',
      }),
      route(
        '/blog/why-computed-matters',
        './routes/posts/why-computeds-matter.tsx',
        { id: 'why-computed-matters', hydration: 'none' }
      ),
    ]),
  ],
})
