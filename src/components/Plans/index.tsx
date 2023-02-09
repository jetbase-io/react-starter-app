import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BILLING_ROUTE } from "../../store/constants/route-constants";
import { Dispatch, RootState } from "../../store/store";

const Plans: FC = () => {
  const navigate = useNavigate();
  const plansState = useSelector((state: RootState) => state.plan);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (isAuthenticated) dispatch.plan.getPlans();
  }, []);

  const handleSubscribe = (title: string, id: string) => {
    dispatch.plan.setChosenPlan(id);
    navigate(BILLING_ROUTE);
  };

  return (
    <div className="block mx-auto p-6 bg-white">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl text-primary-white font-bold">Pricing</h2>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row items-center lg:justify-center w-full lg:px-10 py-12">
        {plansState.plans?.map(({ id, nickname, amount }) => (
          <div
            key={id}
            className="w-4/5 lg:w-custom mb-10 lg:px-4 py-10 text-center text-primary-dark bg-primary-white border border-gray-200 rounded-lg shadow"
          >
            <h5 className="font-bold text-base">{nickname}</h5>
            <h2 className="pb-4 flex justify-center font-bold border-b border-gray-300">
              <span className="text-6xl mr-1">$</span>
              <span className="text-6xl">{amount / 100}</span>
            </h2>
            <button
              onClick={() => handleSubscribe(nickname, id)}
              className="bg-blue-500 uppercase text-white text-center text-sm mt-12 xl:px-24 px-12 sm:px-16 py-2 font-bold text-primary-very-light rounded-md"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
