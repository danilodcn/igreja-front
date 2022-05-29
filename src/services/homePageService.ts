import { APIBase } from './api'
import { IPage, IChurch } from '@/types/pages'

export class HomePageService extends APIBase {
  async getHomePageInfo(churchId: string = ''): Promise<IPage> {
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
