---
title: React hooks demystified
date: '2019-03-15T16:00:03.284Z'
subject: React
readTime: 9
published: true
---

# Introduction

In React we have two types of components, a class and a function.
A class was almost always the choice when we needed logic and/or state, since this was not possible in the component functions (widely called stateless functional components up to the arrival hooks).

These times have changed since now we have Hooks!

## What are hooks

It is not only meant to introduce state into our functional components but also ways to:

- replace lifecycles to handle side effects
- introduce mutable refs
- compose logic

We are dealing with something that can help us improve our abstractions and use them without having to make a higher order component or render props component for it.

Hooks can only be called inside functional components (so not in classes) and should be declared on the top-level.

### Higher order components

A higher order component makes it possible to reuse component logic. This is not some magical thing provided by React but more of a design pattern (just like regular high order functions, think of debounce).

Most libraries export a HOC, classically starting with "with", that injects the specific props for that library, like react-router's `withRouter`. In the withRouter case when you wrap it around your component `withRouter(myComponent)` then your component will have the history, match, ... injected into its properties.

### Lifecycles

A lifecycle is a way to react to renders in a class component, these are (most important ones):
- componentDidMount (after the first time this component is mounted into the dom)
- componentDidUpdate (after the component updates due to props changing)
- componentWillUnmount (before the component is unmounted)

## Why not use a class

Well classes have historically proven to be more complex than regular functions, the big part here being played by our mysterious _this_.

When using a class we have to polyfill that if we want to support younger browsers which automatically makes our application heavier than with just regular functions.

# The hooks

In this part I'll elaborate on the hooks I consider to be most useful in day-to-day development. In here I'll also include some of my pointers.

## useState

This is the same as the `this.state` on a class, it holds a value which you can alter with a function.

Basic usage:

```jsx
const Post = ({ title }) => {
  const [likes, setLikes] = React.useState(0);
  const like = () => setLikes(likes + 1);
  return (
    <div>
      <p>{title} {likes}</p>
      <button onClick={like}>Like!</button>
    </div>
  )
}
```

The argument we pass to useState is the initial value, this returns us an array of [value, alterValue]. This might not be a common sight but this is array destructuring. The good thing about this is that you can freely name your variable.

You can also lazily initialise your initialise your initialState, let's evaluate this statement a bit.
Example, our initialState is this: `users.filter(({ age }) => age > 40)`.
Every time we come across this function it will be evaluated but if we write `() => users.filter(({ age }) => age > 40)`. It will only be executed once.

The setter, in this case `setLikes`, can be used in two different ways:

- setLikes(value)
- setLikes((currentValue) => newValue)

The second grants you the most certainty about altering the most recent value.

Me personally I only write useState when it's a single value, for example a number, boolean,... For arrays and Objects i tend to use the next one _useReducer_.

## useReducer

This hook is very alike to the reducers from redux, so `useReducer` accepts a first argument which is a function (the reducer function) and the second an initialState.

Example reducer function:

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'LIKE': {
      return { ...state, likes: state.likes + 1 }
    }
    default: throw new Error('Unknown action received')
  }
}
```

Personally I really like to make the default throw an error since these reducers are isolated. This hook returns again an array with the first argument being the current state and the second a function that is often called `dispatch`. This because you can give this an object with a certain type. This object will be passed to the reducer function (you can see this function above) as the second argument and will trigger a certain state transformation depending on what type this action is.

```jsx
const Post = ({ title }) => {
  const [state, dispatch] = React.useReducer(reducer, { title, likes: 0 });
  const like = () => dispatch({ type: 'LIKE' });
  return (
    <div>
      <p>{state.title} {state.likes}</p>
      <button onClick={like}>Like!</button>
    </div>
  )
}
```

So everytime we click the button an action of type "LIKE" gets dispatched, which matches on the first case. Meaning our likes will be incremented by one.


## useRef

It used to be so that when we wanted to have a ref on a component we had to make a class, now that has changed!
We now have React.useRef, this returns us a refObject which we can place on a component/html-element.

```jsx
const Input = () => {
  const textInputRef = React.useRef();
  return <input ref={textInputRef} />
}
```

now the `textInputRef.current` will be the input-element meaning we can do things like textInputRef.current.focus() to focus it.

useRef can also be used to for example hold a previous version of a value or hold a variable like we used to on classes, this.hasMounted = true (not a good practice but it states a good example)

## useCallback

In all my examples you see me binding the function in render, which makes a new function on every render.
This makes it so that a PureComponent can't ever have shallow equal props... React to the rescue with useCallback!

useCallback returns the same function aslong as the inputs are equal, let's improve the function "like" from the useState example:

```jsx
const Post = ({ title }) => {
  const [likes, setLikes] = React.useState(0);
  const like = React.useCallback(() => setLikes(likes + 1), [setLikes, likes]);
  return (
    <div>
      <p>{title} {likes}</p>
      <button onClick={like}>Like!</button>
    </div>
  )
}
```

aslong as setLikes and likes don't change our like function will always have the same reference, meaning it is equal to the previous by reference.


## useMemo

This allows us to memoize expensive calculations, this uses the same array inputs mechanism as useCallback.

Let's say we want to filter a list for people over age 40, we don't want to do this on every render, instead we would want this to only happen when our users array changes.

```jsx
const Persons = ({ people }) => {
  const overForty = React.useMemo(() => people.filter(({ age }) => age > 40), [people]);
  return overForty.map(({ name }) => <p>{name}</p>)
}
```

## useEffect

When we want to let's say dispatch a redux action to fetch data when our component mounts or when a variable changes we can now do so in functional components thanks to useEffect.

```jsx
const PersonsContainer = ({ isLoading, fetchPersons, maxAge }) => {
  React.useEffect(() => {
    fetchPersons({ maxAge });
  }, [maxAge])
  return isLoading ? 'loading' : 'loaded';
}
```

In this example every time maxAge changes it will trigger a refetch.

You can also return a function to useEffect, this function will be executed when the effect gets cleaned up, this means that is very good to handle unsubscribing and things like that.


## useLayoutEffect

This alike to useEffect only that it is meant for side effects on the layout, so let's say you want to focus an input on mount and blur it on unmount (this is a pretty useless example but let's go with it).

```jsx
const Input = () => {
  const textInputRef = React.useRef();
  useLayoutEffect(() => {
    textInputRef.current.focus();
    return () => textInputRef.current.blur();
  }, [])
  return <input ref={textInputRef } />
}
```

An empty inputs array never changes so it will only run on the first function execution and the cleanup only when it is not mounted anymore.

# Custom hooks

Hooks are ideal to replace render props/high order components, this means that it is a really good way to compose logic.

Let's say we want to set the document title and make it listen to changes, then we can make a simple custom hook:

```jsx
export default function useTitle(title) {
  useEffect(() => { document.title = title }, [title])
}
```

# Some conversions

Let's see how classes translate to hooks with a few common scenario's.

## ScrollToTop

A common component used to make the user always start at the top of the page when navigating around.

### Before

```jsx
class ScrollToTop extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({
      listen: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    const { history } = this.props;
    this.historyUnlisten = history.listen(() => window.scrollTo(0, 0));
  }

  componentWillUnmount() {
    this.historyUnlisten();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
```

### After

```jsx
const ScrollToTop = ({ children, history }) => {
  React.useLayoutEffect(() => {
    const unlisten = history.listen(() => window.scrollTo(0, 0));
    return () => { unlisten(); };
  }, []);
  return children;
};

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
  }),
};
```

Note that the layoutEffect only triggers once to listen and the disposer to unlisten, this is a didMount and willUnmount all at once.

## Datalist

Ah, the classic datalist with searches, pagination and fetching...

### Before

```jsx
const ComponentForX = ({ name }) => <p>{name}</p>;

const LIMITS = [10, 20, 50];

class DataList extends PureComponent {
  state = {
    page: 0,
    limit: 10,
    search: '',
  }

  componentDidMount() {
    const { fetchData } = this.props;
    const { limit, page, search } = this.state;
    fetchData({ limit, page, search });
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchData } = this.props;
    const { limit, page, search } = this.state;
    if (
      limit !== prevState.limit
      || page !== prevState.page
      || search !== prevState.search
    ) {
      fetchData({ limit, page, search });
    }
  }

  changeLimit = (newLimit) => {
    this.setState({ limit: newLimit });
  }

  onChangeSearch = (e) => {
    this.setState({ search: e.currentTarget.value });
  }

  nextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  }

  prevPage = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 });
  }

  render() {
    const { limit: currentLimit, search } = this.state;
    const { data } = this.props;
    return (
      <div>
        <input
          placeholder="search"
          onChange={this.onChangeSearch}
          value={search}
          type="text" />
        {LIMITS.map(limit => (
          <button
            key={limit}
            className={currentLimit === limit ? 'selected' : null}
            type="button"
            onClick={this.changeLimit.bind(this, limit)}>
            {limit}
          </button>
        ))}
        {data.map(x => <ComponentForX key={x.id} {...x} />)}
        <button type="button" onClick={this.prevPage}>Previous page</button>
        <button type="button" onClick={this.nextPage}>Next page</button>
      </div>
    );
  }
}
```

### After

```jsx
const ComponentForX = ({ name }) => <p>{name}</p>;

const LIMITS = [10, 20, 50];

const DataList = ({ data, fetchData }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentLimit, setCurrentLimit] = React.useState(10);
  const [currentSearch, setCurrentSearch] = React.useState('');

  React.useEffect(() => {
    fetchData({ limit: currentLimit, page: currentPage, search: currentSearch });
  }, [currentPage, currentLimit, currentSearch]);

  const changeLimit = React.useCallback((newLimit) => {
    setCurrentLimit(() => newLimit);
  }, []);

  const onChangeSearch = React.useCallback((e) => {
    setCurrentSearch(() => e.currentTarget.value);
  }, []);

  const nextPage = React.useCallback(() => {
    setCurrentPage(p => p + 1);
  }, []);

  const prevPage = React.useCallback(() => {
    setCurrentPage(p => p - 1);
  }, []);

  return (
    <div>
      <input
        placeholder="search"
        onChange={onChangeSearch}
        value={currentSearch}
        type="text" />
      {LIMITS.map(limit => (
        <button
          key={limit}
          className={currentLimit === limit ? 'selected' : null}
          type="button"
          onClick={changeLimit.bind(undefined, limit)}>
          {limit}
        </button>
      ))}
      {data.map(x => <ComponentForX key={x.id} {...x} />)}
      <button type="button" onClick={prevPage}>Previous page</button>
      <button type="button" onClick={nextPage}>Next page</button>
    </div>
  );
};
```

Note that in our setters we aren't rebinding the function when the state setter changes, this is because when you give a function as argument you are working with a non-stale reference.

# Pitfalls

- not having enough variables in your inputs array, meaning that it could be using stale references
- over abstraction, it's better to compose several hooks than to make one big abstraction
- conditional hooks or hooks in loops, conditions can be made with the array operator when needed, see useEffect, ...

# Best practices

- start your custom hooks with use and camel case it, example: useToggle, useReduxModule, ...
- discuss an order of hooks this way you always have a consistent overview on your components

## ESLint plugin

It would not be a React release if it wasn't accompanied by a great way to help us developers understand the quirks of these hooks.

That's why the React team made an [ESLint plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) to help avoid these pitfalls and enforce the best practices.

# Concluding

Hooks are an excellent way to improve on the abstractions we have without always having to make wrapper components/functions to inject the abstracted logic. Now we can use them inside the render of our functional components.

Note that the [documentation](https://reactjs.org/docs/hooks-intro.html) about this topic is top-notch and goes into even more depth and use cases than covered in this post.

I think there are many great things to come in the React world and this new concept is a great one at that.
