import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import type { Dispatch } from '../../store/store'

import Plans from '../../components/Plans'
import { useTypedSelector } from '../../hooks/useTypeSelector'
import { SIGN_IN_ROUTE } from '../../store/constants/route-constants'

const PlansPage = () => {
  const navigate = useNavigate()
  const isAuthenticated = useTypedSelector(state => state.user.isAuthenticated)
  const { plans, chosenPlan } = useTypedSelector(state => state.plan)
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    if (isAuthenticated) dispatch.plan.getPlans()
    else navigate(SIGN_IN_ROUTE)
  }, [dispatch.plan, isAuthenticated, navigate])

  return (
    <div className="mt-12 rounded-lg shadow-xl">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-6xl font-bold text-primary-white">Pricing</h2>
      </div>
      <Plans plans={plans} chosenPlan={chosenPlan} />
    </div>
  )
}

export default PlansPage
