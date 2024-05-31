import type { FC } from 'react'

import classNames from 'classnames'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import type { RootState } from '../../store/store'

import { SIGN_IN_ROUTE } from '../../store/constants/route-constants'

type ForgotPasswordProps = ReturnType<typeof mapState>
const ForgotPasswordPage: FC<ForgotPasswordProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .min(6, 'Minimum 6 characters required')
        .required('Required'),
    }),
    onSubmit: values => {
      // ForgotPasswordPage():
      navigate(SIGN_IN_ROUTE)
    },
  })

  const buttonClass = classNames({
    'bg-blue-600 hover:bg-blue-600': formik.isValid,
    'bg-gray-400': !formik.isValid,
  })

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto">
        <div className="text-xl font-medium text-center">Forgot Password</div>
      </div>
      <div className="w-full max-w-md p-8 mx-auto mt-4 bg-white border border-gray-300 rounded-md">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-600"
            >
              Email
            </label>
            <input
              name="email"
              placeholder="Type your username..."
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className={`${buttonClass} w-full py-2 px-4 rounded-md text-white text-sm`}
            >
              Send
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
    </div>
  )
}

const mapState = (state: RootState) => ({
  isAuthenticated: state.user?.isAuthenticated,
})

export default connect(mapState)(ForgotPasswordPage)
