---
title: Forms
date: '2019-01-10T21:39:03.284Z'
subject: React
readTime: 6
published: true
---

# Introduction

Every time I hear people talk about forms I hear them say that this is inherently
difficult. You won't ever hear me say this is not true, forms are hard BUT understanding
the logic most form libraries use makes it much easier.

They are handling the hard parts for you and enable you to write nice and declarative
forms.

In this post we'll touch on the most commonly used approach and the one I prefer personally,
The Form - Field approach.

# Basics

In a form we have our _Form_ itself, disregarding the state management form libraries, this
is our single source of truth in context of our inputs.

Most commonly in libraries like `redux-form` etc it's the global state container that carries it
and is the _Form_ more of a submit/meta handler.

This actually means that the only component holding the state of our form is this
container.

Secondly we probably have multiple _Fields_ these Fields are only their to tell which
property of your _Form_ state they represent and to pass certain handlers to the component they
are wrapping.

## Form

Mostly a _Form_ wrapper will need certain parameters to be able to function properly,
these define the behavior what to do when the user submits the form (onSubmit), the user
blurs/changes a field (validate) and what to do in case of fire (I mean errors).

Something else that could occur is that when you're updating an entity you should start
from an initialState which could be some map function or an initialValues object. These
will be passed from for example a parent after a network call.

Further there will probably be options on when to validate etc, whether or not to validate on
every keystroke, ...

Concluding: a _Form_ is our truth and will be the base distribution point for the values and the
behavior of the validation and so on.

## Field

A _Field_ wrapper will need to know what property of the state it is representing so give
the child a name!

After receiving that it will get the metadata for that property, it being touched, it
having an error, the value, ...

These will be injected into your component along with the functions like an `onChange`,
`onBlur`,... these handlers will be in contact with the main Form by means of a React.context,
so that when this handler gets called the _Form_ knows what to do with it.

Concluding: There is nothing statefull about a _Field_ wrapper it just injects the properties
into your input component.

As a personal pointer, I always try to keep the input components as dumb as humanly possible so
there's only one source of truth (makes it less error-prone in my opinion).

# Validation

This will in the start probably cause some issues, there are so many ways to validate your
form and to show errors but the most important thing to know is that there are _two_ levels
of errors, form errors and field errors.

Form errors are caused by a submit failing, so these are NetworkErrors etc.
Field errors are caused by a mandatory field being empty etc.

An error should also only be shown when the user has touched a Field or when the user tries to
submit the form in an erroneous state.
You can validate onBlur or onChange, this is a decision you should think about since on small
forms it could be better to validate onChange (or when using a complicated regex).

Group your validations in one function, this ensures that all your errors get shown at once,
this is a MUST for UX.
When working with validation there are a lot of UX things coming up, like:

- Show all your errors at the same time
- Emphasize the difference between Form and Field errors
- Make clear a Field is mandatory by putting an asterix
- Hide your error when the user is in the field
- Make sure all your fields get touched when submitting (to show errors)

Most of these errors will be handled by your form library, but it's good to keep them in mind.

# Advanced

There are some cases that might seem to be "advanced" and they are in the start but every
principle used in the technique we are explaining boils down to Fields.

## FieldArrays

This is a special form of Field, this can be used to for example say our user has `friends`
these friend will be a FieldArray, since well our user can have more than one friend.

Every friend is an object with certain properties (you're already hearing Field come down the
alley don't you?) so actually a Friend is an object with properties (_Field_).

It's important to note that a FieldArray is not responsible for holding state, it just
holds the name and renders the children with helper functions.

Concluding: this means that a FieldArray is just a Field but with the shape of an array.
This array holds objects with properties which are in turn normal fields.

## Performance

Forms can be REALLY tricky when it comes to performance. For smaller forms this is not
really relevant, but with bigger forms there are a few pitfalls that should be said:

- Using `.bind` or arrow functions in properties, this implies always rerendering, since
  there is no way for the component to know if the previous function is equal to the
  current. --> This can be solved by memoizing on the important attributes.
- Objects are almost never equal so if you want to fully optimise your `React.memo()` or
  `PureComponent` than pass your properties as flat as humanly possible! When you are not passing
  flat objects you should write your own `areEqual` or `shouldComponentUpdate`.

## Gotcha's

When dealing with selections always reason about the initial selection, when it's an update
it should be the previous value but with a create this could impose some problems.

- When preselecting ensure you set it in the _FormContainer_'s values and not just in the
  component.
- When the user has only one value for that select, just pre-select that one.

# Practical

As you may or may not know I've written my own form library named *hooked-form*, it was an
experiment to use React-hooks and to have a low bundle-size form library. This library also
exposes non-component ways of attaching your components like `useField` but I won't be using that
in this example.
Feel free to look at it [here](https://github.com/jovidecroock/hooked-form).

I'll make an example showing how we can work with this library to solve a common form issue, a
user with some properties and a collection.

```javascript
{
  name: 'Jovi',
  jobTitle: 'writer',
  friends: [{ name: 'Arvid' }],
}
```

So we're editting our user and the upper component passes us our current user in our props.
Let's dig into the code!

```jsx
import { Field, FieldArray, Form } from 'hooked-form';

const StringField = ({ required, placeholder onChange, onBlur, value, error, touched }) => (
  <React.Fragment>
    <input required={required} placeholder={placeholder} onChange={onChange} onBlur={onBlur} value={value} />
    {error && touched && // Display field error if applicable.
      <p>{error}</p>}
  </React.Fragment>
);

const Friend = ({ order, remove, index }) => {
  const onRemove = React.useCallback(() => remove(index), [index]);
  return (
    <React.Fragment>
      <Field
        component={StringField}
        name="name"
        placeholder="name"
      />
      <button onClick={onRemove}>Remove friend</button>
    </React.Fragment>
  )
}

const renderFriends = ({ value: friends, addElement, removeElement }) => {
  const addFriend = React.useCallback(() => addElement({}), [addElement]); // Memoize
  return (
    <React.Fragment>
      {friends.map((friend, fieldId, i) => (
        <Friend key={fieldId} fieldId={fieldId} remove={removeElement} index={i} />
      ))}
      <button onClick={addFriend}>Add friend</button>
    </React.Fragment>
  )
}

const FormComponent = ({ handleSubmit, errors, isSubmitting, isValid, formError }) => (
  <form onSubmit={handleSubmit}>
    {formError && <p>{formError}</p>}
    <Field
      component={StringField}
      name="name"
      required
      placeholder="Name"
    />
    <Field
      component={StringField}
      name="jobTitle"
      placeholder="Job title"
    />
    <FieldArray
      render={renderFriends}
      name="friends"
    />
    <Button disabled={Object.keys(errors).length > 0} loading={isSubmitting} type="submit">
      submit
    </Button>
  </form>
);

export default Form({
  onSubmit: async (
    values,
    { props: { saveUser }, setSubmitting, setStatus },
  ) => {
    try {
      setSubmitting(true);
      // Submit with the values
      await saveUser(values);
      setSubmitting(false);
    } catch(e) {
      setSubmitting(false);
      // Set our form level error.
      setStatus(e.message);
    }
  },
  mapPropsToValues: ({ user }) => ({
    name: user.name,
    jobTitle: user.jobTitle,
    friends: user.friends,
  }),
  validateOnBlur: true,
  onError: (error, setFormError) => setFormError(error);
  validate: ({ user }) => {
    const errors = {};
    if (!user.name) {
      // Field level error.
      errrors.name = 'This person needs a name!';
    }
    return errors;
  }
})(FormComponent);
```

I hope this shed some light on the issues with forms.

Good luck!
