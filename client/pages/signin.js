import { useState } from 'react'

import Login from '../components/Login'
import Register from '../components/Register'
import {
  FormContainerStyles,
  TabStyles,
} from '../components/CommonStyles/styles'

export default function SignIn() {
  const [active, setActive] = useState('login')

  const handleClick = (name) => {
    setActive(name)
  }
  return (
    <>
      <FormContainerStyles>
        <TabStyles>
          <li
            onClick={() => handleClick('login')}
            className={`text-center ${active === 'login' ? 'active' : ''}`}
            aria-label="Go to login form"
          >
            Login
          </li>
          <li
            className={`text-center ${active === 'register' ? 'active' : ''}`}
            onClick={() => handleClick('register')}
            aria-label="Go to register form"
          >
            Register
          </li>
        </TabStyles>

        {active === 'login' && <Login />}
        {active === 'register' && <Register />}
      </FormContainerStyles>
    </>
  )
}
