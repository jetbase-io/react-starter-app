import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Plans from '../../components/Plans';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { SIGN_IN_ROUTE } from '../../store/constants/route-constants';
import { Dispatch } from '../../store/store';

const PlansPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useTypedSelector((state) => state.user.isAuthenticated);
  const plans = useTypedSelector((state) => state.plan.plans);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (isAuthenticated) dispatch.plan.getPlans();
    else navigate(SIGN_IN_ROUTE);
  }, []);

  return (
    <div className='mt-12'>
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-6xl text-primary-white font-bold">Pricing</h2>
      </div>
      <Plans plans={plans}/> 
    </div>
  )
}

export default PlansPage;

