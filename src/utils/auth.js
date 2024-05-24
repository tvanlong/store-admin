export const setUserDataIntoLocalStorage = (data) => {
  localStorage.setItem('admin', JSON.stringify(data))
}

export const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('admin'))
}

export const removeLocalStorage = () => {
  localStorage.removeItem('isSignedInAdmin')
  localStorage.removeItem('admin')
}

export const setIsSignedIn = (value) => {
  localStorage.setItem('isSignedInAdmin', value)
}

export const getIsSignedIn = () => {
  return localStorage.getItem('isSignedInAdmin') || ''
}
