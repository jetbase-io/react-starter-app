import Plans from '../../components/Plans'

import { useGetPlans } from '../../hooks/plan/useGetPlans'
import { usePlanStore } from '../../store/usePlanStore'

const PlansPage = () => {
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
