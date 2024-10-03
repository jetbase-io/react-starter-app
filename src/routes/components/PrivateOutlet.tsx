import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { SIGN_IN_ROUTE } from '../../store/constants/route-constants'
import { useUserStore } from '../../store/useUserStore'

export const PrivateOutlet = () => {
  const location = useLocation()
  const isAuthenticated = useUserStore(state => state.isAuthenticated)

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={SIGN_IN_ROUTE} state={{ from: location }} />
  )
}
