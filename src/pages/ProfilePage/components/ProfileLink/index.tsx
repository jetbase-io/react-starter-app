import React from 'react'
import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'

export interface ProfileLinkProps extends Omit<LinkProps, 'to'> {
  children?: React.ReactNode
  to?: string | null
  onClick?: () => any
}

export const ProfileLink = (props: ProfileLinkProps) => {
  const { children, to, onClick, className, ...otherProps } = props

  if (to) {
    return (
      <Link
        to={to}
        className={`mr-10 font-normal text-pink-500 ${className ?? ''}`}
        onClick={onClick}
        {...otherProps}
      >
        {children}
      </Link>
    )
  }

  return (
    <span
      onClick={onClick}
      className={`font-normal text-pink-500 cursor-pointer  ${className ?? ''}`}
      {...otherProps}
    >
      {children}
    </span>
  )
}
