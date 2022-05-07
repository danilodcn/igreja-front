import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://localhost:8080/api/',
  timeout: 5000,
})

export default service
