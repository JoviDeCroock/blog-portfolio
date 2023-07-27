import { createContext } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { RerenderTracker } from './common'

const FormContext = createContext<{ values: object, setValues: (values: object) => void }>({
  values: {},
  setValues: () => {},
});

const useField = (name) => {
  const form = useContext(FormContext)

  return [
    form.values[name],
    (e) => {
      form.setValues({
        ...form.values,
        [name]: e.currentTarget.value,
      })
    }
  ]
}

const Input = (props) => {
  const [value, onInput] = useField(props.name)
  return (
    <div style={{ padding: 6, marginBottom: 8, width: '100%', border: '1px solid black' }}>
      <div style={{ marginBottom: 2 }}>
        <label style={{ marginRight: 4, width: 200 }}>{props.name}: </label>
        <input style={{ width: '60%' }} value={value} onInput={onInput} />
      </div>
      <RerenderTracker />
    </div>
  )
}

const Form = () => {
  const form = useContext(FormContext)

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form.values)
  }

  return (
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      border: '1px solid black',
      padding: 8
    }} onSubmit={onSubmit}>
      <p style={{ marginTop: 0, fontWeight: 600 }}>Contact details</p>
      <Input name='firstName' />
      <Input name='lastName' />
      <Input name='country' />
      <Input name='website' />
    </form>
  )
}

const FormProvider = (props) => {
  const [values, setValues] = useState(props.initialValues)

  return (
    <FormContext.Provider
      value={{
        values,
        setValues,
      }}
      children={props.children}
    />
  )
}

const App = () => {
  return (
    <FormProvider
      initialValues={{
        firstName: 'Jovi',
        lastName: 'De  Croock',
        country: 'Belgium',
        website: 'https://www.jovidecroock.com/',
      }}
    >
      <Form />
    </FormProvider>
  )
}

export default App;
