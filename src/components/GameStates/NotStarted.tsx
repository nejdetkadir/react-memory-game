import React from 'react'
import useGame from "./../../hooks/useGame";
import { GameSettings } from "./../index";

type Props = {}

const NotStarted: React.FC<Props> = () => {
  const { startGame, gameSettings } = useGame();
  const canStartGame = gameSettings.horizontalCardsCount * gameSettings.verticalCardsCount % 2 === 0;

  return (
    <div className='grid gap-y-8 w-80'>
      <GameSettings />
      <button
        onClick={startGame}
        disabled={!canStartGame}
        className="p-2 text-white font-bold hover bg-rose-500 rounded-lg disabled:bg-rose-400">
        Start Game ({gameSettings.horizontalCardsCount} x {gameSettings.verticalCardsCount})
      </button>
    </div>
  )
}

export default NotStarted;
