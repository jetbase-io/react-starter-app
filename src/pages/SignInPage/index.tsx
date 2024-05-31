import type { FC } from 'react'

import classNames from 'classnames'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import type { Dispatch, RootState } from '../../store/store'

import {
  FORGOT_PASSWORD_ROUTE,
  SIGN_UP_ROUTE,
} from '../../store/constants/route-constants'

const TOKEN = 'confirmation_token'

type SignInProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

const SignInPage: FC<SignInProps> = ({ isAuthenticated, signIn, confirm }) => {
  const { search } = useLocation()
  const token = new URLSearchParams(search).get(TOKEN)

  useEffect(() => {
    if (!token) return

    confirm({ token })
  }, [confirm, token])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, 'Minimum 6 characters required')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Minimum 6 characters required')
        .required('Required'),
    }),
    onSubmit: values => {
      signIn({
        username: values.username,
        password: values.password,
      })
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
    <div className="flex flex-col justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="text-xl font-medium text-center">Sign In Page</div>
      </div>
      <div className="w-full max-w-md p-8 mx-auto mt-4 bg-white border border-gray-300 rounded-md">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="" className="block text-sm font-bold text-gray-600">
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
            <label htmlFor="" className="block text-sm font-bold text-gray-600">
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
            <button
              type="submit"
              className={`${buttonClass} w-full py-2 px-4 rounded-md text-white text-sm`}
            >
              Sign In
            </button>
            <div className="flex justify-between mt-5">
              <Link
                className="text-blue-400 font-small dark:text-blue-500 hover:underline"
                to={SIGN_UP_ROUTE}
              >
                Don't have an account?
              </Link>
              <Link
                className="text-blue-400 font-small dark:text-blue-500 hover:underline"
                to={FORGOT_PASSWORD_ROUTE}
              >
                Forgot password?
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

const mapDispatch = (dispatch: Dispatch) => ({
  signIn: dispatch.user.signIn,
  confirm: dispatch.user.confirm,
})

export default connect(mapState, mapDispatch)(SignInPage)
