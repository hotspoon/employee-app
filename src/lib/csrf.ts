import Cookies from 'js-cookie'

export function generateCsrfToken() {
  const token = Math.random().toString(36).substring(2)
  Cookies.set('csrfToken', token, { secure: import.meta.env.PROD, sameSite: 'Strict' })
  return token
}

export function getCsrfToken() {
  return Cookies.get('csrfToken')
}
