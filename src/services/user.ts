import { AxiosRequestConfig } from 'axios'
import { ILoggedUser } from '../types/user'
import { AuthAPI } from './api'
// import { ILoggingUser, ILoggedUser } from './../types/user'

export class UserService extends AuthAPI {
  constructor(user: ILoggedUser = {}, config: AxiosRequestConfig = {}) {
    super(config)
    this.user = user
  }
}
