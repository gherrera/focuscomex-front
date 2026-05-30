import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { jwtDecode } from 'jwt-decode'
import UserService from '../services/UserService'

const AuthContext = createContext(null)

const TOKEN_KEY = 'fc_access_token'
const REFRESH_KEY = 'fc_refresh_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    setUser(null)
  }, [])

  const parseToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp * 1000 < Date.now()) return null
      return decoded
    } catch {
      return null
    }
  }, [])

  const loadUser = useCallback(async () => {
    const u = await UserService.getUser()
    setUser(u)
    return u
  }, [])

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY)
        if (!token) return

        const decoded = parseToken(token)
        if (!decoded) {
          clearSession()
          return
        }

        await loadUser()
      } catch {
        clearSession()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [clearSession, loadUser, parseToken])

  const login = useCallback(async (accessToken, refreshToken) => {
    localStorage.setItem(TOKEN_KEY, accessToken)
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken)
    const decoded = parseToken(accessToken)
    if (!decoded) {
      clearSession()
      throw new Error('Token invalido o expirado')
    }

    setLoading(true)
    try {
      await loadUser()
    } catch (error) {
      clearSession()
      throw error
    } finally {
      setLoading(false)
    }
  }, [clearSession, loadUser, parseToken])

  const logout = useCallback(() => {
    clearSession()
  }, [clearSession])

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
