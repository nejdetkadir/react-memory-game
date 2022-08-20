import { CardType } from './../types';

const shuffleCardsWithSlice = (cards: CardType[], total: number) => {
  return shuffleCards(cards).slice(0, total);
}

const shuffleCards = (cards: CardType[]) => {
  return cards.map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
}

export { shuffleCards, shuffleCardsWithSlice };
