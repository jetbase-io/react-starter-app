import type { FC } from 'react'

interface IProps {
  title: string
  message: string
  btnTitle: string
  onClick: () => void
}

const Placeholder: FC<IProps> = ({ title, message, btnTitle, onClick }) => {
  return (
    <div className="max-w-md w-full mx-auto text-center font-medium text-l">
      <h1 className="text-xl">{title}</h1>
      <p>{message}</p>
      <br />
      <button
        className="bg-blue-600 hover:bg-blue-600 w-full py-2 px-4 rounded-md text-white text-sm"
        onClick={onClick}
      >
        {btnTitle}
      </button>
    </div>
  )
}

export default Placeholder
