import { Card } from '../../../common/Card';
import { SUIT_FLAME } from '../../suits';

const RAINSTORM_CARD_ID = 29;

export class Lightning extends Card {
  constructor() {
    super({
      id: 19,
      suit: SUIT_FLAME,
      name: 'Lightning',
      originalBaseStrength: 11,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus = cards
      .filter((card) => !card.isHidden && !card.isBlanked)
      .some((card) => card.getId() === RAINSTORM_CARD_ID)
      ? 30
      : 0;
  }
}
