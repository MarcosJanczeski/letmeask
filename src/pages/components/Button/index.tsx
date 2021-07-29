import { ButtonHTMLAttributes } from 'react'
import './style.scss'

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className='btn'{...props} />
  )
}
