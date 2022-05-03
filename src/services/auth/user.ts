import ApiClient, { authClient } from '../api'
import { ILoggingUser, ILoggedUser } from '../../types/user'

export class AuthService {
  async getToken(user: ILoggingUser): Promise<string> {
    const path = "token/"
    const token = await ApiClient.post(path, user).then(res => {
      return res.data.access
    })
    console.log(token)
    return token
  }
  async login(): Promise<ILoggedUser | undefined> {
    
    return 
  }
}
