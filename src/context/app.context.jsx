import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getProfileFromLS } from '~/utils/auth'

const initalAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null
}

export const AppContext = createContext(initalAppContext)

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initalAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initalAppContext.profile)

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, reset }}>
      {children}
    </AppContext.Provider>
  )
}
