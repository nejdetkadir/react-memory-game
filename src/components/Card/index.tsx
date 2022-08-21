import React, { useEffect, useState } from 'react'
import useGame from "./../../hooks/useGame";
import { CardType } from './../../types';
import { GAME_CARD_COMPONENT } from "./../../constants";

type Props = {
  id: string,
  name: string,
  image: string,
  index: number,
}

const Card: React.FC<Props> = ({ id, name, image }) => {
  const { touchCard, matchedCards, touchedCards, doesNotMatchedCards } = useGame();
  const [initialClass, setInitialClass] = useState<string>(GAME_CARD_COMPONENT.INITAL_CLASS);
  const isMatched = matchedCards.find(card => card.id === id);
  const isTouched = touchedCards.find(card => card.id === id);

  const onClickCard = () => {
    touchCard({ id, name, image } as CardType);
  }

  const cardImage = isTouched || isMatched ? image : GAME_CARD_COMPONENT.PLACEHOLDER_IMAGE;
  const isMatchedClass = isMatched ? GAME_CARD_COMPONENT.IS_MATCHED_CLASS : '';
  const isTouchedClass = isTouched ? GAME_CARD_COMPONENT.IS_TOUCHED_CLASS : '';

  useEffect(() => {
    doesNotMatchedCards.find(card=> card.id === id) && setInitialClass(GAME_CARD_COMPONENT.FAIL_CLASS);
  }, [doesNotMatchedCards]);

  return (
    <div
      className={`animate__animated grid place-items-center h-full cursor-pointer ${isMatchedClass} ${isTouchedClass} ${initialClass}`}
      onClick={onClickCard}>
      <img src={cardImage} width={64} height={64} />
    </div>
  )
}

export default Card;
