// src/services/employeeService.ts
import axiosInstance from '../axios'

export const getEmployees = async () => {
  try {
    const response = await axiosInstance.get('/employee')
    return response.data
  } catch (error) {
    console.error('Error fetching employees:', error)
    throw error
  }
}

export const getEmployeeById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/employee/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error)
    throw error
  }
}

export const addEmployee = async (employeeData: {
  name: string
  email: string
  position: string
}) => {
  try {
    const response = await axiosInstance.post('/employee', employeeData)
    return response.data
  } catch (error) {
    console.error('Error adding employee:', error)
    throw error
  }
}

export const updateEmployee = async (id: string, employeeData: any) => {
  try {
    const response = await axiosInstance.put(`/employee`, employeeData)
    return response.data
  } catch (error) {
    console.error(`Error updating employee with id ${employeeData.id}:`, error)
    throw error
  }
}

export const deleteEmployee = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/employee`, {
      id: id
    })
    return response.data
  } catch (error) {
    console.error(`Error deleting employee with id ${id}:`, error)
    throw error
  }
}
