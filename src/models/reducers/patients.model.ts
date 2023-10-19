export interface ISearch {
  fromDate: string
  toDate: string
  status: Array<number>
  pCode: string
  pName: string
  assDoctor: string
  indication: string
  bodypart: string
  conclusions: string
  AIStatus: any
  servers: Array<any>
  modalities: Array<any>
  typeOfObject: any
  isTimeOut: boolean
  existOnHis: string
  pageIndex: number
  pageSize: number
}

export interface IPatient {
  patientID: number
  pCode: string
  pName: string
  pFirstName: any
  pAge: number
  pGender: any
  pBirthday: any
  pType: any
  pTypeCode: any
  pAddress: string
  patientImage: any
  assDepartment: any
  doctorAss: any
  clinicalDiagnosis: any
  result: string
  sid: number
  sCode: any
  lsvv: any
  modality: string
  bodypart: string
  serviceName: string
  serviceCode: any
  createTime: string
  timeEdit: string
  aproTime: string
  aproveByID: any
  editByID: any
  addByID: any
  fct: any
  f8x10: any
  f10x12: any
  fRang: any
  existOnHis: boolean
  svID: number
  consultState: any
  svSTATE: number
  timeEx: string
  executorID: any
  room: any
  bed: any
  aiResult: any
  aiStatus: number
  aiLink: any
  uid: any
  serverID: number
  numberImgs: number
  serverName: string
  executor: any
  typeOfObject: any
  isPrint: any
  listExecutors: Array<any>
  editByDrName: any
  aproveByDrName: any
  password: string
  reExamDay: number
  orderNumber: any
  timePrint: any
  hisID: number
}

export interface ICountByState {
  name: string
  count: number
}

export interface IHistory {
  pCode: string
  pageIndex: number
  pageSize: number
}

export interface IReports {
  studyId: number
  svId: number
}

export interface IReportsPatient {
  id: number
  sid: number
  pCode: string
  pName: string
  pAge: number
  pSex: string
  pAddress: string
  patientImage: any
  typeCode: any
  type: string
  pPhone: string
  birthDay: string
  modality: string
  diagnose: string
  assDepartment: string
  assDoctor: string
  serviceName: string
  editById: string
  lstDrEdit: Array<any>
  editByDrName: string
  consultByDrName: any
  aproveById: string
  aproveByDrName: string
  aproveByDrPhone: string
  editByDrPhone: string
  consultByDrPhone: any
  aproveByDrAddress: string
  code: string
  orgCode: string
  svState: number
  tech: string
  descImg: string
  result: string
  proposal: string
  timeStr: string
  userAdd: string
  aproTime: string
  hospital: IHospital
  header: IHeader
  room: string
  bed: string
  executor: any
  typePrint: number
  password: string
  timeAss: string
  timeEx: string
  lsvv: any
  typeOfObject: any
  drSignImage: string
  drReadSignImage: string
  drConsultSignImage: any
  isPrint: boolean
  isEmergency: any
  orderNumber: any
  userHis: any
  indicatedDoctorSignImage: any
  reExamDay: number
  listImgs: Array<any>
  listImgsDesc: Array<any>
  listKeyImgs: Array<any>
  listMainExecutor: Array<any>
  listSubExecutor: Array<any>
  svExCode: any
  indicatedRoom: any
  jsonResult: any
  timePrint: string
  resultLinkHIS: string
  extendDescTxt: any
  dataExtendDescTxt: any
  sicknessCondition: number
}

export interface IHospital {
  id: number
  name: string
  locate: string
  hospitalType: number
  order: number
  areaId: any
  areaName: any
  userCreate: any
  userModify: any
  createDate: any
  modifyDate: any
  status: number
}

export interface IHeader {
  id: number
  name: string
  pTitle: string
  pTitle2: any
  pHospital: string
  pDepartment: string
  pAddress: string
  pPhone: any
  pNote: any
  pLogo: string
  template: string
  userCreate: any
  userModify: any
  createDate: any
  modifyDate: any
  status: any
}

export interface IInfoPatient {
  timeEx: any
  sCode: any
  pCode: string
  pName: string
  pAge: number
  pBirthDay: string
  pGender: string
  pTypeCode: string
  indication: string
  modality: any
  bodyPart: string
  typeOfObject: string
  diagnose: string
  assDepartment: string
  assDoctor: string
  assTime: any
  pAddress: string
  pPhoneNo: string
  pEmail: string
  sId: number
  pId: number
  svId: number
  state: any
  template: Array<string>
  excutors: Array<any>
  studyTime: any
  room: string
  bed: string
  clinicalHistory: string
  clinicalUrl: any
  lsvv: string
  password: string
  companyName: any
  projectCode: any
  patientImage: any
}

export const defaultSearch: ISearch = {
  "fromDate": "2023-07-02",
  "toDate": "2023-08-01",
  "status": [0, 1, 2, 3, 4, 5, 6],
  "pCode": "",
  "pName": "",
  "assDoctor": "",
  "indication": "",
  "bodypart": "",
  "conclusions": "",
  "AIStatus": null,
  "servers": [],
  "modalities": [],
  "typeOfObject": null,
  "isTimeOut": false,
  "existOnHis": "1",
  "pageIndex": 1,
  "pageSize": 50
}
