import { useState, createContext, useEffect } from 'react'
import nookies from 'nookies'
import { auth } from './firebase'

export const AuthContext = createContext({ user: null })

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setToken(null)
        return nookies.set(undefined, 'token', '', { path: '/' })
      }
      const idToken = await user.getIdTokenResult()
      setToken(idToken.token)
      nookies.set(undefined, 'token', idToken.token, { path: '/' })
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}
