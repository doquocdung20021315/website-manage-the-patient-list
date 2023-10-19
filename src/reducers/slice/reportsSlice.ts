import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IReports } from "../../models/reducers/patients.model";
import { servicesManager } from "../../services/serviceManager";

const initialState: IReports = {
  studyId: 0,
  svId: 0,
}

export const getReports = createAsyncThunk('reports/getReports', async (data: IReports) => {
  const service = servicesManager.serviceRIS
  return service?.getReports(data)
})

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports: (state, action) => {
      state = action.payload
      return state
    },
  },
  extraReducers(builder) {
    builder.addCase(getReports.fulfilled, (_state, action) => {
      // console.log(action.payload)
      return action.payload
    })
  },
})

export const { setReports } = reportsSlice.actions
export default reportsSlice.reducer
