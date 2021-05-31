import { Card } from '../../../common/Card';
import { SUIT_FLOOD } from '../../suits';

export class FountainOfLife extends Card {
  constructor() {
    super({
      id: 21,
      suit: SUIT_FLOOD,
      name: 'Fountain Of Life',
      originalBaseStrength: 1,
      isIncreaseCardsLimit: true,
      allowsNextCardToBeCopy: true,
      choiceModifier: 'FOUNTAIN OF LIFE',
    });
  }

  updateOtherCards(cards: Card[]): void {
    const nextCardIndex: number = cards.indexOf(this) + 1;

    if (nextCardIndex >= cards.length) {
      return;
    }

    const nextCard: Card = cards[nextCardIndex];

    const nextCardCopy = nextCard.getCopy();
    nextCardCopy.isClearBonus = true;
    nextCardCopy.isClearPenalty = true;
    nextCardCopy.modifiedBy = this.choiceModifier;

    cards.splice(nextCardIndex, 1, nextCardCopy);
  }

  getNextCards(cards: Card[]): Card[] {
    return cards.filter(() => true).slice(0, -1);
  }
}
