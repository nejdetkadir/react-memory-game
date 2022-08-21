import { GameStateEnum } from './../types';
import placeholderImage from "./../assets/placeholder.png"

const GAME_SETTINGS = Object.freeze({
  MINIMUM_HORIZONTAL_CARDS_COUNT: 4,
  MAXIMUM_HORIZONTAL_CARDS_COUNT: 9,
  MINIMUM_VERTICAL_CARDS_COUNT: 4,
  MAXIMUM_VERTICAL_CARDS_COUNT: 9,
  INITIAL: {
    verticalCardsCount: 4,
    horizontalCardsCount: 4,
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
  CLEAR_TIMEOUT: 1500,
});

const MATCHED_CARDS = Object.freeze({
  INITIAL: [],
});

const GAME_CARDS = Object.freeze({
  INITIAL: [],
});

const GAME_CONTEXT = Object.freeze({
  FINISHED_TRIGGER_TIMEOUT: 800,
});

const DOES_NOT_MATCHED_CARDS = Object.freeze({
  INITIAL: [],
});

const GAME_CARD_COMPONENT = Object.freeze({
  IS_MATCHED_CLASS: 'animate__rotateOut',
  IS_TOUCHED_CLASS: 'animate__zoomIn',
  INITAL_CLASS: 'animate__heartBeat',
  FAIL_CLASS: 'animate__wobble',
  PLACEHOLDER_IMAGE: placeholderImage
});

const LAYOUT = Object.freeze({
  DEFAULT: {
    BACKGROUND_COLOR: '#fecaca',
  }
});

const IS_BLOCKED = Object.freeze({
  INITIAL: false,
  BLOCK: true,
  UNBLOCK: false,
});

const GAME_IS_STARTED = Object.freeze({
  INITIAL: false,
  STARTED: true,
  PLAYING: false,
  BLOCKED_TIMEOUT: 1000,
});

export {
  GAME_SETTINGS,
  GAME_STATE,
  GAME_SCORE,
  TOUCHED_CARDS,
  MATCHED_CARDS,
  GAME_CARDS,
  GAME_CONTEXT,
  GAME_CARD_COMPONENT,
  LAYOUT,
  DOES_NOT_MATCHED_CARDS,
  IS_BLOCKED,
  GAME_IS_STARTED
};
