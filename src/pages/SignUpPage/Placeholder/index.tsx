import type { FC } from 'react'
import { Button } from '../../../components/Button'

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
      <Button className="bg-blue-600 hover:bg-blue-600" onClick={onClick}>
        {btnTitle}
      </Button>
    </div>
  )
}

export default Placeholder
