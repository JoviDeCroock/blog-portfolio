---
title: Modern bundles
date: '2019-01-20T00:56:03.284Z'
subject: Performance
readTime: 5
published: true
---

# Introduction

Lately I've been quite verbal about bundling and the problem with
transpiling down to es5.

At this point in time library authors make the assumption about
the browser compatability of your libraries, rest assured most
just compile down to es5 and support almost every browser.

The thing that bugged me since september is that there's almost
no need for this anymore, I could see the problem being brought up
that people having the use case to support IE11 are in danger in
that regard.

## Inspirations

Most of my inspiration some months ago came from [this article](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)
back then i was looking really hard at this issue but didn't seem to
find an elegant solution.

Recently this topic was once more brought up in the [apollo-client
repository](https://github.com/apollographql/apollo-client/issues/4324#issuecomment-455332864),
which once more brought me to reason about this topic.

I soon realised that I was going about it in a way that was making everything
overcomplex. I wasn't looking at the root of the problem, which was the libraries
being already transpiled down.

# Implications

What effect does ES6 have on the average bundle you can ask, well assuming
the browsers you are supporting are in the 85% compat range, you won't have
to add tropical polyfills from all corners of the world.

In most cases this implies your bundle size cut in half and better overall
performance.

## Libraries

For libraries, the implications themself are quite minor they can still ship
a transpiled down CJS and UMD build.
The only thing needing a change is the _module_ build being shipped, instead of
making this an es5 bundle it should just be an es2015/es6 bundle.

This though should be noted on the README since this affects the consumers
of this library.

Not noting this could result in unwanted production only bugs.

## Applications

For applications not needing to support the old browsers this has no implications.

For applications that need IE11 support this would imply having to switch your loader
from `exclude: node_modules` to `include: [source, node_modules/<insert_es6_lib>]`.
This makes sure that your browser compat will be forced on the library.

I've made a small [POC](https://github.com/JoviDeCroock/POC-ModularLegacyBuild)
about this, it shows a reduced size but also a way to support both modern and legacy
browsers.

It serves a module build first and when the [script](https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc)
fires it decides to throw away the `nomodule` scripts or just use those.

The concern for babel-loader becoming slower could be thrown out there, this is a valid
concern but babel has a solution for this.
Babel allows us to cache the transpiled directory with the `cacheDirectory` option for
babel-loader.

# Done before

If you've looked at the github issue in _apollo-client_ you'll see a talk about
a new Meteor release using this approach.

So it's being pushed forward, but it will be a community effort to move towards
this approach.
