import React from 'react'

type Props = {
  children: React.ReactNode
}

const Default: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Default;
