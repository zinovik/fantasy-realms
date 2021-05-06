import { Card } from '../../common/Card';
import { SUIT_ARTIFACT } from '../suits';

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
    });
  }

  getNextCards(cards: Card[]): Card[] {
    return cards.slice(0, -1);
  }
}

// Disabled Original Card
// Add Suit
