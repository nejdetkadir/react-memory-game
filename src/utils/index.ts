import { CardType } from './../types';

const shuffleCards = (cards: CardType[], total: number) => {
  return cards.map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
              .slice(0, total);  
}

export { shuffleCards };
