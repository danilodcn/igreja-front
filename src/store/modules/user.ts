import { ILoggedUser } from '../../types/user'

import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  user: {} as ILoggedUser,
})

export type IUserState = ReturnType<typeof state>

export const getters: GetterTree<IUserState, IUserState> = {
  user: (state) => state.user,
}

export enum UserMutationTypes {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  LOGIN_USER = 'LOGIN_USER',
  INICIALIZE_STATE = 'INICIALIZE_STATE',
}

export const mutations: MutationTree<IUserState> = {
  [UserMutationTypes.ACCESS_TOKEN]: async (state, token: string) => {
    localStorage.setItem(UserMutationTypes.ACCESS_TOKEN, token)
    state.user.token = token
  },
  [UserMutationTypes.LOGIN_USER]: async (state, user: ILoggedUser) => {
    console.log('antes', user)
    console.log('depois', JSON.stringify(user))
    localStorage.setItem(UserMutationTypes.LOGIN_USER, JSON.stringify(user))

    state.user = user
  },
  [UserMutationTypes.INICIALIZE_STATE]: async (state) => {
    const user = localStorage.getItem(UserMutationTypes.LOGIN_USER)
    const token = localStorage.getItem(UserMutationTypes.ACCESS_TOKEN)
    if (user) {
      state.user = JSON.parse(user)
    }
    if (token) {
      state.user.token = token
    }
  },
}

export const actions: ActionTree<IUserState, IUserState> = {
  fetchThings({ commit }) {
    const things = this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'Novo nome')
  },
}

export const strict = false
