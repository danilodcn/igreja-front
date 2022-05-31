import { AxiosRequestConfig } from 'axios'
import { APIBase } from './api'
import { IBook } from '@/types/bible'

export class BibleService extends APIBase {
  baseUrl = 'https://www.abibliadigital.com.br/api'
  constructor(config: AxiosRequestConfig = {}) {
    super({
      ...config,
      headers: {
        Authorization: `Baerer ${process.env.tokenAPIBible}`,
      },
    })
  }

  getUser() {
    return this.request({ url: this.urlJoin('users/daconnas.dcn@gmail.com') })
  }

  getBook(book = ''): Promise<IBook[]> {
    return this.request({ url: this.urlJoin(`books/${book}`) })
  }
}

export default new BibleService()
