export const getAccessTokenFromCookie = () => {
  const access_token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    .split('=')[1]

  return access_token
}

export const getProfileFromCookie = () => {
  const profile = document.cookie
    .split('; ')
    .find((row) => row.startsWith('profile='))
    .split('=')[1]

  return JSON.parse(profile)
}
