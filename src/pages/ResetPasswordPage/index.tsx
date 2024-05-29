import classNames from "classnames";
import { useFormik } from "formik";
import React, { FC } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { SIGN_IN_ROUTE } from "../../store/constants/route-constants";
import { RootState } from "../../store/store";
import { useResetPassword } from "../../hooks/user/useResetPassword";

type IPasswordValues = Record<string, string>;

type ResetPasswordProps = ReturnType<typeof mapState>;
const ResetPasswordPage: FC<ResetPasswordProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { mutate: resetPassword } = useResetPassword();

  const passwordValues: IPasswordValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues: passwordValues,
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, "Minimum 6 characters required")
        .required("Required"),
      newPassword: Yup.string()
        .min(6, "Minimum 6 characters required")
        .required("Required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      resetPassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      navigate(SIGN_IN_ROUTE);
    },
  });

  const buttonClass = classNames({
    "bg-blue-600 hover:bg-blue-600": formik.isValid,
    "bg-gray-400": !formik.isValid,
  });

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const inputs = [
    { id: 0, label: "Old Password", name: "oldPassword" },
    { id: 1, label: "New Password", name: "newPassword" },
    { id: 2, label: "Confirm Password", name: "confirmPassword" },
  ];

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto">
        <div className="text-xl font-medium text-center">Reset Password</div>
      </div>
      <div className="w-full max-w-md p-8 mx-auto mt-4 bg-white border border-gray-300 rounded-md">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {inputs.map((input) => (
            <div key={input.id}>
              <label
                htmlFor={input.name}
                className="block text-sm font-bold text-gray-600"
              >
                {input.label}
              </label>
              <input
                name={input.name}
                value={formik.values[`${input.name}`]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
              {formik.touched[`${input.name}`] &&
                formik.errors[`${input.name}`] && (
                  <p className="text-red-500">
                    {formik.errors[`${input.name}`]}
                  </p>
                )}
            </div>
          ))}
          <div>
            <button
              type="submit"
              className={`${buttonClass} w-full py-2 px-4 rounded-md text-white text-sm`}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  isAuthenticated: state.user?.isAuthenticated,
});

export default connect(mapState)(ResetPasswordPage);
