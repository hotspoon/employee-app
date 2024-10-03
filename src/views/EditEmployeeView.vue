<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>
        <h1>Edit Employee</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateEmployee" ref="form">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="name" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="gender"
                :items="['male', 'female']"
                label="Gender"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="phone" label="Phone" maxlength="13" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="date_of_birth"
                label="Date of Birth"
                type="date"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="address" label="Address" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="department_id"
                :items="departments"
                label="Department"
                item-text="title"
                item-value="id"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="job_position_id"
                :items="jobPositions"
                label="Job Position"
                item-text="title"
                item-value="id"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col cols="12" md="3">
              <v-btn @click="goBack" color="secondary" class="mt-4" block> Kembali </v-btn>
            </v-col>
            <v-col cols="12" md="3">
              <v-btn type="submit" :loading="loading" color="primary" class="mt-4" block>
                Update Employee
              </v-btn>
            </v-col>
            <!-- <v-col cols="12" md="3">
              <v-btn @click="fetchEmployee" color="info" class="mt-4" block>
                Refresh Employee Data
              </v-btn>
            </v-col> -->
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getEmployeeByName, updateEmployee } from '../services/employeeService'
import axiosInstance from '../axios'

export default defineComponent({
  name: 'EditEmployeeView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id as string
    const name = ref(decodeURIComponent(route.query.name as string))
    const gender = ref('male')
    const email = ref('')
    const phone = ref('')
    const date_of_birth = ref('')
    const address = ref('')
    const department_id = ref<number | null>(null)
    const job_position_id = ref<number | null>(null)
    const loading = ref(false)
    interface Department {
      id: number
      title: string
    }

    const departments = ref<Department[]>([])
    interface JobPosition {
      id: number
      title: string
    }

    const jobPositions = ref<JobPosition[]>([])

    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get('/departement/list')
        departments.value = response.data.data
      } catch (error) {
        console.error('Error fetching departments:', error)
      }
    }

    const fetchJobPositions = async () => {
      try {
        const response = await axiosInstance.get('/position/list')
        jobPositions.value = response.data.data
      } catch (error) {
        console.error('Error fetching job positions:', error)
      }
    }

    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeByName(name.value)
        const employee = response.data.list[0]
        console.log(employee)
        name.value = employee.name
        gender.value = employee.gender
        email.value = employee.email
        phone.value = employee.phone
        date_of_birth.value = employee.date_of_birth
        address.value = employee.address

        // Find the department ID based on the department name
        const department = departments.value.find((dept) => dept.title === employee.departement)

        if (department) {
          department_id.value = department.id
        } else {
          console.error('Department not found:', employee.departement)
        }

        // Find the job position ID based on the job position name
        const jobPosition = jobPositions.value.find((pos) => pos.title === employee.position)
        if (jobPosition) {
          job_position_id.value = jobPosition.id
        } else {
          console.error('Job position not found:', employee.position)
        }
      } catch (error) {
        console.error('Error fetching employee:', error)
      }
    }

    const updateEmployeeHandler = async () => {
      loading.value = true
      try {
        const payload = {
          id: Number(id),
          name: name.value,
          gender: gender.value,
          email: email.value,
          phone: phone.value,
          date_of_birth: date_of_birth.value,
          address: address.value,
          department_id: department_id.value,
          job_position_id: job_position_id.value
        }

        const response = await updateEmployee(payload)
        console.log('Employee updated:', response.data)
        alert('Employee updated successfully!')
        // redirect to home page
        router.push('/')
      } catch (error) {
        console.error('Error updating employee:', error)
        alert('Failed to update employee. Please try again.')
      } finally {
        loading.value = false
      }
    }

    const goBack = () => {
      router.push('/')
    }

    onMounted(async () => {
      await Promise.allSettled([fetchDepartments(), fetchJobPositions()])
      fetchEmployee()
    })

    return {
      name,
      gender,
      email,
      phone,
      date_of_birth,
      address,
      department_id,
      job_position_id,
      loading,
      departments,
      jobPositions,
      updateEmployee: updateEmployeeHandler,
      goBack,
      fetchEmployee // Ensure fetchEmployee is returned here
    }
  }
})
</script>

<style scoped>
.edit-employee {
  max-width: 600px;
  margin: 0 auto;
}
</style>
