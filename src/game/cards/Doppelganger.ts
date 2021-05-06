import { Card } from '../../common/Card';
import { SUIT_WILD } from '../suits';

export class Doppelganger extends Card {
  constructor() {
    super({
      id: 48,
      suit: SUIT_WILD,
      name: 'Doppelganger',
      originalBaseStrength: 0,
      isIncreaseCardsLimit: true,
      allowsNextCardToBeCopy: true,
      choiceModificator: 'DOPPELGANGER',
    });
  }

  calculate(cards: Card[]): void {
    const nextCardIndex: number = cards.indexOf(this) + 1;

    if (nextCardIndex >= cards.length) {
      return;
    }

    const nextCard: Card = cards[nextCardIndex];

    const nextCardCopy = new Card({
      id: nextCard.getId(),
      suit: nextCard.suit,
      name: nextCard.getName(),
      originalBaseStrength: nextCard.getOriginalBaseStrength(),
      isIncreaseCardsLimit: true,
    });
    nextCardCopy.isClearBonus = true;
    nextCardCopy.modificator = this.choiceModificator;
    nextCardCopy.calculate = nextCard.calculate;

    cards.splice(nextCardIndex, 1, nextCardCopy);
  }

  getNextCards(cards: Card[]): Card[] {
    return cards.slice(0, -1);
  }
}
