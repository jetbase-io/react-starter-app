import { useFormik } from 'formik'
import { useState } from 'react'

import { Navigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useUpdateUserAvatar } from '../../hooks/user/useUpdateUserAvatar'
import { useUserStore } from '../../store/useUserStore'

const UpdateUserAvatarPage = () => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated)

  const [preview, setPreview] = useState<string>('')
  const { mutate: updateUserAvatar } = useUpdateUserAvatar()

  const formik = useFormik({
    initialValues: {
      image: '',
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .required('Image is required!')
        .test(
          'FILE SIZE',
          'Too Big!',
          (value: any) => value && value.size < 1024 * 1024,
        )
        .test(
          'FILE TYPE',
          'Invalid!',
          (value: any) =>
            value && ['image/png', 'image/jpeg'].includes(value.type),
        ),
    }),
    onSubmit: values => {
      updateUserAvatar(values.image as unknown as File)
    },
  })

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto">
        <div className="text-xl font-medium text-center">
          Update User Profile Picture
        </div>
      </div>
      <div className="w-full max-w-md p-8 mx-auto mt-4 bg-white border border-gray-300">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="max-w-md mx-auto overflow-hidden bg-white rounded-lg md:max-w-lg">
            <div className="md:flex">
              <div className="w-full">
                <div className="mb-1">
                  <span className="block text-sm font-bold text-gray-600">
                    New profile picture
                  </span>

                  <label className="relative flex items-center justify-center h-32 bg-gray-100 border-2 border-blue-700 border-dashed border-dotted rounded-lg">
                    <div className="absolute">
                      <div className="flex flex-col items-center ">
                        {formik.values.image && (
                          <div className="flex flex-row ">
                            <img
                              alt="preview"
                              className="object-cover w-20 h-20 rounded"
                              src={preview}
                            />
                          </div>
                        )}
                        <i className="text-blue-700 fa fa-folder-open fa-3x" />
                        {!formik.values.image && (
                          <span className="block font-normal text-gray-400">
                            Click to choose an image
                          </span>
                        )}
                      </div>
                    </div>
                    <input
                      name="image"
                      onChange={e => {
                        formik.setFieldValue('image', e.target.files![0])
                        setPreview(URL.createObjectURL(e.target.files![0]))
                      }}
                      type="file"
                      style={{ display: 'none' }}
                    />
                  </label>
                  {formik.errors.image && (
                    <p className="block mt-2 mb-2 text-sm font-bold text-center text-red-600">
                      {formik.errors.image}
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

export default UpdateUserAvatarPage
