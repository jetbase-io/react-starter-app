import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { HOME_ROUTE } from '../../store/constants/route-constants'
import { useUserStore } from '../../store/useUserStore'

export const PublicOnlyOutlet = () => {
  const location = useLocation()
  const isAuthenticated = useUserStore(state => state.isAuthenticated)

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={HOME_ROUTE} state={{ from: location }} />
  )
}
