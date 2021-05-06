import { Card } from '../common/Card';
import { Suit } from '../common/Suit';

export interface GameService {
  getCardsByIds(cardsIds: number[]): Card[];
  getSuits(cards: Card[]): Suit[];
  getCards(suitId: number, cards: Card[]): Card[];
  isMaxCards(cards: Card[]): boolean;
  chooseFromCards(cards: Card[]): Card[];
}
