import { useGetPlans } from '../../hooks/plan/useGetPlans'
import { usePlanStore } from '../../store/usePlanStore'
import { Subscription } from './components/Subscription'
import { useSubscriptionsInteractor } from './interactor'

export const SubscriptionsPage = () => {
  const chosenPlan = usePlanStore(state => state.chosenPlan)

  const { subscriptions } = useSubscriptionsInteractor()

  return (
    <div className="mt-12 rounded-lg shadow-xl">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-6xl font-bold text-primary-white">Subscriptions</h2>
      </div>
      <div className="block p-6 mx-auto">
        <div className="flex flex-col items-center w-full gap-4 py-12 lg:flex-row lg:justify-center lg:px-10">
          {subscriptions?.map((sub, idx) => {
            return <Subscription sub={sub} key={idx} />
          })}
        </div>
      </div>
    </div>
  )
}
