import type { FC } from 'react'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import type { Dispatch, RootState } from '../../store/store'

import { SIGN_IN_ROUTE } from '../../store/constants/route-constants'

const HomePage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch>()
  const userState = useSelector((state: RootState) => state.user)
  const { isAuthenticated } = userState

  useEffect(() => {
    if (isAuthenticated) {
      dispatch.user.checkSubscription()
    } else {
      navigate(SIGN_IN_ROUTE)
    }
  }, [dispatch.user, isAuthenticated, navigate])

  return (
    <div className="pb-10 mx-auto mt-10 rounded-lg shadow-xl">
      <div className="flex justify-center items-center h-[250px]">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Welcome to Starter App!
        </h1>
      </div>
    </div>
  )
}

export default HomePage
