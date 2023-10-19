// import i18next from 'i18next'
// import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
// import historyNote from './release/history.json'
// import metadata from './release/metadata.json'

import 'antd/dist/reset.css'
import { useEffect, useState } from 'react'
import './App.scss'
import LoadingTopBar from './components/base/loading/LoadingTopBar'
import i18n from './i18n'
import { RootState, useAppSelector } from './redux/store'
import Router from './router/Router'
import { serviceConfig } from './services/serviceManager'
import './theme/default-theme.scss'
import './theme/pink-theme.scss'
import './theme/purple-theme.scss'
import './theme/red-theme.scss'
const App = () => {
  const theme = useAppSelector((state: RootState) => state.themeLanguage.theme)
  // const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    serviceConfig()
    setLoading(false)
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App" data-theme={theme}>
        <LoadingTopBar />
        {/* <Router /> */}
        {!loading &&
        <Router/>
          // <Routes>
          //   <Route path="/" element={<Navigate replace={true} to="/login" />} />

          //   <Route path="/login" element={<DemoLogin />} />
          //   <Route path="/home" element={<DemoPage />} />

          //   {/* <Route path="/login" element={
          //     localStorage.getItem('id') ? <Navigate to="/home" /> : <DemoLogin />
          //   }
          //   />
          //   <Route path="/home" element={
          //     localStorage.getItem('id') ? <DemoPage /> : <Navigate to="/" />
          //   }
          //   /> */}

          // </Routes>
        }
      </div>
    </I18nextProvider>
  )
}

export default App
