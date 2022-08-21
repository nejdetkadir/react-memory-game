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
  GAME_CONTEXT,
  DOES_NOT_MATCHED_CARDS,
  IS_BLOCKED
} from "./../constants";
import useSounds from './useSounds';

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
  doesNotMatchedCards: CardType[];
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
  const [isBlocked, setIsBlocked] = useState<boolean>(IS_BLOCKED.INITIAL);
  const [doesNotMatchedCards, setDoesNotMatchedCards] = useState<CardType[]>(DOES_NOT_MATCHED_CARDS.INITIAL);
  const {
    playFailureSound,
    failureAudio,
    playSuccessSound,
    successAudio,
  } = useSounds();

  useEffect(() => {
    if (matchedCards.length === gameCards.length && gameCards.length > 0) {
      setTimeout(() => {
        setGameState(GameStateEnum.FINISHED);
      }, GAME_CONTEXT.FINISHED_TRIGGER_TIMEOUT);
    }
  }, [matchedCards])

  useEffect(() => {
    if (gameState == GameStateEnum.NOT_STARTED) {
      setGameScore(GAME_SCORE.INITIAL);
      setTouchedCards(TOUCHED_CARDS.INITIAL);
      setMatchedCards(MATCHED_CARDS.INITIAL);
    }
  }, [gameState])

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

  const restartGame = () => {
    setGameState(GameStateEnum.NOT_STARTED);
  }

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
        playSuccessSound();
      } else {
        setDoesNotMatchedCards([...touchedCards, card]);
        subtractScore();
        clearTouchedCards();
        playFailureSound();
      }
    }
  }

  const addNewMatch = (card: CardType) => {
    setMatchedCards([...touchedCards, card, ...matchedCards]);
  }

  const clearTouchedCards = () => {
    setIsBlocked(IS_BLOCKED.BLOCK);
    setTimeout(() => {
      setTouchedCards(TOUCHED_CARDS.INITIAL);
      setIsBlocked(IS_BLOCKED.UNBLOCK);
      setDoesNotMatchedCards(DOES_NOT_MATCHED_CARDS.INITIAL);
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
    gameCards,
    doesNotMatchedCards,
  }

  return (
    <GameContext.Provider value={contextValue}>
      { failureAudio }
      { successAudio }
      {children}
    </GameContext.Provider>
  )
}

export default function useGame(): UseGameType {
  return useContext(GameContext);
}
