import React from 'react'
import useGame from "./../../hooks/useGame";
import { Card } from "./../index";

type Props = {}

const Playing: React.FC<Props> = () => {
  const { gameCards, gameSettings } = useGame();

  const styles = {
    gridTemplateColumns: `repeat(${gameSettings.horizontalCardsCount}, 1fr)`,
    gridTemplateRows: `repeat(${gameSettings.verticalCardsCount}, 1fr)`,
  }

  return (
    <div style={styles} className="grid gap-y-4 gap-x-2">
      {
        gameCards.map((card, index) => <Card key={index} id={card.id} name={card.name} image={card.image} />)
      }
    </div>
  )
}

export default Playing;
