// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import { isLoggedIn } from '../auth'
import AddEmployeeView from '@/views/AddEmployeeView.vue'
import EditEmployeeView from '@/views/EditEmployeeView.vue'

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
        path: 'about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: AboutView
      },
      {
        // add-employee
        path: 'add-employee',
        name: 'add-employee',
        component: AddEmployeeView
      },
      {
        path: 'edit-employee/:id',
        name: 'edit-employee',
        component: EditEmployeeView
      },
      {
        path: 'employee',
        name: 'employee',
        component: EmployeeView
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
