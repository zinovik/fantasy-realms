import { Card } from '../../common/Card';
import { Suit } from '../../common/Suit';
import { suits, SUIT_ARTIFACT } from '../suits';

export class BookOfChanges extends Card {
  constructor() {
    super({
      id: 8,
      suit: SUIT_ARTIFACT,
      name: 'Book of Changes',
      originalBaseStrength: 3,
      isIncreaseCardsLimit: true,
      allowsNextCardToBeCopy: true,
      choiceModificator: 'BOOK OF CHANGES',
      isSelectSuitForNextCard: true,
    });
  }

  calculate(cards: Card[]): void {
    const nextCardIndex: number = cards.indexOf(this) + 1;

    if (nextCardIndex >= cards.length) {
      return;
    }

    const nextCard: Card = cards[nextCardIndex];

    const nextCardCopy = nextCard.getCopy(true);
    nextCardCopy.modifiedBy = this.choiceModificator;

    if (cards[nextCardIndex + 1]) {
      nextCardCopy.suit = suits.find((suit) => suit.id === cards[nextCardIndex + 1].getId()) as Suit;
    }

    cards.splice(nextCardIndex, 1, nextCardCopy);

    const originalCard = cards.find((card) => card.getId() === nextCard.getId()) as Card;
    originalCard.isHidden = true;
  }

  getNextCards(cards: Card[]): Card[] {
    return cards.slice(0, -1);
  }
}
