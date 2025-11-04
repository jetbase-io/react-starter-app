import React from 'react'
import type { SubscriptionProduct } from '../../../services/api/Payment/types'
import { fmt } from '../utils'

const labels = (base: number, seats: number) => ({
  perSeatLabel: `Only $${fmt(base)} per month`,
  totalLabel: `Only $${fmt(base * seats)} per month`,
  note: 'paid once a month',
})

export const Subscription = ({
  isActive,
  isFree,
  seats,
  sub,
  anySubActive,
  onClickSubscribe,
}: {
  isActive?: boolean
  seats: number
  isFree?: boolean
  sub: SubscriptionProduct
  anySubActive: boolean
  onClickSubscribe?: () => void | Promise<void>
}) => {
  const { totalLabel } = labels(parseInt(sub.price, 10), Math.max(seats, 1))

  return (
    <div className="relative w-4/5 py-10 mb-10 text-center border border-gray-200 rounded-lg shadow lg:w-custom lg:px-4 text-primary-dark bg-primary-white">
      <h3 className="absolute uppercase left-3 top-3">
        {isActive ? 'Active' : ''}
      </h3>
      <h5 className="text-base font-bold">{sub.name || 'PLAN'}</h5>
      <div className="flex items-center justify-center">
        <img
          src={sub.image}
          className="w-30 h-30 object-contain"
          alt={`${sub.name}_image`}
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <h3 className="relative text-center text-6xl font-semibold text-gray-900">
          {isFree ? '$0' : `$${fmt(parseInt(sub.price, 10))}`}
          {isFree ? null : (
            <span className="absolute text-xl font-medium">
              place/
              <br />
              month
            </span>
          )}
        </h3>
        <div className="flex flex-col gap-1">
          <h4 className="text-center text-base text-gray-500">
            {isFree ? 'no payment is required' : totalLabel}
          </h4>
        </div>
      </div>
      <button
        type="button"
        onClick={onClickSubscribe}
        className="px-12 py-2 mt-12 text-sm font-bold text-center text-white uppercase bg-blue-500 rounded-md xl:px-24 sm:px-16 text-primary-very-light"
      >
        {anySubActive ? 'Manage' : 'Subscribe'}
      </button>
    </div>
  )
}
