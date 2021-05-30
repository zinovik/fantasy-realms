import { Card } from '../../../common/Card';
import { SUIT_BEAST } from '../../suits';

const SWAMP_CARD_ID = 24;

export class Hydra extends Card {
  constructor() {
    super({
      id: 13,
      suit: SUIT_BEAST,
      name: 'Hydra',
      originalBaseStrength: 12,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus = cards
      .filter((card) => !card.isHidden && !card.isBlanked)
      .some((card) => card.getId() === SWAMP_CARD_ID)
      ? 28
      : 0;
  }
}
