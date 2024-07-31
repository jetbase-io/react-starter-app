import type { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { BILLING_ROUTE } from '../../store/constants/route-constants'
import { usePlanStore } from '../../store/usePlanStore'

interface IPlansProp {
  plans: []
  chosenPlan: any
}

const Plans: FC<IPlansProp> = ({ plans, chosenPlan }) => {
  const navigate = useNavigate()
  const setChosenPlan = usePlanStore(state => state.setChosenPlan)

  const handleSubscribe = (title: string, id: string) => {
    setChosenPlan(id, plans)
    navigate(BILLING_ROUTE)
  }

  return (
    <div className="block p-6 mx-auto">
      <div className="flex flex-col items-center w-full gap-4 py-12 lg:flex-row lg:justify-center lg:px-10">
        {plans?.map(({ id, nickname, amount }) => (
          <div
            key={id}
            className="relative w-4/5 py-10 mb-10 text-center border border-gray-200 rounded-lg shadow lg:w-custom lg:px-4 text-primary-dark bg-primary-white"
          >
            <h3 className="absolute uppercase left-3 top-3">
              {id === chosenPlan.id ? 'Active' : ''}
            </h3>
            <h5 className="text-base font-bold">{nickname || 'PLAN'}</h5>
            <h2 className="flex justify-center pb-4 font-bold border-b border-gray-300">
              <span className="mr-1 text-6xl">$</span>
              <span className="text-6xl">{amount / 100}</span>
            </h2>
            <button
              type="button"
              onClick={() => handleSubscribe(nickname, id)}
              className="px-12 py-2 mt-12 text-sm font-bold text-center text-white uppercase bg-blue-500 rounded-md xl:px-24 sm:px-16 text-primary-very-light"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Plans
