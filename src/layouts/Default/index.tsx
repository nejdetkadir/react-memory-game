import React from 'react'
import { LAYOUT } from "./../../constants";
import 'animate.css';

type Props = {
  children: React.ReactNode
}

const Default: React.FC<Props> = ({ children }) => {
  return (

    <div
      style={{
        backgroundColor: LAYOUT.DEFAULT.BACKGROUND_COLOR
      }}>
      <div
        className='grid place-items-center h-screen'>
        {children}
      </div>
    </div>
  )
}

export default Default;
