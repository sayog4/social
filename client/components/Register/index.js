import { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../lib/firebase'
import useForm from '../../lib/useForm'
import FormStyles from '../CommonStyles/Form'

export default function Register() {
  const { clearForm, handleChange, values } = useForm({
    email: '',
  })
  console.log('env-----', process.env.NEXT_PUBLIC_CONFIRM_EMAIL)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    await auth.sendSignInLinkToEmail(values.email, {
      url: process.env.NEXT_PUBLIC_CONFIRM_EMAIL,
      handleCodeInApp: true,
    })
    window.localStorage.setItem('email', values.email)
    toast.success(
      `Email is sent to ${values.email}.Click on link to complete your registration.`
    )
    setLoading(false)
  }

  return (
    <FormStyles onSubmit={handleSubmit}>
      <h2 className="text-center mb">Register</h2>
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
