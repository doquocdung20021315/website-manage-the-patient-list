import { IPostLogin } from '../models/login.model'
import { IResponse } from '../models/response.model'
import { ServiceBase } from './serviceBase'

class ServiceMonitor extends ServiceBase {
  constructor(baseURL: string, onUnauthenticated: () => {}) {
    super(baseURL, onUnauthenticated)
  }

  // get UserInfo
  getMonitor = async () => {
    const url = '/api/monitor'
    const response: IResponse<any> = await this.service.get(url)
    if (response.status !== 1) {
      return
    }
    return response.data
  }

  // get UserInfo
  login = async (data: IPostLogin) => {
    const url = '/authenticate/login'
    const response: IResponse<any> = await this.service.post(url, data)
    console.log(response)
    if (response.status !== 1) {
      throw new Error(response.message)
    }
    return response
  }
}

export { ServiceMonitor }
