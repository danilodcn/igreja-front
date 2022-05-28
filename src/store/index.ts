import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { ILoggedUser } from '@/types/user'

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
    commit('CHANGE_NAME', things)
  },
}

export const mutations: MutationTree<IRootState> = {
  [MutationTypes.ACCESS_TOKEN]: (state, token: string) => {
    localStorage.setItem(MutationTypes.ACCESS_TOKEN, token)
    state.user.token = token
  },
  [MutationTypes.LOGIN_USER]: (state, user: ILoggedUser) => {
    localStorage.setItem(MutationTypes.LOGIN_USER, JSON.stringify(user))

    state.user = user
  },
}

export const strict = false
