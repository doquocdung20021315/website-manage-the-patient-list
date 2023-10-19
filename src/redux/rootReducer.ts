import authSlice from '../reducers/slice/authSlice'
import countByStateSlice from '../reducers/slice/countByStateSlice'
import demoLoginSlice from '../reducers/slice/demoLoginSlice'
import folderNavSlice from '../reducers/slice/folderNavSlice'
import historyPatientSlice from '../reducers/slice/historyPatientSlice'
import historySlice from '../reducers/slice/historySlice'
import infoPatientSlice from '../reducers/slice/infoPatientSlice'
import listFilterPatientSlice from '../reducers/slice/listFilterPatientSlice'
import listPatientSlice from '../reducers/slice/listPatientSlice'
import loadingBarSlice from '../reducers/slice/loadingBarSlice'
import reportsPatientSlice from '../reducers/slice/reportsPatientSlice'
import reportsSlice from '../reducers/slice/reportsSlice'
import themeLanguageSlice from '../reducers/slice/themeLanguageSlice'

const rootReducer: any = {
  auth: authSlice,
  themeLanguage: themeLanguageSlice,
  loadingBar: loadingBarSlice,
  folderNav: folderNavSlice,
  demoLogin: demoLoginSlice,
  listPatient: listPatientSlice,
  listFilterPatient: listFilterPatientSlice,
  countByState: countByStateSlice,
  history: historySlice,
  historyPatient: historyPatientSlice,
  reports: reportsSlice,
  reportsPatient: reportsPatientSlice,
  infoPatient: infoPatientSlice
}
export { rootReducer }

