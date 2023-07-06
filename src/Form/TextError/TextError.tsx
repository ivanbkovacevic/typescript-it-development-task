import React from 'react';
import style from './TextError.module.scss'

interface TextErrorProps {
    children: React.ReactNode
}
const TextError:React.FC<TextErrorProps> = ({children}) => {
  return (
    <div className={style.wrapper}>
        {children}
    </div>
  )
}

export default TextError