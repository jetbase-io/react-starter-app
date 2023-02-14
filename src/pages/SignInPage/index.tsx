import classNames from "classnames";
import { useFormik } from "formik";
import React, { FC } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";

import { FORGOT_PASSWORD_ROUTE, RESET_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "../../store/constants/route-constants";
import { Dispatch, RootState } from "../../store/store";

type SignInProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const SignInPage: FC<SignInProps> = ({ isAuthenticated, signIn }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(6, "Minimum 6 characters required").required("Required"),
      password: Yup.string().min(6, "Minimum 6 characters required").required("Required"),
    }),
    onSubmit: (values) => {
      signIn({
        username: values.username,
        password: values.password,
      });
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">Sign In Page</div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-md">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Username
            </label>
            <input
              name="username"
              placeholder="Type your username..."
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500">{formik.errors.username}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Password
            </label>
            <input
              name="password"
              placeholder="Type your password..."
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              autoComplete="on"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500">{formik.errors.password}</p>
            ) : null}
          </div>
          <div>
            <button type="submit" className={`${buttonClass} w-full py-2 px-4 rounded-md text-white text-sm`}>
              Sign In
            </button>
            <div className="mt-5 flex justify-between">
              <Link className="font-small text-blue-400 dark:text-blue-500 hover:underline" to={SIGN_UP_ROUTE}>
                Don't have an account?
              </Link>
              <Link className="font-small text-blue-400 dark:text-blue-500 hover:underline" to={FORGOT_PASSWORD_ROUTE}>
                Forgot password?
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
  signIn: dispatch.user.signIn,
});

export default connect(mapState, mapDispatch)(SignInPage);
