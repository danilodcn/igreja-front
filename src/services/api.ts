import axios, { AxiosInstance } from 'axios'
import { ILoggedUser } from '../types/user'

const base = {
  baseURL: 'http://localhost:8001/api/',
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 5 * 1000,
}

const apiClient: AxiosInstance = axios.create(base)

export default apiClient

export const authClient = (user: ILoggedUser): AxiosInstance => {
  const authorization = `Bearer ${user.token}`
  axios.defaults.headers.common['Authorization'] = authorization
  return axios.create({
    baseURL: 'http://localhost:8001/api/',
    headers: {
      'Content-type': 'application/json',
    },
    timeout: 5 * 1000,
  })
}
