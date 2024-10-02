<!-- src/views/Home.vue -->
<template>
  <h1 class="mb-4 text-2xl font-bold">Employees</h1>

  <div class="bg-white card">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table w-full table-zebra whitespace-nowrap">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Departement</th>
              <th>Position</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id">
              <td>{{ employee.name }}</td>
              <td>{{ employee.gender }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.phone }}</td>
              <td>{{ employee.date_of_birth }}</td>
              <td>{{ employee.address }}</td>
              <td>{{ employee.departement }}</td>
              <td>{{ employee.position }}</td>
              <td>{{ employee.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axiosInstance from '../axios'
import type { EmployeeResponse, Employee } from '../types/employee'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const employees = ref<Employee[]>([])

    const fetchEmployee = async () => {
      try {
        const response = await axiosInstance.get<EmployeeResponse>('/employee')
        employees.value = response.data.data.list
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }

    onMounted(() => {
      fetchEmployee()
    })

    return {
      employees
    }
  }
})
</script>
