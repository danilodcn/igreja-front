export interface IBook {
  abbrev: string[]
  author: string
  chapters: number
  group: string
  name: string
  testament: string
}

export interface IBible {
  chapter?: number
  chapters?: string[]
  book?: string
  books?: IBook[]
  testament?: string
  verse?: string[]
  verses?: string[]
}

export interface IDialog {
  active: boolean
  text: string
  title: string
}
