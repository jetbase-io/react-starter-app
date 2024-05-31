import type { FC } from 'react'

import React from 'react'
import { Link } from 'react-router-dom'

interface HeaderLinkProps {
  text: string
  to: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const HeaderLink: FC<HeaderLinkProps> = ({ text, to, onClick }) => {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className="text-sm block py-2 pr-4 pl-3 border-b border-gray-100 text-gray-200 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 lg:dark:hover:bg-transparent dark:border-gray-700 uppercase"
      >
        {text}
      </Link>
    </li>
  )
}

export default HeaderLink
