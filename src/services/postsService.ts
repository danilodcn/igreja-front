import { APIBase } from './api'
import { ICategory, IPost, IPostDTO, IPostDetail } from '@/types/posts'

export class PostService extends APIBase {
  path: string
  count: number

  constructor() {
    super()
    this.path = 'blog/blog/'
    this.count = 0
  }

  async getDetail(slug: string): Promise<IPostDetail> {
    const path = `${this.path}?slug=${slug || ''}`
    const result = await this.request({ url: path, method: 'GET' })

    return result?.results[0]
  }

  async getPosts(data: IPostDTO): Promise<{ posts: IPost[]; count: number }> {
    const pageSize = data.pageSize ? data.pageSize : ''
    const page = data.current ? data.current : 1
    let categories = data.categories ? data.categories.join('&categories=') : ''
    categories = categories ? `&categories=${categories}` : ''

    const _search = data.search ? data.search : ''
    const path = `${this.path}?page_size=${pageSize}&page=${page}${categories}&search=${_search}`

    const result = await this.request({ url: path, method: 'GET' })

    this.count = result.count
    const posts: IPost[] = result.results
    return { posts, count: result.count }
  }

  async getCategories(): Promise<ICategory[]> {
    const path = 'blog/category/'
    const result = await this.request({ url: path, method: 'GET' })

    return result.results
  }
}
