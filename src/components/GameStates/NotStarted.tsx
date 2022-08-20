import React from 'react'
import useGame from "./../../hooks/useGame";
import { GameSettings } from "./../index";

type Props = {}

const NotStarted: React.FC<Props> = () => {
  const { startGame } = useGame();

  return (
    <div className='grid gap-y-8 w-80'>
      <GameSettings />
      <button onClick={startGame} className="p-2 text-white font-bold hover bg-rose-500 rounded-lg">Start Game</button>
    </div>
  )
}

export default NotStarted;
