import type { FC } from 'react'

import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import type { Dispatch, RootState } from '../../store/store'

import Placeholder from '../SignUpPage/Placeholder'

const TOKEN = 'confirmation_token'

type ConfirmationProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>

const ConfirmationPage: FC<ConfirmationProps> = ({
  isAuthenticated,
  isConfirmed,
  confirm,
}) => {
  const { search } = useLocation()
  const token = new URLSearchParams(search).get(TOKEN)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return

    confirm({ token })
  }, [confirm, token])

  const handleClick = () => {
    return navigate('/')
  }

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        {isConfirmed ? (
          <Placeholder
            title="Confirmation successful!"
            message="Thank you for confirmation your email address. Now you can sign in."
            btnTitle="Go to the Sign in page"
            onClick={handleClick}
          />
        ) : (
          <Placeholder
            title="Invalid token"
            message="Unable to proceed"
            btnTitle="Go to the Home page"
            onClick={handleClick}
          />
        )}
      </div>
    </div>
  )
}

const mapState = (state: RootState) => ({
  isConfirmed: state.user?.isConfirmed,
  isAuthenticated: state.user?.isAuthenticated,
})

const mapDispatch = (dispatch: Dispatch) => ({
  confirm: dispatch.user.confirm,
})

export default connect(mapState, mapDispatch)(ConfirmationPage)
