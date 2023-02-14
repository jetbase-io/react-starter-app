import classNames from "classnames";
import { useFormik } from "formik";
import React, { FC } from "react";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { SIGN_IN_ROUTE } from "../../store/constants/route-constants";
import { Dispatch, RootState } from "../../store/store";

type IPasswordValues = Record<string, string>;

type ForgotPasswordProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
const ForgotPasswordPage: FC<ForgotPasswordProps> = ({ isAuthenticated, resetPassword }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").min(6, "Minimum 6 characters required").required("Required"),
    }),
    onSubmit: (values) => {
      // ForgotPasswordPage():
      navigate(SIGN_IN_ROUTE);
    },
  });

  const buttonClass = classNames({
    "bg-blue-600 hover:bg-blue-600": formik.isValid,
    "bg-gray-400": !formik.isValid,
  });

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">Forgot Password</div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-md">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-600 block">
              Email
            </label>
            <input
              name="email"
              placeholder="Type your username..."
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
          </div>
          <div>
            <button type="submit" className={`${buttonClass} w-full py-2 px-4 rounded-md text-white text-sm`}>
              Send
            </button>
            <div className="mt-5 flex justify-center">
              <Link className="font-small text-blue-400 dark:text-blue-500 hover:underline" to={SIGN_IN_ROUTE}>
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  isAuthenticated: state.user?.isAuthenticated,
});

const mapDispatch = (dispatch: Dispatch) => ({
  resetPassword: dispatch.user.resetPassword,
});

export default connect(mapState, mapDispatch)(ForgotPasswordPage);
