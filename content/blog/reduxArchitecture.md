---
title: Modular Redux architecture
date: '2019-02-28T16:00:03.284Z'
subject: React
readTime: 6
published: true
---

## Introduction

I have been working on a pretty big application for the last year, I'll mainly talk about the frontend side in this post.
The essential to know is that the state management stack consists of redux and redux-saga.

This application keeps on growing and we tried lazily loading some pages and this seemed to work fine but well we knew it could be done better.

In this post I'll elaborate on the concept used to achieve the architecture we are building towards and I'll close off with a minimal codesandbox showcasing this.

## Cohesion vs Coupling

One certain day we had the idea to look at our folder structure and evaluate it with these terms.

Cohesion indicates the relation of a certain part to the module. Example: grouping all actions under /actions is a form of low cohesion, while grouping all projectActions under a module named project is a form of high cohesion.

Coupling can be seen as when you change something in module x, will it affect module y. To clarify this has nothing to do with your abstractions, changing abstractions like for example a Button will most commonly affect a multitude of modules.

Good software has high cohesion within modules and low coupling between modules.
This is how we started thinking about a modular architecture for our application, spoiler alert we found it as well.

## Problem

When lazy loading we found that we introduced additional loading time, the chunk loads and only after the chunk had loaded we could start fetching our data.
This introduced an overhead we did not want, this made for a new hurdle we had to overcome before we could implement a new architecture.

We did not want for our new architecture to impose new constraints on UX.

## Architecture

Now for the final part the architecture we arrived at after some research and work.

The folder structure looks like this:

```
/common
/reducers --> static reducers
/sagas --> static sagas
/modules
  /module1
    /submodule1
    actions.js
    sagas.js
    reducers.js
    index.js
...
```

So every module contains its own submodules and redux logic, these will be injected when the module gets loaded.

When we have submodules for example when we are looking at a certain user we can control the appointments of that user then we can also make this a lazy module that only gets loaded on demand.

When we evaluated this approach within our team this seemed to scale elegantly.

### Reducers

After reading the redux documentation we found a way to dynamically inject reducers.
Note that we make a distinction between state that is always relevant like for example application metadata or a logged in user.

We alter our store as followed:

```javascript
function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  });
}

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(createReducer(), applyMiddleware(sagaMiddleware));

  store.asyncReducers = {};

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  store.removeReducer = key => {
    delete store.asyncReducers[key];
    delete store.getState()[key];
  };

  return store;
}
```

The introduction of asyncReducers allows us to always keep track of what dynamic reducers are loaded in at any given time.

The helper methods make it really easy to dynamically add and remove reducers when relevant.

### Sagas

This was a bit tricker but after some careful research we found out that when you export the sagaMiddleware you can actually just dynamically run saga's.

This seemed so easy but after some testing it turned out that you really have to remove the saga when unmounting since you can keep on adding a saga by accident. This made for some funny situation where five network requests got dispatched at the same time and no one even knew how.

That's why we made a little helper that makes use of forking the saga and cancelling when it's needed.

```javascript
function runSaga(key, saga) {
  const runnableSaga = function* main() {
    const sagaTask = yield fork(saga); // Forks the saga returning a task
    const { payload } = yield take(CANCEL_SAGA); // We listen for this action.

    if (payload === key) { // If the action is dispatched with our key cancel it.
      yield cancel(sagaTask);
    }
  };

  sagaMiddleware.run(runnableSaga); // sagaMiddleware exported from above.
}

function cancelSaga(key) {
  store.dispatch({
    type: CANCEL_SAGA,
    payload: key,
  });
}
```

For those of you who are not familiar with redux-saga fork, take and cancel all are helpers exposed by the library.

### UX-problem

The solution to this was actually quite simple, we load in the `module/index` normally so this is a static import and when it's called it will inject the saga and reducer.
After this happens it dispatches an initial action to start fetching the data, meanwhile your UI chunk is being loaded. This makes it so that the two loading parts happen at the same time, one can take longer than the other but that does not make for much difference.

The cool part is that this introduced us to a new way of loading, just like how facebook renders a seemingly empty timeline while loading the data we could do this as well while our data and UI loaded.

When the module gets unmounted it cancels the saga and removes the reducer and we can move on to the newly opened module.

### React

To achieve this we actually leverage the power of hooks, we have a `useEffect` in the module index that only runs on initial and cleans the work up when it's unmounted.
We could also do this with a componentDidMount and a componentWillUnmount but it feels really clean to be able to do this in one function.

The only thing we have to pass is a set of saga's, a set of reducers and an initialAction.

For the lazy loading we use `React.Suspense` and `React.lazy`, this feels really intuitive just provide a fallback while it's loading.

## Concluding

This approach feels quite good to me since when we unmount a module we also remove the saga, reducer and the state. This makes it that we can't add a saga double (yes this is possible) and that we can't have any stale state.
This in turn also reduces the memory consumption your webpage has at any given point.

This approach limits itself in no way only to redux-saga, this can linearly be applied to redux-thunk and many more.

Note that the approach for us had to be incrementally adoptable since we still have to be able to develop features while transitioning to the new architecture.

Feel free to give your opinion on this, I would love to hear it!

[Demo](https://codesandbox.io/s/w07qqwlkq5)

## sources

[Reducer splitting](https://redux.js.org/recipes/code-splitting)
[Code splitting](https://webpack.js.org/guides/code-splitting/)
