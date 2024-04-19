import Cookies from 'js-cookie'

export const getAccessTokenFromCookie = () => Cookies.get('access_token')

export const getProfileFromCookie = () => {
  const profile = Cookies.get('user')
  return profile ? JSON.parse(profile) : {}
}
