import { APIBase } from './api'
import { ICategory, IPost, IPostDTO, IPostDetail } from '../types/posts'

export class PostService extends APIBase {
  path: string
  count: number

  constructor() {
    super()
    this.path = 'blog/blog/'
    this.count = 0
  }

  async getDetail(slug: string): Promise<IPostDetail> {
    const path = `${this.path}?slug=${slug ? slug : ''}`
    console.log('Caminho', path)

    const result = await this.request({ url: path, method: 'GET' })

    return result?.results[0]
  }
  async getPosts(data: IPostDTO): Promise<{ posts: IPost[]; count: number }> {
    const _page_size = data.pageSize ? data.pageSize : ''
    const _page = data.current ? data.current : 1
    var _categories = data.categories
      ? data.categories.join('&categories=')
      : ''
    var _categories = _categories ? `&categories=${_categories}` : ''
    const _search = data.search ? data.search : ''
    const path = `${this.path}?page_size=${_page_size}&page=${_page}${_categories}&search=${_search}`
    console.log('meu path', path)

    const result = await this.request({ url: path, method: 'GET' })

    this.count = result.count
    const posts: IPost[] = result.results
    return { posts, count: result.count }
  }

  async getCategories(): Promise<ICategory[]> {
    const path = 'blog/category/'
    console.log(path)
    const result = await this.request({ url: path, method: 'GET' })

    return result.results
  }
}
