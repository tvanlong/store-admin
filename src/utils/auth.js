export const setUserDataIntoLocalStorage = (data) => {
  localStorage.setItem('admin', JSON.stringify(data))
}

export const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('admin'))
}

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('admin')
}
