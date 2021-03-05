import { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../lib/firebase'
import useForm from '../../lib/useForm'
import FormStyles from '../CommonStyles/Form'
import ErrorMessage from '../ErrorMessage'

export default function ForgotPassword() {
  const { values, handleChange, clearForm } = useForm({
    email: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await auth
      .sendPasswordResetEmail(values.email, {
        url: process.env.NEXT_PUBLIC_CONFIRM_EMAIL,
        handleCodeInApp: true,
      })
      .then(() => {
        setError('')
        toast.success(
          `Email is sent to ${values.email}. Check it out before it expires!!`
        )
        clearForm()
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }

  return (
    <FormStyles onSubmit={handleSubmit}>
      <h2 className="text-center mb">Forgot Password!!!</h2>
      {error && <ErrorMessage message={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">Email Address</label>
        <input
          value={values.email}
          onChange={handleChange}
          id="email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
        />
        <button type="submit">Sign Up</button>
      </fieldset>
    </FormStyles>
  )
}
