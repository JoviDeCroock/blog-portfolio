---
title: Web performance
date: '2019-05-04T16:00:03.284Z'
subject: Performance
readTime: 2
published: true
---

As I was recently seeing some fuzz on twitter about this I decided to give my honest
opinion on the matter.

As you might already have noticed I'm into all things performance and bundle size, don't
get me wrong I'm not going to be saying that performance etc are the only thing you need to look at.
I'll just give you my take on it.

## Audience

One clear distinction that has to be made is that you have libraries and applications (who might
consume the library). Here we can easily make up our minds that when an application uses a lib
that is not performant it can't just do something about it while it can just do something about
performance issues the app is facing.

Let's look at this through an example, let's say I have an application named Fruit&Co, where
I am using a library for forms named form-a-lisation.
Hypothetically if this form library would be slow I can't just "patch" that quickly, but if a
part of my application would be slow I can just patch that myself.

That's why I think performance matters the most when writing something that will be used by
applications.

## Team-Agreements

Now that we have gotten over that initial hump of not making performance an obsession let's talk
about what a team can do to partially prevent unlucky scenario's.
Let's talk in terms of our beloved frontend library React, where for example this scenario
is something that will make a lot of perf issues since you are thrashing your diff tree:

```jsx
const Component = () => {
  const Text = ({ children }) => <p>{children}</p>;
  return (
    <div>
      <Text>Perf Loss</Text>
    </div>
  );
}
```

A team can make agreements on certain scenario's example of agreements I like to make with
teams I start working with:

- Don't create functions inside functions, since function creation is expensive. This can even
  impose maintainability issues. A user can see a perf loss and exclude a certain function from
  `shouldComponentUpdate` and introduce stale functions.
- Don't create components (yes they are functions) inside functions/renders.
- Use PureComponent/memo where relevant.
- Keep the [Google-PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) rules in mind 

I don't think these are really hard to come by and are a good habit to have, all other perf
issues you can introduce are easier solved at the time where you have them.

## Premature optimization

So I have slightly touched upon this in the end of last part, premature optimizations are making
people loop backwards for better perf, not recreate certain objects, ... To avoid possible future
performance issues. These often impose harder to maintain code, bugs and last but not least
lost time which on applications costs money and causes missed deadlines.

So next time you have a PR where you want to make a remark, keep in mind that premature
optimization isn't the best thing to try and push through.

If anyone would like to discuss topics like these feel free to hit me up on [Twitter](https://twitter.com/JoviDeC)
