---
title: Hello World
date: '2019-01-08T09:39:03.284Z'
subject: General
readTime: 2
---

# Introduction

As commonly said, a New Year a new me. Well for me that isn't the case. I've always
been into sharing my thoughts with the world but never found the confidence to do so.
That's why I opted to start a blog together with the remake of my portfolio, this due
to it being heavily [outdated](https://jovidecroock.github.io).

So what can you expect here:

- Node
- React(-native)
- TypeScript
- General programming languages
- Open-source projects and contributions
- General science matters
- Personal growth subjects
- Talking about some side-projects I'm working on
- General work subjects

I'm not claiming to be a professional writer or anything like that but I do enjoy
feedback so feel free to tweet it at me whenever you feel like it.

# Apollo-contrib

As you may or may not know I try to be an active person on the _react-apollo_ and
_apollo-client_ repository. It pleased me today to have my module bundler knowledge
tested and improved by making a PR that would enable _react-apollo_ to have a decent
esm build.

In the process of altering the build output I learned that it's better to make an
exploded commonjs output. This so that it can be consumed better by typescript users,
because with this measure every exploded file has it's own `.d.ts` equivalent.
This in turn is also what node expects and allows for module pruning.

For those who don't know what I mean with exploded it is when every file corresponds
to a file in your _src/_.

We also decided to drop the _umd_ build from our package.json, this because every
bundler understands commonjs or esm. When people want to use UMD the most common
approach is not to use it from npm but to fetch it from a CDN and insert it into a
script tag.

Another thing I learned from this is not to put your trust in a build artifact to
make an accurate estimate on bundle-size.
The bundle-size of a library can be high but after using babel to remove dev
expressions and error messages in production it goes down quite a bit.
Also a build artifact can't reflect what a user is using, it just assumes everything
is used.

So this is what I learned today and on the side what also made me really happy,
because this PR got merged!
