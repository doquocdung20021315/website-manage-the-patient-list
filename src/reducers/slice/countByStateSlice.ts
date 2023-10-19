import { createSlice } from "@reduxjs/toolkit"
import { ICountByState } from "../../models/reducers/patients.model"

const initialState: Array<ICountByState> = [
  { name: 'UnRead', count: 0 },
  { name: 'Reading', count: 0 },
  { name: 'Read', count: 0 },
  { name: 'Consulting', count: 0 },
  { name: 'Consult', count: 0 },
  { name: 'Consultation', count: 0 },
  { name: 'Approved', count: 0 }
]

const countByStateSlice = createSlice({
  name: 'countByState',
  initialState,
  reducers: {
    setCountByState: (state, action) => {
      state = action.payload
      return state
    },
  },
})

export const { setCountByState } = countByStateSlice.actions
export default countByStateSlice.reducer
