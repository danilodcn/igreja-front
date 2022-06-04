import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { IAlert, IDialog, IRootState } from './types'
import { state as bibleState } from './bible'
import { state as userState } from './user'

export const state = (): IRootState => ({
  user: userState(),
  bible: bibleState(),
  loading: false,
  alert: {} as IAlert,
  dialog: {
    msg: '',
    active: false,
    title: '',
    bntClose: false,
    persistent: false,
  },
})

export enum MutationTypes {
  TOGGLE_ALERT = 'TOGGLE_ALERT',
  TOGGLE_DIALOG = 'TOGGLE_DIALOG',
  TOGGLE_LOADING = 'TOGGLE_LOADING',
}

export const getters: GetterTree<IRootState, IRootState> = {
  user: (state) => state.user,
}

export const actions: ActionTree<IRootState, IRootState> = {
  fetchThings({ commit }) {
    const things = this.$axios.$get('/things')
    commit('CHANGE_NAME', things)
  },
}

export type ToggleLoading = (payload: boolean) => void
export type ToggleAlert = (payload: IAlert) => void
export type ToggleDialog = (payload: IDialog) => void

export const mutations: MutationTree<IRootState> = {
  [MutationTypes.TOGGLE_ALERT](state, payload: IAlert) {
    state.alert = payload
  },

  [MutationTypes.TOGGLE_DIALOG](state, payload: IDialog) {
    state.dialog = {
      ...state.dialog,
      ...payload,
    }
  },

  [MutationTypes.TOGGLE_LOADING](state, payload: boolean) {
    state.loading = payload
  },
}

export const strict = true
