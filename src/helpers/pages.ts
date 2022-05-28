import { IPaginationInfo } from '@/types/posts'

interface PageDTO {
  current: number | undefined
  pageSize: number | undefined
  count: number | undefined
}

export class PageHelper {
  getPagination(page: PageDTO): IPaginationInfo {
    const current = page.current ? page.current : 1
    const pageSize = page.pageSize ? page.pageSize : 1
    const count = page.count ? page.count : 1

    const maxPage = Math.ceil(count / pageSize)
    const pagination: IPaginationInfo = {
      current,
      pageSize,
      maxPage,
      count,
      pages: [],
    }

    return pagination
  }
}
