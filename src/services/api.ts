/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ILoggedUser, ILoggingUser } from '@/types/user'

const base = {
  baseURL: process.env.hostAPI,
  headers: {
    'Content-type': 'application/json',
  },
  // timeout: 5 * 1000,
}

export class APIBase {
  private client: AxiosInstance
  baseUrl: string
  user: ILoggedUser

  constructor(config: AxiosRequestConfig = {}) {
    const apiConfig: AxiosRequestConfig = {
      ...base,
      ...config,
    }
    this.client = axios.create(apiConfig)
    this.baseUrl = config.baseURL
    this.user = { email: '' }
  }

  urlJoin(url: string) {
    return `${this.baseUrl}/${url}`
  }

  async request(config: AxiosRequestConfig, auth: boolean = false) {
    if (auth) {
      const headers = { Authorization: `Bearer ${this.user?.token}` }
      config = { ...config, headers }
    }

    return await this.client(config)
      .then((res) => res.data)
      .catch((error) =>
        console.error(
          'Houve um erro na requisição; url=',
          config.url,
          '; erro= ',
          error
        )
      )
  }
}

export class AuthAPI extends APIBase {
  async getUser(user: ILoggingUser) {
    await this.getToken(user)
    const result = await this.request({ url: 'login/', method: 'POST' }, true)
    return result
  }

  async getToken(user: ILoggingUser) {
    const result = await this.request({
      url: 'token/',
      method: 'POST',
      data: user,
    })
    const token = result.access
    this.user.token = token
  }
}
