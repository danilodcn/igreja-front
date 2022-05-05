import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ILoggedUser } from '../types/user'

const base = {
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 5 * 1000,
}

export class APIBase {
  client: AxiosInstance
  baseUrl: string

  constructor(config: AxiosRequestConfig = {}) {
    const api_config: AxiosRequestConfig = {
      ...config,
      ...base,
    }
    this.client = axios.create(api_config)
    this.baseUrl = config.baseURL
  }
  configAuth(token: string) {
    const authorization = `Bearer ${token}`
    axios.defaults.headers.common['Authorization'] = authorization
  }
}
