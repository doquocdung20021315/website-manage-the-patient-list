import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { servicesManager } from '../../services/serviceManager'
import { IArea } from '../../models/reducers/folderNav.model'
// import axios from 'axios'

const initialState: Array<IArea> = []

export const fetchTreeviewArea = createAsyncThunk('folderNav/fetchTreeviewArea', async () => {
  console.log(2)
  const service = servicesManager.serviceRIS
  return service?.fetchTreeviewArea()
})

const folderNavSlice = createSlice({
  name: 'folderNav',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTreeviewArea.fulfilled, (_state, action) => {
      console.log(4)
      return action.payload
    })
  },
})

export const {} = folderNavSlice.actions
export default folderNavSlice.reducer
