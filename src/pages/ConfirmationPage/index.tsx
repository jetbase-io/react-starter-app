import { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import Placeholder from '../SignUpPage/Placeholder'
import { useConfirm } from '../../hooks/user/useConfirm'
import { useUserStore } from '../../store/useUserStore'

const TOKEN = 'confirmation_token'

const ConfirmationPage = () => {
  const { search } = useLocation()
  const token = new URLSearchParams(search).get(TOKEN)
  const navigate = useNavigate()
  const { mutate: confirm } = useConfirm()
  const isConfirmed = useUserStore(state => state.isConfirmed)

  useEffect(() => {
    if (!token) return

    confirm(token)
  }, [confirm, token])

  const handleClick = () => {
    return navigate('/')
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

export default ConfirmationPage
