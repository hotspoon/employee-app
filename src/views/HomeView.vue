<template>
  <v-container>
    <v-card-title class="align-baseline justify-space-between d-flex">
      <h1 class="mb-4 text-2xl font-bold">Employees</h1>
      <v-btn color="primary" @click="navigateToAddEmployee">Add Employee</v-btn>
    </v-card-title>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="employees"
        v-model:options="options"
        :server-items-length="totalEmployees"
        :loading="loading"
        class="elevation-1"
        @update:options="fetchEmployee"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../axios'
import type { EmployeeResponse, Employee } from '../types/employee'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const employees = ref<Employee[]>([])
    const totalEmployees = ref<number>(0)
    const loading = ref<boolean>(false)
    const options = ref({
      page: 1,
      itemsPerPage: 10,
      sortBy: [],
      sortDesc: [],
      groupBy: [],
      groupDesc: [],
      multiSort: false,
      mustSort: false
    })

    const router = useRouter()

    const headers = [
      { text: 'Name', value: 'name' },
      { text: 'Gender', value: 'gender' },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'Date of Birth', value: 'date_of_birth' },
      { text: 'Address', value: 'address' },
      { text: 'Department', value: 'department' },
      { text: 'Position', value: 'position' },
      { text: 'Status', value: 'status' }
    ]

    const fetchEmployee = async () => {
      loading.value = true
      try {
        const response = await axiosInstance.get<EmployeeResponse>('/employee', {
          params: {
            page: options.value.page,
            limit: options.value.itemsPerPage
          }
        })
        employees.value = response.data.data.list
        totalEmployees.value = response.data.data.total
      } catch (error) {
        console.error('Error fetching employees:', error)
      } finally {
        loading.value = false
      }
    }

    const navigateToAddEmployee = () => {
      router.push('/add-employee')
    }

    onMounted(() => {
      fetchEmployee()
    })

    watch(options, fetchEmployee, { deep: true })

    return {
      employees,
      headers,
      totalEmployees,
      loading,
      options,
      navigateToAddEmployee,
      fetchEmployee
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
