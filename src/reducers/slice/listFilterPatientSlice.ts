import { createSlice } from "@reduxjs/toolkit"
import { IPatient } from "../../models/reducers/patients.model"

const initialState: Array<IPatient> = []

const listFilterPatientSlice = createSlice({
  name: 'listFilterPatient',
  initialState,
  reducers: {
    setListFilterPatient: (state, action) => {
      state = action.payload
      return state
    },
  },
})

export const { setListFilterPatient } = listFilterPatientSlice.actions
export default listFilterPatientSlice.reducer
