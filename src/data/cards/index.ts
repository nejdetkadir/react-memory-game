import { nanoid } from "nanoid";
import { CardType } from './../../types';
import cards from "./data.json";

const cardData = cards.map(card => {
  return { id: nanoid(), ...card } as CardType;
});

export default cardData;
