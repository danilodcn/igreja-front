import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ILoggedUser, ILoggingUser } from '../types/user'
import { AuthService } from '../services/auth/user'

// export const state = () => ({
//   user: undefined as ILoggedUser | undefined,
// })

// export const mutations = {
//   login(state: ILoggedUser, user: ILoggedUser) {
//     state = user
//   },
//   logout(state: ILoggedUser) {
//     state = undefined
//   },
// }

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
export class User extends VuexModule {
  user: ILoggedUser = { name: '' }

  @Mutation
  login(user: ILoggedUser) {
    this.user = user
  }

  @Mutation
  logout() {
    this.user = { name: '' }
  }

  @Action
  async loginUser(user: ILoggingUser) {
    const service = new AuthService()

    this.user = await service.login(user)
  }
}
