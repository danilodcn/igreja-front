import client from './http-common'
import { ICategory, IPost } from '../types/posts'

export class CategoryService {
  async getAll(): Promise<ICategory[]> {
    const path = 'blog/category/'

    const categories: ICategory[] = await client
      .get(path)
      .then((res) => {
        return res.data['results']
      })
      .catch((error: Error) => {
        console.log(error)
        return []
      })
    return categories
  }
}

export class PostService {
  path: string
  count: number

  constructor() {
    this.path = 'blog/blog/'
    this.count = 0
  }

  async getAll(): Promise<IPost[]> {
    return []
  }
  async get(
    current: number | undefined,
    pageSize: number | undefined,
    categories: number[] | undefined,
    search: string | undefined = undefined
  ): Promise<IPost[]> {
    const _page_size = pageSize ? pageSize : ''
    const _page = current ? current : 1
    const _categories = categories ? categories.join(',') : ''
    const _search = search ? search : ''
    const path = `${this.path}?page_size=${_page_size}&page=${_page}&categories=${_categories}&search=${_search}`

    const posts: IPost[] = await client
      .get(path)
      .then((res) => {
        this.count = res.data['count']
        return res.data['results']
      })
      .catch((error: Error) => {
        console.log(error)
        return []
      })
    return posts
  }
  getCategories(posts: IPost[]): ICategory[] {
    var categories = [] as ICategory[]

    posts.forEach((post) => {
      categories = categories.concat(...post.categories)
    })

    categories = [...new Set(categories)]
    categories.sort((a, b) => a.order - b.order)
    return categories
  }
}
