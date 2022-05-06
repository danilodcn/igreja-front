import { APIBase } from '../api'
import { ILoggingUser, ILoggedUser } from '../../types/user'

export class AuthService extends APIBase {
  protected async getToken(user: ILoggingUser): Promise<string> {
    const path = 'token/'
    const token = await this.client.post(path, user).then((res) => {
      console.table(res.data)
      return res.data.access
    })
    console.log(token)
    return token
  }
  async login(user: ILoggingUser): Promise<ILoggedUser | undefined> {
    const path = 'login/'
    const token = await this.getToken(user)
    this.configAuth(token)

    return await this.client.post(path).then<ILoggedUser>((res) => res.data)
  }
}
