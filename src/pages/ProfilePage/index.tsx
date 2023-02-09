import React, { FC } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { PROFILE_ROUTE_UPDATE_USERNAME, PROFILE_ROUTE_UPDATE_USER_AVATAR } from "../../store/constants/route-constants";

import { RootState } from "../../store/store";

type ProfileProps = ReturnType<typeof mapState>;

const ProfilePage: FC<ProfileProps> = ({ isAuthenticated, subscriptionPlan, subscriptionStatus }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">Profile Page</div>
      </div>

      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <div>
          <p className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black">
            Current subscription plan:{" "}
            {subscriptionPlan && subscriptionStatus !== "inactive" ? subscriptionPlan : "Free tier"}
          </p>
        </div>
        <br></br>
        <div>
          <a
            href={PROFILE_ROUTE_UPDATE_USERNAME}
            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
          >
            Change Username
          </a>
        </div>
        <br></br>
        <div>
          <a
            href={PROFILE_ROUTE_UPDATE_USER_AVATAR}
            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
          >
            Change Profile Picture
          </a>
        </div>
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  isAuthenticated: state.user?.isAuthenticated,
  subscriptionPlan: state.user?.subscription.nickname,
  subscriptionStatus: state.user?.subscription.status,
});

export default connect(mapState)(ProfilePage);
