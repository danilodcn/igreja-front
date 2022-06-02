import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { IUserState } from './types'
import { ILoggedUser } from '@/types/user'

export const state = (): IUserState => ({
  user: { email: '' },
})

export const getters: GetterTree<IUserState, IUserState> = {
  user: (state) => state.user,
}

export enum MutationTypes {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  LOGIN_USER = 'LOGIN_USER',
  INICIALIZE_STATE = 'INICIALIZE_STATE',
}

export const actions: ActionTree<IUserState, IUserState> = {
  fetchThings({ commit }) {
    const things = this.$axios.$get('/things')
    commit('CHANGE_NAME', things)
  },
}

export const mutations: MutationTree<IUserState> = {
  [MutationTypes.ACCESS_TOKEN]: (state, token: string) => {
    localStorage.setItem(MutationTypes.ACCESS_TOKEN, token)
    state.user.token = token
  },
  [MutationTypes.LOGIN_USER]: (state, user: ILoggedUser) => {
    localStorage.setItem(MutationTypes.LOGIN_USER, JSON.stringify(user))

    state.user = user
  },
}
