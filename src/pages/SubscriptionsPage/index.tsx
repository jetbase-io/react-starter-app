import { useState } from 'react'
import { Subscription } from './components/Subscription'
import { useSubscriptionsInteractor } from './interactor'

export const SubscriptionsPage = () => {
  const { subscriptions, subscribeHandler } = useSubscriptionsInteractor()
  const [seats, setSeats] = useState(3)

  return (
    <div className="mt-12 rounded-lg shadow-xl">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-6xl font-bold text-primary-white">Subscriptions</h2>
      </div>

      <div className="bg-gray-100">
        <div className="max-w-content-75 mx-auto flex flex-col items-center justify-between px-6 py-1 gap-6 lg:gap-0 lg:flex-row">
          <div className="flex flex-row items-center justify-between gap-3">
            <span className="text-base font-medium text-gray-900">
              Specify the Number of employees
            </span>
            <div className="flex items-center gap-4 rounded-lg bg-gray-200 p-0.5">
              <button
                type="button"
                onClick={() => setSeats(s => Math.max(1, s - 1))}
                className="p-4 text-xl font-medium text-gray-900"
              >
                -
              </button>
              <p className="text-base font-medium text-gray-900">{seats}</p>
              <button
                type="button"
                onClick={() => setSeats(s => Math.min(999, s + 1))}
                className="p-4 text-xl font-medium text-gray-900"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="block p-6 mx-auto">
        <div className="flex flex-col items-center w-full gap-4 py-12 lg:flex-row lg:justify-center lg:px-10">
          {subscriptions?.map((sub, idx) => {
            return (
              <Subscription
                sub={sub}
                key={idx}
                isFree={parseInt(sub.price, 10) === 0}
                seats={seats}
                onClickSubscribe={() => subscribeHandler(sub.price_id, seats)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
