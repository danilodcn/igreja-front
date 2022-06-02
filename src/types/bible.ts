interface IAbbrev {
  pt: string
  en: string
}

export interface IBook {
  abbrev: IAbbrev
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

export interface IBibleDialog {
  active: boolean
  text: string
  title: string
}

export interface IVersion {
  version: string
  description: string
  verses: number
}

export interface IVerse {
  number: number
  text: string
}

export interface IChapter {
  book: IBook
  verses: IVerse[]
  chapter: {
    number: number
    verses: number
  }
}
