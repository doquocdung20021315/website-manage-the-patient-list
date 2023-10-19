import { createSlice } from "@reduxjs/toolkit"
import { IPatient } from "../../models/reducers/patients.model"

const initialState: Array<IPatient> = []

const historyPatientSlice = createSlice({
  name: 'historyPatient',
  initialState,
  reducers: {
    sethistoryPatient: (state, action) => {
      state = action.payload
      return state
    },
  },
})

export const { sethistoryPatient } = historyPatientSlice.actions
export default historyPatientSlice.reducer
