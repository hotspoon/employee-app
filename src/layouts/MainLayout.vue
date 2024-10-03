<template>
  <v-app>
    <v-navigation-drawer v-model="isSidebarOpen" app class="elevation-1">
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link class="mt-4">
          <router-link to="/" class="text-decoration-none">
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
      <v-toolbar-title>Main Header</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="mr-4">Hi, {{ userName }}</div>
      <v-btn @click="logout" color="primary" dark>Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axiosInstance from '../axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter()
    const isSidebarOpen = ref(true) // Sidebar is open by default
    const userName = ref('')

    onMounted(() => {
      const userCookie = Cookies.get('user')
      if (userCookie) {
        const user = JSON.parse(userCookie)
        userName.value = user.name || 'User'
      }
    })

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
      logout,
      userName
    }
  }
})
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}
</style>
