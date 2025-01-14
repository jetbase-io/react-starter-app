import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

export const Link = (props: LinkProps) => {
  const { className, to, children, ...otherProps } = props

  return (
    <RouterLink
      className={`text-blue-400 font-small dark:text-blue-500 hover:underline ${className ?? ''}`}
      to={to}
      {...otherProps}
    >
      {children}
    </RouterLink>
  )
}
