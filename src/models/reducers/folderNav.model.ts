
export interface IArea {
  areaID: number
  name: string
  order: number
  folder: Array<IFolder>
}

export interface IFolder {
  id: number
  areaID: number
  name: string
  locate: string
  areaName: string
  areaOder: number
  order: number
  typeHos: number
  modalitys: Array<IModality>
}

export interface IModality {
  id: number
  name: string
  order: number
}

export interface IDemoLogin {
  id: number
  name: string
  username: string
  password: string
}
