---
title: Modern bundling (part 1)
date: '2019-02-14T16:00:03.284Z'
subject: web
readTime: 6
published: true
---

Some people might call this title confusing, I am not talking about how we bundle but
rather about what we bundle.

You might think (or not) another post about bundling, well this topic just feels
really good to me. I hope that I can start this train of thought and help make this
step.

## Introduction

We are seeing more and more browsers fully comply to the ES2015 standards, this makes
one wonder why everything is still transpiled down to ES5.

Well most of us know the answer, IE11 is a reasonable chunk of the web usage, in this
proposal I won't be telling you to drop support for IE11 but rather move this
responsibility to the developer using bundlers, transpilers, ...

We don't really know for how long we'll be seeing the use case to support IE11,
on the bright side Microsoft has started discouraging the use of it.

### Features

Let's talk features, the main features to support in ES2015 for me are, in no 
particular order (feel free to ping me if I forget some):

- arrow func: 87% [source](https://caniuse.com/#feat=arrow-functions)
- async/await: 85% [source](https://caniuse.com/#feat=async-functions)
- classes: 87% [source](https://caniuse.com/#feat=es6-class)
- constants: 94% [source](https://caniuse.com/#feat=const)
- generators: 88% [source](https://caniuse.com/#feat=es6-generators)
- Promise: 89% [source](https://caniuse.com/#feat=promises)
- proxy: 87% [source](https://caniuse.com/#feat=proxy)
- rest: 87% [source](https://caniuse.com/#feat=rest-parameters)
- template literals: 88% [source](https://caniuse.com/#feat=template-literals)

A little extra, javascript modules are already 80% supported in the HTML script tag.
[source](https://caniuse.com/#feat=es6-module)

> Note that it is safe to assume that every browser supporting _module_, supports the modern syntax. 

### Advantages

Shipping ES2015 offers two net positives, one being that it takes less time to parse
for your browser.
Secondly it reduces the bundle size a significant amount, this makes for less code
to download AND less code to parse.

This makes the argument that CSR applications are bad for first-paint etc a bit less
present.

## Problem

Maybe after reading all this you think to yourself well we don't even have IE11 users,
let's just ship the modern bundle.

You could do this but all your dependencies you are using are still transpiled down
to ES5 (and adding them to the babel-loader/... won't "transpile it up to es2015").

This means even if you as a developer want to ship your product in ES2015 it will only
be your code combined with your dependencies in the older syntax. Since these probably
make up more than half of your code at this point in time there's not much point in
shipping your own code as modern.

### Package fields

We could introduce a new field in `package.json` to enable authors to ship ES2015 code
but do we really want to add yet another level of complexity to the package.json?

In essence this would be the most "backwards compatible" solution for documentation
and tutorials.

Doing this would in my opinion start an endless spiral, where in theory a field could
be added for every new ES version. This is something I would really want to stay away
from.

### Libraries

When we're looking at libraries we see that it is commonly accepted that the author
decides on how far the bundle is transpiled down.
Developers exclude `node_modules` from their loader and just assume it will all be
okay.

An interesting idea I have been playing with is just shipping ES2015 in the _module_
field.
If your target audience is smaller the developer using the library can add it to
their loader and noone complains (more about this later).

The biggest problem I see here is that the transition of so many libraries would take
a HUGE amount of time.

An added complexity of this could be when library authors are making use of things
that need polyfills, they could specify it somewhere in for example a pkg.json. I know
this contributes to an extra complexity again but I want a starting point for all
these things.

> Note that with this mindset library authors can easily transition to higher targets should the need arise.

### Consumer mindset

This is what troubles me the most, we would have to signify to library consumers that
the browsers they support should be part of the build step.

This adds a significant amount of complexity to the initial setup of an application,
ofcourse library authors can disclose that they are shipping ES2015/ES5 and include
what should be added to the bundler config, but do we really want to go this far?

You could argue we need a step back to move forward but I am afraid things could just
stay this way when the "nevergreen" browsers dissapear. 
However this change enables us to rapidly move forward when they really do dissapear,
by then most libraries will be shipping ES2015 and the need to disclose it will have
dropped.

### Polyfilling

For this part I'll refer to babel a lot but this also goes for TS, bublé,...

#### General

When using our transpiler we add a polyfill to support older browsers e.g.
_@babel/polyfill_, corejs,... This is a polyfill that will get downloaded even when
your browser supports these features AND when you are not using these features.

Something that could be introduced is smart-detection, which would detect what is
used in your codebase and polyfill for that or polyfill by looking at your
`browserslist` in the preset-env.

#### Libraries

Remember me saying library authors can disclose what polyfills are needed? Well this
revolves around that part.

If we'd have a plugin that would cross our code and tell us what polyfills are needed
above on one side ES5 and on the other ES2015 we would grant the possibility to
accurately polyfill.

## POC

In my spare time I made a proof of concept where it's possible to provide two bundles
one legacy and one modern. This is based on a gist found on GitHub where the modern
bundles are included in a `script type="module"` and the legacy in a
`script nomodule`.

[POC](https://www.github.com/jovidecroock/POC-ModulerLegacyBuild)

Personally my two cents after making the above work is that we have endless
possibilities in terms of supporting all browsers and shipping ES2015 to the majority.

## Closing thoughts

If i forgot to mention any problems that could arise feel free to ping [me](https://twitter.com/JoviDeC).

I would really like to propose this as an RFC on a few repositories but it is such a 
huge change to our current way of working that I really don't know where to start.

Essentially I would have no issue working together with OSS repositories on this and
help implement it.


A good point of entry for libraries would be [microbundle](https://www.github.com/developit/microbundle),
a lot of libraries use this to bundle their code.

For the polyfilling part I think we'll have to be at the TypeScript and Babel repo.

This idea initially started thanks to [benjamn](https://twitter.com/benjamn) in the apollo repositories.

> I will probably write a follow-up or expand this post.

## Sources

[Where it began](https://github.com/developit/microbundle/issues/304)
[Consuming ES2015](https://babeljs.io/blog/2018/06/26/on-consuming-and-publishing-es2015+-packages)
[Deploying ES2015](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)
[Rethink bundling](https://www.contentful.com/blog/2017/04/04/es6-modules-support-lands-in-browsers-is-it-time-to-rethink-bundling/)
[caniuse](https://caniuse.com/)
