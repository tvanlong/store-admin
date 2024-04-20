import { createContext, useState } from 'react'
import { getUserDataFromLocalStorage } from '~/utils/auth'

const initalAppContext = {
  isAuthenticated: Boolean(getUserDataFromLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getUserDataFromLocalStorage(),
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
