import { createSlice } from '@reduxjs/toolkit'
import { IDemoLogin } from '../../models/reducers/folderNav.model'

const initialState: Array<IDemoLogin> = [
  {
    id: 1,
    username: 'admin',
    name: 'Dr. Admin',
    password: 'admin'
  },
  {
    id: 2,
    username: 'dung',
    name: 'Dr. Dung',
    password: 'dung'
  }
]

const demoLoginSlice = createSlice({
  name: 'demoLogin',
  initialState,
  reducers: {},
})

export const { } = demoLoginSlice.actions
export default demoLoginSlice.reducer
