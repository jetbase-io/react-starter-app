import { FC } from "react";

import SignUpForm from "./SignUpForm";
import Placeholder from "./Placeholder";

import { Navigate, useNavigate } from "react-router";
import { useSignUp } from "../../hooks/user/useSignUp";
import { useUserStore } from "../../store/useUserStore";

const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const { mutate: signUp } = useSignUp();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isSignedUp = useUserStore((state) => state.isSignedUp);

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

export default SignUpPage;
