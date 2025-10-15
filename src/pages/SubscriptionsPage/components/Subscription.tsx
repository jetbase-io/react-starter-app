import React from 'react'
import type { SubscriptionProduct } from '../../../services/api/Payment/types'

export const Subscription = ({
  isActive,
  sub,
  onClickSubscribe,
}: {
  isActive?: boolean
  sub: SubscriptionProduct
  onClickSubscribe?: () => void | Promise<void>
}) => {
  return (
    <div className="relative w-4/5 py-10 mb-10 text-center border border-gray-200 rounded-lg shadow lg:w-custom lg:px-4 text-primary-dark bg-primary-white">
      <h3 className="absolute uppercase left-3 top-3">
        {isActive ? 'Active' : ''}
      </h3>
      <h5 className="text-base font-bold">{sub.name || 'PLAN'}</h5>
      <h2 className="flex justify-center pb-4 font-bold border-b border-gray-300">
        <span className="mr-1 text-6xl">{sub.currency}</span>
        <span className="text-6xl">{sub.price}</span>
      </h2>
      <button
        type="button"
        onClick={onClickSubscribe}
        className="px-12 py-2 mt-12 text-sm font-bold text-center text-white uppercase bg-blue-500 rounded-md xl:px-24 sm:px-16 text-primary-very-light"
      >
        Subscribe
      </button>
    </div>
  )
}
