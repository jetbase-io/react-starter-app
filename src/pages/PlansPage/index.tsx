import { useNavigate } from 'react-router'
import Plans from '../../components/Plans'

import { SIGN_IN_ROUTE } from '../../store/constants/route-constants'
import { useGetPlans } from '../../hooks/plan/useGetPlans'
import { useUserStore } from '../../store/useUserStore'
import { usePlanStore } from '../../store/usePlanStore'

const PlansPage = () => {
  const navigate = useNavigate()
  const isAuthenticated = useUserStore(state => state.isAuthenticated)

  if (!isAuthenticated) {
    navigate(SIGN_IN_ROUTE)
  }

  const chosenPlan = usePlanStore(state => state.chosenPlan)

  const { plans } = useGetPlans()

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
