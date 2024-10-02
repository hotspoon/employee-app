<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md">
      <div class="p-4 text-xl font-bold text-center border-b">Dashboard</div>
      <nav class="p-4">
        <ul>
          <li class="mb-2">
            <router-link to="/" class="block p-2 text-gray-700 rounded hover:bg-gray-200">
              Home
            </router-link>
          </li>
          <li class="mb-2">
            <router-link to="/about" class="block p-2 text-gray-700 rounded hover:bg-gray-200">
              About
            </router-link>
          </li>
          <!-- Add more links as needed -->
          <li class="mb-2">
            <router-link to="/employee" class="block p-2 text-gray-700 rounded hover:bg-gray-200">
              Employee
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex flex-col flex-1">
      <header class="flex items-center justify-between p-4 bg-white shadow-md">
        <div class="text-xl font-bold">Main Header</div>
        <div>
          <!-- User info or logout button -->
          <button
            @click="logout"
            class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </header>
      <main class="flex-1 p-4 overflow-y-auto">
        <router-view />
      </main>
      <!-- <footer class="p-4 text-center bg-white shadow-md"></footer> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axiosInstance from '../axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter()

    const logout = async () => {
      try {
        await axiosInstance.post('/auth/logout')
        Cookies.remove('token')
        Cookies.remove('user')
        Cookies.remove('expiresIn')
        router.push('/login')
      } catch (error) {
        console.error('Error during logout:', error)
        alert('Logout failed. Please try again.')
      }
    }

    return {
      logout
    }
  }
})
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>
