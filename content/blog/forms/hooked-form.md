---
title: Tinkering on hooked-form
date: '2019-01-15T00:56:03.284Z'
subject: React
readTime: 5
published: true
---

# Introduction

So as previously stated one of my side projects is _Hooked-Form_, I've been able to put quite some
work into this project.
I like the hooks api a lot, reasoning in hooks makes everything a lot more structured in my opinion.
That all aside it gives a big plus in bundle sizes when not needing to resort to classes.

This being said I'm a true fanatic when it comes to optimising what I make, that's why I've been
diving into the observed bits API of React itself, which pretty much came up empty handed for me.
I'll probably attempt it again at some later stage but yes for now I think I've got what I wanted
out of this experiment.

# Common pitfall

What's most commonly referred to as THE pitfall for forms is that when a value updates, logically
the formcontainers `values` object will cause a rerender. This implies that every context observer
(in this case the Fields) will get notified about this. Resulting in the reevaluation of the lifecycles.
Often the structure of the props passed to the actual input isn't flat and `PureComponent` won't bail you
out of a partial rerender.

This could be caused by a fresh Object (array or real object) or passing a function (.bind or inline arrow) to the component,
this causes them to never be equal by refference and thus making your PureComponet ineffective.

# Solution

In this part I'll try to shine some light on how I got to the solution and as to why every _Field_ will
be implementing this optimization by default.

## Thoughts

When I approached this problem I realised the problem was situated in the way props are passed from parent -> Field -> input,
this might seem really obvious but there's a small catch to it.
So I started thinking about a way to enable the user to bust the memoization AND to make the library prevent
the most common pitfalls.

Since hooks are becoming a thing now we've got the perfect toolkit to do this.

My first point of order was testing if `useRef` triggers a rerender even if my component was fully shielded from ever
rerendering. This was the case, so the emitting was 100% the same as for a Context.Consumer.

Secondly I had to test if returning a memoized component would yield good results, which also happened to be the case,
at this point I was fully ready to start experimenting with this.

## Implementation

First I had to build a way to never rerender, this was the premise for my small experiment to yield results,
this was easily done by doing `const Field = React.memo(() => component, () => true)` since the second argument
of memo is named `areEqual` when passed true it does not rerender.

The next part was making sure the return of my component was memoized and bustable, this could be done in line with
the above example

```
  return React.useMemo(() => React.createElement(component, props), [value, touched, error]);
```

This also happened to be the point where I started realising how viable this idea was to make Field like this by default,
more on that later though, this only needed one more thing and that was a way for the user to make parent props cause a rerender.

This could easily be done by allowing the user to pass an array of props to listen on. That's when the `watchableProps` variable
came to life.
I also opted to make this default to `['disabled', 'className']` since these are the two properties that are the same for every
input.

## Why default

Since this essentially is a hooks-form api I opted to make all `Field` components performant since if the user would want to de-opt,
the user could just use the `useField` function which essentially returns the same things but without the optimizations.

# Future

At the point of writing this I've got a three day holiday coming up where I plan to fully test this idea, along with finishing
up a side project and finally finishing my graphql-caching project.

So there's a chanche this post might get a small follow up about some caveats I did not think about with the approach I took.

# Concluding

I hope I shed some light on the thoughts behind how I make decisions and as to why I wanted to do this. I hope you
enjoyed the read and would love to hear some feedback on idea's like these. 

I know some people will be quite sceptical about people having to worry about one less thing once more but I don't
think things like these make the developer less capable or whatever. It just gives them one less problem on their mind
in a front-end world full of things to worry about.
