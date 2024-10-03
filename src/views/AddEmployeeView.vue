<!-- src/views/AddEmployeeView.vue -->
<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>
        <h1>Add Employee</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addEmployee" ref="form">
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
                Add Employee
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axiosInstance from '../axios'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AddEmployeeView',
  setup() {
    const router = useRouter()
    const name = ref('')
    const gender = ref('male')
    const email = ref('')
    const phone = ref('')
    const date_of_birth = ref('')
    const address = ref('')
    const department_id = ref(null)
    const job_position_id = ref(null)
    const loading = ref(false)
    const departments = ref([])
    const jobPositions = ref([])

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

    const addEmployee = async () => {
      loading.value = true
      try {
        const payload = {
          name: name.value,
          gender: gender.value,
          email: email.value,
          phone: phone.value,
          date_of_birth: date_of_birth.value,
          address: address.value,
          department_id: department_id.value,
          job_position_id: job_position_id.value
        }
        console.log(payload)
        const response = await axiosInstance.post('/employee', payload)
        console.log('Employee added:', response.data)
        // Reset form fields
        name.value = ''
        gender.value = 'male'
        email.value = ''
        phone.value = ''
        date_of_birth.value = ''
        address.value = ''
        department_id.value = null
        job_position_id.value = null
        alert('Employee added successfully!')
        // redirect to home page
        router.push('/')
      } catch (error) {
        console.error('Error adding employee:', error)
        alert('Failed to add employee. Please try again.')
      } finally {
        loading.value = false
      }
    }

    const goBack = () => {
      router.push('/')
    }

    onMounted(() => {
      fetchDepartments()
      fetchJobPositions()
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
      addEmployee,
      goBack
    }
  }
})
</script>

<style scoped>
.add-employee {
  max-width: 600px;
  margin: 0 auto;
}
</style>
