import { Card } from '../../../common/Card';
import { SUIT_ARMY, SUIT_BEAST, SUIT_LEADER } from '../../suits';

const BLANKED_SUITS = [SUIT_ARMY, SUIT_LEADER, SUIT_BEAST];

export class Basilisk extends Card {
  constructor() {
    super({
      id: 15,
      suit: SUIT_BEAST,
      name: 'Basilisk',
      originalBaseStrength: 35,
    });
  }

  blankCards(cards: Card[]): void {
    if (this.isClearPenalty) {
      return;
    }

    cards.forEach((card) => {
      if (BLANKED_SUITS.includes(card.suit) && card.getId() !== this.getId()) {
        card.isBlanked = true;
      }
    });
  }
}
