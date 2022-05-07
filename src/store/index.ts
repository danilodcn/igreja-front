import { ILoggedUser, ILoggingUser } from '../types/user'

import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  things: [] as string[],
  name: '',
  user: {} as ILoggedUser,
})

export type IRootState = ReturnType<typeof state>

export const getters: GetterTree<IRootState, IRootState> = {
  name: (state) => state.name,
  user: (state) => state.user,
}

export enum MutationTypes {
  CHANGE_NAME = 'CHANGE_NAME',
  GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN',
  LOGIN_USER = 'LOGIN_USER',
}

export const mutations: MutationTree<IRootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
  GET_ACCESS_TOKEN: async (state, token: string) => {
    state.user.token = token
  },
  LOGIN_USER: async (state, user: ILoggedUser) => {
    state.user = user
  },
}

export const actions: ActionTree<IRootState, IRootState> = {
  fetchThings({ commit }) {
    const things = this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'Novo nome')
  },
}

export const strict = false
