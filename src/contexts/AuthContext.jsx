import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { isWooCommerceEnabled } from '../config/woocommerce.js'
import { jwtLogin, fetchCustomerByEmail } from '../services/woocommerceClient.js'

const AuthContext = createContext(null)

const STORAGE_KEY = 'caseoholic_auth'

function loadStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.email) return null
    return parsed
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null)

  useEffect(() => {
    setUserState(loadStoredUser())
  }, [])

  const setUser = useCallback((next) => {
    setUserState(next)
    if (next) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
    }
  }, [])

  /**
   * @param {{ email: string, password: string, username?: string }} creds — WordPress username defaults to email
   */
  const loginWithCredentials = useCallback(
    async ({ email, password, username }) => {
      if (!isWooCommerceEnabled()) {
        const u = {
          name: email.split('@')[0],
          email,
          token: null,
          wooCustomerId: null,
        }
        setUser(u)
        return u
      }
      const jwt = await jwtLogin(username || email, password)
      const token = jwt.token
      let wooCustomerId = null
      try {
        const res = await fetchCustomerByEmail(jwt.user_email || email)
        wooCustomerId = res?.customer?.id ?? null
      } catch {
        /* guest or no customer record */
      }
      const u = {
        name: jwt.user_display_name || jwt.user_nicename || email.split('@')[0],
        email: jwt.user_email || email,
        token,
        wooCustomerId,
      }
      setUser(u)
      return u
    },
    [setUser]
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [setUser])

  const value = {
    user,
    setUser,
    loginWithCredentials,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
