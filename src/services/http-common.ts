import axios, { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8001/api/',
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 5 * 1000,
})

export default apiClient
