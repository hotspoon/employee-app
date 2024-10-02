// src/auth.ts
import Cookies from 'js-cookie'

export function isLoggedIn(): boolean {
  return !!Cookies.get('token')
}
