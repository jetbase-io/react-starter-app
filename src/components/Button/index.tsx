import type { ButtonHTMLAttributes } from 'react'

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, children, ...otherProps } = props

  return (
    <button
      className={`w-full py-2 px-4 rounded-md text-white text-sm ${className ?? ''}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}
