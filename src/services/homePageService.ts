import { APIBase } from './api'
import { IChurchBody, IHomeImage, IHomePage } from './../types/homePage'

export class HomePageService extends APIBase {
  async getHomePageInfo(church_id: string = ''): Promise<IHomePage> {
    const id = church_id ? church_id : ''
    const url = `/config/page/?church_id=${id}`

    return await this.request({ url, method: 'GET' }).then((res) => {
      return res[0]
    })
  }
}
