import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import classNames from 'classnames'
import { useFormik } from 'formik'
import type { FC } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { getChosenPlan } from '../../helpers/plan'
import { HOME_ROUTE } from '../../store/constants/route-constants'

import { useGetPaymentMethods } from '../../hooks/user/useGetPaymentMethods'
import { useDetachPaymentMethod } from '../../hooks/user/useDetachPaymentMethod'
import { useActivateSubscription } from '../../hooks/user/useActivateSubscription'

import { useUserStore } from '../../store/useUserStore'
import type { ActivateSubscriptionResponseT } from '../../services/api/User/types'

const BillingPage: FC = () => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated)
  const setSubscription = useUserStore(state => state.setSubscription)

  const { mutate: activateSubscription } = useActivateSubscription()
  const navigate = useNavigate()

  const stripe = useStripe()
  const elements = useElements()
  const chosenPlan = getChosenPlan()

  const { paymentMethods } = useGetPaymentMethods()
  const { mutate: detachPaymentMethod } = useDetachPaymentMethod()

  const handleResultData = (resultData: ActivateSubscriptionResponseT) => {
    if (!stripe || !elements) {
      return
    }

    if (resultData) {
      const { clientSecret, status, nickname } = resultData

      if (status === 'requires_action') {
        stripe.confirmCardPayment(clientSecret).then(res => {
          if (res.error) {
            toast.error('Payment failed')
          } else {
            setSubscription({ status: 'active', nickname: nickname || '' })
            toast.success('Payment was successfully applied!')
          }
        })
      } else {
        setSubscription({ status: 'active', nickname: nickname || '' })
        toast.success('Payment was successfully applied!')
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Required'),
    }),
    onSubmit: async values => {
      if (!stripe || !elements) {
        return
      }

      const cardElement = elements!.getElement(CardElement)

      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement!,
        billing_details: {
          email: values.email,
        },
      })
      const args = {
        priceId: chosenPlan.id,
        paymentMethodId: result.paymentMethod?.id,
      }

      activateSubscription(args, {
        onSuccess(data) {
          handleResultData(data)
          navigate(HOME_ROUTE)
        },
      })
    },
  })

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  const buttonClass = classNames({
    'bg-blue-600 hover:bg-blue-600': formik.isValid,
    'bg-gray-400 ': !formik.isValid,
  })

  const onExistedCardClick = async (
    paymentMethodId: string,
    priceId: string,
  ) => {
    activateSubscription(
      {
        paymentMethodId,
        priceId,
      },
      {
        onSuccess(data) {
          handleResultData(data)
          navigate(HOME_ROUTE)
        },
      },
    )
  }

  const onDetachCardClick = (paymentMethodId: string) => {
    detachPaymentMethod({ paymentMethods, paymentMethodId })
    navigate(HOME_ROUTE)
  }

  return (
    <div>
      <div className="flex flex-col justify-center min-h-screen rounded-lg shadow-xl">
        <div className="w-full max-w-md mx-auto">
          <div className="text-xl font-medium text-center">Billing Details</div>
        </div>
        <div className="w-full max-w-md p-8 mx-auto mt-4 bg-white border border-gray-300">
          <div className="text-center">
            <h4>
              You have chosen{' '}
              <span className="font-bold text-blue-500">
                {chosenPlan.nickname}
              </span>{' '}
              plan
            </h4>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-600"
              >
                Email
              </label>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500">{formik.errors.email}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-600"
              >
                Card details
              </label>
              <CardElement className="w-full p-2 mt-1 border border-gray-300 rounded" />
            </div>
            <div>
              <button
                type="submit"
                className={`${buttonClass} w-full py-2 px-4 rounded-md text-white text-sm`}
              >
                Pay
              </button>
            </div>
          </form>
        </div>
        <div className="w-full max-w-md mx-auto ">
          {paymentMethods?.map(({ id, card }) => (
            <div
              key={id}
              className="flex mb-0.5 border border-r-2 lg:px-4 py-1 text-center text-primary-dark bg-primary-white"
            >
              <input
                type="text"
                disabled
                className="w-1/2 pl-1 font-bold text-left text-center text-gray-600 align-baseline"
                placeholder={`${card.brand} - ${card.last4}`}
              />
              <p className="w-1/2 pr-1 text-right">
                <button
                  onClick={() => onDetachCardClick(id)}
                  className="px-4 py-2 mr-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-600"
                >
                  Detach
                </button>
                <button
                  onClick={() => onExistedCardClick(id, chosenPlan.id)}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-600"
                >
                  Use Card
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BillingPage
