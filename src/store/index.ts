import { ILoggedUser, ILoggingUser } from '../types/user'
import { getUser } from '../api/users'

import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  user: {} as ILoggedUser,
})

export type IRootState = ReturnType<typeof state>

export const getters: GetterTree<IRootState, IRootState> = {
  user: (state) => state.user,
}

export enum MutationTypes {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  LOGIN_USER = 'LOGIN_USER',
  INICIALIZE_STATE = 'INICIALIZE_STATE',
}

export const actions: ActionTree<IRootState, IRootState> = {
  fetchThings({ commit }) {
    const things = this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'Novo nome')
  },
}

export const mutations: MutationTree<IRootState> = {
  [MutationTypes.ACCESS_TOKEN]: async (state, token: string) => {
    localStorage.setItem(MutationTypes.ACCESS_TOKEN, token)
    state.user.token = token
  },
  [MutationTypes.LOGIN_USER]: async (state, user: ILoggedUser) => {
    console.log('antes', user)
    console.log('depois', JSON.stringify(user))
    localStorage.setItem(MutationTypes.LOGIN_USER, JSON.stringify(user))

    state.user = user
  },
  [MutationTypes.INICIALIZE_STATE]: async (state) => {
    const user = localStorage.getItem(MutationTypes.LOGIN_USER)
    const token = localStorage.getItem(MutationTypes.ACCESS_TOKEN)
    if (user) {
      state.user = JSON.parse(user)
    }
    if (token) {
      state.user.token = token
    }
    if (state.user.token) {
      const _user = await getUser(state.user.token)
      if (_user) {
        state.user = _user
      }
      console.log('user na mutation', _user)
    } else {
      console.log('nao tem token')
    }
  },
}

export const strict = false
