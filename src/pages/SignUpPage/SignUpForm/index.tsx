import { FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { SIGN_IN_ROUTE } from "../../../store/constants/route-constants";
import { SignUpPayloadT } from "../../../services/api/User/types";

interface IProps {
  handleSignUp: (data: SignUpPayloadT) => void;
}

const SignUpForm: FC<IProps> = ({ handleSignUp }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Minimum 6 characters required")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email format")
        .min(6, "Minimum 6 characters required")
        .required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters required")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      handleSignUp({
        username: values.username,
        email: values.email,
        password: values.password,
      });
    },
  });

  const buttonClass = classNames({
    "bg-blue-600 hover:bg-blue-600": formik.isValid,
    "bg-gray-400": !formik.isValid,
  });

  return (
    <div className="w-full max-w-md p-8 mx-auto mt-4 bg-white border border-gray-300 rounded-md">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-bold text-gray-600"
          >
            Username
          </label>
          <input
            name="username"
            placeholder="Type your username..."
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="text-red-500">{formik.errors.username}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-600"
          >
            Email
          </label>
          <input
            name="email"
            placeholder="Type your email..."
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500">{formik.errors.email}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-bold text-gray-600"
          >
            Password
          </label>
          <input
            name="password"
            placeholder="Type your password..."
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            autoComplete="on"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500">{formik.errors.password}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-bold text-gray-600"
          >
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            placeholder="Type your password..."
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            autoComplete="on"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className="text-red-500">{formik.errors.confirmPassword}</p>
          ) : null}
        </div>
        <div>
          <button
            type="submit"
            className={`${buttonClass} w-full py-2 px-4 rounded-md text-white text-sm`}
          >
            Sign Up
          </button>
          <div className="flex justify-center mt-5">
            <Link
              className="text-blue-400 font-small dark:text-blue-500 hover:underline"
              to={SIGN_IN_ROUTE}
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
