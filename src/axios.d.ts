// src/types/axios.d.ts
import { AxiosInstance } from 'axios'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
}
