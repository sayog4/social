import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { auth, googleAuthProvider } from '../../lib/firebase'
import { AuthContext } from '../../lib/useAuth'
import { useMutation } from '@apollo/client'

import useForm from '../../lib/useForm'
import FormStyles from '../CommonStyles/Form'
import { CREATE_USER } from '../../graphql/mutation'

export default function Login() {
  const [createUser, { loading: createLoading, error, data }] = useMutation(
    CREATE_USER
  )
  console.log({ data })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setToken } = useContext(AuthContext)

  const { clearForm, handleChange, values } = useForm({
    email: '',
    password: '',
  })

  const handleLoginWithGoogle = async () => {
    setLoading(true)

    try {
      const res = await auth.signInWithPopup(googleAuthProvider)
      const { user } = res
      const idToken = await user.getIdTokenResult()
      setToken(idToken.token)

      await createUser()
      clearForm()
      router.push('/')
      setLoading(true)
    } catch (error) {
      console.log('error------', error)
      toast.error(error.message)
      setLoading(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await auth.signInWithEmailAndPassword(
        values.email,
        values.password
      )
      const { user } = res
      const idToken = await user.getIdTokenResult()
      setToken(idToken.token)

      await createUser()
      router.push('/')
    } catch (error) {
      console.log('Login error===', error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <FormStyles onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      <h2 className="text-center mb">Log In</h2>
      <fieldset
        disabled={createLoading || loading}
        aria-busy={loading || createLoading}
      >
        <label htmlFor="email">Email Address</label>
        <input
          value={values.email}
          onChange={handleChange}
          id="email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
        />
        <label id="password" htmlFor="password">
          Password
        </label>
        <input
          value={values.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        <button onClick={handleLoginWithGoogle} type="button">
          LogIn with Google
        </button>
        <button type="submit">Sign Up</button>
      </fieldset>
    </FormStyles>
  )
}
