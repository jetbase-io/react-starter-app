import 'react-toastify/dist/ReactToastify.min.css'

import type { Stripe } from '@stripe/stripe-js'
import type { FC } from 'react'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Outlet, Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from './components/Header'
import { NotFoundPage } from './pages/index'
import routes, { privateRoutes, publicOnlyRoutes } from './routes/routes'
import { PrivateOutlet } from './routes/components/PrivateOutlet'
import { PublicOnlyOutlet } from './routes/components/PublicOnlyOutlet'

let stripePromise: Promise<Stripe | null>

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

const App: FC = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '')
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <Elements stripe={stripePromise}>
          <div className="max-w-screen-xl m-auto ">
            <Routes>
              <Route element={<Outlet />}>
                {routes.map(route => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.id}
                  />
                ))}
              </Route>
              <Route element={<PrivateOutlet />}>
                {privateRoutes.map(route => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.id}
                  />
                ))}
              </Route>
              <Route element={<PublicOnlyOutlet />}>
                {publicOnlyRoutes.map(route => (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.id}
                  />
                ))}
              </Route>
              <Route path={'/*'} element={<NotFoundPage />} />
            </Routes>
          </div>
        </Elements>
        <ToastContainer autoClose={8000} position={toast.POSITION.TOP_RIGHT} />
      </div>
    </QueryClientProvider>
  )
}

export default App
