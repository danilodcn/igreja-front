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

    const post: IPostDetail = await this.client
      .get(path)
      .then((res) => res.data)
      .then((json) => json['results'])
      .then((list) => list[0])

    return post
  }
  async getPosts(data: IPostDTO): Promise<IPost[]> {
    const _page_size = data.pageSize ? data.pageSize : ''
    const _page = data.current ? data.current : 1
    var _categories = data.categories
      ? data.categories.join('&categories=')
      : ''
    var _categories = _categories ? `&categories=${_categories}` : ''
    const _search = data.search ? data.search : ''
    const path = `${this.path}?page_size=${_page_size}&page=${_page}${_categories}&search=${_search}`
    console.log('meu path', path)

    const posts: IPost[] = await this.client.get(path).then((res) => {
      this.count = res.data['count']
      return res.data['results']
    })
    return posts
  }
  async getCategories(): Promise<ICategory[]> {
    const path = 'blog/category/'
    console.log(path)
    const categories: ICategory[] = await this.client.get(path).then((res) => {
      console.log(res)
      return res.data['results']
    })
    return categories
  }
}
