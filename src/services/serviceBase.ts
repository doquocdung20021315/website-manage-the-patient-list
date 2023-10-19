import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { getLanguage } from '../localstorage/localstorage'

const TIMEOUT = 1 * 60 * 100000

class ServiceBase {
  service: AxiosInstance
  onUnauthenticated: () => {}
  constructor(baseURL: string, onUnauthenticated: () => {}) {
    const service = axios.create({
      headers: {
        csrf: 'token',
        'Access-Control-Allow-Origin': '*',
      },
      timeout: TIMEOUT,
      baseURL,
    })
    service.interceptors.request.use(this.requestSuccess)
    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service
    this.onUnauthenticated = onUnauthenticated
  }

  requestSuccess = (config: any) => {
    const token = localStorage.getItem('token')
    config.headers['Accept-Language'] = getLanguage()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }

  handleSuccess(response: AxiosResponse) {
    console.log("Success");
    
    return response.data
  }

  // logout = async () => {
  //   try {
  //     const response = await this.service.post('/api/Users/revoke-token')
  //     console.log(response, 'response')
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   store.dispatch(setAuth(false))
  // }

  handleError = (error: AxiosError | undefined) => {
    console.log("error",error);
    switch (error?.response?.status) {
      case 401:
      case 403:
        this.onUnauthenticated()
        break
      default:
        break
    }
    return error?.response ? Promise.reject(error?.response.data) : Promise.reject(error)
  }

  redirectTo = (document: any, path: string) => {
    document.location = path
  }

  request = (config: any) => {
    return this.service(config)
  }
}

export { ServiceBase }
