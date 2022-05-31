import { AxiosRequestConfig } from 'axios'
import { APIBase } from './api'
import { IBook, IChapter } from '@/types/bible'

interface IVersesDTO {
  version: string
}

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

  getChapter(
    version: string,
    abbrev: string,
    chapter: number
  ): Promise<IChapter> {
    return this.request({
      url: this.urlJoin(`verses/${version}/${abbrev}/${chapter}`),
    })
  }

  async getVersions(): Promise<string[]> {
    const res: IVersesDTO[] = await this.request({
      url: this.urlJoin('versions'),
    })
    return res.map((item) => item.version)
  }
}

export default new BibleService()
