import { useState } from 'react'

export default function useForm(initial = {}) {
  const [values, setValues] = useState(initial)

  function handleChange(e) {
    let { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  function clearForm() {
    setValues(
      Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, ''])
      )
    )
  }

  return {
    clearForm,
    handleChange,
    values,
  }
}
