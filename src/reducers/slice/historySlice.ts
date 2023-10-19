import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IHistory } from "../../models/reducers/patients.model";
import { servicesManager } from "../../services/serviceManager";

const initialState: IHistory = {
  pCode: "",
  pageIndex: 1,
  pageSize: 50,
}

export const getHistory = createAsyncThunk('listHistory/getHistory', async (data: IHistory) => {
  const service = servicesManager.serviceRIS
  return service?.getHistory(data)
})

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state = action.payload
      return state
    },
  },
  extraReducers(builder) {
    builder.addCase(getHistory.fulfilled, (_state, action) => {
      // console.log(action.payload)
      return action.payload
    })
  },
})

export const { setHistory } = historySlice.actions
export default historySlice.reducer
