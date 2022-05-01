export interface ICategory {
  active: boolean
  id: number
  name: string
  order: number
  selected?: boolean
}

export interface IAuthor {
  email: string
  image?: string
  name: string
}

interface IPostBase {
  author: IAuthor
  image: string
  publish_date: Date
  resume: string
  slug: string
  subtitle?: string
  title: string
  url: string
  categories: ICategory[]
}

export interface IPost extends IPostBase {}

export interface IPostDetail extends IPostBase {
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
  pages: number[]
}

export interface IPostDTO {
  slug?: string
  current?: number
  pageSize?: number
  categories?: number[]
  search?: string
}
