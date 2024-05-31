import type { FC } from 'react'

import { useFormik } from 'formik'

import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import * as Yup from 'yup'
import type { Dispatch, RootState } from '../../store/store'

type ProfileProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

const UpdateUsernamePage: FC<ProfileProps> = ({
  isAuthenticated,
  updateUsername,
}) => {
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, 'Minimum 6 characters required')
        .required('Required'),
    }),
    onSubmit: values => {
      updateUsername({
        username: values.username,
      })
    },
  })

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto">
        <div className="text-xl font-medium text-center">Update Username</div>
      </div>
      <div className="w-full max-w-md p-8 mx-auto mt-4 bg-white border border-gray-300">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="max-w-md mx-auto overflow-hidden bg-white rounded-lg md:max-w-lg">
            <div className="md:flex">
              <div className="w-full">
                <div className="mb-1">
                  <label className="block text-sm font-bold text-gray-600">
                    New username
                  </label>
                  <input
                    type="text"
                    className="w-full h-12 px-3 border-2 border-blue-400 rounded focus:outline-none focus:border-blue-600"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.username && (
                    <p className="block mt-2 mb-2 text-sm font-bold text-center text-red-600">
                      {formik.errors.username}
                    </p>
                  )}
                </div>
                <div className="mt-3 text-right">
                  <a
                    href="/"
                    className="w-32 h-10 px-3 py-1 ml-2 rounded hover:bg-gray-300 focus:shadow-outline focus:outline-none0"
                  >
                    Cancel
                  </a>
                  <button
                    type="submit"
                    className="w-32 h-10 ml-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </div>
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
  updateUsername: dispatch.user.updateUsername,
})

export default connect(mapState, mapDispatch)(UpdateUsernamePage)
