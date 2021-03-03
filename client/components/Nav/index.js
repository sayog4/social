import { useContext } from 'react'
import { AuthContext } from '../../lib/useAuth'
import Link from 'next/link'

import { HeaderStyles, NavStyles, LogoStyles } from './styles'
import { auth } from '../../lib/firebase'

export default function Nav() {
  const { token, setToken } = useContext(AuthContext)

  const handleLogOut = () => {
    auth.signOut()
    setToken(null)
  }

  return (
    <HeaderStyles>
      <NavStyles>
        <LogoStyles>
          <Link href="/">
            <p>SocialAPP</p>
          </Link>
        </LogoStyles>

        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {token ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <span onClick={handleLogOut}>Sign Out</span>
              </li>
            </>
          ) : (
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
          )}
        </ul>
      </NavStyles>
    </HeaderStyles>
  )
}
