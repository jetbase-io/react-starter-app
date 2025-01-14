import { useEffect } from 'react'
import { useLocation } from 'react-router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSignIn } from '../../hooks/user/useSignIn'
import { useConfirm } from '../../hooks/user/useConfirm'

export interface SignInPageInteractor {
  formik: ReturnType<typeof useFormik<InitialFormValues>>
}

interface InitialFormValues {
  username: string
  password: string
}

const initialValues: InitialFormValues = {
  username: '',
  password: '',
}

const TOKEN = 'confirmation_token'

export const useSignInInteractor = (): SignInPageInteractor => {
  const { search } = useLocation()
  const token = new URLSearchParams(search).get(TOKEN)
  const { mutate: signInApi } = useSignIn()
  const { mutate: confirm } = useConfirm()

  useEffect(() => {
    if (!token) return

    confirm(token)
  }, [confirm, token])

  const formik = useFormik<InitialFormValues>({
    initialValues,
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, 'Minimum 6 characters required')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Minimum 6 characters required')
        .required('Required'),
    }),
    onSubmit: values => {
      signInApi({
        username: values.username,
        password: values.password,
      })
    },
  })

  return {
    formik,
  }
}
