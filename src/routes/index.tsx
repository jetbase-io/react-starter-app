import React from 'react'
import { Outlet, Route, Routes } from 'react-router'
import routes, {
  privateRoutes,
  publicOnlyRoutes,
} from './route-pages-constants'
import { NotFoundPage } from '../pages'
import { PublicOnlyOutlet } from './components/PublicOnlyOutlet'
import { PrivateOutlet } from './components/PrivateOutlet'

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        {routes.map(route => (
          <Route path={route.path} element={route.element} key={route.id} />
        ))}
      </Route>
      <Route element={<PrivateOutlet />}>
        {privateRoutes.map(route => (
          <Route path={route.path} element={route.element} key={route.id} />
        ))}
      </Route>
      <Route element={<PublicOnlyOutlet />}>
        {publicOnlyRoutes.map(route => (
          <Route path={route.path} element={route.element} key={route.id} />
        ))}
      </Route>
      <Route path={'/*'} element={<NotFoundPage />} />
    </Routes>
  )
}
