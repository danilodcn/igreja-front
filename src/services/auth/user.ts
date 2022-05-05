import { APIBase } from '../api'
import { ILoggingUser, ILoggedUser } from '../../types/user'

export class AuthService extends APIBase {
  async getToken(user: ILoggingUser): Promise<string> {
    const path = 'token/'
    const token = await this.client.post(path, user).then((res) => {
      return res.data.access
    })
    console.log(token)
    return token
  }
  async login(): Promise<ILoggedUser | undefined> {
    return
  }
}
