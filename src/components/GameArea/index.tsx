import React from 'react'
import useGame from "./../../hooks/useGame";
import { GameStateEnum } from "./../../types";
import { PlayingState, FinishedState, NotStartedState } from "./../index"

type Props = {}

const GameArea: React.FC<Props> = () => {
  const { gameState } = useGame();

  if (gameState === GameStateEnum.PLAYING) {
    return <PlayingState />
  } else if (gameState === GameStateEnum.FINISHED) {
    return <FinishedState />;
  } else {
    return <NotStartedState />
  }
}

export default GameArea;
