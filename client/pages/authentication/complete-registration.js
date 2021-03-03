import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import FormStyles from '../../components/CommonStyles/Form'
import { auth } from '../../lib/firebase'
import { AuthContext } from '../../lib/useAuth'
import useForm from '../../lib/useForm'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../graphql/mutation'

export default function CompleteRegistration() {
  const router = useRouter()
  const [createUser, { loading: createLoading, error, data }] = useMutation(
    CREATE_USER
  )
  const { setToken } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const { values, handleChange, clearForm } = useForm({
    password: '',
    email: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!values.email && !values.email)
      return toast.error('Email and Password are must!!!!')

    try {
      const res = await auth.signInWithEmailLink(
        values.email,
        window.location.href
      )
      if (res.user.emailVerified) {
        window.localStorage.removeItem('email')
        const user = auth.currentUser
        await user.updatePassword(values.password)
        const { token } = await user.getIdTokenResult()

        setToken(token)
        await createUser()
        setLoading(false)
        router.push('/')
        clearForm()
      }
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
      console.log('ERROR____', err)
    }
  }

  return (
    <FormStyles onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      <h2 className="text-center">
        <fieldset
          disabled={loading || createLoading}
          aria-busy={loading || createLoading}
        >
          <label htmlFor="email">Email</label>
          <input
            value={values.email}
            onChange={handleChange}
            id="email"
            name="email"
            placeholder="example@gmail.com"
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter Password"
          />
          <button type="submit">Sign Up</button>
        </fieldset>
      </h2>
    </FormStyles>
  )
}
