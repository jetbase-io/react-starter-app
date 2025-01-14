import 'react-toastify/dist/ReactToastify.min.css'

import type { FC } from 'react'

import { Elements } from '@stripe/react-stripe-js'
import { QueryClientProvider } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import { AppRouter } from './routes'
import { stripe } from './common/config/stripe.config'
import { queryClient } from './common/config/queryClient.config'
import Header from './components/Header'

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripe}>
        <Header />
        <div className="max-w-screen-xl m-auto ">
          <AppRouter />
        </div>
        <ToastContainer autoClose={8000} position={toast.POSITION.TOP_RIGHT} />
      </Elements>
    </QueryClientProvider>
  )
}

export default App
