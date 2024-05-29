import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Dispatch, RootState } from "../../store/store";
import Placeholder from "../SignUpPage/Placeholder";
import { useConfirm } from "../../hooks/user/useConfirm";

const TOKEN = "confirmation_token";

type ConfirmationProps = ReturnType<typeof mapState>;

const ConfirmationPage: FC<ConfirmationProps> = ({
  isAuthenticated,
  isConfirmed,
}) => {
  const { search } = useLocation();
  const token = new URLSearchParams(search).get(TOKEN);
  const navigate = useNavigate();
  const { mutate: confirm } = useConfirm();

  useEffect(() => {
    if (!token) return;

    confirm(token);
  }, []);

  const handleClick = () => {
    return navigate("/");
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        {isConfirmed ? (
          <Placeholder
            title={"Confirmation successful!"}
            message={
              "Thank you for confirmation your email address. Now you can sign in."
            }
            btnTitle={"Go to the Sign in page"}
            onClick={handleClick}
          />
        ) : (
          <Placeholder
            title={"Invalid token"}
            message={"Unable to proceed"}
            btnTitle={"Go to the Home page"}
            onClick={handleClick}
          />
        )}
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  isConfirmed: state.user?.isConfirmed,
  isAuthenticated: state.user?.isAuthenticated,
});

export default connect(mapState)(ConfirmationPage);
