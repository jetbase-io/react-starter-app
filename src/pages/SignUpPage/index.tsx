import { FC } from "react";
import { connect } from "react-redux";

import SignUpForm from "./SignUpForm";
import Placeholder from "./Placeholder";
import { RootState } from "../../store/store";
import { Navigate, useNavigate } from "react-router";
import { useSignUp } from "../../hooks/user/useSignUp";

type SignUpProps = ReturnType<typeof mapState>;

const SignUpPage: FC<SignUpProps> = ({ isSignedUp, isAuthenticated }) => {
  const navigate = useNavigate();
  const { mutate: signUp } = useSignUp();

  const handleClick = () => {
    return navigate("/");
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-50">
      {!isSignedUp ? (
        <>
          <div className="w-full max-w-md mx-auto">
            <div className="text-xl font-medium text-center">Sign Up Page</div>
          </div>
          <SignUpForm handleSignUp={signUp} />
        </>
      ) : (
        <Placeholder
          title={"You have been successfully signed up!"}
          message={
            "Please check your inbox and confirm an email address to be able to sign in."
          }
          btnTitle="Go to the Home page"
          onClick={handleClick}
        />
      )}
    </div>
  );
};

const mapState = (state: RootState) => ({
  isSignedUp: state.user?.isSignedUp,
  isAuthenticated: state.user?.isAuthenticated,
});

export default connect(mapState)(SignUpPage);
