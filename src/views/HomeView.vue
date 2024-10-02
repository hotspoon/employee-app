<template>
  <v-container>
    <v-card-title class="align-baseline justify-space-between d-flex">
      <h1 class="mb-4 text-2xl font-bold">Employees</h1>
      <v-btn color="primary" @click="navigateToAddEmployee">Add Employee</v-btn>
    </v-card-title>

    <v-card>
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </template>
      <v-data-table
        :items="employees"
        v-model:options="options"
        :server-items-length="totalEmployees"
        :loading="loading"
        class="elevation-1"
        @update:options="fetchEmployee"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <div class="icon-container">
            <v-icon small @click="editEmployee(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteEmployee(item)">mdi-delete</v-icon>
          </div>
        </template>
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
    const search = ref('')
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

    const fetchEmployee = async () => {
      loading.value = true
      try {
        const response = await axiosInstance.get<EmployeeResponse>('/employee', {
          params: {
            page: options.value.page,
            limit: options.value.itemsPerPage,
            search: search.value
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

    const editEmployee = (employee: Employee) => {
      router.push({ name: 'edit-employee', params: { id: employee.id } })
    }

    const deleteEmployee = async (employee: Employee) => {
      if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
        try {
          await axiosInstance.delete(`/employee/${employee.id}`)
          fetchEmployee()
        } catch (error) {
          console.error('Error deleting employee:', error)
        }
      }
    }

    onMounted(() => {
      fetchEmployee()
    })

    watch(
      () => options.value.page,
      (newPage, oldPage) => {
        if (newPage !== oldPage) {
          fetchEmployee()
        }
      }
    )

    watch(
      () => options.value.itemsPerPage,
      (newLimit, oldLimit) => {
        if (newLimit !== oldLimit) {
          fetchEmployee()
        }
      }
    )

    return {
      search,
      employees,
      totalEmployees,
      loading,
      options,
      navigateToAddEmployee,
      fetchEmployee,
      editEmployee,
      deleteEmployee
    }
  }
})
</script>

<style scoped>
.icon-container {
  display: flex;
  gap: 8px; /* Adjust the gap as needed */
}
</style>
