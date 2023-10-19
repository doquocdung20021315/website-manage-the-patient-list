import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISearch, defaultSearch } from "../../models/reducers/patients.model";
import { servicesManager } from "../../services/serviceManager";
import moment from "moment";

const initialState: ISearch = {
  ...defaultSearch,
  fromDate: moment().format('YYYY-MM-DD'),
  toDate: moment().format('YYYY-MM-DD'),
}

export const getListPatient = createAsyncThunk('listPatient/getListPatient', async (data: ISearch) => {
  const service = servicesManager.serviceRIS
  return service?.getListPatient(data)
})

export const getCountByState = createAsyncThunk('listPatient/getCountByState', async (data: ISearch) => {
  const service = servicesManager.serviceRIS
  return service?.getCountByState(data)
})

const listPatientSlice = createSlice({
  name: 'listPatient',
  initialState,
  reducers: {
    setListPatient: (state, action) => {
      state = action.payload
      return state
    },
  },
  extraReducers(builder) {
    builder.addCase(getListPatient.fulfilled, (_state, action) => {
      // console.log(action.payload)
      return action.payload
    })
    builder.addCase(getCountByState.fulfilled, (_state, action) => {
      // console.log(action.payload)
      return action.payload
    })
  },
})

export const { setListPatient } = listPatientSlice.actions
export default listPatientSlice.reducer
