import React, { FC, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { parseJwt } from "../../helpers/user";
import { PROFILE_ROUTE_UPDATE_USERNAME, PROFILE_ROUTE_UPDATE_USER_AVATAR, RESET_PASSWORD_ROUTE } from "../../store/constants/route-constants";

import { Dispatch, RootState } from "../../store/store";

type ProfileProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const ProfilePage: FC<ProfileProps> = ({ isAuthenticated, subscriptionPlan, subscriptionStatus, userToken, user, fullSignOut }) => {
  const dispatch = useDispatch<Dispatch>();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (!user?.id && userToken?.id) dispatch.user.getUser(userToken.id);
  }, [user?.id]);

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
          <div className="px-6">
            <div className="text-center mt-12">
              <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                {user?.username || "User"}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold">
                {user?.email || "user@mail.com"}
              </div>
              <div className="mt-10">
                <Link
                  to={PROFILE_ROUTE_UPDATE_USERNAME}
                  className="font-normal text-pink-500 mr-10"
                >
                  Change Username
                </Link>
                <Link
                  to={PROFILE_ROUTE_UPDATE_USER_AVATAR}
                  className="font-normal text-pink-500 mr-10"
                >
                  Change Profile Picture
                </Link>
                <Link
                  to={RESET_PASSWORD_ROUTE}
                  className="font-normal text-pink-500  mr-10"
                >
                  Reset Password
                </Link>
                <span
                  onClick={fullSignOut}
                  className="font-normal text-pink-500 cursor-pointer"
                >
                  Full Sign Out
                </span>
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-gray-300 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-gray-800">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laborum perspiciatis quidem labore quam eligendi suscipit, quaerat obcaecati similique aut repellendus ab veniam provident odit odio esse vero earum facilis!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapState = (state: RootState) => ({
  isAuthenticated: state.user?.isAuthenticated,
  subscriptionPlan: state.user?.subscription.nickname,
  subscriptionStatus: state.user?.subscription.status,
  userToken: parseJwt(state.user.accessToken),
  user: state.user,
});

const mapDispatch = (dispatch: Dispatch) => ({
  fullSignOut: dispatch.user.fullSignOut,
});

export default connect(mapState, mapDispatch)(ProfilePage);
