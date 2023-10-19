import { setAuthentication } from '../reducers/slice/authSlice'
import { getStore } from '../redux/store'
import { ServiceRIS } from './RIS_Service'
import { ServiceMonitor } from './serviceMonitor'

export interface IServicesManager {
  serviceMonitor: ServiceMonitor | null
  serviceRIS: ServiceRIS | null
}

export const defaultServicesManager: IServicesManager = {
  serviceMonitor: null,
  serviceRIS: null,
}

export const onUnauthenticated: any = () => {
  const store = getStore()
  store.dispatch(setAuthentication(false))
}

export const servicesManager: IServicesManager = defaultServicesManager

export const serviceConfig = () => {
  const url = 'http://localhost:3018/v1'
  const service = new ServiceMonitor(url, onUnauthenticated)
  servicesManager.serviceMonitor = service

  const serviceRIS = new ServiceRIS('https://telerad.vn:8887', onUnauthenticated)
  servicesManager.serviceRIS = serviceRIS
}
