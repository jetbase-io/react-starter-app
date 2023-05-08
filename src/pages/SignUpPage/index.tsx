import { FC } from "react";
import { connect } from "react-redux";

import SignUpForm from "./SignUpForm";
import Placeholder from "./Placeholder";
import { Dispatch, RootState } from "../../store/store";

type SignUpProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SignUpPage: FC<SignUpProps> = ({ isSignedUp, signUp }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      {!isSignedUp ? (
        <>
          <div className="max-w-md w-full mx-auto">
            <div className="text-center font-medium text-xl">Sign Up Page</div>
          </div>
          <SignUpForm handleSignUp={signUp} />
        </>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

const mapState = (state: RootState) => ({
  isSignedUp: state.user?.isSignedUp,
});

const mapDispatch = (dispatch: Dispatch) => ({
  signUp: dispatch.user.signUp,
});

export default connect(mapState, mapDispatch)(SignUpPage);
