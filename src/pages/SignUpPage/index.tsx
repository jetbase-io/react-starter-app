import type { FC } from 'react'

import { connect } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import type { Dispatch, RootState } from '../../store/store'

import Placeholder from './Placeholder'
import SignUpForm from './SignUpForm'

type SignUpProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

const SignUpPage: FC<SignUpProps> = ({
  isSignedUp,
  isAuthenticated,
  signUp,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    return navigate('/')
  }

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      {!isSignedUp ? (
        <>
          <div className="max-w-md w-full mx-auto">
            <div className="text-center font-medium text-xl">Sign Up Page</div>
          </div>
          <SignUpForm handleSignUp={signUp} />
        </>
      ) : (
        <Placeholder
          title="You have been successfully signed up!"
          message="Please check your inbox and confirm an email address to be able to sign in."
          btnTitle="Go to the Home page"
          onClick={handleClick}
        />
      )}
    </div>
  )
}

const mapState = (state: RootState) => ({
  isSignedUp: state.user?.isSignedUp,
  isAuthenticated: state.user?.isAuthenticated,
})

const mapDispatch = (dispatch: Dispatch) => ({
  signUp: dispatch.user.signUp,
})

export default connect(mapState, mapDispatch)(SignUpPage)
