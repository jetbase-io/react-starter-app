import { useNavigate } from "react-router";
import Plans from "../../components/Plans";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { SIGN_IN_ROUTE } from "../../store/constants/route-constants";
import { useGetPlans } from "../../hooks/plan/useGetPlans";

const PlansPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useTypedSelector(
    (state) => state.user.isAuthenticated
  );

  if (!isAuthenticated) {
    navigate(SIGN_IN_ROUTE);
  }

  const { chosenPlan } = useTypedSelector((state) => state.plan);

  const { plans } = useGetPlans();

  return (
    <div className="mt-12 rounded-lg shadow-xl">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-6xl font-bold text-primary-white">Pricing</h2>
      </div>
      <Plans plans={plans} chosenPlan={chosenPlan} />
    </div>
  );
};

export default PlansPage;
