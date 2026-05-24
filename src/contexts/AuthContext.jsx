import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext(null)

const TOKEN_KEY = 'fc_access_token'
const REFRESH_KEY = 'fc_refresh_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const parseToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp * 1000 < Date.now()) return null
      return decoded
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      const decoded = parseToken(token)
      if (decoded) {
        setUser(decoded)
      } else {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(REFRESH_KEY)
      }
    }
    setLoading(false)
  }, [parseToken])

  const login = useCallback((accessToken, refreshToken) => {
    localStorage.setItem(TOKEN_KEY, accessToken)
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken)
    const decoded = jwtDecode(accessToken)
    setUser(decoded)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    setUser(null)
  }, [])

  const getToken = useCallback(() => localStorage.getItem(TOKEN_KEY), [])
  const getRefreshToken = useCallback(() => localStorage.getItem(REFRESH_KEY), [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout, getToken, getRefreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
