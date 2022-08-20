import React, { useEffect, useState } from 'react'
import useGame from "./../../hooks/useGame";
import placeholderImage from "./../../assets/placeholder.png"
import { CardType } from './../../types';

type Props = {
  id: string,
  name: string,
  image: string,
}

const Card: React.FC<Props> = ({ id, name, image }) => {
  const { touchCard, matchedCards, touchedCards } = useGame();
  const [isMatced, setIsMatced] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const onClickCard = () => {
    touchCard({ id, name, image } as CardType);
  }

  useEffect(() => {    
    const isMatched = matchedCards.find(card => card.id === id);
    setIsMatced(isMatched ? true : false);

    const isTouched = touchedCards.find(card => card.id === id);
    setIsTouched(isTouched ? true : false);
  }, [matchedCards, touchedCards])

  const cardImage = isTouched || isMatced ? image : placeholderImage;
  const isMatchedClass = isMatced ? "animate__animated animate__rotateOut" : "";

  return (
    <div className={`grid place-items-center h-full cursor-pointer ${isMatchedClass}`} onClick={onClickCard}>
      <img src={cardImage} width={64} height={64} />
    </div>
  )
}

export default Card;
