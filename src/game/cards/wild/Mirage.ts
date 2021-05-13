import { Card } from '../../../common/Card';
import { Suit } from '../../../common/Suit';
import { SUIT_ARMY, SUIT_FLAME, SUIT_FLOOD, SUIT_LAND, SUIT_WEATHER, SUIT_WILD } from '../../suits';

export class Mirage extends Card {
  constructor() {
    super({
      id: 47,
      suit: SUIT_WILD,
      name: 'Mirage',
      originalBaseStrength: 0,
      isIncreaseCardsLimit: true,
      allowsNextCardToBeCopy: true,
      choiceModifier: 'MIRAGE',
    });
  }

  calculate(cards: Card[]): void {
    const nextCardIndex: number = cards.indexOf(this) + 1;

    if (nextCardIndex >= cards.length) {
      return;
    }

    const nextCard: Card = cards[nextCardIndex];

    const nextCardCopy = nextCard.getCopy();
    nextCardCopy.isClearBaseStrength = true;
    nextCardCopy.isClearBonus = true;
    nextCardCopy.isClearPenalty = true;
    nextCardCopy.modifiedBy = this.choiceModifier;

    cards.splice(nextCardIndex, 1, nextCardCopy);
  }

  getNextCardsSuits(): Suit[] {
    return [SUIT_ARMY, SUIT_LAND, SUIT_WEATHER, SUIT_FLOOD, SUIT_FLAME];
  }
}
