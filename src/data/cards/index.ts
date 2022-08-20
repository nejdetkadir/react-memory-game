import cards from "./data.json";
import { nanoid } from "nanoid";
import { CardType } from './../../types';

const cardData = cards.map(card => {
  return { id: nanoid(), ...card } as CardType;
});

export default cardData;
