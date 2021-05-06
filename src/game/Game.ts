import { Card } from '../common/Card';
import { GameService } from './GameService';
import { Suit } from '../common/Suit';
import { allCards } from './cards';
import { suits } from './suits';

const MAX_CARDS = 2;

export class Game implements GameService {
  getSuits(cards: Card[]): Suit[] {
    const previousCard = this.getPreviousCard(cards);

    const nextCardsSuits = previousCard ? previousCard.getNextCardsSuits() : suits;

    return nextCardsSuits.filter((suit) => this.getCards(suit.id, cards).length > 0);
  }

  getCards(suitId: number, cards: Card[]): Card[] {
    const previousCard = this.getPreviousCard(cards);
    const showAllCards = !previousCard || previousCard.allowsNextCardToBeCopy;

    const suitCards = allCards.filter(
      (card) =>
        card.suit.id === suitId && (showAllCards || cards.every((addedCard) => card.getId() !== addedCard.getId())),
    );

    return suitCards;
  }

  getCardsByIds(cardsIds: number[]): Card[] {
    const cards = cardsIds.map((cardId) => allCards.find((card) => card.getId() === cardId) as Card);

    cards.forEach((card) => card.blankCards(cards));
    cards.forEach((card) => card.calculate(cards));

    return cards;
  }

  isMaxCards(cards: Card[]): boolean {
    const maxCards = cards.reduce((acc, card) => (card.isIncreaseCardsLimit ? acc + 1 : acc), MAX_CARDS);

    return cards.length >= maxCards;
  }

  chooseFromCards(cards: Card[]): Card[] {
    const previousCard = this.getPreviousCard(cards);

    const nextCards = previousCard ? previousCard.getNextCards(cards) : [];

    return nextCards;
  }

  private getPreviousCard(cards: Card[]): Card | undefined {
    return cards[cards.length - 1];
  }
}
