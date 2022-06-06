export interface ICategory {
  active: boolean
  id: number
  name: string
  order?: number
}

export interface IAuthor {
  email: string
  image?: string
  name: string
}

export interface IContentBase {
  image: string
  publish_date: string
  resume: string
  slug: string
  subtitle?: string
  title: string
  category: ICategory
}

export interface IContent extends IContentBase {}

export interface IContentDetail extends IContentBase {
  url: string
  author: IAuthor
  content: string
  document?: string
  test: boolean
  visualizations: number
}

export interface IPaginationInfo {
  current: number
  maxPage: number
  pageSize: number
  count: number
}
