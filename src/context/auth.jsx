import React, { useState, createContext } from 'react'
import { googleLogout } from '@moeindana/google-oauth'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false)
  const [user, setUser] = useState()

  async function handleSignIn(data) {
    const { access_token } = data
    if (data && access_token) {
      localStorage.setItem('token', access_token)
    }

    setSigned(true)
    setUser(data)
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    googleLogout()
    setUser()
    setSigned(false)
  }

  const state = {
    signed,
    user,
    handleSignIn,
    handleSignOut
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider
