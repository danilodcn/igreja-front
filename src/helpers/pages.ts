import { IPaginationInfo } from '../types/posts'

interface PageDTO {
  current: number | undefined
  pageSize: number | undefined
  count: number | undefined
}

export class pageHelper {
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
    const BUTTONS_NUMBER = 3

    for (var i = 0; i < BUTTONS_NUMBER; i++) {
      var currentPage = current + i - 1
      if (currentPage > 0 && currentPage <= maxPage) {
        pagination.pages.push(currentPage)
      }
    }

    return pagination
  }
}
