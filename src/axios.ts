// src/axios.ts
import axios from 'axios'
import { redirectToLogin } from './auth'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: 'https://api-interview-vue.bayarind.id/api',
  headers: { 'Content-Type': 'application/json' }
})

// Add a request interceptor to include the authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      redirectToLogin()
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
