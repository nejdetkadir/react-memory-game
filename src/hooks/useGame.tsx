import React, { useState, useContext, createContext, useEffect } from 'react';
import { GameStateEnum, CardType } from './../types';
import { cards } from "./../data";
import { shuffleCards, shuffleCardsWithSlice, addRandomIdToCards } from './../utils';
import {
  GAME_SETTINGS,
  GAME_STATE,
  GAME_SCORE,
  TOUCHED_CARDS,
  MATCHED_CARDS,
  GAME_CARDS,
  GAME_CONTEXT
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
  touchedCards: CardType[];
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
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  useEffect(() => {
    if (matchedCards.length === gameCards.length && gameCards.length > 0) {
      setTimeout(() => {
        setGameState(GameStateEnum.FINISHED);
        setGameScore(GAME_SCORE.INITIAL);
        setTouchedCards([]);
        setMatchedCards([]);
      }, GAME_CONTEXT.FINISHED_TRIGGER_TIMEOUT);
    }
  }, [matchedCards])

  const startGame = () => {
    setGameState(GameStateEnum.PLAYING);
    const shuffledCards = prepareGameCards();
    setGameCards(shuffledCards);
  }

  const prepareGameCards = () => {
    const totalCards = (gameSettings.verticalCardsCount * gameSettings.horizontalCardsCount) / 2;
    let shuffledCards = shuffleCardsWithSlice(cards, totalCards);
    shuffledCards = shuffleCards([...shuffledCards, ...shuffledCards]);
    shuffledCards = addRandomIdToCards(shuffledCards);
    return shuffledCards;
  }

  const finishGame = () => {
    setGameState(GameStateEnum.FINISHED);
  }

  const restartGame = () => startGame();

  const touchCard = (card: CardType) => {
    if (isBlocked) return;

    if (touchedCards.length === 0) {
      setTouchedCards([...touchedCards, card]);
    } else {
      if (touchedCards[0].id === card.id) return;

      setTouchedCards([...touchedCards, card]);

      if (touchedCards[0].name === card.name) {
        addScore();
        addNewMatch(card);
        clearTouchedCards();
      } else {
        subtractScore();
        clearTouchedCards();
      }
    }
  }

  const addNewMatch = (card: CardType) => {
    setMatchedCards([...touchedCards, card, ...matchedCards]);
  }

  const clearTouchedCards = () => {
    setIsBlocked(true);
    setTimeout(() => {
      setTouchedCards([]);
      setIsBlocked(false);
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
    touchedCards,
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
