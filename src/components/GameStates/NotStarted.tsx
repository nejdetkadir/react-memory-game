import React from 'react'
import useGame from "./../../hooks/useGame";

type Props = {}

const NotStarted: React.FC<Props> = () => {
  const { startGame } = useGame();

  return (
    <div>
      <button onClick={startGame}>Start Game</button>
    </div>
  )
}

export default NotStarted;
