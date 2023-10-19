import { IHistory, IReports, ISearch } from '../models/reducers/patients.model'
import { IResponse } from '../models/response.model'
import { ServiceBase } from './serviceBase'

class ServiceRIS extends ServiceBase {
  constructor(baseURL: string, onUnauthenticated: () => {}) {
    super(baseURL, onUnauthenticated)
  }

  fetchTreeviewArea = async () => {
    console.log(3)
    const url = `/api/Folder/nav-area`
    const response: IResponse<Array</*IAreaItem*/ any>> = await this.service.get(url)
    return response.data
  }

  login = async (data: /*IPostLogin*/ any) => {
    const url = '/api/Users/authenticate';
    const response: IResponse<any> = await this.service.post(url, data);
    return response;
  };

  getListPatient = async (data: ISearch) => {
    const url = '/api/CaseList/paging'
    const response: IResponse<any> = await this.service.post(url, data);
    return response.data;
  };

  getCountByState = async (data: ISearch) => {
    const url = '/api/CaseList/count-by-state'
    const response: IResponse<any> = await this.service.post(url, data);
    return response.data;
  };

  getHistory = async (data: IHistory) => {
    const url = '/api/CaseList/history/paging'
    const response: IResponse<any> = await this.service.post(url, data);
    return response.data;
  };

  getReports = async (data: IReports) => {
    const url = '/api/Reports'
    const response: IResponse<any> = await this.service.post(url, data);
    return response.data;
  };

  getInfoPatient = async (id: any) => {
    const url = `/api/InforExtend/${id.sId}/patient?svid=${id.svId}`
    const response: IResponse<any> = await this.service.get(url)
    return response.data
  }
}

export { ServiceRIS }
