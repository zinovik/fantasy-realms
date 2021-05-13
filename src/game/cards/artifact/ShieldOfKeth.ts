import { Card } from '../../../common/Card';
import { SUIT_ARTIFACT, SUIT_LEADER } from '../../suits';

const SWORD_OF_KETH_CARD_ID = 38;

export class ShieldOfKeth extends Card {
  constructor() {
    super({
      id: 9,
      suit: SUIT_ARTIFACT,
      name: 'Shield of Keth',
      originalBaseStrength: 4,
    });
  }

  calculate(cards: Card[]): void {
    if (!cards.find((card) => card.suit === SUIT_LEADER)) {
      this.bonus = 0;

      return;
    }

    this.bonus = cards.find((card) => card.getId() === SWORD_OF_KETH_CARD_ID) ? 40 : 15;
  }
}
