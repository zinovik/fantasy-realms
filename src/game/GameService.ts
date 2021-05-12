import { Card } from '../common/Card';
import { Suit } from '../common/Suit';

export interface GameService {
  getCardsByIds(cardsIds: number[]): Card[];
  getSuits(cards: Card[]): Suit[];
  isCardsLimit(cards: Card[]): boolean;
  isSelectedSuitForCard(cards: Card[]): boolean;
  chooseFromCards(cards: Card[], suitIdSelected?: number): Card[];
}
