import React from 'react'

type Props = {
  children: React.ReactNode
}

const Default: React.FC<Props> = ({ children }) => {
  return (
    <div className='grid place-items-center h-screen'>
      {children}
    </div>
  )
}

export default Default;
