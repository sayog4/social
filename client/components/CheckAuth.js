import { useContext } from 'react'
import { AuthContext } from '../lib/useAuth'
import Link from 'next/link'

export default function CheckAuth({ children }) {
  const { token } = useContext(AuthContext)

  return token ? (
    children
  ) : (
    <div className="a-b-c">
      <Link href="/signin">You Must Be Signed In</Link>
    </div>
  )
}
