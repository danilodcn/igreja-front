import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { IBibleState } from './types'
import { IBook, IBibleDialog } from '@/types/bible'
import bibleService from '@/services/bibleService'

enum BibleStateBase {
  CHANGE_DIALOG = 'CHANGE_DIALOG',
  TOGGLE_DIALOG = 'TOGGLE_DIALOG',
}

export const BibleMutationTypes = {
  ...BibleStateBase,
  CHANGE_BOOKS: 'CHANGE_BOOKS',
}

export const BibleActionsTypes = {
  ...BibleStateBase,
  GET_USER: 'GET_USER',
  GET_BOOK: 'GET_BOOK',
}

export const BibleGettersTypes = {
  GET_ALL_BOOKS: 'GET_ALL_BOOKS',
}

export const state = (): IBibleState => ({
  dialog: {
    active: true,
    text: 'Qualquer texto',
    title: 'Bíblia',
  },
  bible: {},
})

export const mutations: MutationTree<IBibleState> = {
  [BibleMutationTypes.CHANGE_DIALOG]({ dialog }, payload: IBibleDialog) {
    dialog.title = payload.title || ''
    dialog.text = payload.text || ''
  },

  [BibleMutationTypes.TOGGLE_DIALOG]({ dialog }) {
    dialog.active = !dialog.active
  },

  [BibleMutationTypes.CHANGE_BOOKS]({ bible }, books: IBook[]) {
    bible.books = books
  },
}

export const actions: ActionTree<IBibleState, IBibleState> = {
  [BibleActionsTypes.CHANGE_DIALOG]({ commit }, payload) {
    commit(BibleMutationTypes.CHANGE_DIALOG, payload)
  },

  [BibleActionsTypes.TOGGLE_DIALOG]({ commit }) {
    commit(BibleMutationTypes.TOGGLE_DIALOG)
  },

  [BibleActionsTypes.GET_USER]() {
    bibleService.getUser()
  },

  [BibleActionsTypes.GET_BOOK]: async ({ commit }, payload: string) => {
    const books = await bibleService.getBook(payload)
    commit(BibleMutationTypes.CHANGE_BOOKS, books)
  },
}

export const getters: GetterTree<IBibleState, IBibleState> = {
  [BibleGettersTypes.GET_ALL_BOOKS]: ({ bible }): string[] => {
    if (bible.books) {
      return bible.books.map((book) => book.name)
    }
    return ['nenhum']
  },
}
