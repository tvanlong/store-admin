export const setUserDataIntoLocalStorage = (data) => {
  localStorage.setItem('admin', JSON.stringify(data))
}

export const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('admin'))
}

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('admin')
}

export const setIsSignedIn = (value) => {
  localStorage.setItem('isSignedIn', value)
}

export const getIsSignedIn = () => {
  return localStorage.getItem('isSignedIn')
}
