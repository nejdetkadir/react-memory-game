import React from 'react'
import useGame from "./../../hooks/useGame";

type Props = {}

const Finished: React.FC<Props> = () => {
  const { restartGame, gameScore } = useGame();

  return (
    <div className='grid gap-y-4'>
      <h1 className='text-center font-bold text-xl'>Your Score is <b>{gameScore}</b></h1>
      <button
        onClick={restartGame}
        className="p-2 text-white font-bold hover bg-rose-500 rounded-lg disabled:bg-rose-400">
        Restart Game
      </button>
    </div>
  )
}

export default Finished;
