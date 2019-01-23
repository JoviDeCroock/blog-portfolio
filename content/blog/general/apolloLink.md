---
title: Apollo
date: '2019-01-23T16:00:03.284Z'
subject: OSS
readTime: 3
published: true
---

# Introduction

I often use open-source projects, evidently since you are
on a gatsby website, so I try to contribute as much as I
can to this community.

I can see that making my own libraries isn't always going
to help others, due to visibility and other alternatives,
I'll probably keep on doing it but I had an urge to show more
"appreciation" to the popular OSS projects I was using.

# Apollo

For myself, this was the apollo-group. I work with
graphql a lot and I really enjoy how much easier life is when
using graphql together with the apollo libraries.

My first contributions were pretty small, minor bugfixes and feature
requests.

Later this evolved to overhauling the more "primitive"
build setup, which only made a umd build.
I ended up removing the browser field because sites like _unpkg_ don't
need this to know where to find the umd build, made a cjs build for
the main field and a es5 bundle for the module field.
This es5 module bundle ensures that modern bundlers can
tree-shake and thus reducing the bundle-size when certain parts
are unused.

Recently I've started to try a bit bigger, that's when I
saw an issue on the _apollo-link_ repository about the CI being stuck,
it's worth noting that this is a monorepo of 10+ projects.

Since I didn't have that much experience I started diving into the
_CircleCI_ documentation and trying to optimise this CI process as
much as I could (Also worth noting that the _apollo-client_ repo
was optimised and served as a good example).
The initial issue was more a misconfiguration since forked repo's
weren't triggering builds but still, caching dependencies was happening
in an inefficient manner.

The build used to include a seperate step for every library in the monorepo,
my perception was that this was causing some delays. That's why I reduced this all to
one single step named _monorepo_. Which compiles, tests and reports the status
of all subrepo's.

The better caching was done through the package-locks, which gave a funny result
after it was merged since well yes... I lead in additions for the repo now after
one squashed commit.

![Screenshot showing additions after PR](./apolloLinkInsights.png)

# Concluding

This part is a bit more general. If you want to help out in OSS,
please report issues you are having and if you find the time, make
a reproduction. You can't even begin to imagine how much you are
helping out just by doing that.
Reproducing a bug is worth its weight in gold.

If you find some documentation unclear and you figure it out yourself,
at that point you are THE BEST person to suggest changes to the documentation.
That's why it's good for you to make that clear in an issue or try to do so yourself.

I hope this post motivates some people to help out in a repo by submitting
an issue with reproduction or whatever they feel like will help out!
