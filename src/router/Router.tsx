import { Route } from 'react-router-dom'
import { ErrorBoundaryRoutes } from '../components/base/error/ErrorBoundaryRoutes'
import { AUTHORITIES } from '../constants/constants'
import NotFound from '../pages/404/NotFound'
import Admin from '../pages/Admin'
import DemoLogin from '../pages/DemoLogin'
import DemoPage from '../pages/DemoPage'
import PrivateRouter from './PrivateRouter'

const Router = () => {
  return (
    <ErrorBoundaryRoutes>
      <Route
        index={true}
        element={
          <PrivateRouter hasAnyAuthorities={[AUTHORITIES.USER]}>
            <DemoPage />
          </PrivateRouter>
        }
      />
      <Route path="login" element={<DemoLogin />} />
      <Route
        path="admin/*"
        element={
          <PrivateRouter hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
            <Admin />
          </PrivateRouter>
        }
      />
      <Route path="*" element={<NotFound />} />
    </ErrorBoundaryRoutes>
  )
}

export default Router
