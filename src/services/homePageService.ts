import { APIBase } from './api'
import { IHomePage, IChurch } from '@/types/homePage'

export class HomePageService extends APIBase {
  async getHomePageInfo(churchId: string = ''): Promise<IHomePage> {
    const id = churchId || ''
    const url = `/config/page/?church_id=${id}`

    return await this.request({ url, method: 'GET' }).then((res) => {
      return res[0]
    })
  }

  async getChurchInfo(churchId: string = ''): Promise<IChurch[]> {
    const id = churchId || ''
    const url = `/church/church/?church_id=${id}`

    return await this.request({ url, method: 'GET' })
  }
}
