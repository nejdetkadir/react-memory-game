import { GameStateEnum } from './../types';

const GAME_SETTINGS = Object.freeze({
  MINIMUM_HORIZONTAL_CARDS_COUNT: 8,
  MAXIMUM_HORIZONTAL_CARDS_COUNT: 32,
  MINIMUM_VERTICAL_CARDS_COUNT: 8,
  MAXIMUM_VERTICAL_CARDS_COUNT: 32,
  INITIAL: {
    verticalCardsCount: 8,
    horizontalCardsCount: 8,
  }
});

const GAME_STATE = Object.freeze({
  INITIAL: GameStateEnum.NOT_STARTED
});

const GAME_SCORE = Object.freeze({
  INITIAL: 0,
  PER_SUCCESSFUL_MATCH: 10,
  PER_FAILED_MATCH: 5,
});

const TOUCHED_CARDS = Object.freeze({
  INITIAL: [],
  CLEAR_TIMEOUT: 1000,
});

const MATCHED_CARDS = Object.freeze({
  INITIAL: [],
});

const GAME_CARDS = Object.freeze({
  INITIAL: [],
});

export {
  GAME_SETTINGS,
  GAME_STATE,
  GAME_SCORE,
  TOUCHED_CARDS,
  MATCHED_CARDS,
  GAME_CARDS
};
