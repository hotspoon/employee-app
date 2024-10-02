<!-- src/views/LoginView.vue -->
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
          class="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Login
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
    const router = useRouter()

    const login = async () => {
      try {
        const response = await axiosInstance.post('/auth/login', {
          email: email.value,
          password: password.value
        })
        console.log(response)
        const token = response.data.data.token
        Cookies.set('token', token, { expires: 7 })
        Cookies.set('user', JSON.stringify(response.data.data.user_data), { expires: 7 })
        router.push('/')
      } catch (error) {
        console.error(error)
        // Handle login error
        alert('Login failed. Please check your email and password.')
      }
    }

    return {
      email,
      password,
      login
    }
  }
})
</script>
