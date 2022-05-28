import { AxiosRequestConfig } from 'axios'
import { AuthAPI } from './api'
import { ILoggedUser } from '@/types/user'

export class UserService extends AuthAPI {
  constructor(
    user: ILoggedUser = { email: '' },
    config: AxiosRequestConfig = {}
  ) {
    super(config)
    this.user = user
  }
}
