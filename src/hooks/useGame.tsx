import React, { useState, useContext, createContext, useEffect } from 'react';
import { GameStateEnum, CardType } from './../types';
import { cards } from "./../data"
import { shuffleCards } from './../utils';

type GameProviderType = {
  children: React.ReactNode;
}

type UseGameType = {
  gameState: GameStateEnum;
  startGame: () => void;
  finishGame: () => void;
  restartGame: () => void;
  gameScore: number;
  gameSettings: GameSettingsType;
  setGameSettings: (gameSettings: GameSettingsType) => void;
  touchCard: (card: CardType) => void;
  matchedCards: CardType[];
}

type GameSettingsType = {
  vertialCardCount: number;
  horizontalCardCount: number;
}

const GameContext = createContext({} as UseGameType);
const initialGameSettings = { vertialCardCount: 4, horizontalCardCount: 4 };
const initialGameState = GameStateEnum.NOT_STARTED;
const initialGameScore = 0;
const defaultSuccessScore = 10;
const defaultFailureScore = -5;
const defaultClearTouchedCardsTimeout = 1000;

export const GameProvider: React.FC<GameProviderType> = ({ children }) => {
  const [gameSettings, setGameSettings] = useState<GameSettingsType>(initialGameSettings);
  const [gameState, setGameState] = useState<GameStateEnum>(initialGameState);
  const [gameScore, setGameScore] = useState<number>(initialGameScore);
  const [touchedCards, setTouchedCards] = useState<CardType[]>([]);
  const [matchedCards, setMatchedCards] = useState<CardType[]>([]);
  const [gameCards, setGameCards] = useState<CardType[]>([]);

  useEffect(() => {
    if (matchedCards.length === gameCards.length) {
      setGameState(GameStateEnum.FINISHED);
      setGameScore(initialGameScore);
      setTouchedCards([]);
      setMatchedCards([]);
    }
  }, [matchedCards])

  const startGame = () => {
    setGameState(GameStateEnum.PLAYING);
    const totalCards = gameSettings.vertialCardCount + gameSettings.horizontalCardCount;
    const shuffledCards = shuffleCards(cards, totalCards);
    setGameCards(shuffledCards);
  }

  const finishGame = () => {
    setGameState(GameStateEnum.FINISHED);
  }

  const restartGame = () => startGame();

  const touchCard = (card: CardType) => {
    if (touchedCards.length < 2) {
      setTouchedCards([...touchedCards, card]);

      if (touchedCards.length === 2 && touchedCards[0].name === card.name) {
        addScore();
        setMatchedCards(touchedCards);
        clearTouchedCards();
      } else {
        subtractScore();
        clearTouchedCards();
      }
    } else {
      clearTouchedCards();
    }
  }

  const clearTouchedCards = () => {
    setTimeout(() => {
      setTouchedCards([]);
    }, defaultClearTouchedCardsTimeout);
  }

  const addScore = () => {
    setGameScore(gameScore + defaultSuccessScore);
  }

  const subtractScore = () => {
    setGameScore(gameScore - defaultFailureScore);
  }

  const contextValue = {
    gameState,
    startGame,
    finishGame,
    restartGame,
    gameScore,
    gameSettings,
    setGameSettings,
    touchCard,
    matchedCards,
  }

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  )
}

export default function useGame(): UseGameType {
  return useContext(GameContext);
}