import { Card } from '../../common/Card';
import { Suit } from '../../common/Suit';
import { SUIT_ARTIFACT, SUIT_BEAST, SUIT_LEADER, SUIT_WEAPON, SUIT_WILD, SUIT_WIZARD } from '../suits';

export class Shapeshifter extends Card {
  constructor() {
    super({
      id: 46,
      suit: SUIT_WILD,
      name: 'Shapeshifter',
      originalBaseStrength: 0,
      isIncreaseCardsLimit: true,
      allowsNextCardToBeCopy: true,
      choiceModificator: 'SHAPESHIFTER',
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
    });
    nextCardCopy.isClearBaseStrength = true;
    nextCardCopy.isClearBonus = true;
    nextCardCopy.isClearPenalty = true;
    nextCardCopy.modificator = this.choiceModificator;
    nextCardCopy.calculate = nextCard.calculate;

    cards.splice(nextCardIndex, 1, nextCardCopy);
  }

  getNextCardsSuits(): Suit[] {
    return [SUIT_ARTIFACT, SUIT_LEADER, SUIT_WIZARD, SUIT_WEAPON, SUIT_BEAST];
  }
}
