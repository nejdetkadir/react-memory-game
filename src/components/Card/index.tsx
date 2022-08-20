import React from 'react'
import placeholderImage from "./../../assets/placeholder.png"

type Props = {
  id: string,
  name: string,
  image: string,
}

const Card: React.FC<Props> = ({ id, name, image }) => {
  return (
    <div className='grid place-items-center h-full'>
      <img src={placeholderImage} />
    </div>
  )
}

export default Card;
