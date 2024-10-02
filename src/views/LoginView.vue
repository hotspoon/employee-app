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
        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <span v-if="loading" class="loader"></span>
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axiosInstance from '../axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const router = useRouter()

    const login = async () => {
      loading.value = true
      try {
        const response = await axiosInstance.post('/auth/login', {
          email: email.value,
          password: password.value
        })

        const token = response.data.data.token
        const expiresIn = response.data.data.expires_in
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        Cookies.set('token', token, { expires: expirationDate })
        Cookies.set('expiresIn', expiresIn, { expires: expirationDate })
        Cookies.set('user', JSON.stringify(response.data.data.user_data), {
          expires: expirationDate
        })
        router.push('/')
      } catch (error) {
        console.error(error)
        // Handle login error
        alert('Login failed. Please check your email and password.')
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      loading,
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
