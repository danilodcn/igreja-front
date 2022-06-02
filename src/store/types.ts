import { IBible, IBibleDialog } from '@/types/bible'
import { ILoggedUser } from '@/types/user'

export interface IUserState {
  user: ILoggedUser
}

export interface IBibleState {
  dialog: IBibleDialog
  bible: IBible
}

export interface IDialog {
  msg: string
  active: boolean
  title: string
  bntClose: boolean
  persistent: boolean
}

export interface IRootState {
  bible: IBibleState
  user: IUserState
  loading: boolean
  dialog: IDialog
}
