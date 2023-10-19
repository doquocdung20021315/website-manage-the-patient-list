import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { servicesManager } from '../../services/serviceManager'
import { IInfoPatient } from '../../models/reducers/patients.model'

const initialState: IInfoPatient = {
  timeEx: null,
  sCode: null,
  pCode: "",
  pName: "",
  pAge: 0,
  pBirthDay: "",
  pGender: "",
  pTypeCode: "",
  indication: "",
  modality: null,
  bodyPart: "",
  typeOfObject: "",
  diagnose: "",
  assDepartment: "",
  assDoctor: "",
  assTime: null,
  pAddress: "",
  pPhoneNo: "",
  pEmail: "",
  sId: 0,
  pId: 0,
  svId: 0,
  state: null,
  template: [],
  excutors: [],
  studyTime: null,
  room: "",
  bed: "",
  clinicalHistory: "",
  clinicalUrl: null,
  lsvv: "",
  password: "",
  companyName: null,
  projectCode: null,
  patientImage: null,
}

export const getInfoPatient = createAsyncThunk('InforExtend/getInfoPatient', async (id: any) => {
  const service = servicesManager.serviceRIS
  return service?.getInfoPatient(id)
})

const infoPatientSlice = createSlice({
  name: 'infoPatient',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getInfoPatient.fulfilled, (_state, action) => {
      return action.payload
    })
  },
})

export const {} = infoPatientSlice.actions
export default infoPatientSlice.reducer
