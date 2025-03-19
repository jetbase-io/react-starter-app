import { Link } from 'react-router-dom'
import classNames from 'classnames'
import type { SignInPageInteractor } from './interactor'
import { FormikInput } from '../../components/FormikInput'
import { Button } from '../../components/Button'

export interface SignInPageLinkItem {
  to: string
  text: string
}

export interface SignInPageRouterProps {
  interactor: SignInPageInteractor
  links: SignInPageLinkItem[]
}

export const SignInPageRouter = ({
  interactor,
  links,
}: SignInPageRouterProps) => {
  const { formik } = interactor

  const buttonClass = classNames({
    'bg-blue-600 hover:bg-blue-600': formik.isValid,
    'bg-gray-400': !formik.isValid,
  })

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="text-xl font-medium text-center">Sign In Page</div>
      </div>
      <div className="w-full max-w-md p-8 mx-auto mt-4 bg-white border border-gray-300 rounded-md">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <FormikInput
            formik={formik}
            fieldName="username"
            labelText="Username"
            placeholder="Type your username..."
            type="text"
          />
          <FormikInput
            formik={formik}
            fieldName="password"
            labelText="Password"
            placeholder="Type your password..."
            type="password"
            autoComplete="on"
          />
          <div>
            <Button type="submit" className={`${buttonClass}`}>
              Sign In
            </Button>
            <div className="flex justify-between mt-5">
              {links.map((item, idx) => {
                return (
                  <Link to={item.to} key={idx}>
                    {item.text}
                  </Link>
                )
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
