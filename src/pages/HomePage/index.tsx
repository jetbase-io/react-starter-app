import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { SIGN_IN_ROUTE } from "../../store/constants/route-constants";
import { RootState } from "../../store/store";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.user);
  const { isAuthenticated } = userState;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(SIGN_IN_ROUTE);
    }
  }, []);

  return (
    <div className="pb-10 mx-auto mt-10 rounded-lg shadow-xl">
      <div className="flex justify-center items-center h-[250px]">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Welcome to Starter App!
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
