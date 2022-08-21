import React from 'react'
import useGame from "./../../hooks/useGame";

type Props = {}

const GameScore: React.FC<Props> = () => {
  const { gameScore } = useGame();

  return (
    <div
      className='absolute top-0 right-0 m-5 font-bold text-black text-xl border w-20 h-10 flex justify-center items-center bg-orange-300 shadow rounded-xl'>
      { gameScore }
    </div>
  )
}

export default GameScore;
