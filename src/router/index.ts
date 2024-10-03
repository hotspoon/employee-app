import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import { isLoggedIn } from '../auth'

const routes = [
  {
    path: '/',
    component: MainLayout,
    beforeEnter: (to: any, from: any, next: any) => {
      if (!isLoggedIn()) {
        next('/login')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },

      {
        path: 'add-employee',
        name: 'add-employee',
        component: () => import('@/views/AddEmployeeView.vue')
      },
      {
        path: 'edit-employee/:id',
        name: 'edit-employee',
        component: () => import('@/views/EditEmployeeView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: LoginView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
