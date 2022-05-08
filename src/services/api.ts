import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { url } from 'inspector'
import { ILoggedUser, ILoggingUser } from '../types/user'

const base = {
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 5 * 1000,
}

export class APIBase {
  private client: AxiosInstance
  baseUrl: string
  user: ILoggedUser

  constructor(config: AxiosRequestConfig = {}) {
    const api_config: AxiosRequestConfig = {
      ...config,
      ...base,
    }
    this.client = axios.create(api_config)
    this.baseUrl = config.baseURL
    this.user = {}
  }

  async request(config: AxiosRequestConfig, auth: boolean = false) {
    if (auth) {
      const headers = { Authorization: `Bearer ${this.user?.token}` }
      config = { ...config, headers }
    }

    return await this.client(config)
      .then((res) => res.data)
      .catch((error) =>
        console.log(
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
    console.log(this.user)
    const result = await this.request({ url: 'login/', method: 'POST' }, true)
    console.log(result)
  }

  async getToken(user: ILoggingUser) {
    var result = await this.request({
      url: 'token/',
      method: 'POST',
      data: user,
    })
    const token = result.access
    this.user.token = token
  }
}
