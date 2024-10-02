// src/types/Employee.ts
export interface Employee {
  id: number
  name: string
  gender: string
  email: string
  phone: string
  date_of_birth: string
  address: string
  departement: string
  position: string
  status: string
}

export interface EmployeeResponse {
  status: boolean
  message: string
  data: {
    list: Employee[]
    total: number
    current_page: number
    total_page: number
  }
}
