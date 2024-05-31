import 'react-toastify/dist/ReactToastify.min.css'

import type { Stripe } from '@stripe/stripe-js'
import type { FC } from 'react'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Header from './components/Header'
import { HomePage, NotFoundPage } from './pages/index'
import routes from './routes'

let stripePromise: Promise<Stripe | null>

const App: FC = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '')
  }

  return (
    <div>
      <Header />
      <Elements stripe={stripePromise}>
        <div className="max-w-screen-xl m-auto ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {routes.map(route => (
              <Route path={route.path} element={route.element} key={route.id} />
            ))}
            <Route path={'/*'} element={<NotFoundPage />} />
          </Routes>
        </div>
      </Elements>
      <ToastContainer autoClose={8000} position={toast.POSITION.TOP_RIGHT} />
    </div>
  )
}

export default App
