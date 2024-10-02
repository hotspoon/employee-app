// src/auth.ts
import Cookies from 'js-cookie'
import router from './router'

export function isLoggedIn(): boolean {
  const token = Cookies.get('token')
  const expiresIn = Cookies.get('expiresIn')

  if (!token || !expiresIn) {
    return false
  }

  const expirationDate = new Date(expiresIn)
  const currentDate = new Date()

  if (currentDate >= expirationDate) {
    return false
  }

  return true
}

export function redirectToLogin() {
  Cookies.remove('token')
  Cookies.remove('expiresIn')
  router.push('/login')
}
