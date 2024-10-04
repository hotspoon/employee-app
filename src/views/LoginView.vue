<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            v-model="email"
            required
            class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            v-model="password"
            required
            class="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <input type="hidden" v-model="csrfToken" />
        <v-btn
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-2"
          color="primary"
          data-testid="btn-submit"
        >
          <span v-if="loading" class="loader"></span>
          <span v-else>Login</span>
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axiosInstance from '../axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { generateCsrfToken, getCsrfToken } from '../lib/csrf'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const email = ref<string>('')
    const password = ref<string>('')
    const loading = ref<boolean>(false)
    const csrfToken = ref<string | undefined>('')
    const router = useRouter()

    const isProduction = false

    onMounted(() => {
      if (!getCsrfToken()) {
        csrfToken.value = generateCsrfToken()
      } else {
        csrfToken.value = getCsrfToken()
      }
    })

    const login = async () => {
      loading.value = true
      try {
        const storedCsrfToken = getCsrfToken()
        if (csrfToken.value !== storedCsrfToken) {
          throw new Error('CSRF token mismatch')
        }

        const response = await axiosInstance.post('/auth/login', {
          email: email.value,
          password: password.value,
          _csrf: csrfToken.value
        })

        const token = response.data.data.token
        const expiresIn = response.data.data.expires_in
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        Cookies.set('token', token, {
          expires: expirationDate,
          secure: isProduction,
          sameSite: 'Strict',
          httpOnly: isProduction
        })
        Cookies.set('expiresIn', expiresIn, {
          expires: expirationDate,
          secure: isProduction,
          sameSite: 'Strict',
          httpOnly: isProduction
        })
        Cookies.set('user', JSON.stringify(response.data.data.user_data), {
          expires: expirationDate,
          secure: isProduction,
          sameSite: 'Strict',
          httpOnly: isProduction
        })
        router.push('/')
      } catch (error: any) {
        console.error(error)
        // Handle login error
        if (error.message === 'CSRF token mismatch') {
          alert('CSRF token mismatch. Please refresh the page and try again.')
        } else {
          alert('Login failed. Please check your email and password.')
        }
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      loading,
      csrfToken,
      login
    }
  }
})
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
