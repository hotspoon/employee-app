<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:relative z-20 md:z-auto md:translate-x-0 transform transition-transform duration-300 ease-in-out',
        { '-translate-x-full': !isSidebarOpen }
      ]"
      class="w-64 bg-white shadow-md"
    >
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
        <div class="flex items-center">
          <!-- Sidebar toggle button for mobile -->
          <button
            @click="toggleSidebar"
            class="block px-4 py-2 mr-4 text-white bg-blue-500 rounded md:hidden hover:bg-blue-600"
          >
            Menu
          </button>
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
import { defineComponent, ref } from 'vue'
import axiosInstance from '../axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter()
    const isSidebarOpen = ref(false)

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value
    }

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
      isSidebarOpen,
      toggleSidebar,
      logout
    }
  }
})
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>
