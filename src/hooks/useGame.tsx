import React, { useState, useContext, createContext, useEffect } from 'react';
import { GameStateEnum, CardType } from './../types';
import { cards } from "./../data";
import { shuffleCards, shuffleCardsWithSlice } from './../utils';
import {
  GAME_SETTINGS,
  GAME_STATE,
  GAME_SCORE,
  TOUCHED_CARDS,
  MATCHED_CARDS,
  GAME_CARDS
} from "./../constants";

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
  gameCards: CardType[];
}

type GameSettingsType = {
  verticalCardsCount: number;
  horizontalCardsCount: number;
}

const GameContext = createContext({} as UseGameType);

export const GameProvider: React.FC<GameProviderType> = ({ children }) => {
  const [gameSettings, setGameSettings] = useState<GameSettingsType>(GAME_SETTINGS.INITIAL);
  const [gameState, setGameState] = useState<GameStateEnum>(GAME_STATE.INITIAL);
  const [gameScore, setGameScore] = useState<number>(GAME_SCORE.INITIAL);
  const [touchedCards, setTouchedCards] = useState<CardType[]>(TOUCHED_CARDS.INITIAL);
  const [matchedCards, setMatchedCards] = useState<CardType[]>(MATCHED_CARDS.INITIAL);
  const [gameCards, setGameCards] = useState<CardType[]>(GAME_CARDS.INITIAL);

  useEffect(() => {
    if (matchedCards.length === gameCards.length && gameCards.length > 0) {
      setGameState(GameStateEnum.FINISHED);
      setGameScore(GAME_SCORE.INITIAL);
      setTouchedCards([]);
      setMatchedCards([]);
    }
  }, [matchedCards])

  const startGame = () => {
    setGameState(GameStateEnum.PLAYING);
    const totalCards = (gameSettings.verticalCardsCount * gameSettings.horizontalCardsCount) / 2;
    let shuffledCards = shuffleCardsWithSlice(cards, totalCards);
    shuffledCards = shuffleCards([...shuffledCards, ...shuffledCards]);
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
    }, TOUCHED_CARDS.CLEAR_TIMEOUT);
  }

  const addScore = () => {
    setGameScore(gameScore + GAME_SCORE.PER_SUCCESSFUL_MATCH);
  }

  const subtractScore = () => {
    setGameScore(gameScore - GAME_SCORE.PER_FAILED_MATCH);
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
    gameCards
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
